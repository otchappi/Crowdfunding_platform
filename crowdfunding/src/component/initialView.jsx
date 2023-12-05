import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import PicImage from "../assets/pic.jpg";

export default function InitialView() {
    const details = [
		{
			details: [
				{ 
                    label: "Target set of this session",
                    value: "Develop a decentralized crowdfunding application (DApp) using Solidity for smart contract development and Truffle Suite for both backend and frontend integration."
                },
				{
					label: "Features",
					value: [
						"Start a campaign",
						"Contribute Ether",
						"Check funding status",
						"Withdraw funds",
						"Return contributions",
					],
				},
				{
					label: "Author",
					value: "TCHAPPI OSEE BRAYAN",
				},
			],
			title: "TP 8 : Ethereum Decentralized Application (Dapp): Developing a Crowdfunding DApp",
		},
	];

    return (
		<div>
			{details.map((section) => (
					<Box
						key={section.title}
						sx={{ padding: "15px", backgroundColor: grey[50] }}
					>
                        <img src={PicImage} style={{width: 275, height: 275}}/>
						<Typography
							variant="subtitle2"
							sx={{ fontWeight: "bold" }}
						>
							{section.title}
						</Typography>
						<Table>
							<TableBody>
								{section.details.map((item, index) => (
									<TableRow key={index}>
										<TableCell
											align="right"
											component="th"
											scope="row"
										>
											{item.label}
										</TableCell>
										<TableCell align="center">:</TableCell>
										<TableCell>
											{Array.isArray(item.value)
												? item.value.map((comp, i) => (
														<Chip
															key={i}
															color={"primary"}
															label={comp}
														/>
												  ))
												: item.value}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>
				))}
		</div>
	);
}
