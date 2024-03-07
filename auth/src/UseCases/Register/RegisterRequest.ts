import { Request } from "express";

type RegisterRequest = {
	readonly email: string;
	readonly password: string;
	session: Request['session'];
};

export default RegisterRequest;
