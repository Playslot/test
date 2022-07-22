import React, { useState } from 'react'
import axios from '../../../api/axios'
import useAuth from '../../../hooks/useAuth'
import '../style/modal.css'

const UserModal = ({ setIsOpen, fetchData }) => {
	const [user, setUser] = useState('')
	const [pwd, setPwd] = useState('')
	const { auth } = useAuth()
	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await axios.post(
				'/users/create',
				JSON.stringify({ username: user, password: pwd }),
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.accessToken}`,
					},
					withCredentials: true,
				},
			)
		} catch (error) {
			console.error(error)
		}

		fetchData()
		setIsOpen(false)
	}

	const handleUser = (e) => setUser(e.target.value)
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
							<input
								id='topLabel'
								className='modalInput'
								placeholder='username...'
								value={user}
								onChange={handleUser}
							/>
							<label htmlFor='middleLabel'>Password</label>
							<input
								id='middleLable'
								type='password'
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

export default UserModal
