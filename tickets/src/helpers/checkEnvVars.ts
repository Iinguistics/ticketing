const keyList = ['JWT_KEY'];

const checkEnvVars = () => {
	keyList.forEach((key) => {
		if (!process.env[key]) {
			throw new Error(`${key} must be defined`);
		}
	});

	console.log('Env variables checked');
};

export default checkEnvVars