import githubApi from './githubApi';
import type { GitHubRepository } from '@/types/github';

export const getUserRepos = async (
	username: string,
): Promise<GitHubRepository[]> => {
	const response = await githubApi.get<GitHubRepository[]>(
		`/users/${encodeURIComponent(username)}/repos`,
	);

	return response.data;
};