import request from 'supertest';
import app from '../../app';
import prefix from '../prefix';

it('returns a 201 on success', async () => {
	return request(app)
		.post(`${prefix}/users/register`)
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);
});

it('returns a 400 with an invalid email', async () => {
	return request(app)
		.post(`${prefix}/users/register`)
		.send({
			email: 'test',
			password: 'password',
		})
		.expect(400);
});

it('returns a 400 with an invalid password', async () => {
	return request(app)
		.post(`${prefix}/users/register`)
		.send({
			email: 'test@test.com',
			password: 'pass',
		})
		.expect(400);
});

it('returns a 400 with no email & password', async () => {
	return request(app).post(`${prefix}/users/register`).send({}).expect(400);
});

it('returns a 400 with duplicate emails', async () => {
	await request(app)
		.post(`${prefix}/users/register`)
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);

	await request(app)
		.post(`${prefix}/users/register`)
		.send({ email: 'test@test.com', password: 'password' })
		.expect(400);
});

it('sets a cookie after successful register', async () => {
	const response = await request(app)
		.post(`${prefix}/users/register`)
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});
