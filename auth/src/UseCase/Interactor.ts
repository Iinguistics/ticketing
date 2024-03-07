abstract class Interactor {
		#presenter;

	/**
	 * Create an Interactor.
	 * @param {Dependencies<Response>} dependencies
	 */
	constructor(dependencies) {
		this.#presenter = dependencies.presenter;
	}

	async execute(request: object) {
		try {
			await this.#handleRequest(request);
		} catch (exception) {
			this.#handleException(exception);
		}
	}

	abstract _execute(httpRequest: object): object;

	async #handleRequest(request: object) {
		const response = await this._execute(request);
		this.#presenter.presentResponse(response);
	}

	/** @param {unknown} exception */
	#handleException(exception) {
		const error =
			exception instanceof Error
				? exception
				: new Error('An unexpected error has occurred.');

		this.#presenter.presentError(error);
	}
}

export default Interactor;