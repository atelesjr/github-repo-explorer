import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUserSearch } from './useUserSearch';
import { getUser } from '@/services/userService';

vi.mock('@/services/userService', () => ({
	getUser: vi.fn(),
}));

const mockedGetUser = vi.mocked(getUser);

function createWrapper(initialEntries = ['/']) {
	return function Wrapper({ children }: { children: ReactNode }) {
		return (
			<MemoryRouter initialEntries={initialEntries}>
				{children}
			</MemoryRouter>
		);
	};
}

describe('useUserSearch', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns initial state', () => {
		const { result } = renderHook(() => useUserSearch(), {
			wrapper: createWrapper(),
		});

		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBe('');
	});

	it('does not search if username is empty or whitespace', async () => {
		const { result } = renderHook(() => useUserSearch(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.searchUser('   ');
		});

		expect(mockedGetUser).not.toHaveBeenCalled();
	});

	it('handles successful user search', async () => {
		mockedGetUser.mockResolvedValue({} as Awaited<ReturnType<typeof getUser>>);

		const { result } = renderHook(() => useUserSearch(), {
			wrapper: createWrapper(),
		});

		let promise: Promise<void>;
		act(() => {
			promise = result.current.searchUser('octocat');
		});

		expect(result.current.isLoading).toBe(true);

		await act(async () => {
			await promise;
		});

		expect(mockedGetUser).toHaveBeenCalledWith('octocat');
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBe('');
	});

	it('handles search error when user is not found', async () => {
		mockedGetUser.mockRejectedValue(new Error('Not found'));

		const { result } = renderHook(() => useUserSearch(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.searchUser('unknown');
		});

		expect(mockedGetUser).toHaveBeenCalledWith('unknown');
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBe('Usuário não encontrado.');
	});

	it('clears error when reset is called', async () => {
		mockedGetUser.mockRejectedValue(new Error('Not found'));

		const { result } = renderHook(() => useUserSearch(), {
			wrapper: createWrapper(),
		});

		await act(async () => {
			await result.current.searchUser('unknown');
		});

		expect(result.current.error).toBe('Usuário não encontrado.');

		act(() => {
			result.current.reset();
		});

		expect(result.current.error).toBe('');
	});
});
