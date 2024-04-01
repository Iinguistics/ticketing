import { Request } from 'express';
import Controller from "./Controller";
import TicketsRequest from '../UseCases/Tickets/TicketsRequest';
import Interactor from '../UseCases/Tickets/Interactor';

class TicketsController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest (req: Request): TicketsRequest {
		return {};
	};
}

export default new TicketsController();