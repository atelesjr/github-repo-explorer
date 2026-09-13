import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUserRepos } from './useUserRepos';
import { getUserRepos } from '@/services/userReposService';
import type { GitHubRepository } from '@/types/github';

vi.mock('@/services/userReposService', () => ({
	getUserRepos: vi.fn(),
}));

const mockedGetUserRepos = vi.mocked(getUserRepos);

const mockRepoList: GitHubRepository[] = [
	{
		id: 1,
		name: 'demo-repo',
		full_name: 'octocat/demo-repo',
		description: 'Demo',
		private: false,
		html_url: 'https://github.com/octocat/demo-repo',
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
	},
];

describe('useUserRepos', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns empty array when username is undefined', () => {
		const { result } = renderHook(() => useUserRepos(undefined));

		expect(result.current.repos).toEqual([]);
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBeNull();
		expect(mockedGetUserRepos).not.toHaveBeenCalled();
	});

	it('fetches repositories and updates state on success', async () => {
		mockedGetUserRepos.mockResolvedValue(mockRepoList);

		const { result } = renderHook(() => useUserRepos('octocat'));

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockedGetUserRepos).toHaveBeenCalledWith('octocat');
		expect(result.current.repos).toEqual(mockRepoList);
		expect(result.current.error).toBeNull();
	});

	it('sets error state when getUserRepos fails', async () => {
		mockedGetUserRepos.mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() => useUserRepos('octocat'));

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockedGetUserRepos).toHaveBeenCalledWith('octocat');
		expect(result.current.repos).toEqual([]);
		expect(result.current.error).toBe('Erro ao carregar repositórios.');
	});
});
