import app from '../app';
import prefix from '../routes/prefix';
import request from 'supertest';

const price = 20;
const title = 'techspo';

function createTicket(){
	return request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send({ price, title });
};

export default createTicket;