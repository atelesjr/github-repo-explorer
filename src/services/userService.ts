import githubApi from './githubApi';
import type { GitHubUser } from '@/types/github';

export const getUser = async (username: string): Promise<GitHubUser> => {
	const response = await githubApi.get<GitHubUser>(
		`/users/${encodeURIComponent(username)}`,
	);

	return response.data;
};
