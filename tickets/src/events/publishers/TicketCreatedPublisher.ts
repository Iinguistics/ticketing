import {
	Publisher,
	Subjects,
	TicketCreatedEvent,
} from '@jmsgoytia-ticketing/common';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;
