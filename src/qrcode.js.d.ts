declare module "qrcode.js" {
	interface QRCodeOptions {
		width?: number;
		margin?: number;
		color?: {
			dark?: string;
			light?: string;
		};
	}

	const QRCode: {
		toDataURL: (text: string, options?: QRCodeOptions) => Promise<string>;
	};

	export default QRCode;
}
