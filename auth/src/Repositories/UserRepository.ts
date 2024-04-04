import { Repository } from '@jmsgoytia-ticketing/common';
import { User } from '../models/user';
import { UserDocument } from '../models/UserDocument';
import Email from '../ValueObjects/Email';
import UserFactory from '../Factories/UserFactory';

class UserRepository extends Repository {
	#userFactory;

	constructor() {
		super();
		this.#userFactory = UserFactory;
	}

	async getByEmail(email: Email) {
		const document = await User.findOne({
			...UserRepository._scope('activeNotDeleted'),
			email: { $eq: email.value },
		});

		if (!document) {
			return null;
		}

		return this.#asEntity(document);
	}

	async create(email: Email, password: string) {
		const user = User.build({ email: email.value, password });

		await user.save();

		return this.#asEntity(user);
	}

	#asEntity(document: UserDocument) {
		return this.#userFactory.reconstitute(document);
	}

	async getDocumentByEmail(email: Email) {
		const document = await User.findOne({
			...UserRepository._scope('activeNotDeleted'),
			email: { $eq: email.value },
		});

		if (!document) {
			return null;
		}

		return document;
	}
}

export default new UserRepository();
