import Properties from './Properties';

class Ticket {
	#id;
	#price;
	#title;
	#version;

	constructor(properties: Properties) {
		this.#id = properties.id;
		this.#price = properties.price;
		this.#title = properties.title;
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

	get version() {
		return this.#version;
	}

	set version(value){
		this.#version = value;
	}
}

export default Ticket;
