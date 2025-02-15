import html2canvas from "html2canvas";

export async function downloadTicket(ticketRef: HTMLDivElement): Promise<void> {
	try {
		// Create canvas from ticket element
		const canvas = await html2canvas(ticketRef, {
			scale: 2,
			backgroundColor: null,
			logging: false,
		});

		// Convert to blob
		const blob = await new Promise<Blob>((resolve) => {
			canvas.toBlob(
				(blob) => {
					resolve(blob as Blob);
				},
				"image/png",
				1.0
			);
		});

		// Create download link
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "techember-fest-ticket.png";

		// Trigger download
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Cleanup
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Download failed:", error);
		throw new Error("Failed to download ticket");
	}
}
