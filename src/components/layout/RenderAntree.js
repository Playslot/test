import React from 'react'

const RenderAntree = ({ tasks }) => {
	return (
		<div className='card'>
			{tasks.map((task, idx) => (
				<article key={task._id}>
					<div className='text-wrapper'>
						<p>{idx + 1}</p>
						<p>{task.task}</p>
						<p>{task.condition}</p>
						<p>{task.assigned_to.username}</p>
					</div>
				</article>
			))}
		</div>
	)
}

export default RenderAntree
