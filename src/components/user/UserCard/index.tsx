import type { GitHubUser } from '@/types/github';

interface UserCardProps {
	user: GitHubUser;
}

const UserCard = ({ user }: UserCardProps) => {
	return (
		<div
			className="card bg-dark text-light border-secondary shadow-sm"
			data-bs-theme="dark"
		>
			<div className="card-body p-3 d-flex flex-column gap-3">
				{/* Avatar */}
				<div className="text-center">
					<img
						src={user.avatar_url}
						alt={user.name ?? user.login}
						className="rounded-circle img-fluid border border-secondary w-100"
					/>
				</div>

				{/* Nome e Login */}
				<div>
					<h2 className="h4 fw-bold mb-0 text-white">
						{user.name ?? user.login}
					</h2>
					<p className="fs-6 text-secondary mb-0">@{user.login}</p>
				</div>

				{/* Bio */}
				{user.bio && (
					<p className="card-text text-light-subtle small mb-0">{user.bio}</p>
				)}

				{/* Seguidores e Seguidos */}
				<div className="d-flex align-items-center gap-2 text-secondary small">
					<i className="bi bi-people fs-6" aria-hidden="true"></i>
					<span>
						<strong className="text-white">{user.followers}</strong>{' '}
						<span className="text-secondary">seguidores</span>
					</span>
					<span>·</span>
					<span>
						<strong className="text-white">{user.following}</strong>{' '}
						<span className="text-secondary">seguindo</span>
					</span>
				</div>

				{/* Informações adicionais */}
				<ul className="list-unstyled text-secondary small d-flex flex-column gap-2 mb-0">
					{user.location && (
						<li className="d-flex align-items-center gap-2">
							<i className="bi bi-geo-alt fs-6" aria-hidden="true"></i>
							<span>{user.location}</span>
						</li>
					)}

					{user.email && (
						<li className="d-flex align-items-center gap-2">
							<i className="bi bi-envelope fs-6" aria-hidden="true"></i>
							<a
								href={`mailto:${user.email}`}
								className="text-decoration-none text-reset text-break"
							>
								{user.email}
							</a>
						</li>
					)}

					<li className="d-flex align-items-center gap-2">
						<i className="bi bi-github fs-6" aria-hidden="true"></i>
						<a
							href={user.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-decoration-none text-primary"
						>
							Ver perfil no GitHub
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserCard;
