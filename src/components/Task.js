import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import TaskModal from './layout/modals/TaskModal'
import RenderTask from './layout/RenderTask'
import useAuth from '../hooks/useAuth'
import UpdateTaskModal from './layout/modals/UpdateTaskModal'

const TASK_URL = '/tasks'

const Task = () => {
	const [tasks, setTasks] = useState([])
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [next, setNext] = useState({})
	const [isOpen, setIsOpen] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)
	const [data, setData] = useState({})

	const handleSearch = (e) => setSearch(e.target.value)
	const { auth } = useAuth()

	const fetchData = async () => {
		try {
			// const result = await getTask(page, search)
			const result = await axios(
				TASK_URL + `?page=${page}&limit=6&task=${search}`,
			)
			// if (isMounted) {
			setTasks(result.data.results)
			setNext(result.data.next)
			// }
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		isMounted && fetchData()
		return () => {
			isMounted = false
			controller.abort()
		}
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
			{isOpen && <TaskModal fetchData={fetchData} setIsOpen={setIsOpen} />}
			{isUpdate && (
				<UpdateTaskModal
					data={data}
					setIsOpen={setIsUpdate}
					fetchData={fetchData}
				/>
			)}
			<RenderTask
				setIsUpdate={setIsUpdate}
				setData={setData}
				fetchData={fetchData}
				tasks={tasks}
			/>
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
