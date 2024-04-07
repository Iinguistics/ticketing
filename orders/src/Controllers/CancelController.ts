import { Request } from 'express';
import Controller from "./Controller";
import CancelRequest from '../UseCases/Cancel/CancelRequest';
import Interactor from '../UseCases/Cancel/Interactor';

class CancelController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest (req: Request): CancelRequest {
		return {
			id: req.params.id,
			userId: req.currentUser!.id,
		};
	};
}

export default new CancelController();