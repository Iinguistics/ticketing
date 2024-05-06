import {
	BadRequestError,
	Id,
	Interactor,
	NotFoundError,
	OkHttpPresenter,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { EXPIRATION_WINDOW_SECONDS } from '../../local/config';
import { natsWrapper } from '../../NatsWrapper';
import CreateRequest from './CreateRequest';
import CreateResponse from './CreateResponse';
import OrderCreatedPublisher from '../../events/publishers/OrderCreatedPublisher';
import OrderRepository from '../../Repositories/OrderRepository';
import TicketRepository from '../../Repositories/TicketRepository';

class CreateInteractor extends Interactor {
	#orderRepository;
	#ticketRepository;

	constructor() {
		super(OkHttpPresenter);
		this.#orderRepository = OrderRepository;
		this.#ticketRepository = TicketRepository;
	}

	async _execute(req: CreateRequest): Promise<CreateResponse> {
		const ticket = await this.#ticketRepository.getById(new Id(req.ticketId));

		if (!ticket) {
			throw new NotFoundError();
		}

		if (await this.#orderRepository.isReserved(ticket)) {
			throw new BadRequestError('Ticket is already reserved');
		}

		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

		const order = await this.#orderRepository.create({
			user_id: req.userId,
			expires_at: expiration,
			status: OrderStatus.Created,
			ticket: ticket.id.toObjectId(),
		});

		new OrderCreatedPublisher(natsWrapper.client).publish({
			expiresAt: order.expiresAt.toISOString(),
			id: order.id.value,
			status: order.status,
			ticket: {
				id: ticket.id.value,
				price: ticket.price,
			},
			userId: order.userId.value,
			version: order.version,
		});

		return {
			id: order.id.value,
		};
	}
}

export default new CreateInteractor();
