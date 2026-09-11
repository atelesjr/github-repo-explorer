import { useParams } from 'react-router-dom';

const User = () => {
	const { username } = useParams<{ username: string }>();

	return (
		<div className="py-4">
			<h1>User: {username}</h1>
		</div>
	);
};

export default User;
