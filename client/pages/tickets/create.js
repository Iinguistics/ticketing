import { useState } from 'react';
import { states } from '@jmsgoytia-ticketing/common';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import urls from '../../api/urls';

const create = ({ currentUser }) => {
	const [city, setCity] = useState('');
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [price, setPrice] = useState('');
	const [state, setState] = useState('');
	const [streetAddress, setStreetAddress] = useState('');
	const [title, setTitle] = useState('');

	const { doRequest, errors } = useRequest({
		url: urls.ticketSrv.create,
		method: 'post',
		body: {
			city,
			date,
			description,
			postal_code: postalCode,
			price,
			state,
			street_address: streetAddress,
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
				<div className='mb-3'>
					<label htmlFor='description' className='form-label'>
						Description
						<span className='small'> (optional)</span>
					</label>
					<input
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='form-control'
						id='description'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='date' className='form-label'>
						Date
					</label>
					<input
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className='form-control'
						id='date'
						type='date'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='streetAddress' className='form-label'>
						Street Address
					</label>
					<input
						value={streetAddress}
						onChange={(e) => setStreetAddress(e.target.value)}
						className='form-control'
						id='streetAddress'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='city' className='form-label'>
						City
					</label>
					<input
						value={city}
						onChange={(e) => setCity(e.target.value)}
						className='form-control'
						id='city'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='postalCode' className='form-label'>
						Postal Code
					</label>
					<input
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						className='form-control'
						id='postalCode'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='state' className='form-label'>
						State
					</label>
					<select
						className='form-select'
						onChange={(e) => setState(e.target.value)}
					>
						{states.map((el) => (
							<option id='state' key={el} value={el}>
								{el}
							</option>
						))}
					</select>
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
