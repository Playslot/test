import React, { useState } from 'react'
import './style/modal.css'

const users = [
	{
		id: 1,
		username: 'lotus',
	},
	{ id: 2, username: 'moon' },
	{ id: 3, username: 'martin' },
]

const TaskModal = ({ setIsOpen }) => {
	const [author, setAuthor] = useState('')
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('submit')
		setIsOpen(false)
	}
	const userOptions = users.map((user, idx) => (
		<option key={idx} value={user.id}>
			{user.username}
		</option>
	))
	const handleUser = (e) => setAuthor(e.target.value)

	return (
		<>
			<div className='darkBG' onClick={() => setIsOpen(false)} />
			<div className='centered'>
				<div className='modal'>
					<div className='modalHeader'>
						<h5 className='heading'>Task</h5>
					</div>
					<button className='closeBtn' onClick={() => setIsOpen(false)}>
						close
					</button>
					<div className='modalContent'>
						<form id='task-form' onSubmit={handleSubmit}>
							<label htmlFor='topLabel'>Task</label>
							<input
								id='topLabel'
								className='modalInput'
								placeholder='task...'
							/>
							<label htmlFor='middleLabel'>Condition</label>
							<input
								id='middleLable'
								className='modalInput'
								placeholder='condition...'
							/>
							<label htmlFor='selectLabel'>User</label>
							<select
								className='modalInput'
								value={author}
								onChange={handleUser}
							>
								{userOptions}
							</select>
						</form>
					</div>
					<div className='modalActions'>
						<div className='actionsContainer'>
							<button form='task-form' className='cancelBtn'>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default TaskModal
