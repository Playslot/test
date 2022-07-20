import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
	return (
		<section>
			<div>
				<p>
					<Link to='/user'>UserList</Link>
				</p>
				<p>
					<Link to='/task'>TaskList</Link>
				</p>
			</div>
		</section>
	)
}

export default Menu
