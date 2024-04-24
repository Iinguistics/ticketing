import Link from 'next/link';

const NoContent = ({ header, title, text, href, linkText }) => {
	return (
		<div className='card'>
			<h5 className='card-header'>{header}</h5>
			<div className='card-body'>
				<h5 className='card-title'>{title}</h5>
				<p className='card-text'>{text}</p>
				{href ? (
					<Link className='btn btn-primary' href={href}>
						{linkText}
					</Link>
				) : null}
			</div>
		</div>
	);
};

export default NoContent;
