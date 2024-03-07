import { Request, response } from 'express';
import Controller from "./Controller";
import Interactor from '../UseCases/Register/Interactor';
import RegisterRequest from '../UseCases/Register/RegisterRequest';

class RegisterController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest (req: Request): RegisterRequest {
		return {
			email: req.body.email,
			password: req.body.password,
			session: req.session,
		};
	};
}