import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'us-east-2',
});

const sqs = new AWS.SQS({ apiVersion: '2012-10-17' });

export { sqs };
