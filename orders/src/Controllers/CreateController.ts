import { Request } from 'express';
import Controller from './Controller';
import CreateRequest from '../UseCases/Create/CreateRequest';
import Interactor from '../UseCases/Create/Interactor';

class CreateController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest(req: Request): CreateRequest {
		return {
			ticketId: req.body.ticket_id,
			userId: req.currentUser!.id
		};
	}
}

export default new CreateController();
