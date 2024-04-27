const table = ({ title, headers, body, striped }) => {
	const headerList = headers.map((header, idx) => (
		<th key={`${idx}`}>{header}</th>
	));

	return (
		<div>
			<h1>{title}</h1>
			<table className={`table ${striped ? 'table-striped' : ''}`}>
				<thead>
					<tr>{headerList}</tr>
				</thead>
				<tbody>{body}</tbody>
			</table>
		</div>
	);
};

export default table;
