const RenderTask = ({ tasks }) => {
	const handleUpdate = async (id) => {
		console.log(id)
	}
	const handleDelete = async (id) => {
		console.log(id)
	}
	return (
		<div className='card'>
			{tasks.map((task) => (
				<article key={task._id}>
					<div className='text-wrapper'>
						<p>{task.task}</p>
						<p>{task.condition}</p>
						<p>{task.assigned_to.username}</p>
					</div>
					<button className='card-btn' onClick={() => handleUpdate(task._id)}>
						update
					</button>
					<button className='card-btn' onClick={() => handleDelete(task._id)}>
						delete
					</button>
				</article>
			))}
		</div>
	)
}

export default RenderTask
