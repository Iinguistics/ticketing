import { Request } from 'express';
import Controller from './Controller';
import Interactor from '../UseCases/Orders/Interactor';
import OrdersRequest from '../UseCases/Orders/OrdersRequest';

class OrdersController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest(req: Request): OrdersRequest {
		return { userId: req.currentUser!.id };
	}
}

export default new OrdersController();
