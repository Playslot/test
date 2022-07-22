import React, { useState } from 'react'
import axios from '../../../api/axios'
import useAuth from '../../../hooks/useAuth'
import '../style/modal.css'

const UpdateUserModal = ({ data, setIsOpen }) => {
	const [pwd, setPwd] = useState('')
	const { auth } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.patch(
				'/users/update',
				JSON.stringify({ username: data, password: pwd }),
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.accessToken}`,
					},
					withCredentials: true,
				},
			)
		} catch (error) {
			console.log(error)
		}

		setIsOpen(false)
	}

	const handlePwd = (e) => setPwd(e.target.value)

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
							<p id='topLabel'>{data}</p>
							<label htmlFor='middleLabel'>Password</label>
							<input
								id='middleLable'
								type='text'
								className='modalInput'
								placeholder='password...'
								value={pwd}
								onChange={handlePwd}
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

export default UpdateUserModal
