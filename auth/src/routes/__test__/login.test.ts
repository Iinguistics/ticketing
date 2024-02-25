import request from 'supertest';
import app from '../../app';
import prefix from '../prefix';

it('returns a 400 with non existing email', async () => {
	await request(app)
		.post(`${prefix}/users/login`)
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400);
});

it('returns a 400 with non matching password', async () => {
	await request(app)
		.post(`${prefix}/users/register`)
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	await request(app)
		.post(`${prefix}/users/login`)
		.send({
			email: 'test@test.com',
			password: 'passwordd',
		})
		.expect(400);
});

it('returns a 200 on successful login and sets cookie in header', async () => {
	await request(app)
		.post(`${prefix}/users/register`)
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	const response = await request(app)
		.post(`${prefix}/users/login`)
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(200);

	expect(response.get('Set-Cookie')).toBeDefined();
});
