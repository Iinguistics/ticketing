import { createObjectId } from '@jmsgoytia-ticketing/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import STRIPE_KEY from './stripe-key';

declare global {
  var login: (persistUser?: boolean) => string[];
}

let mongo: any;

jest.mock('../NatsWrapper');

process.env.STRIPE_KEY = STRIPE_KEY;

export const userId = createObjectId();

beforeAll(async () => {
  process.env.JWT_KEY = 'abc';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
}, 10000);

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.login = (persistUser: boolean | undefined = false) => {
  const payload = {
		id: persistUser ? userId : createObjectId(),
		email: 'test@test.com',
	};

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
