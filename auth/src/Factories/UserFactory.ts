import { Id } from '@jmsgoytia-ticketing/common'
import { UserDocument } from '../models/UserDocument';
import Email from '../ValueObjects/Email';
import User from '../Entities/User';

class UserFactory {
	reconstitute(document: UserDocument) {
		return new User({
			active: document.active,
			createdAt: document.created_at,
			deletedAt: document.deleted_at,
			email: new Email(document.email),
			id: new Id(document.id),
			lastLoggedInAt: document.last_logged_in_at,
		});
	}
}

export default new UserFactory();
