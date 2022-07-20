import React from 'react'

const RenderUser = ({ users }) => {
	const handleUpdate = async (id) => {
		console.log(id)
	}
	// delete user
	const handleDelete = async (id) => {
		console.log(id)
	}

	return (
		<div className='card'>
			{users.map((user) => (
				<article key={user._id}>
					<div className='text-wrapper'>
						<p>{user.username}</p>
						<p>{user.tasks}</p>
					</div>
					<button className='card-btn' onClick={() => handleUpdate(user._id)}>
						update
					</button>
					<button className='card-btn' onClick={() => handleDelete(user._id)}>
						delete
					</button>
				</article>
			))}
		</div>
	)
}

export default RenderUser
