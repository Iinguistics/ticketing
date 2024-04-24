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
			address: {
				city: req.body.city,
				postalCode: req.body.postal_code,
				state: req.body.state,
				streetAddress: req.body.street_address,
			},
			date: req.body.date,
			description: req.body.description ?? null,
			id: req.params.id,
			price: req.body.price,
			title: req.body.title,
			userId: req.currentUser!.id
		};
	};
}

export default new UpdateController();