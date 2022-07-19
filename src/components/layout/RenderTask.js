import React from 'react'

const RenderTask = ({ tasks, ...props }) => {
	return (
		<section>
			{tasks.map((task) => (
				<article key={task._id}>
					<p>{task.task}</p>
					<p>{task.condition}</p>
					<p>{task.assigned_to.username}</p>
				</article>
			))}
		</section>
	)
}

export default RenderTask
