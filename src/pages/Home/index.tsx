import { getUser } from '@/services/userService';
import { getRepoDetails } from '@/services/repoDetailsService';
import { useEffect } from 'react';
import { getUserRepos } from '@/services/userReposService';

const Home = () => {
	const getUserDetails = async () => {
		const userData = await getUser('atelesjr');
		console.log('User Data:', userData);
	};

	const getUserRepositories = async () => {
		const repos = await getUserRepos('atelesjr');
		console.log('User Repos:', repos);
	};

	const getRepositoryDetails = async () => {
		const repoDetails = await getRepoDetails('atelesjr/github-repo-explorer');
		console.log('Repo Details:', repoDetails);
	};

	useEffect(() => {
		getUserDetails();
		getUserRepositories();
		getRepositoryDetails();
	}, []);

	return (
		<div>
			<h1>Home Page</h1>
		</div>
	);
};

export default Home;
