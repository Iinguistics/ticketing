import request from 'supertest';
import app from '../../app';
import prefix from '../prefix';

it('clears the cookie after logging out', async () => {
	await request(app)
		.post(`${prefix}/users/register`)
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(200);

	const response = await request(app)
		.post(`${prefix}/users/logout`)
		.send({})
		.expect(200);

	expect(response.get('Set-Cookie')[0]).toEqual(
		'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
	);
});
