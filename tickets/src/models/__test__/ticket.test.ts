import { Ticket } from "../ticket";
import buildTicket from "../../test/buildTicket";

it('implements optimistic concurrency control', async () => {
	const ticket = await buildTicket();

	const firstInstance = await Ticket.findById(ticket.id);
	const secondInstance = await Ticket.findById(ticket.id);

	firstInstance!.set({ price: 10 });
	secondInstance!.set({ price: 15 });

	await firstInstance!.save();

	try {
		await secondInstance!.save();
	} catch (error) {
		return;
	}

	throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
	const ticket = await buildTicket();

	expect(ticket.version).toEqual(0);
	await ticket.save();
	expect(ticket.version).toEqual(1);

	const firstInstance = await Ticket.findById(ticket.id);
	firstInstance!.set({ price: 10 });
	await firstInstance!.save();
	expect(firstInstance!.version).toEqual(2);

	const secondInstance = await Ticket.findById(ticket.id);
	secondInstance!.set({ price: 15 });
	await secondInstance!.save();
	expect(secondInstance!.version).toEqual(3);
	await secondInstance!.save();
	expect(secondInstance!.version).toEqual(4);
});
