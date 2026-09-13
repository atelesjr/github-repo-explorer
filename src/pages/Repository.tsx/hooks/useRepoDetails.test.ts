import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRepoDetails } from './useRepoDetails';
import { getRepoDetails } from '@/services/repoDetailsService';
import type { GitHubRepository } from '@/types/github';

vi.mock('@/services/repoDetailsService', () => ({
	getRepoDetails: vi.fn(),
}));

const mockedGetRepoDetails = vi.mocked(getRepoDetails);

const mockRepo: GitHubRepository = {
	id: 1,
	name: 'demo-repo',
	full_name: 'octocat/demo-repo',
	description: 'Demo',
	private: false,
	html_url: 'https://github.com/octocat/demo-repo',
	language: 'TypeScript',
	forks_count: 0,
	stargazers_count: 42,
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
};

describe('useRepoDetails', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('does not fetch when username or repoName is undefined', () => {
		const { result } = renderHook(() => useRepoDetails(undefined, 'demo-repo'));

		expect(result.current.repo).toBeNull();
		expect(result.current.isLoading).toBe(false);
		expect(mockedGetRepoDetails).not.toHaveBeenCalled();
	});

	it('fetches repository details and updates state on success', async () => {
		mockedGetRepoDetails.mockResolvedValue(mockRepo);

		const { result } = renderHook(() =>
			useRepoDetails('octocat', 'demo-repo'),
		);

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockedGetRepoDetails).toHaveBeenCalledWith('octocat/demo-repo');
		expect(result.current.repo).toEqual(mockRepo);
		expect(result.current.error).toBeNull();
	});

	it('sets error state when getRepoDetails fails', async () => {
		mockedGetRepoDetails.mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() =>
			useRepoDetails('octocat', 'unknown-repo'),
		);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.repo).toBeNull();
		expect(result.current.error).toBe('Repositório não encontrado.');
	});
});
