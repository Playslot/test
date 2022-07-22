import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import RenderAntree from './layout/RenderAntree'
// import useAuth from '../hooks/useAuth'

const TASK_URL = '/tasks'

const LandingPage = () => {
	const [tasks, setTasks] = useState([])
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [next, setNext] = useState({})
	// const { auth } = useAuth()

	const handleSearch = (e) => setSearch(e.target.value)
	// const { data, error, loaded } = useAxios(TASK_URL, 'get')
	// setTasks(data)

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

			<RenderAntree tasks={tasks} />
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
				disabled={!next}
				onClick={() => setPage(page + 1)}
			>
				next
			</button>
			<span className='btm-link'>
				<Link to='/login'> Go To Login</Link>
			</span>
		</section>
	)
}

export default LandingPage
