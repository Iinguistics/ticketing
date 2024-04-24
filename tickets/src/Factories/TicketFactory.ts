import { Address, Id } from '@jmsgoytia-ticketing/common';
import { TicketDocument } from '../models/TicketDocument';
import Ticket from '../Entities/Ticket';

class TicketFactory {
	reconstitute(document: TicketDocument) {
		return new Ticket({
			address: new Address({
				city: document.address.city,
				postalCode: document.address.postal_code,
				state: document.address.state,
				streetAddress: document.address.street_address,
			}),
			createdAt: document.created_at,
			date: document.date,
			deletedAt: document.deleted_at,
			description: document.description ?? null,
			id: new Id(document.id),
			orderId: document.order_id ? new Id(document.order_id) : undefined,
			price: document.price,
			title: document.title,
			userId: new Id(document.user_id),
			version: document.version,
		});
	}
}

export default new TicketFactory();
