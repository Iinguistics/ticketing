import Properties from './Properties';

class Order {
	#id;
	#price;
	#status;
	#userId;
	#version;

	constructor(properties: Properties) {
		this.#id = properties.id;
		this.#price = properties.price;
		this.#status = properties.status;
		this.#userId = properties.userId;
		this.#version = properties.version;
	}

	get id() {
		return this.#id;
	}

	get price() {
		return this.#price;
	}

	get status() {
		return this.#status;
	}

	get userId() {
		return this.#userId;
	}

	get version() {
		return this.#version;
	}
}

export default Order;
