import { Link } from 'react-router-dom';
import type { GitHubRepository } from '@/types/github';

interface RepositoryCardProps {
	repo: GitHubRepository;
	username: string;
}

const RepositoryCard = ({ repo, username }: RepositoryCardProps) => {
	const repoDetailsPath = `/users/${encodeURIComponent(username)}/repos/${encodeURIComponent(repo.name)}`;

	return (
		<article
			className="card bg-dark text-light border-secondary shadow-sm h-100"
			data-bs-theme="dark"
		>
			<div className="card-body p-3 d-flex flex-column gap-2">
				<div className="d-flex align-items-center justify-content-between gap-2">
					<h3 className="h5 card-title mb-0 text-break">
						<Link
							to={repoDetailsPath}
							className="text-decoration-none text-primary fw-bold"
						>
							{repo.name}
						</Link>
					</h3>
					<span className="badge border border-secondary text-secondary small">
						{repo.private ? 'Private' : 'Public'}
					</span>
				</div>

				{repo.description && (
					<p className="card-text text-light-subtle small mb-0">
						{repo.description}
					</p>
				)}

				<div className="d-flex align-items-center gap-3 text-secondary small mt-auto pt-1">
					{repo.language && (
						<span className="d-flex align-items-center gap-1">
							<span
								className="rounded-circle bg-primary d-inline-block"
								style={{ width: '8px', height: '8px' }}
								aria-hidden="true"
							/>
							<span>{repo.language}</span>
						</span>
					)}

					<span className="d-flex align-items-center gap-1">
						<i className="bi bi-star text-warning" aria-hidden="true" />
						<span>{repo.stargazers_count}</span>
					</span>
				</div>
			</div>
		</article>
	);
};

export default RepositoryCard;
