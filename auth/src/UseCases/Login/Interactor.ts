import { Request } from 'express';
import { UserDocument } from '../../models/UserDocument';

import {
	BadRequestError,
	Interactor,
	OkHttpPresenter,
} from '@jmsgoytia-ticketing/common';
import Email from '../../ValueObjects/Email';
import jwt from 'jsonwebtoken';
import LoginRequest from './LoginRequest';
import LoginResponse from './LoginResponse';
import Password from '../../helpers/password';
import UserRepository from '../../Repositories/UserRepository';

class LoginInteractor extends Interactor {
	#userRepository = UserRepository;

	constructor() {
		super(OkHttpPresenter);
	}

	async _execute(
		req: LoginRequest,
		httpRequest: Request
	): Promise<LoginResponse> {
		const email = new Email(req.email);

		const user = await this.#getUserDocument(email);

		await this.#checkPassword(user.password, req.password);

		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_KEY!
		);

		httpRequest.session = {
			jwt: userJwt,
		};

		return {
			email: user.email,
			id: user.id,
		};
	}

	async #getUserDocument(email: Email): Promise<UserDocument> {
		const user = await this.#userRepository.getDocumentByEmail(email);

		if (!user) {
			throw new BadRequestError(`Email: ${email.value} not found`);
		}

		return user;
	}

	async #checkPassword(stored: string, supplied: string): Promise<void> {
		if (!(await Password.compare(stored, supplied))) {
			throw new BadRequestError('Invalid credentials');
		}
	}
}

export default new LoginInteractor();
