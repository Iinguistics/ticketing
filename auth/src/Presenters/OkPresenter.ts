import { camelToSnake } from '@jmsgoytia-ticketing/common'
import { Response } from 'express';
import HttpPresenter from './Presenter';

class OkHttpPresenter extends HttpPresenter {
	presentResponse(response: object, httpResponse: Response) {;
		return httpResponse.status(200).json(camelToSnake(response));
	}
}

export default new OkHttpPresenter();
