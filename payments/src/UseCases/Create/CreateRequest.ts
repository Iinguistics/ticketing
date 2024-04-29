type Request = Readonly<{
	orderId: string;
	token: string;
	userEmail: string;
	userId: string;
}>;

export default Request;
