import { useParams } from 'react-router-dom';

const Repository = () => {
	const { username, repoName } = useParams<{
		username: string;
		repoName: string;
	}>();

	return (
		<div className="py-4">
			<h1>Repository: {repoName}</h1>
			<p>User: {username}</p>
		</div>
	);
};

export default Repository;
