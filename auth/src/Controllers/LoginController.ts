import { Request } from 'express';
import Controller from "./Controller";
import Interactor from '../UseCases/Login/Interactor';
import LoginRequest from '../UseCases/Login/LoginRequest';

class LoginController extends Controller {
	constructor() {
		super(Interactor);
	}

	_mapToUseCaseRequest (req: Request): LoginRequest {
		return {
			email: req.body.email,
			password: req.body.password,
		};
	};
}

export default new LoginController();