import app from '../../app';
import prefix from '../prefix';
import request from 'supertest';

it('can only be accessed if the user is logged in', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.send({ price: 20, title: 'Event' })
		.expect(401);
});

it('returns a 400 if an invalid price is provided', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price: -2, title: 'Event' })
		.expect(400);
});

it('returns a 400 if an invalid title is provided', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price: 20, title: '' })
		.expect(400);
});

it('creates a ticket with valid inputs', async () => {
	await request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price: 20, title: 'Event' })
		.expect(200);
});
