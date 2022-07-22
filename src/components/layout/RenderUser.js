import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

const RenderUser = ({ users, fetchData, setData, setIsUpdate }) => {
	const { auth } = useAuth()

	const handleUpdate = (user) => {
		setData(user)
		setIsUpdate(true)
	}

	// delete user
	const handleDelete = async (username) => {
		try {
			await axios.delete(`/users/${username}`, {
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
			{users.map(({ _id, username }) => (
				<article key={_id}>
					<div className='text-wrapper'>
						<p>{username}</p>
					</div>
					<button className='card-btn' onClick={() => handleUpdate(username)}>
						update
					</button>
					<button className='card-btn' onClick={() => handleDelete(username)}>
						delete
					</button>
				</article>
			))}
		</div>
	)
}

export default RenderUser
