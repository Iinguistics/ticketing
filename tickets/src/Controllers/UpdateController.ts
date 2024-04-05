import { Request } from 'express';
import Controller from "./Controller";
import Interactor from '../UseCases/Update/Interactor';
import UpdateRequest from '../UseCases/Update/UpdateRequest';

class UpdateController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest (req: Request): UpdateRequest {
		return {
			id: req.params.id,
			price: req.body.price,
			title: req.body.title,
			userId: req.currentUser!.id
		};
	};
}

export default new UpdateController();