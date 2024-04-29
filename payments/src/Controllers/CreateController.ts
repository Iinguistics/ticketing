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
			orderId: req.body.order_id,
			token: req.body.token,
			userEmail: req.currentUser!.email,
			userId: req.currentUser!.id,
		};
	}
}

export default new CreateController();
