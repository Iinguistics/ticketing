import { camelToSnake } from '@jmsgoytia-ticketing/common'
import { response as httpResponse } from 'express';
import HttpPresenter from './Presenter';

class OkHttpPresenter extends HttpPresenter {
	presentResponse(response: object) {;
		return httpResponse.status(200).json(camelToSnake(response));
	}
}

export default new OkHttpPresenter();
