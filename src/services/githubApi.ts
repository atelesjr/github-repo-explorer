import axios from 'axios';

const githubApi = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Accept: 'application/vnd.github+json',
	},
});

export default githubApi;
