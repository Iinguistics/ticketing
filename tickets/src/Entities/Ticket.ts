import Properties from './Properties';

class Ticket {
	#address;
	#createdAt;
	#date;
	#deletedAt;
	#description;
	#id;
	#orderId;
	#price;
	#title;
	#userId;
	#version;

	constructor(properties: Properties) {
		this.#address = properties.address;
		this.#createdAt = properties.createdAt;
		this.#date = properties.date;
		this.#deletedAt = properties.deletedAt ?? null;
		this.#description = properties.description ?? null;
		this.#id = properties.id;
		this.#orderId = properties.orderId;
		this.#price = properties.price;
		this.#title = properties.title;
		this.#userId = properties.userId;
		this.#version = properties.version;
	}

	get address() {
		return this.#address;
	}

	set address(value) {
		this.#address = value;
	}

	get date() {
		return this.#date;
	}

	set date(value) {
		this.#date = value;
	}

	get description() {
		return this.#description;
	}

	set description(value) {
		this.#description = value;
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

	get orderId() {
		return this.#orderId;
	}

	set orderId(value) {
		this.#orderId = value;
	}

	get version() {
		return this.#version;
	}

	incrementVersion() {
		this.#version += 1;
	}
}

export default Ticket;
