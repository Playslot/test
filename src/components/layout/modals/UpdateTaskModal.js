import React, { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import axios from '../../../api/axios'
import '../style/modal.css'

const conditions = ['in queue', 'in progress', 'finished']

const UpdateTaskModal = ({ setIsOpen, data, fetchData }) => {
	const [author, setAuthor] = useState(data.user)
	const [users, setUser] = useState([])
	const [task, setTask] = useState(data.task)
	const [condition, setCondition] = useState(data.cond)
	const { auth } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.patch(
				'/tasks/update',
				JSON.stringify({ id: data.id, task, condition, assigned_to: author }),
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
		fetchData()
	}

	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const getUser = async () => {
			const result = await axios('/users', {
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
			})

			isMounted && setUser(result.data)
		}
		getUser()
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [auth.accessToken])

	const userOptions = users.map((user, idx) => (
		<option key={idx} value={user.username}>
			{user.username}
		</option>
	))

	const conditionOptions = conditions.map((con, idx) => (
		<option key={idx} value={con}>
			{con}
		</option>
	))
	const handleTask = (e) => setTask(e.target.value)
	const handleCondition = (e) => setCondition(e.target.value)
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
								value={task}
								onChange={handleTask}
								required
							/>
							<label htmlFor='middleLabel'>Condition</label>
							<select
								id='middleLabel'
								className='modalInput'
								value={condition}
								onChange={handleCondition}
								required
							>
								<option>select condtions</option>
								{conditionOptions}
							</select>
							<label htmlFor='selectLabel'>User</label>
							<select
								id='selectLabel'
								className='modalInput'
								value={author}
								onChange={handleUser}
								required
							>
								<option>select user</option>
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

export default UpdateTaskModal
