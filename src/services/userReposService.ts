import githubApi from './githubApi';
import type { GitHubRepository } from '@/types/github';

export const getUserRepos = async (
	username: string,
): Promise<GitHubRepository[]> => {
	let page = 1;
	const perPage = 100;
	let allRepos: GitHubRepository[] = [];
	let hasMore = true;

	while (hasMore) {
		const response = await githubApi.get<GitHubRepository[]>(
			`/users/${encodeURIComponent(username)}/repos`,
			{
				params: {
					per_page: perPage,
					page,
				},
			},
		);

		const data = response.data;
		allRepos = allRepos.concat(data);

		if (data.length < perPage) {
			hasMore = false;
		} else {
			page += 1;
		}
	}

	return allRepos;
};