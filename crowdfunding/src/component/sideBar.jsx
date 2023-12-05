import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import SavingsIcon from "@mui/icons-material/Savings";
import HomeIcon from "@mui/icons-material/Home";
import ACCOUNTS from "../data/accounts.js";
import { red, green } from "@mui/material/colors";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	Grid,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Divider,
	Chip,
} from "@mui/material";
import { chunkString } from "../utils/formatUtils.js";
import { sha256ToBytes32 } from "../utils/cryptoUtils.js";
import CrowdfundingContract from "../config/Contract.js";
import AlertSideBar from "./alertSideBar.jsx";

const MAX = 1000000;
const MIN = 1;


export default function SideBar() {
	const [creator, setCreator] = useState("-1");
	const [creatorList, setCreatorList] = useState(null);
	const [campaignList, setCampaignList] = useState(null);
	const [allCampaignList, setAllCampaignList] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const handleChange = (event) => {
		setCreator(event.target.value);
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
			setAllCampaignList(result);
		} catch (error) {
			console.error("Error getting all campaigns:", error);
			throw error;
		}
	};

	const addCampaign= async () => {
		try {
			const currentDate = new Date();

			// Création d'une nouvelle date dans 15 jours
			const futureDate = new Date(
				currentDate.getTime() + 21 * 24 * 60 * 60 * 1000,
			);

			// Obtention du timestamp de la date dans 15 jours
			const timeStamp15DaysLater = Math.floor(
				futureDate.getTime() / 1000,
			); 
			const code = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
			const gas =
				(await CrowdfundingContract.methods
					.startCampaign(1000, timeStamp15DaysLater, code)
					.estimateGas()) + 100000n;
			const result = await CrowdfundingContract.methods
				.startCampaign(1000, timeStamp15DaysLater, code)
				.send({ from: ACCOUNTS[0], gas });
			console.log("Document uploaded:", result);
		} catch (error) {
			console.error("Error uploading document:", error);
			throw error;
		}
	};

	useEffect(() => {
		getAllCreator();
		if (creator == "-1") {
			getAllCampaigns();
			//addCampaign();
		} else {
			getCreatorCampaigns(creator);
		}
		console.log(campaignList)
	}, [creator]);

	const [author, setAuthor] = useState(ACCOUNTS[0]);
	const [file, setFile] = useState(null);
	const [fileHash, setFileHash] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [saveButton, setSaveButton] = useState(true);
    const [fileTest, setFileTest] = useState(null);
	const [fileHashTest, setFileHashTest] = useState(null);
	const [checkButton, setCheckButton] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [resultCheck, setResultCheck] = useState(null);

	const handleSelectAuthorChange = (event) => {
		setAuthor(event.target.value);
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
	};

    const handleTestFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFileTest(selectedFile);
	};

	const handleClose = () => {
		setIsDialogOpen(false);
        location.reload();
	};

	// Fonction pour uploader un document
	const addDocument = async() => {
		try {
            const gas = await CrowdfundingContract.methods.uploadDocument(fileHash).estimateGas() + 100000n;
			const result = await CrowdfundingContract.methods
				.uploadDocument(fileHash)
				.send({ from: author, gas });
			console.log("Document uploaded:", result);
            setIsDialogOpen(true);
		} catch (error) {
			console.error("Error uploading document:", error);
			throw error;
		}
	};

	// Fonction pour vérifier un document
	const checkDocument = async () => {
		try {
			const result = await CrowdfundingContract.methods
				.verifyDocument(fileHashTest)
				.call();
            setIsChecked(true);
			setResultCheck(result);
		} catch (error) {
			console.error("Error verifying document:", error);
			throw error;
		}
	}

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	});

	return (
		<div>
			<FormControl sx={{ mt: 2, width: "100%" }}>
				<InputLabel id="creator">Select a creator</InputLabel>
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
				<ListItem key={-1} disablePadding sx={{ display: "block" }}>
					<ListItemButton
						onClick={() => {
							setSelectedIndex(index);
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
						>
							<ListItemButton
								onClick={() => {
									setSelectedIndex(index);
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
											Campaign {parseInt(
												campaign.code,
											)} :{" "}
											{campaign.isOpen ? (
												<span
													style={{
														color: green[500],
														fontWeight: "bold",
													}}
												>
													Open
												</span>
											) : (
												<span
													style={{
														color: red[500],
														fontWeight: "bold",
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
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<NoteAddIcon></NoteAddIcon>
					<Typography sx={{ ml: 1 }}>Add new Document</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2} justifyContent={"center"}>
						<Grid item xs={11}>
							<FormControl sx={{ width: "100%" }}>
								<InputLabel id="author">
									Select an address
								</InputLabel>
								<Select
									labelId="author"
									value={author}
									label="Select an address"
									onChange={handleSelectAuthorChange}
								>
									{ACCOUNTS &&
										ACCOUNTS.map((auth, index) => (
											<MenuItem key={index} value={auth}>
												{auth}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={11}>
							<Button
								component="label"
								variant="outlined"
								startIcon={<CloudUploadIcon />}
								sx={{ width: "100%" }}
							>
								{file && chunkString(file.name, 10)}
								{!file && "Upload File"}
								<VisuallyHiddenInput
									type="file"
									onChange={handleFileChange}
								/>
							</Button>
						</Grid>
						<Grid item xs={7}></Grid>
						<Grid item xs={4}>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								onClick={addCampaign}
							>
								Save
							</Button>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			<Dialog
				open={isDialogOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Success</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Document saved successfully !
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<SearchIcon></SearchIcon>
					<Typography>Verify a document</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2} justifyContent={"center"}>
						<Grid item xs={11}>
							<Button
								component="label"
								variant="outlined"
								startIcon={<CloudUploadIcon />}
								sx={{ width: "100%" }}
							>
								{fileTest && chunkString(fileTest.name, 10)}
								{!fileTest && "Upload File"}
								<VisuallyHiddenInput
									type="file"
									onChange={handleTestFileChange}
								/>
							</Button>
						</Grid>
						<Grid item xs={7}></Grid>
						<Grid item xs={4}>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								onClick={checkDocument}
								disabled={checkButton}
							>
								Check
							</Button>
						</Grid>
						{isChecked && (
							<div>
								<br />
								<AlertSideBar document={resultCheck} />
							</div>
						)}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
