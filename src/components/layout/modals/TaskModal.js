import React, { useEffect, useState } from 'react'
import axios from '../../../api/axios'
import useAuth from '../../../hooks/useAuth'
import '../style/modal.css'

const conditions = ['in queue', 'in progress', 'finished']

const TaskModal = ({ setIsOpen, fetchData }) => {
	const [author, setAuthor] = useState('')
	const [users, setUser] = useState([])
	const [task, setTask] = useState('')
	const [condition, setCondition] = useState('')
	const { auth } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post(
				'/tasks/create',
				JSON.stringify({ task, condition, username: author }),
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.accessToken}`,
					},
					withCredentials: true,
				},
			)
		} catch (error) {
			console.error(error.message)
		}
		fetchData()
		setIsOpen(false)
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
	console.log(author)

	const conditionOptions = conditions.map((con, idx) => (
		<option key={idx} value={con}>
			{con}
		</option>
	))

	const handleUser = (e) => setAuthor(e.target.value)
	const handleTask = (e) => setTask(e.target.value)
	const handleCondition = (e) => setCondition(e.target.value)
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

export default TaskModal
