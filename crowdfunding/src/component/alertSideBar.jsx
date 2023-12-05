import * as React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";
import DocumentCard from "./documentCard";

export default function AlertSideBar({ document }) {
	return (
		<Stack sx={{ width: "100%" }} spacing={2}>
			{document && document.timestamp == 0n && (
				<Alert severity="success">
					<AlertTitle>Good news</AlertTitle>
					This is document haven't already been <br /> uploaded
					before.{" "}
					<strong>
						So, you can <br /> upload it !
					</strong>
				</Alert>
			)}

			{document && document.timestamp != 0n && (
				<Alert severity="info">
					<AlertTitle>Document found</AlertTitle>
					<DocumentCard timestamp={document.timestamp} author={document.author}/>
				</Alert>
			)}
		</Stack>
	);
}
