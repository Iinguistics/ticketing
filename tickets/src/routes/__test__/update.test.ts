import app from '../../app';
import createObjectId from '../../test/createObjectId';
import createTicket from '../../test/createTicket';
import prefix from '../prefix';
import request from 'supertest';

const price = 20;
const title = 'techspo';

it('returns a 401 if the user is not authenticated', async () => {
	return request(app)
		.put(`${prefix}/tickets/${createObjectId()}`)
		.send({ price, title })
		.expect(401);
});

it('returns a 404 if ticket is not found', async () => {
	return request(app)
		.put(`${prefix}/tickets/${createObjectId()}`)
		.set('Cookie', global.login())
		.send({ price, title })
		.expect(404);
});

it('returns a 401 if the user does not own the ticket', async () => {
	const response = await createTicket();

	return request(app)
		.put(`${prefix}/tickets/${response.body.id}`)
		.set('Cookie', global.login())
		.send({ price, title })
		.expect(401);
});

it('returns a 400 if invalid title or price', async () => {
	const cookie = global.login();
	const response = await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', cookie)
		.send({ price, title });

	await request(app)
		.put(`${prefix}/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ price, title: '' })
		.expect(400);

	return request(app)
		.put(`${prefix}/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ price: '', title })
		.expect(400);
});

it('updates the ticket when provided valid inputs', async () => {
	const cookie = global.login();
	const response = await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', cookie)
		.send({ price, title });

	const ticketId = response.body.id;

	await request(app)
		.put(`${prefix}/tickets/${ticketId}`)
		.set('Cookie', cookie)
		.send({ price: 30, title: 'new title' })
		.expect(200);

	const ticketResponse = await request(app)
		.get(`${prefix}/tickets/${ticketId}`)
		.send();

	expect(ticketResponse.body.price).toEqual(30);
	expect(ticketResponse.body.title).toEqual('new title');
});
