import { natsWrapper } from '../../NatsWrapper';
import CreateRequest from './CreateRequest';
import CreateResponse from './CreateResponse';
import Interactor from '../../UseCase/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import TicketCreatedPublisher from '../../events/publishers/TicketCreatedPublisher';
import TicketRepository from '../../Repositories/TicketRepository';

class CreateInteractor extends Interactor {
	#ticketRepository = TicketRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: CreateRequest): Promise<CreateResponse> {
		const { address, date, description, price, title, userId } = req;
		const ticket = await this.#ticketRepository.create({
			address: {
				city: address.city,
				postal_code: address.postalCode,
				state: address.state,
				street_address: address.streetAddress,
			},
			date,
			description,
			price,
			title,
			user_id: userId,
		});

		new TicketCreatedPublisher(natsWrapper.client).publish({
			id: ticket.id.value,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.userId.value,
		});

		return {
			id: ticket.id.value,
		};
	}
}

export default new CreateInteractor();
