import React from 'react'
import './style/modal.css'

const UserModal = ({ setIsOpen }) => {
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('submit')
		setIsOpen(false)
	}

	return (
		<>
			<div className='darkBG' onClick={() => setIsOpen(false)} />
			<div className='centered'>
				<div className='modal'>
					<div className='modalHeader'>
						<h5 className='heading'>User</h5>
					</div>
					<button className='closeBtn' onClick={() => setIsOpen(false)}>
						close
					</button>
					<div className='modalContent'>
						<form id='user-form' onSubmit={handleSubmit}>
							<label htmlFor='topLabel'>Username</label>
							<input
								id='topLabel'
								className='modalInput'
								placeholder='username...'
							/>
							<label htmlFor='middleLabel'>Password</label>
							<input
								id='middleLable'
								className='modalInput'
								placeholder='password...'
							/>
						</form>
					</div>
					<div className='modalActions'>
						<div className='actionsContainer'>
							<button form='user-form' className='cancelBtn'>
								Submit
							</button>
							<button className='cancelBtn' onClick={() => setIsOpen(false)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserModal
