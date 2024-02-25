import Password from '../helpers/password';
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
},
{
	toJSON: {
		transform(doc, ret){
			ret.id = ret._id;
			delete ret._id;
			delete ret.password;
			delete ret.__v;
		}
	}
}
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.hash(this.get('password'));
		this.set('password', hashed);
	}

	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
