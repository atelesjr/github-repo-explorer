import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getUserRepos } from './userReposService';
import githubApi from './githubApi';
import type { GitHubRepository } from '@/types/github';

vi.mock('./githubApi', () => ({
	default: {
		get: vi.fn(),
	},
}));

const mockedGithubApiGet = vi.mocked(githubApi.get);

const createMockRepo = (id: number): GitHubRepository => ({
	id,
	name: `repo-${id}`,
	full_name: `octocat/repo-${id}`,
	description: `Description ${id}`,
	private: false,
	html_url: `https://github.com/octocat/repo-${id}`,
	language: 'TypeScript',
	forks_count: 0,
	stargazers_count: 10,
	open_issues_count: 0,
	created_at: '2023-01-01T00:00:00Z',
	updated_at: '2023-01-01T00:00:00Z',
	pushed_at: '2023-01-01T00:00:00Z',
	owner: {
		login: 'octocat',
		id: 1,
		avatar_url: 'https://github.com/images/error/octocat_happy.gif',
		html_url: 'https://github.com/octocat',
	},
});

describe('getUserRepos service', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('fetches single page when repositories count is less than 100', async () => {
		const repos = Array.from({ length: 25 }, (_, i) => createMockRepo(i + 1));
		mockedGithubApiGet.mockResolvedValueOnce({ data: repos });

		const result = await getUserRepos('octocat');

		expect(result).toHaveLength(25);
		expect(mockedGithubApiGet).toHaveBeenCalledTimes(1);
		expect(mockedGithubApiGet).toHaveBeenCalledWith('/users/octocat/repos', {
			params: { per_page: 100, page: 1 },
		});
	});

	it('fetches multiple pages until fewer than 100 items are returned', async () => {
		const page1 = Array.from({ length: 100 }, (_, i) => createMockRepo(i + 1));
		const page2 = Array.from({ length: 30 }, (_, i) => createMockRepo(i + 101));

		mockedGithubApiGet
			.mockResolvedValueOnce({ data: page1 })
			.mockResolvedValueOnce({ data: page2 });

		const result = await getUserRepos('octocat');

		expect(result).toHaveLength(130);
		expect(mockedGithubApiGet).toHaveBeenCalledTimes(2);
		expect(mockedGithubApiGet).toHaveBeenNthCalledWith(
			1,
			'/users/octocat/repos',
			{ params: { per_page: 100, page: 1 } },
		);
		expect(mockedGithubApiGet).toHaveBeenNthCalledWith(
			2,
			'/users/octocat/repos',
			{ params: { per_page: 100, page: 2 } },
		);
	});
});
