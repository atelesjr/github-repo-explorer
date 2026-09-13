import type { GitHubRepository } from '@/types/github';
import RepositoryCard from '../RepositoryCard';

interface RepositoryListProps {
	repos: GitHubRepository[];
	username: string;
	isLoading?: boolean;
	error?: string | null;
}

const RepositoryList = ({
	repos,
	username,
	isLoading = false,
	error = null,
}: RepositoryListProps) => {
	if (isLoading) {
		return (
			<div className="d-flex justify-content-center py-4">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Carregando repositórios...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="alert alert-danger my-3" role="alert">
				{error}
			</div>
		);
	}

	if (repos.length === 0) {
		return (
			<div className="text-secondary py-4 text-center border border-secondary rounded p-4 bg-dark">
				Nenhum repositório encontrado.
			</div>
		);
	}

	return (
		<div className="repository-list row g-3">
			{repos.map((repo) => (
				<div key={repo.id} className="col-12 col-md-6">
					<RepositoryCard repo={repo} username={username} />
				</div>
			))}
		</div>
	);
};

export default RepositoryList;
