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

export default function CampaignDetails({ campaign }) {
	const details = [
		{
			details: [
				{
					label: "Creator",
					value: campaign.creator,
				},
				{
					label: "Goal amount",
					value: parseInt(campaign.goalAmount) + " Ethers",
				},
				{
					label: "Raised amount",
					value: parseInt(campaign.raisedAmount) + " Ethers",
				},
				{
					label: "Deadline",
					value: new Date(
						parseInt(campaign.deadline) * 1000,
					).toString(),
				},
				{
					label: "Status",
					value: campaign.isOpen ? "Open" : "Closed",
				},
			],
			title: "Campaign " + campaign.code,
		},
	];

	return (
		<div>
			{details.map((section) => (
				<Box
					key={section.title}
					sx={{ padding: "15px", backgroundColor: grey[50] }}
				>
					<img src={PicImage} style={{ width: 155, height: 155 }} />
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
										{item.value}
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
