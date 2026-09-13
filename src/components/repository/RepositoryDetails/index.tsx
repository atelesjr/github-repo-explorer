import type { GitHubRepository } from '@/types/github';

interface RepositoryDetailsProps {
	repo: GitHubRepository;
}

const RepositoryDetails = ({ repo }: RepositoryDetailsProps) => {
	return (
		<article
			className="card bg-dark text-light border-secondary shadow-sm"
			data-bs-theme="dark"
		>
			<div className="card-body p-4 d-flex flex-column gap-3">
				<header>
					<h1 className="h3 text-white mb-4 text-break fs-1 fs-md-3 fs-lg-1">
						{repo.name}
					</h1>
					{repo.description && (
						<p className="text-light-subtle mb-0">{repo.description}</p>
					)}
				</header>

				<section
					aria-label="Repository stats"
					className="d-flex align-items-center gap-4 text-secondary"
				>
					<span className="d-flex align-items-center gap-1">
						<i className="bi bi-star text-warning" aria-hidden="true" />
						<span>{repo.stargazers_count}</span>
					</span>

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
				</section>

				<div>
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
					>
						<span>View on GitHub</span>
						<i className="bi bi-box-arrow-up-right" aria-hidden="true" />
					</a>
				</div>
			</div>
		</article>
	);
};

export default RepositoryDetails;
