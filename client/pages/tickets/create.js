import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import urls from '../../api/urls';

const create = ({ currentUser }) => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const { doRequest, errors } = useRequest({
		url: urls.ticketSrv.create,
		method: 'post',
		body: {
			price,
			title,
		},
		onSuccess: () => Router.push('/'),
	});

	if (!currentUser) {
		Router.push('/auth/login');
	}

	const onBlur = () => {
		const value = parseFloat(price);

		if (isNaN(value)) {
			return;
		}

		setPrice(value.toFixed(2));
	};

	const handleOnSubmit = (event) => {
		event.preventDefault();

		doRequest();
	};

	return (
		<>
			<h1>Create a Ticket</h1>
			<form onSubmit={handleOnSubmit}>
				<div className='mb-3'>
					<label htmlFor='title' className='form-label'>
						Title
					</label>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='form-control'
						id='title'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='price' className='form-label'>
						Price
					</label>
					<input
						value={price}
						onBlur={onBlur}
						onChange={(e) => setPrice(e.target.value)}
						className='form-control'
						id='price'
					/>
				</div>
				{errors}
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</>
	);
};

export default create;
