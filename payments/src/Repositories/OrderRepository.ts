import { Id, OrderStatus, Repository } from '@jmsgoytia-ticketing/common';
import { Order } from '../models/order';
import { OrderAttrs } from '../models/order';
import { OrderDocument } from '../models/OrderDocument';
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

	async getById(id: Id): Promise<OrderEntity | null> {
		const order = await this.#order.findById(id.toObjectId());

		if (!order) {
			return null;
		}

		return this.#asEntity(order);
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

	#asEntity(document: OrderDocument): OrderEntity {
		return this.#orderFactory.reconstitute(document);
	}
}

export default new OrderRepository();
