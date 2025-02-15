import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // ✅ Convert to ES module equivalent

const nextConfig = {
	webpack: (config) => {
		config.cache = {
			type: "filesystem",
			buildDependencies: {
				config: [__filename],
			},
		};

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
			},
		],
	},

	transpilePackages: ["geist"],
	redirects: async () => {
		return [];
	},
};

export default nextConfig; 
