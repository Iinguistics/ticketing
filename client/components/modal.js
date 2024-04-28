function Modal({ showModal, handleToggleModal }) {
	return (
		<div
			className={`modal fade ${showModal ? 'show' : ''}`}
			tabIndex='-1'
			style={{ display: showModal ? 'block' : 'none' }}
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Modal title</h5>
						<button
							type='button'
							className='btn-close'
							onClick={handleToggleModal}
						></button>
					</div>
					<div className='modal-body'>
						{/* Add your modal content here */}
						...
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={handleToggleModal}
						>
							Close
						</button>
						<button type='button' className='btn btn-primary'>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
