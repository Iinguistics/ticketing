function TicketModal({
	showModal,
	handleToggleModal,
	ticket,
	callback,
	callbackErrors,
}) {
	return (
		<div
			className={`modal fade ${showModal ? 'show' : ''}`}
			tabIndex='-1'
			style={{ display: showModal ? 'block' : 'none' }}
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{ticket.title}</h5>
						<button
							type='button'
							className='btn-close'
							onClick={handleToggleModal}
						></button>
					</div>
					<div className='modal-body'>
						<h6 className='text-muted'>${ticket.price}</h6>
						<p>Event on: {ticket.date}</p>
						<p>{ticket.address}</p>
						{ticket.description
							? ticket.description
							: 'No description provided'}
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={handleToggleModal}
						>
							Close
						</button>
						<button
							type='button'
							className='btn btn-primary'
							onClick={() => callback({ ticket_id: ticket.id })}
						>
							Reserve
						</button>
					</div>
					{callbackErrors ? callbackErrors : null}
				</div>
			</div>
		</div>
	);
}

export default TicketModal;
