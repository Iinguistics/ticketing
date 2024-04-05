import { Id, Repository } from '@jmsgoytia-ticketing/common';
import { Order } from '../models/order';
import { OrderDocument } from '../models/OrderDocument';
import { OrderAttrs } from '../models/order';
import OrderEntity from '../Entities/Order';
import OrderFactory from '../Factories/OrderFactory';

class OrderRepository extends Repository {
	#orderFactory;

	constructor() {
		super();
		this.#orderFactory = OrderFactory;
	}

	async create(attrs: OrderAttrs) {
		const order = Order.build(attrs);

		await order.save();

		return this.#asEntity(order);
	}

	#asEntity(document: OrderDocument): OrderEntity {
		return this.#orderFactory.reconstitute(document);
	}
}

export default new OrderRepository();
