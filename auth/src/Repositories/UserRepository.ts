import { User } from '../models/user';
import { UserDocument } from '../models/UserDocument';
import UserFactory from '../Factories/UserFactory';

class UserRepository {
	#userFactory;

	constructor() {
		this.#userFactory = UserFactory;
	}

	async getByEmail(email: string) {
		const document = await User.findOne({
			active: { $eq: true },
			email: { $eq: email },
			deleted_at: { $eq: null },
		});

		if (!document) {
			return null;
		}

		return this.#asEntity(document);
	}

	#asEntity(document: UserDocument) {
		return this.#userFactory.reconstitute(document);
	}
}

export default new UserRepository();