import { Id, NotAuthorizedError, NotFoundError } from '@jmsgoytia-ticketing/common';
import Interactor from '../Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import Order from '../../types/Order';
import OrderEntity from '../../Entities/Order';
import OrderRepository from '../../Repositories/OrderRepository';
import ShowRequest from './ShowRequest';
import ShowResponse from './ShowResponse';

class ShowInteractor extends Interactor {
	#orderRepository = OrderRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: ShowRequest): Promise<ShowResponse> {
		const order = await this.#orderRepository.getById(new Id(req.id));
		const userId = new Id(req.userId);

		if (!order) {
			throw new NotFoundError();
		}

		if(!order.userId.equals(userId)){
			throw new NotAuthorizedError();
		}

		return {
			order: this.#mapToResponse(order),
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

export default new ShowInteractor();
