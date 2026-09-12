import { useParams } from 'react-router-dom';
import UserCard from '@/components/user/UserCard';
import { useUserDetails } from './hooks/useUserDetails';

const User = () => {
	const { username } = useParams<{ username: string }>();
	const { user, isLoading, error } = useUserDetails(username);

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center py-5">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Carregando usuário...</span>
				</div>
			</div>
		);
	}

	if (error || !user) {
		return (
			<div className="alert alert-danger my-4" role="alert">
				{error || 'Usuário não encontrado.'}
			</div>
		);
	}

	return (
		<div className="py-4">
			<div className="row">
				<div className="col-12 col-md-4 col-lg-3">
					<UserCard user={user} />
				</div>
			</div>
		</div>
	);
};

export default User;
