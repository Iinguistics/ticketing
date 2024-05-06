import { Id, Interactor, OkHttpPresenter } from '@jmsgoytia-ticketing/common';
import Order from '../../types/Order';
import OrderEntity from '../../Entities/Order/Order';
import OrdersRequest from './OrdersRequest';
import OrdersResponse from './OrdersResponse';
import OrderRepository from '../../Repositories/OrderRepository';

class OrdersInteractor extends Interactor {
	#orderRepository = OrderRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: OrdersRequest): Promise<OrdersResponse> {
		const orders = await this.#orderRepository.getByUserId(
			new Id(req.userId),
			false
		);

		return {
			orders: orders.map(this.#mapToResponse),
		};
	}

	#mapToResponse(order: OrderEntity): Order {
		return {
			createdAt: order.createdAt,
			expiresAt: order.expiresAt,
			id: order.id.value,
			status: order.status,
			ticketPrice: order.ticket.price,
			ticketTitle: order.ticket.title,
			userId: order.userId.value,
		};
	}
}

export default new OrdersInteractor();
