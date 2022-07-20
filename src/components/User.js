import { useState, useEffect } from 'react'
import axios from '../api/axios'
import RenderUser from './layout/RenderUser'
import useAuth from '../hooks/useAuth'
const USER_URL = '/users'

const User = () => {
	const [user, setUser] = useState([])
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [next, setNext] = useState({})
	const { auth } = useAuth()
	const handleSearch = (e) => setSearch(e.target.value)

	useEffect(() => {
		async function fetchData() {
			const result = await axios(
				USER_URL + `?page=${page}&limit=6&username=${search}`,
				// {
				// 	headers: {
				// 		Authorization: `Bearer ${auth.accessToken}`,
				// 	},
				// },
			)
			setUser(result.data.result)
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
			<RenderUser users={user} />
			<button
				type='button'
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				prev
			</button>
			<button type='button' onClick={() => setPage(page + 1)} disabled={!next}>
				next
			</button>
		</section>
	)
}

export default User
