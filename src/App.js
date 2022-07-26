import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import User from './components/User'
import Task from './components/Task'
import RequireAuth from './components/RequireAuth'
import Menu from './components/Menu'

function App() {
	return (
		<Routes>
			{/* {public routes} */}
			<Route path='/' element={<LandingPage />} exact />
			<Route path='/login' element={<Login />} />
			{/* {auth routes} */}
			<Route element={<RequireAuth />}>
				<Route element={<Menu />}>
					<Route path='/user' element={<User />} />
					<Route path='/task' element={<Task />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
