import {
	BadRequestError,
	Id,
	NotFoundError,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { EXPIRATION_WINDOW_SECONDS } from '../../local/config';
import { natsWrapper } from '../../NatsWrapper';
import CreateRequest from './CreateRequest';
import CreateResponse from './CreateResponse';
import Interactor from '../../UseCases/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import OrderCreatedPublisher from '../../events/publishers/OrderCreatedPublisher';
import OrderRepository from '../../Repositories/OrderRepository';
import TicketRepository from '../../Repositories/TicketRepository';

class CreateInteractor extends Interactor {
	#orderRepository;
	#publisher;
	#ticketRepository;

	constructor() {
		super(OkHttpPresenter);
		this.#orderRepository = OrderRepository;
		this.#publisher = new OrderCreatedPublisher(natsWrapper.client);
		this.#ticketRepository = TicketRepository;
	}

	async _execute(req: CreateRequest): Promise<CreateResponse> {
		const ticket = await this.#ticketRepository.getDocumentById(
			new Id(req.ticketId)
		);

		if (!ticket) {
			throw new NotFoundError();
		}

		if (await ticket.isReserved()) {
			throw new BadRequestError('Ticket is already reserved');
		}

		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

		const order = await this.#orderRepository.create({
			user_id: req.userId,
			expires_at: expiration,
			status: OrderStatus.Created,
			ticket,
		});

		this.#publisher.publish({
			expiresAt: order.expiresAt.toISOString(),
			id: order.id.value,
			status: order.status,
			ticket: {
				id: order.ticket.id,
				price: order.ticket.price,
			},
			userId: order.userId.value,
		});

		return {
			id: order.id.value,
		};
	}
}

export default new CreateInteractor();
