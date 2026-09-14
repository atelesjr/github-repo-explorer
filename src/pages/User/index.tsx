import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '@/components/user/UserCard';
import RepositoryList from '@/components/repository/RepositoryList';
import RepositorySort from '@/components/repository/RepositorySort';
import { useUserDetails } from './hooks/useUserDetails';
import { useUserRepos } from './hooks/useUserRepos';
import { sortRepositories } from '@/utils/sortRepositories';
import type { RepositorySortOption } from '@/types/github';

const User = () => {
	const { username } = useParams<{ username: string }>();
	const {
		user,
		isLoading: isLoadingUser,
		error: userError,
	} = useUserDetails(username);
	const {
		repos,
		isLoading: isLoadingRepos,
		error: reposError,
	} = useUserRepos(username);
	const [sortOption, setSortOption] =
		useState<RepositorySortOption>('stars-desc');

	useEffect(() => {
		console.log('userError', userError);
		console.log('user', user);
	}, [userError, user]);

	if (isLoadingUser) {
		return (
			<div className="d-flex justify-content-center py-5">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Carregando usuário...</span>
				</div>
			</div>
		);
	}

	if (userError || !user) {
		return (
			<div className="alert alert-danger my-4" role="alert">
				{userError || 'Usuário não encontrado.'}
			</div>
		);
	}

	const sortedRepos = sortRepositories(repos, sortOption);

	return (
		<div className="py-4">
			<div className="row g-4">
				<div className="col-12 col-md-4 col-lg-3">
					<UserCard user={user} />
				</div>
				<div className="col-12 col-md-8 col-lg-9">
					<section aria-label="Repositories">
						<div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom border-secondary">
							<h2 className="h3 text-white mb-0 d-flex align-items-center gap-2">
								<span>Repositories</span>
								<span className="badge bg-secondary rounded-pill fs-6 px-3 py-1">
									{repos.length}
								</span>
							</h2>
							<RepositorySort value={sortOption} onChange={setSortOption} />
						</div>

						<RepositoryList
							repos={sortedRepos}
							username={user.login}
							isLoading={isLoadingRepos}
							error={reposError}
						/>
					</section>
				</div>
			</div>
		</div>
	);
};

export default User;
