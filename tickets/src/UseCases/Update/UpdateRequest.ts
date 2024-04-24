type Request = Readonly<{
	address: {
		city: string;
		postalCode: string;
		state: string;
		streetAddress: string;
	};
	date: string;
	description: string | null;
	id: string;
	price: number;
	title: string;
	userId: string;
}>;

export default Request;
