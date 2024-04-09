import { Subjects } from './Subjects';

export interface TicketCreatedEvent {
	data: {
		id: string;
		price: number;
		title: string;
		userId: string;
		version: number;
	};
	subject: Subjects.TicketCreated;
}
