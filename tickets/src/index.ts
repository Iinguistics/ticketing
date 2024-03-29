import app  from './app';
import checkEnvVars from './helpers/checkEnvVars';
import mongoose from 'mongoose';

const start = async () => {
	checkEnvVars();

	try {
		await mongoose.connect(process.env.MONGO_URI!);

		console.log('Connected to mongodb');
	} catch (error) {
		console.error(error);
	}

	app.listen(3000, () => {
		console.log('Listening on port 3000');
	});
};

start();
