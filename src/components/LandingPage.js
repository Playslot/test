import { useState, useCallback, useEffect } from 'react'
import axios from '../api/axios'
import RenderTask from './layout/RenderTask'

const TASK_URL = '/tasks'

const LandingPage = () => {
	const [tasks, setTasks] = useState([])
	const [page, setPage] = useState(1)

	const getData = useCallback(async () => {
		const result = await axios(TASK_URL + `?page=${page}&limit=5`)
		setTasks(result.data.results)
	}, [])

	useEffect(() => {
		getData()
	}, [page])

	console.log('test')
	return (
		<div>
			<RenderTask tasks={tasks} />
			<button
				type='button'
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				prev
			</button>
			<button type='button'>next</button>
		</div>
	)
}

export default LandingPage
