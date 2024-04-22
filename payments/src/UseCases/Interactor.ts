import { BadRequestError, CustomError } from '@jmsgoytia-ticketing/common';
import { Request, Response } from 'express';
import Presenter from '../Presenters/Presenter';

abstract class Interactor {
	#presenter;

	constructor(presenter: Presenter) {
		this.#presenter = presenter;
	}

	async execute(request: object, httpRequest: Request, httpResponse: Response) {
		try {
			await this.#handleRequest(request, httpRequest, httpResponse);
		} catch (exception) {
			if (exception instanceof CustomError) {
				throw exception;
			} else {
				console.error(exception);
				throw new BadRequestError('An unexpected error has occurred');
			}
		}
	}

	abstract _execute(request: object, httpRequest?: Request): object;

	async #handleRequest(
		request: object,
		httpRequest: Request,
		httpResponse: Response
	) {
		const response = await this._execute(request, httpRequest);
		return this.#presenter.presentResponse(response, httpResponse);
	}
}

export default Interactor;