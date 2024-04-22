import Properties from './Properties';

class Order {
	#createdAt;
	#expiresAt;
	#id;
	#status;
	#stripeId;
	#ticket;
	#userId;
	#version;

	constructor(properties: Properties) {
		this.#createdAt = properties.createdAt;
		this.#expiresAt = properties.expiresAt;
		this.#id = properties.id;
		this.#status = properties.status;
		this.#stripeId = properties.stripeId;
		this.#ticket = properties.ticket;
		this.#userId = properties.userId;
		this.#version = properties.version;
	}

	get id() {
		return this.#id;
	}

	get expiresAt() {
		return this.#expiresAt;
	}

	get status() {
		return this.#status;
	}

	set status(value) {
		this.#status = value;
	}

	get stripeId() {
		return this.#stripeId;
	}

	set stripeId(value) {
		this.#stripeId = value;
	}

	get ticket() {
		return this.#ticket;
	}

	get userId() {
		return this.#userId;
	}

	get createdAt() {
		return this.#createdAt;
	}

	get version() {
		return this.#version;
	}

	incrementVersion() {
		this.#version += 1;
	}
}

export default Order;
