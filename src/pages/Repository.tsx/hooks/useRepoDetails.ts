import { useEffect, useState } from 'react';
import { getRepoDetails } from '@/services/repoDetailsService';
import type { GitHubRepository } from '@/types/github';

export const useRepoDetails = (
	username: string | undefined,
	repoName: string | undefined,
) => {
	const [repo, setRepo] = useState<GitHubRepository | null>(null);
	const [isLoading, setIsLoading] = useState(Boolean(username && repoName));
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!username || !repoName) {
			return;
		}

		let isMounted = true;

		getRepoDetails(`${username}/${repoName}`)
			.then((data) => {
				if (isMounted) {
					setRepo(data);
					setError(null);
				}
			})
			.catch(() => {
				if (isMounted) {
					setRepo(null);
					setError('Repositório não encontrado.');
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
	}, [username, repoName]);

	return { repo, isLoading, error };
};
