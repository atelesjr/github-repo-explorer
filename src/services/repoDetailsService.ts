import githubApi from './githubApi';
import type { GitHubRepository } from '@/types/github';

export const getRepoDetails = async (
	fullName: string,
): Promise<GitHubRepository> => {
	const response = await githubApi.get<GitHubRepository>(
		`/repos/${encodeURI(fullName)}`,
	);

	return response.data;
};