const keyList = [
	'JWT_KEY',
	'MONGO_URI',
	'NATS_CLIENT_ID',
	'NATS_CLUSTER_ID',
	'NATS_URL',
];

const checkEnvVars = () => {
	keyList.forEach((key) => {
		if (!process.env[key]) {
			throw new Error(`${key} must be defined`);
		}
	});

	console.log('Env variables checked');
};

export default checkEnvVars;
