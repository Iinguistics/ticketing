import app from '../../app';
import prefix from '../prefix';
import request from 'supertest';

const price = 20;
const title = 'techspo';

const createTicket = async () => {
	return request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price, title });
};

it('can fetch a list of tickets', async () => {
	await createTicket();
	await createTicket();

	const response = await request(app).get(`${prefix}/tickets`).expect(200);

	expect(response.body.length).toEqual(2);
});
