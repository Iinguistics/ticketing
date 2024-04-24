type Properties = Readonly<{
	city: string;
	postalCode: string;
	state: string;
	streetAddress: string;
}>;

class Address {
	city;
	postalCode;
	state;
	streetAddress;
	constructor(properties: Properties) {
		this.city = properties.city;
		this.streetAddress = properties.streetAddress;
		this.state = properties.state;
		this.postalCode = properties.postalCode;
		Object.freeze(this);
	}

	toString() {
		return `${this.streetAddress}, ${this.city}, ${this.state} ${this.postalCode}`;
	}
}

export default Address;
