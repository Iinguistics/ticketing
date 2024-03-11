import app from '../app';
import prefix from '../../src/routes/prefix';
import request from 'supertest';

export const email = 'test@test.com';

const getCookie = async () => {
	const registerResponse = await request(app)
		.post(`${prefix}/users/register`)
		.send({
			email,
			password: 'password',
		})

	return registerResponse.get('Set-Cookie');
}

export default getCookie;