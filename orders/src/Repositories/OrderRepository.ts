import { Id, OrderStatus, Repository } from '@jmsgoytia-ticketing/common';
import { Order } from '../models/order';
import { OrderDocument } from '../models/OrderDocument';
import { OrderAttrs } from '../models/order';
import OrderEntity from '../Entities/Order';
import OrderFactory from '../Factories/OrderFactory';

class OrderRepository extends Repository {
	#order;
	#orderFactory;

	constructor() {
		super();
		this.#order = Order;
		this.#orderFactory = OrderFactory;
	}

	async getActiveByUserId(id: Id): Promise<OrderEntity[]> {
		const orders = await this.#order.find({
			user_id: { $eq: id.toObjectId() },
			status: { $ne: OrderStatus.Cancelled },
		}).populate('ticket');

		return orders.map((order) => this.#asEntity(order));
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
