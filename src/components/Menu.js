import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import './style/menu.css'

const LOGOUT_URL = '/auth/logout'

const Menu = () => {
	const navigate = useNavigate()

	const handleLogout = async () => {
		await axios(LOGOUT_URL)
		navigate('/', { replace: true })
	}

	return (
		<section>
			<div className='menubar'>
				<p className='menu-links'>
					<Link to='/user'>UserList</Link>
				</p>
				<p className='menu-links'>
					<Link to='/task'>TaskList</Link>
				</p>
				<p className='menu-links' onClick={handleLogout}>
					logOut
				</p>
			</div>

			<Outlet />
		</section>
	)
}

export default Menu
