import { natsWrapper } from '../../NatsWrapper';
import {
	Id,
	NotAuthorizedError,
	NotFoundError,
} from '@jmsgoytia-ticketing/common';
import Interactor from '../../UseCase/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import TicketUpdatedPublisher from '../../events/publishers/TicketUpdatedPublisher';
import TicketRepository from '../../Repositories/TicketRepository';
import UpdateRequest from './UpdateRequest';
import UpdateResponse from './UpdateResponse';

class UpdateInteractor extends Interactor {
	#ticketRepository = TicketRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: UpdateRequest): Promise<UpdateResponse> {
		const id = new Id(req.id);
		const userId = new Id(req.userId);

		const ticket = await this.#ticketRepository.getById(id);

		if (!ticket) {
			throw new NotFoundError();
		}

		if (!ticket.userId.equals(userId)) {
			throw new NotAuthorizedError();
		}

		ticket.price = req.price;
		ticket.title = req.title;

		await this.#ticketRepository.update(ticket);

		new TicketUpdatedPublisher(natsWrapper.client).publish({
			id: ticket.id.value,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.userId.value,
			version: ticket.version,
		});

		return {
			id: ticket.id.value,
		};
	}
}

export default new UpdateInteractor();
