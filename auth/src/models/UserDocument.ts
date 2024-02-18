import mongoose from 'mongoose';

// Properties that a User doc has
export interface UserDocument extends mongoose.Document {
	active: boolean;
	created_at: Date;
	deleted_at: Date | null;
	email: string;
	last_logged_in_at: Date | null;
	modified_at: Date;
	password: string;
}
