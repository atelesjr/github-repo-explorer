import { describe, expect, it } from 'vitest';
import { initialState, reducer } from './useDetailsReducer';
import type { GitHubUser } from '@/types/github';

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

describe('useDetailsReducer', () => {
	it('returns initial state on RESET', () => {
		const state = reducer(
			{ user: mockUser, isLoading: false, error: 'Some error' },
			{ type: 'RESET' },
		);

		expect(state).toEqual(initialState);
	});

	it('sets isLoading to true and clears error on FETCH_START', () => {
		const state = reducer(
			{ user: null, isLoading: false, error: 'Previous error' },
			{ type: 'FETCH_START' },
		);

		expect(state).toEqual({
			user: null,
			isLoading: true,
			error: null,
		});
	});

	it('sets user payload and sets isLoading to false on FETCH_SUCCESS', () => {
		const state = reducer(
			{ user: null, isLoading: true, error: null },
			{ type: 'FETCH_SUCCESS', payload: mockUser },
		);

		expect(state).toEqual({
			user: mockUser,
			isLoading: false,
			error: null,
		});
	});

	it('sets error message and clears user on FETCH_ERROR', () => {
		const state = reducer(
			{ user: mockUser, isLoading: true, error: null },
			{ type: 'FETCH_ERROR', payload: 'Usuário não encontrado.' },
		);

		expect(state).toEqual({
			user: null,
			isLoading: false,
			error: 'Usuário não encontrado.',
		});
	});

	it('returns current state for unknown action type', () => {
		const currentState = { user: null, isLoading: false, error: null };
		// @ts-expect-expected action type
		const state = reducer(currentState, { type: 'UNKNOWN' } as never);

		expect(state).toBe(currentState);
	});
});
