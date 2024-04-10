import { Id } from '@jmsgoytia-ticketing/common'
import { OrderDocument } from '../models/OrderDocument';
import Order from '../Entities/Order'

class OrderFactory {
	reconstitute(document: OrderDocument) {
		return new Order({
			createdAt: document.created_at,
			expiresAt: document.expires_at,
			id: new Id(document.id),
			status: document.status,
			ticket: document.ticket,
			userId: new Id(document.user_id),
			version: document.version,
		});
	}
}

export default new OrderFactory();