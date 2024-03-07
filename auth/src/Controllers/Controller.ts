import { Request } from 'express';
import Interactor from '../UseCase/Interactor';

abstract class Controller {
	#interactor: Interactor;

	constructor(interactor: Interactor) {
		this.#interactor = interactor;
	}

	handle(httpRequest: Request) {
		const request = this._mapToUseCaseRequest(httpRequest);
		this.#interactor.execute(request);
	}

	abstract _mapToUseCaseRequest(httpRequest: Request): object;
}

export default Controller;
