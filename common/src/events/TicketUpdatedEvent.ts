import { Subjects } from './Subjects';

export interface TicketUpdatedEvent {
	data: {
		id: string;
		price: number;
		title: string;
		userId: string;
	};
	subject: Subjects.TicketUpdated;
}
