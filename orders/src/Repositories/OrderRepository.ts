import { Id, OrderStatus, Repository } from '@jmsgoytia-ticketing/common';
import { Order } from '../models/order';
import { OrderDocument } from '../models/OrderDocument';
import { OrderAttrs } from '../models/order';
import { Types } from 'mongoose';
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
		const order = await this.#order
			.findById(id.toObjectId())
			.populate('ticket');

		if (!order) {
			return null;
		}

		return this.#asEntity(order);
	}

	async getByUserId(
		id: Id,
		withCancelled: boolean | undefined = true
	): Promise<OrderEntity[]> {
		let query: {
			user_id: { $eq: Types.ObjectId };
			status?: { $ne: OrderStatus };
		} = {
			user_id: { $eq: id.toObjectId() },
		};

		if (!withCancelled) {
			query = {
				...query,
				status: { $ne: OrderStatus.Cancelled },
			};
		}

		const orders = await this.#order
			.find({
				...query,
			})
			.populate('ticket');

		return orders.map((order) => this.#asEntity(order));
	}

	async create(attrs: OrderAttrs) {
		const order = Order.build(attrs);

		await order.save();

		return this.#asEntity(order);
	}

	async update(order: OrderEntity): Promise<void> {
		const data = {
			$set: {
				modified_at: Date.now(),
				status: order.status,
			},
		};

		await this.#order.updateOne({ _id: { $eq: order.id.toObjectId() } }, data);
	}

	#asEntity(document: OrderDocument): OrderEntity {
		return this.#orderFactory.reconstitute(document);
	}
}

export default new OrderRepository();
