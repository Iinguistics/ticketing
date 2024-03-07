import { BadRequestError } from '@jmsgoytia-ticketing/common';
import Presenter from "../Presenters/Presenter";

abstract class Interactor {
		#presenter;

	constructor(presenter: Presenter) {
		this.#presenter = presenter;
	}

	async execute(request: object) {
		try {
			await this.#handleRequest(request);
		} catch (exception) {
			throw new BadRequestError('A unexpected error has occurred');
		}
	}

	abstract _execute(httpRequest: object): object;

	async #handleRequest(request: object) {
		const response = await this._execute(request);
		this.#presenter.presentResponse(response);
	}
}

export default Interactor;