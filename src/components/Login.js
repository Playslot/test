import { useRef, useState, useEffect } from 'react'

import useAuth from '../hooks/useAuth'

import { Link, useNavigate, useLocation } from 'react-router-dom'

import { login } from '../api/auth'

const Login = () => {
	const { setAuth } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from.pathname || '/'

	const userRef = useRef()
	const errRef = useRef()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errMsg, setErrMsg] = useState('')

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('')
	}, [username, password])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await login({ username, password }) //ini tadi kosong errornya kemana" biasa js
			// console.log(JSON.stringify(response?.data))
			//console.log(JSON.stringify(response));
			const accessToken = response?.data?.accessToken
			setAuth({ username, password, accessToken })
			setUsername('')
			setPassword('')
			navigate('/task', { replace: true })
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response')
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password')
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized')
			} else {
				setErrMsg('Login Failed')
			}
			errRef.current.focus()
		}
	}

	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live='assertive'
			>
				{errMsg}
			</p>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					ref={userRef}
					autoComplete='off'
					onChange={(e) => setUsername(e.target.value)}
					value={username}
					required
				/>

				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
				<button>Sign In</button>
			</form>
			<p>
				back to home
				<br />
				<span className='line'>
					<Link to='/'>Home</Link>
				</span>
			</p>
		</section>
	)
}

export default Login
