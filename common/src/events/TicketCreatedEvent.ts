import Subjects from './Subjects';

interface TicketCreatedEvent {
	data: {
		id: string;
		price: number;
		title: string;
		userId: string;
	};
	subject: Subjects.TicketCreated;
}

export default TicketCreatedEvent;
