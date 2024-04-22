import { Request, Response } from 'express';
import Interactor from '../UseCases/Interactor';

abstract class Controller {
	#interactor: Interactor;

	constructor(interactor: Interactor) {
		this.#interactor = interactor;
	}

	handle(httpRequest: Request, httpResponse: Response) {
		const request = this._mapToUseCaseRequest(httpRequest);
		this.#interactor.execute(request, httpRequest, httpResponse);
	}

	abstract _mapToUseCaseRequest(httpRequest: Request): object;
}

export default Controller;
