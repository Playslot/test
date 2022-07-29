import axios from 'axios'

export default axios.create({
	baseURL: 'https://itpleasehelp.me',
	withCredentials: 'include',
})
