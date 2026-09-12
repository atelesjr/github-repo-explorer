import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUserDetails } from './useUserDetails';
import { getUser } from '@/services/userService';
import type { GitHubUser } from '@/types/github';

vi.mock('@/services/userService', () => ({
	getUser: vi.fn(),
}));

const mockedGetUser = vi.mocked(getUser);

const mockUser: GitHubUser = {
	id: 1,
	login: 'octocat',
	name: 'The Octocat',
	avatar_url: 'https://github.com/images/error/octocat_happy.gif',
	bio: 'GitHub mascot',
	location: 'San Francisco',
	email: null,
	followers: 100,
	following: 10,
	public_repos: 8,
	html_url: 'https://github.com/octocat',
};

describe('useUserDetails', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns initial reset state when username is undefined', () => {
		const { result } = renderHook(() => useUserDetails(undefined));

		expect(result.current).toEqual({
			user: null,
			isLoading: false,
			error: null,
		});
		expect(mockedGetUser).not.toHaveBeenCalled();
	});

	it('fetches user details and updates state on success', async () => {
		mockedGetUser.mockResolvedValue(mockUser);

		const { result } = renderHook(() => useUserDetails('octocat'));

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockedGetUser).toHaveBeenCalledWith('octocat');
		expect(result.current.user).toEqual(mockUser);
		expect(result.current.error).toBeNull();
	});

	it('sets error state when getUser fails', async () => {
		mockedGetUser.mockRejectedValue(new Error('API Error'));

		const { result } = renderHook(() => useUserDetails('unknown'));

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(mockedGetUser).toHaveBeenCalledWith('unknown');
		expect(result.current.user).toBeNull();
		expect(result.current.error).toBe('Usuário não encontrado.');
	});
});
