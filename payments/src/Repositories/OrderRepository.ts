import { Id, OrderStatus, Repository } from '@jmsgoytia-ticketing/common';
import { Order } from '../models/order';
import { OrderDocument } from '../models/OrderDocument';
import { OrderAttrs } from '../models/order';
import { Types } from 'mongoose';

class OrderRepository extends Repository {
	#order;

	constructor() {
		super();
		this.#order = Order;
	}

	async create(attrs: OrderAttrs) {
		const order = this.#order.build(attrs);

		await order.save();
	}

	async cancel(id: Id, version: number): Promise<void> {
		const order = await this.#order.findOne({
			_id: { $eq: id.toObjectId() },
			version: { $eq: version - 1 },
		});

		if (!order) {
			throw new Error(`Order with ID: ${id.value} not found`);
		}

		order.set({ status: OrderStatus.Cancelled });
		await order.save();
	}
}

export default new OrderRepository();
