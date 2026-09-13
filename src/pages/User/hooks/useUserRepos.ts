import { useEffect, useState } from 'react';
import { getUserRepos } from '@/services/userReposService';
import type { GitHubRepository } from '@/types/github';

export const useUserRepos = (username: string | undefined) => {
	const [repos, setRepos] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(Boolean(username));
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!username) {
			return;
		}

		let isMounted = true;

		getUserRepos(username)
			.then((data) => {
				if (isMounted) {
					setRepos(data);
					setError(null);
				}
			})
			.catch(() => {
				if (isMounted) {
					setRepos([]);
					setError('Erro ao carregar repositórios.');
				}
			})
			.finally(() => {
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [username]);

	return { repos, isLoading, error };
};
