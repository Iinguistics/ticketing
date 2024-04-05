import {
	BadRequestError,
	Id,
	NotFoundError,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { EXPIRATION_WINDOW_SECONDS } from '../../local/config';
import CreateRequest from './CreateRequest';
import CreateResponse from './CreateResponse';
import Interactor from '../../UseCases/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import OrderRepository from '../../Repositories/OrderRepository';
import TicketRepository from '../../Repositories/TicketRepository';

class CreateInteractor extends Interactor {
	#orderRepository = OrderRepository;
	#ticketRepository = TicketRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: CreateRequest): Promise<CreateResponse> {
		const ticket = await this.#ticketRepository.getById(new Id(req.ticketId));

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

		return {
			id: order.id.value,
		};
	}
}

export default new CreateInteractor();
