import { Request } from 'express';
import Controller from "./Controller";
import CreateRequest from '../UseCases/Create/CreateRequest';
import Interactor from '../UseCases/Create/Interactor';

class CreateController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest (req: Request): CreateRequest {
		return {
			address: {
				city: req.body.city,
				postalCode: req.body.postal_code,
				state: req.body.state,
				streetAddress: req.body.street_address,

			},
			date: req.body.date,
			description: req.body.description ?? null,
			price: req.body.price,
			title: req.body.title,
			userId: req.currentUser!.id,
		};
	};
}

export default new CreateController();