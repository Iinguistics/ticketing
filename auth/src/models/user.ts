import { UserDocument } from './UserDocument';
import mongoose from 'mongoose';

// Properties that are required to create a new user
interface UserAttrs {
	email: string;
	password: string;
}

// Properties that a User Model has
interface UserModel extends mongoose.Model<UserDocument> {
	build(attrs: UserAttrs): UserDocument;
}

const userSchema = new mongoose.Schema({
	active: { default: true, type: Boolean },
	created_at: { default: Date.now, type: Date },
	deleted_at: { default: null, type: Date },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	last_logged_in_at: { default: null, index: true, type: Date },
	modified_at: { default: Date.now, type: Date },
	password: {
		type: String,
		required: true,
	},
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
