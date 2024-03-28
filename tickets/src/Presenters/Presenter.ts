import { Response } from 'express';

abstract class Presenter {
	abstract presentResponse(response: object, httpResponse: Response): object;
}

export default Presenter;
