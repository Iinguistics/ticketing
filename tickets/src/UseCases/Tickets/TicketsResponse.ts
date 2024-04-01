export type Ticket = Readonly<{
	createdAt: Date;
	id: string;
	price: number;
	title: string;
	userId: string;
}>;

type Response = {
	tickets: Ticket[];
	total: number;
};

export default Response;
