import Link from 'next/link';

const Card = ({ title, subtitle, text, href, linkText }) => {
	return (
		<div className='card' style='width: 18rem;'>
			<div className='card-body'>
				<h5 className='card-title'>{title}</h5>
				{subtitle ? (
					<h6 className='card-subtitle mb-2 text-muted'>{subtitle}</h6>
				) : null}
				<p className='card-text'>{text}</p>
				{href ? (
					<Link className='card-link' href={href}>
						{linkText}
					</Link>
				) : null}
			</div>
		</div>
	);
};

export default Card;
