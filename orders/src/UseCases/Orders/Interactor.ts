import { Id } from '@jmsgoytia-ticketing/common';
import { Order } from './OrdersResponse';
import Interactor from '../../UseCases/Interactor';
import OrderEntity from '../../Entities/Order';
import OrdersRequest from './OrdersRequest';
import OrdersResponse from './OrdersResponse';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import OrderRepository from '../../Repositories/OrderRepository';

class OrdersInteractor extends Interactor {
	#orderRepository = OrderRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: OrdersRequest): Promise<OrdersResponse> {
		const orders = await this.#orderRepository.getActiveByUserId(
			new Id(req.userId)
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
		};
	}
}

export default new OrdersInteractor();
