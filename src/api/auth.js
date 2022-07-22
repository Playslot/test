import axios from './axios'

const LOGIN_URL = '/auth/login'

async function login({ username, password }) {
	return axios.post(LOGIN_URL, JSON.stringify({ username, password }), {
		headers: { 'Content-Type': 'application/json' },
		withCredentials: true,
	})
}

export { login }
