import { json } from 'body-parser';
import express from 'express';
import routes from './routes';

const app = express();

app.use(json());

routes.forEach((route) =>{
	app.use(route);
})

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
