import { useParams } from 'react-router-dom';
import UserCard from '@/components/user/UserCard';

const User = () => {
	const { username } = useParams<{ username: string }>();

	return (
		<div className="py-4">
			<h1>User: {username}</h1>
			<UserCard />
		</div>
	);
};

export default User;
