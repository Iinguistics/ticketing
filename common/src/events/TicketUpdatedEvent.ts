import { Subjects } from './Subjects';

export interface TicketUpdatedEvent {
	data: {
		id: string;
		orderId?: string;
		price: number;
		title: string;
		userId: string;
		version: number;
	};
	subject: Subjects.TicketUpdated;
}
