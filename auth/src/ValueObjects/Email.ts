class Email {
	value;
	constructor(value: string) {
		this.value = value.toLowerCase();
		Object.freeze(this);
	}
}

export default Email;