import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
	#reason = 'Error connecting to database';
	statusCode = 500;

	constructor() {
		super('DB conn error');

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors(){
		return [
			{
				message: this.#reason
			}
		]
	}
}
