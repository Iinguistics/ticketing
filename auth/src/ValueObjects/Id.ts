const mongoose = require('mongoose');

//TODO: abstract out to common module
//TODO: add script to common for publishing
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
