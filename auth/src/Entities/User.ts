import Email from "../ValueObjects/Email";
import Id from "../ValueObjects/Id";

type Properties = {
	active: boolean;
	createdAt: Date;
	deletedAt: Date | null;
	email: Email;
	id: Id;
	lastLoggedInAt: Date | null;
};

class User {
	#active;
	#createdAt;
	#deletedAt;
	#email;
	#id;
	#lastLoggedInAt;

	constructor(properties: Properties) {
		this.#active = properties.active;
		this.#createdAt = properties.createdAt;
		this.#deletedAt = properties.deletedAt ?? null;
		this.#email = properties.email;
		this.#id = properties.id;
		this.#lastLoggedInAt = properties.lastLoggedInAt ?? null;
	}

	get id() {
		return this.#id;
	}

	get active() {
		return this.#active;
	}

	set active(value) {
		this.#active = value;
	}

	get email() {
		return this.#email;
	}

	set email(value) {
		this.#email = value;
	}

	get createdAt() {
		return this.#createdAt;
	}

	get deletedAt() {
		return this.#deletedAt;
	}

	set deletedAt(value) {
		this.#deletedAt = value;
	}

	get lastLoggedInAt() {
		return this.#lastLoggedInAt;
	}

	set lastLoggedInAt(value) {
		this.#lastLoggedInAt = value;
	}
}

export default User;
