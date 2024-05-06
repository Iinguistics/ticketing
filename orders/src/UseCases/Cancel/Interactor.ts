import {
	Id,
	Interactor,
	OkHttpPresenter,
	OrderStatus,
	NotAuthorizedError,
	NotFoundError,
} from '@jmsgoytia-ticketing/common';
import { natsWrapper } from '../../NatsWrapper';
import OrderRepository from '../../Repositories/OrderRepository';
import CancelRequest from './CancelRequest';
import CancelResponse from './CancelResponse';
import OrderCancelledPublisher from '../../events/publishers/OrderCancelledPublisher';

class CancelInteractor extends Interactor {
	#orderRepository = OrderRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: CancelRequest): Promise<CancelResponse> {
		const order = await this.#orderRepository.getById(new Id(req.id));
		const userId = new Id(req.userId);

		if (!order) {
			throw new NotFoundError();
		}

		if (!order.userId.equals(userId)) {
			throw new NotAuthorizedError();
		}

		order.status = OrderStatus.Cancelled;

		await this.#orderRepository.update(order);

		new OrderCancelledPublisher(natsWrapper.client).publish({
			id: order.id.value,
			ticket: {
				id: order.ticket.id,
			},
			userId: order.userId.value,
			version: order.version,
		});

		return {
			id: order.id.value,
		};
	}
}

export default new CancelInteractor();
