import Link from 'next/link';

const card = ({
	title,
	price,
	subtitle,
	address,
	text,
	postedData,
	buttonText,
	callback,
}) => {
	return (
		<div className='card' style={{ width: '18rem' }}>
			<div className='card-body'>
				<h5 className='card-title'>{title}</h5>
				{price ? (
					<h6 className='card-subtitle mb-2 text-muted'>${price}</h6>
				) : null}
				{subtitle ? (
					<h6 className='card-subtitle mb-2 text-muted'>{subtitle}</h6>
				) : null}
				<p className='card-text'>{address}</p>
				<p className='card-text'>{text ?? 'No description provided'}</p>
				{buttonText ? (
					<button className='btn btn-primary' onClick={() => callback()}>
						{buttonText}
					</button>
				) : null}
			</div>
		</div>
	);
};

export default card;
