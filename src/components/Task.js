import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import TaskModal from './layout/TaskModal'
import RenderTask from './layout/RenderTask'

const TASK_URL = '/tasks'

const Task = () => {
	const [tasks, setTasks] = useState([])
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [next, setNext] = useState({})
	const [isOpen, setIsOpen] = useState(false)
	const handleSearch = (e) => setSearch(e.target.value)

	useEffect(() => {
		async function fetchData() {
			const result = await axios(
				TASK_URL + `?page=${page}&limit=6&task=${search}`,
			)
			setTasks(result.data.results)
			setNext(result.data.next)
		}

		fetchData()
	}, [page, search])

	return (
		<section>
			<input
				className='search-input'
				placeholder='Search..'
				value={search}
				onChange={handleSearch}
			/>
			<button onClick={() => setIsOpen(true)}>add</button>
			{isOpen && <TaskModal setIsOpen={setIsOpen} />}
			<RenderTask tasks={tasks} />
			<button
				className='prev-btn'
				type='button'
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				prev
			</button>
			<button
				className='next-btn'
				type='button'
				onClick={() => setPage(page + 1)}
				disabled={!next}
			>
				next
			</button>
			<span className='btm-link'>
				<Link to='/Menu'>Main Menu</Link>
			</span>
		</section>
	)
}

export default Task
