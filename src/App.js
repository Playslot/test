import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'

function App() {
	return (
		<Routes>
			{/* {public routes} */}
			<Route index element={<LandingPage />} />
			<Route path='login' element={<Login />} />
		</Routes>
	)
}

export default App
