import { Response } from 'express';
import camelToSnake from '../utils/camelToSnake';
import HttpPresenter from './Presenter';

class OkHttpPresenter extends HttpPresenter {
	presentResponse(response: object, httpResponse: Response) {
		return httpResponse.status(200).json(camelToSnake(response));
	}
}

export default new OkHttpPresenter();
