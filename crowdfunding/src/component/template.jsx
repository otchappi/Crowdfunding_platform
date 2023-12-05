import CssBaseline from "@mui/material/CssBaseline";

import { useEffect, useState } from "react";
import * as React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ACCOUNTS from "../data/accounts.js";
import { red, green, blue } from "@mui/material/colors";
import {
	AppBar,
	Drawer,
	Toolbar,
	Typography,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Divider,
	Paper,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	InputAdornment,
	OutlinedInput,
	Box,
} from "@mui/material";
import CrowdfundingContract from "../config/Contract.js";
import InitialView from "./initialView.jsx";
import CampaignDetails from "./campaignDetails.jsx";

const MAX = 1000000;
const MIN = 1;

const drawerWidth = 350;

export default function Template() {
	const [creator, setCreator] = useState("-1");
	const [creatorList, setCreatorList] = useState(null);
	const [campaignList, setCampaignList] = useState(null);
	const [campaign, setCampaign] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [user, setUser] = useState(ACCOUNTS[0]);
	const [openSuccess, setOpenSuccess] = useState(false);

	const [openNewCampaign, setOpenNewCampaign] = useState(false);
	const [creatorForm, setCreatorForm] = useState(user);
	const [deadlineForm, setDeadlineForm] = useState(0);
	const [goalForm, setGoalForm] = useState(0);

	const [openContributeCampaign, setContributeCampaign] = useState(false);
	const [openCloseCampaign, setCloseCampaign] = useState(false);
	const [openWithdrawCampaign, setOpenWithdrawCampaign] = useState(false);

	const handleChange = (event) => {
		setCreator(event.target.value);
	};
	const handleSelectUserChange = (event) => {
		setUser(event.target.value);
		setCreatorForm(event.target.value);
	};
	const handleSelectNewChange = (event) => {
		setCreatorForm(event.target.value);
	};
	const handleClose = () => {
		setOpenSuccess(false);
		location.reload();
	};

	const getAllCreator = async () => {
		try {
			const result = await CrowdfundingContract.methods
				.getAllCreators()
				.call();
			setCreatorList(result);
		} catch (error) {
			console.error("Error getting all creators:", error);
			throw error;
		}
	};

	const getCreatorCampaigns = async (creatorAddress) => {
		try {
			const result = await CrowdfundingContract.methods
				.getCreatorCampaign(creatorAddress)
				.call();
			setCampaignList(result.campaigns);
		} catch (error) {
			console.error("Error getting creator campaign:", error);
			throw error;
		}
	};

	const getAllCampaigns = async () => {
		try {
			const result = await CrowdfundingContract.methods
				.getCampaigns()
				.call();
			setCampaignList(result);
		} catch (error) {
			console.error("Error getting all campaigns:", error);
			throw error;
		}
	};

	const getCampaign = async (code) => {
		try {
			const result = await CrowdfundingContract.methods
				.getCampaign(code)
				.call();
			const result1 = await CrowdfundingContract.methods
				.getCampaign(code)
				.call();
			setCampaign(result);
		} catch (error) {
			console.error("Error getting campaign:", error);
			throw error;
		}
	};

	const addCampaign = async () => {
		try {
			const currentDate = new Date();
			const deadline =  deadlineForm * 24 * 60 * 60;
			const code = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
			const gas =
				(await CrowdfundingContract.methods
					.startCampaign(goalForm, deadline, code)
					.estimateGas()) + 100000n;
			const result = await CrowdfundingContract.methods
				.startCampaign(goalForm, deadline, code)
				.send({ from: creatorForm, gas });
			setOpenNewCampaign(false);
			setOpenSuccess(true);
		} catch (error) {
			console.error("Error uploading document:", error);
			throw error;
		}
	};

	useEffect(() => {
		getAllCreator();
		if (creator == "-1") {
			getAllCampaigns();
		} else {
			getCreatorCampaigns(creator);
		}
		console.log(campaignList);
	}, [creator]);

	const handleCloseNew = () => {
		setOpenNewCampaign(false);
	};

	const handleCloseContribute = () => {
		setOpenContributeCampaign(false);
	};

	const handleCloseWithdraw = () => {
		setOpenWithdrawCampaign(false);
	};

	const handleCloseClose = () => {
		setOpenCloseCampaign(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Dialog
				open={openSuccess}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Success</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Operation done successfully !
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Ethereum Decentralized Application (Dapp) : Crowdfunding
						Platform
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto", mt: 3 }}>
					<div>
						<FormControl sx={{ mt: 2, width: "100%" }}>
							<InputLabel id="creator">
								Select a creator
							</InputLabel>
							<Select
								labelId="creator"
								value={creator}
								label="Select a creator"
								onChange={handleChange}
							>
								<MenuItem key={-1} value={"-1"}>
									All
								</MenuItem>
								{creatorList &&
									creatorList.map((creator, index) => (
										<MenuItem key={index} value={creator}>
											{creator}
										</MenuItem>
									))}
							</Select>
						</FormControl>
						<Divider />
						<List>
							<ListItem
								key={-1}
								disablePadding
								sx={{ display: "block" }}
								style={{
									backgroundColor:
										selectedIndex == -1
											? blue[100]
											: "white",
								}}
							>
								<ListItemButton
									onClick={() => {
										setSelectedIndex(-1);
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											justifyContent: "center",
										}}
									>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary={" Home"} />
								</ListItemButton>
							</ListItem>
							{campaignList &&
								campaignList.map((campaign, index) => (
									<ListItem
										key={index}
										disablePadding
										sx={{ display: "block" }}
										style={{
											backgroundColor:
												selectedIndex == index
													? blue[100]
													: "white",
										}}
									>
										<ListItemButton
											onClick={() => {
												setSelectedIndex(index);
												getCampaign(campaign.code);
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													justifyContent: "center",
												}}
											>
												<SavingsIcon />
											</ListItemIcon>
											<ListItemText
												primary={
													<React.Fragment>
														{" "}
														Campaign{" "}
														{parseInt(
															campaign.code,
														)}{" "}
														:{" "}
														{campaign.isOpen ? (
															<span
																style={{
																	color: green[500],
																	fontWeight:
																		"bold",
																}}
															>
																Open
															</span>
														) : (
															<span
																style={{
																	color: red[500],
																	fontWeight:
																		"bold",
																}}
															>
																Closed
															</span>
														)}
													</React.Fragment>
												}
											/>
										</ListItemButton>
									</ListItem>
								))}
						</List>
						<Button
							variant="contained"
							onClick={() => setOpenNewCampaign(true)}
						>
							<AddIcon></AddIcon>Add new Campaign
						</Button>
						<Dialog
							open={openNewCampaign}
							onClose={handleCloseNew}
							aria-labelledby="new"
							aria-describedby="new-description"
						>
							<DialogTitle id="new">Add new Campaign</DialogTitle>
							<DialogContent>
								<br />
								<FormControl sx={{ width: "100%" }}>
									<InputLabel id="newCampaign">
										Select a creator
									</InputLabel>
									<Select
										labelId="newCampaign"
										value={creatorForm}
										label="Select a creator"
										onChange={handleSelectNewChange}
									>
										{ACCOUNTS &&
											ACCOUNTS.map((auth, index) => (
												<MenuItem
													key={"New" + index}
													value={auth}
												>
													{auth}
												</MenuItem>
											))}
									</Select>
								</FormControl>
								<FormControl sx={{ mt: 2, width: "100%" }}>
									<InputLabel htmlFor="goalAmount">
										Goal amount
									</InputLabel>
									<OutlinedInput
										id="goalAmount"
										onChange={(event) => {
											setGoalForm(event.target.value);
										}}
										min="1"
										endAdornment={
											<InputAdornment position="end">
												Ether
											</InputAdornment>
										}
										label="Goal amount"
										type="number"
									/>
								</FormControl>
								<FormControl sx={{ mt: 2, width: "100%" }}>
									<InputLabel htmlFor="endAfter">
										End after
									</InputLabel>
									<OutlinedInput
										id="endAfter"
										onChange={(event) => {
											setDeadlineForm(event.target.value);
										}}
										endAdornment={
											<InputAdornment position="end">
												Day
											</InputAdornment>
										}
										label="End after"
										type="number"
									/>
								</FormControl>
							</DialogContent>
							<DialogActions>
								<Button variant="text" onClick={handleCloseNew}>
									Close
								</Button>
								<Button
									variant="contained"
									onClick={addCampaign}
								>
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Box>
					<Paper>
						<FormControl sx={{ width: "100%" }}>
							<InputLabel id="user">Select an address</InputLabel>
							<Select
								labelId="user"
								value={user}
								label="Select an address"
								onChange={handleSelectUserChange}
							>
								{ACCOUNTS &&
									ACCOUNTS.map((auth, index) => (
										<MenuItem
											key={"user" + index}
											value={auth}
										>
											{auth}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Paper>

					<Paper
						style={{
							boxShadow:
								"rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
						}}
						sx={{ mt: 3 }}
					>
						{selectedIndex == -1 && <InitialView />}
						{selectedIndex != -1 && campaign && (
							<Button variant="contained" color="success">
								Contribute
							</Button>
						)}
						&nbsp;&nbsp;
						{campaign && user && campaign.creator == user && (
							<Button variant="contained" color="info">
								Withdraw funds
							</Button>
						)}
						&nbsp;&nbsp;
						{campaign && user && campaign.creator == user && (
							<Button variant="contained" color="error">
								Close campaign
							</Button>
						)}
						&nbsp;&nbsp;
						{selectedIndex != -1 && campaign && (
							<CampaignDetails campaign={campaign} />
						)}
					</Paper>
				</Box>
			</Box>
		</Box>
	);
}
