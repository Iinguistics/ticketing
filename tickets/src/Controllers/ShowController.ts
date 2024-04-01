import { Request } from 'express';
import Controller from "./Controller";
import ShowRequest from '../UseCases/Show/ShowRequest';
import Interactor from '../UseCases/Show/Interactor';

class ShowController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest (req: Request): ShowRequest {
		return {
			id: req.params.id
		};
	};
}

export default new ShowController();