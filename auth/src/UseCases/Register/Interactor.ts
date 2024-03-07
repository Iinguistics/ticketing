import { BadRequestError } from '@jmsgoytia-ticketing/common';
import Email from '../../ValueObjects/Email';
import Interactor from '../../UseCase/Interactor';
import jwt from 'jsonwebtoken';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import RegisterRequest from './RegisterRequest';
import UserRepository from '../../Repositories/UserRepository';

class RegisterInteractor extends Interactor {
	#userRepository = UserRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(req: RegisterRequest) {
		const email = new Email(req.email);

		await this.#checkExistingUser(email);

		const user = await this.#userRepository.create(email, req.password);

		const userJwt = jwt.sign(
			{
				id: user.id.value,
				email: user.email.value,
			},
			// ! for ts error, checked in index
			process.env.JWT_KEY!
		);

		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}

	async #checkExistingUser(email: Email): Promise<void> {
		const user = await this.#userRepository.getByEmail(email);

		if (user) {
			throw new BadRequestError(`Email: ${email.value} already in use`);
		}
	}
}

export default new RegisterInteractor();