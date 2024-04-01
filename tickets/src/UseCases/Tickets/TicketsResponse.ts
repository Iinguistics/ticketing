import Ticket from "../../types/Ticket";

type Response = {
	tickets: Ticket[];
	total: number;
};

export default Response;
