import app from '../../app';
import createTicket from '../../test/createTicket';
import prefix from '../prefix';
import request from 'supertest';

it('can fetch a list of tickets', async () => {
	await createTicket();
	await createTicket();

	const response = await request(app).get(`${prefix}/tickets`).expect(200);

	expect(response.body.tickets.length).toEqual(2);
	expect(response.body.total).toEqual(2);
});
