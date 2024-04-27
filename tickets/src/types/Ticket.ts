export type Address = {
	city: string;
	postalCode: string;
	state: string;
	streetAddress: string;
};

type Ticket = Readonly<{
	address: Address;
	createdAt: Date;
	date: Date;
	description: string | null;
	id: string;
	orderId?: string;
	price: number;
	title: string;
	userId: string;
}>;

export default Ticket;
