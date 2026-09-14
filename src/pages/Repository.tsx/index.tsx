import { Link, useParams } from 'react-router-dom';
import RepositoryDetails from '@/components/repository/RepositoryDetails';
import { useRepoDetails } from './hooks/useRepoDetails';

const Repository = () => {
	const { username, repoName } = useParams<{
		username: string;
		repoName: string;
	}>();
	const { repo, isLoading, error } = useRepoDetails(username, repoName);

	const backLink = username ? `/users/${encodeURIComponent(username)}` : '/';

	if (!username || !repoName) {
		return (
			<div className="py-4">
				<div className="alert alert-danger my-4" role="alert">
					Repositório inválido.
				</div>
				<Link to="/" className="text-decoration-none">
					← Voltar para a busca
				</Link>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center py-5">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Carregando repositório...</span>
				</div>
			</div>
		);
	}

	if (error || !repo) {
		return (
			<main className="py-4">
				<div className="alert alert-danger my-4" role="alert">
					{error || 'Repositório não encontrado.'}
				</div>
				<Link to={backLink} className="text-decoration-none">
					← Back to repositories
				</Link>
			</main>
		);
	}

	return (
		<main className="py-4">
			<div className="row justify-content-center">
				<div className="col-12 col-lg-8">
					<RepositoryDetails repo={repo} />
					<div className="mt-5">
						<Link to={backLink} className="text-decoration-none">
							← Back to repositories
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Repository;
