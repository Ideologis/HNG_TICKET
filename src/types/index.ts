export interface TicketFormData {
	ticketType: "REGULAR" | "VIP" | "VVIP";
	quantity: number;
	fullName: string;
	email: string;
	avatarUrl: string;
	aboutProject: string;
	price: number;
	errors?: {
		fullName?: string;
		email?: string;
		aboutProject?: string;
		avatarUrl?: string;
	};
}

export interface ValidationErrors {
	ticketType?: string;
	quantity?: string;
	fullName?: string;
	email?: string;
	avatarUrl?: string;
	[key: string]: string | undefined;
}

export enum FormStep {
	TicketSelection = 1,
	AttendeeDetails = 2,
	Complete = 3,
}
