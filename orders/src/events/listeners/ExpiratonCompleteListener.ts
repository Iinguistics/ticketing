import { Message } from 'node-nats-streaming';
import {
	ExpirationCompleteEvent,
	Id,
	Listener,
	OrderStatus,
	Subjects,
} from '@jmsgoytia-ticketing/common';
import { natsWrapper } from '../../NatsWrapper';
import { QUEUE_GROUP_NAME } from '../../local/config';
import Order from '../../Entities/Order';
import OrderCancelledPublisher from '../publishers/OrderCancelledPublisher';
import OrderRepository from '../../Repositories/OrderRepository';

class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
	queueGroupName = QUEUE_GROUP_NAME;

	async onMessage(
		data: ExpirationCompleteEvent['data'],
		msg: Message
	): Promise<void> {
		const { orderId } = data;

		const order = await this.#getOrderById(new Id(orderId));

		if (order.status === OrderStatus.Complete) {
			return msg.ack();
		}

		order.status = OrderStatus.Cancelled;

		await OrderRepository.update(order);

		await new OrderCancelledPublisher(natsWrapper.client).publish({
			id: order.id.value,
			ticket: {
				id: order.ticket.id,
			},
			userId: order.userId.value,
			version: order.version,
		});

		msg.ack();
	}

	async #getOrderById(id: Id): Promise<Order> {
		const order = await OrderRepository.getById(id);

		if (!order) {
			throw new Error(`Order with ID: ${id.value} not found`);
		}

		return order;
	}
}

export default ExpirationCompleteListener;
