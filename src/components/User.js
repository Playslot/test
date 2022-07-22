import { useState, useEffect } from 'react'
import axios from '../api/axios'
import RenderUser from './layout/RenderUser'
import useAuth from '../hooks/useAuth'
import UserModal from './layout/modals/UserModal'
import UpdateUserModal from './layout/modals/UpdateUserModal'
const USER_URL = '/users'

const User = () => {
	const [user, setUser] = useState([])
	const [search, setSearch] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)
	const [data, setData] = useState('')
	const { auth } = useAuth()
	const handleSearch = (e) => setSearch(e.target.value)
	const fetchData = async () => {
		const result = await axios(USER_URL + `?username=${search}`, {
			headers: {
				Authorization: `Bearer ${auth.accessToken}`,
			},
		})
		setUser(result.data)
	}

	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		isMounted && fetchData()
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [search])

	return (
		<section>
			<input
				className='search-input'
				placeholder='Search..'
				value={search}
				onChange={handleSearch}
			/>
			<button onClick={() => setIsOpen(true)}>add</button>
			{isOpen && <UserModal fetchData={fetchData} setIsOpen={setIsOpen} />}
			{isUpdate && <UpdateUserModal data={data} setIsOpen={setIsUpdate} />}
			<RenderUser
				fetchData={fetchData}
				users={user}
				setData={setData}
				setIsUpdate={setIsUpdate}
			/>
		</section>
	)
}

export default User
