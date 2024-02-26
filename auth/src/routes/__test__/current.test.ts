import { email } from '../../test/getCookie';
import app from '../../app';
import getCookie from '../../test/getCookie';
import prefix from '../prefix';
import request from 'supertest';

it('responds with details about the current user', async () => {
	const response = await request(app)
		.get(`${prefix}/users/current`)
		.set('Cookie', await getCookie())
		.send()
		.expect(200);

	expect(response.body.currentUser.email).toEqual(email);
});

it('responds with the current user set to null', async () => {
	const response = await request(app)
		.get(`${prefix}/users/current`)
		.send()
		.expect(200);

	expect(response.body.currentUser).toEqual(null);
});
