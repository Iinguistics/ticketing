import Subjects from './Subjects';

interface TicketUpdatedEvent {
	data: {
		id: string;
		price: number;
		title: string;
		userId: string;
	};
	subject: Subjects.TicketUpdated;
}

export default TicketUpdatedEvent;
