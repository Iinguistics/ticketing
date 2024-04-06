import mongoose from 'mongoose';

function createObjectId(): string {
	return new mongoose.Types.ObjectId().toHexString();
}

export default createObjectId;