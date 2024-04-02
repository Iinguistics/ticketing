import { Subjects } from './Subjects';

export interface TicketCreatedEvent {
	data: {
		id: string;
		price: number;
		title: string;
		userId: string;
	};
	subject: Subjects.TicketCreated;
}
