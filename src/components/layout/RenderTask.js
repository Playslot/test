import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

const RenderTask = ({ tasks, fetchData, setData, setIsUpdate }) => {
	const { auth } = useAuth()
	const handleUpdate = (id, task, cond, user) => {
		setData({ id, task, cond, user })
		setIsUpdate(true)
	}

	const handleDelete = async (id) => {
		try {
			await axios.delete(`/tasks/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
				withCredentials: true,
			})
		} catch (error) {
			console.error(error)
		}

		fetchData()
	}
	return (
		<div className='card'>
			{tasks.map(({ _id, task, condition, assigned_to }) => (
				<article key={_id}>
					<div className='text-wrapper'>
						<p>{task}</p>
						<p>{condition}</p>
						<p>{assigned_to.username}</p>
					</div>
					<button
						className='card-btn'
						onClick={() =>
							handleUpdate(_id, task, condition, assigned_to.username)
						}
					>
						update
					</button>
					<button className='card-btn' onClick={() => handleDelete(_id)}>
						delete
					</button>
				</article>
			))}
		</div>
	)
}

export default RenderTask
