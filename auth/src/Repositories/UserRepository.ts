import { User } from '../models/user';
import { UserDocument } from '../models/UserDocument';
import Email from '../ValueObjects/Email';
import UserFactory from '../Factories/UserFactory';

class UserRepository {
	#userFactory;

	constructor() {
		this.#userFactory = UserFactory;
	}

	async getByEmail(email: Email) {
		const document = await User.findOne({
			active: { $eq: true },
			email: { $eq: email.value },
			deleted_at: { $eq: null },
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
}

export default new UserRepository();