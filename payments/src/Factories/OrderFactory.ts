import { Id } from '@jmsgoytia-ticketing/common'
import { OrderDocument } from '../models/OrderDocument';
import Order from '../Entities/Order'

class OrderFactory {
	reconstitute(document: OrderDocument) {
		return new Order({
			id: new Id(document.id),
			price: document.price,
			status: document.status,
			userId: new Id(document.user_id),
			version: document.version,
		});
	}
}

export default new OrderFactory();