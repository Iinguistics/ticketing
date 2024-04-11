import Properties from './Properties';

class Ticket {
	#createdAt;
	#deletedAt;
	#id;
	#price;
	#title;
	#userId;
	#version;

	constructor(properties: Properties) {
		this.#createdAt = properties.createdAt;
		this.#deletedAt = properties.deletedAt ?? null;
		this.#id = properties.id;
		this.#price = properties.price;
		this.#title = properties.title;
		this.#userId = properties.userId;
		this.#version = properties.version;
	}

	get id() {
		return this.#id;
	}

	get price() {
		return this.#price;
	}

	set price(value) {
		this.#price = value;
	}

	get title() {
		return this.#title;
	}

	set title(value) {
		this.#title = value;
	}

	get createdAt() {
		return this.#createdAt;
	}

	get deletedAt() {
		return this.#deletedAt;
	}

	get userId() {
		return this.#userId;
	}

	get version() {
		return this.#version;
	}

	incrementVersion() {
		this.#version += 1;
	}
}

export default Ticket;
