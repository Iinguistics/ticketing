import {
	Publisher,
	Subjects,
	TicketUpdatedEvent,
} from '@jmsgoytia-ticketing/common';

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
}

export default TicketUpdatedPublisher;
