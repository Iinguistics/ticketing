import { Id } from '@jmsgoytia-ticketing/common'
import { TicketDocument } from '../models/TicketDocument';
import Ticket from '../Entities/Ticket'

class TicketFactory {
	reconstitute(document: TicketDocument) {
		return new Ticket({
			createdAt: document.created_at,
			deletedAt: document.deleted_at,
			id: new Id(document.id),
			price: document.price,
			title: document.title,
			userId: new Id(document.user_id),
			version: document.version,
		});
	}
}

export default new TicketFactory();