import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
	const { auth } = useAuth()
	const location = useLocation()
	// return auth.acessToken ? (
	// 	<Outlet />
	// ) : (
	// 	<Navigate to='/' state={{ from: location }} replace />
	// )
	if (!auth.accessToken) {
		return <Navigate to='/' state={{ from: location }} replace />
	}

	return <Outlet />
}

export default RequireAuth
