type Ticket = Readonly<{
	createdAt: Date;
	id: string;
	price: number;
	title: string;
	userId: string;
}>;

export default Ticket;
