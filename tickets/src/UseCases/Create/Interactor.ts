import CreateRequest from './CreateRequest';
import CreateResponse from './CreateResponse';
import Interactor from '../../UseCase/Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import TicketRepository from '../../Repositories/TicketRepository';

class CreateInteractor extends Interactor {
	#ticketRepository = TicketRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: CreateRequest): Promise<CreateResponse> {
		const { price, title, userId } = req;
		const ticket = await this.#ticketRepository.create({
			price,
			title,
			user_id: userId,
		});

		return {
			id: ticket.id.value,
		};
	}
}

export default new CreateInteractor();
