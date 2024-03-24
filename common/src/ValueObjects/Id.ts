import mongoose from 'mongoose';

class Id {
	value;
	constructor(value: string) {
		this.value = value;
		Object.freeze(this);
	}

	equals(other: Id) {
		return this.value === other.value;
	}

	toObjectId() {
		return new mongoose.Types.ObjectId(this.value)
	}
}

export default Id;
