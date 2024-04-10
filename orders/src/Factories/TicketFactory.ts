import { Id } from '@jmsgoytia-ticketing/common'
import { TicketDocument } from '../models/TicketDocument';
import Ticket from '../Entities/Ticket'

class TicketFactory {
	reconstitute(document: TicketDocument) {
		return new Ticket({
			id: new Id(document.id),
			price: document.price,
			title: document.title,
			version: document.version,
		});
	}
}

export default new TicketFactory();