import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import User from './index';
import { useUserDetails } from './hooks/useUserDetails';
import type { GitHubUser } from '@/types/github';

vi.mock('./useUserDetails', () => ({
	useUserDetails: vi.fn(),
}));

const mockedUseUserDetails = vi.mocked(useUserDetails);

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

function renderUserPage(username = 'octocat') {
	return render(
		<MemoryRouter initialEntries={[`/users/${username}`]}>
			<Routes>
				<Route path="/users/:username" element={<User />} />
			</Routes>
		</MemoryRouter>,
	);
}

describe('User Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders loading spinner when data is loading', () => {
		mockedUseUserDetails.mockReturnValue({
			user: null,
			isLoading: true,
			error: null,
		});

		renderUserPage();

		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('Carregando usuário...')).toBeInTheDocument();
	});

	it('renders error message when search fails or user is null', () => {
		mockedUseUserDetails.mockReturnValue({
			user: null,
			isLoading: false,
			error: 'Usuário não encontrado.',
		});

		renderUserPage();

		expect(screen.getByRole('alert')).toHaveTextContent(
			'Usuário não encontrado.',
		);
	});

	it('renders UserCard when user is loaded successfully', () => {
		mockedUseUserDetails.mockReturnValue({
			user: mockUser,
			isLoading: false,
			error: null,
		});

		renderUserPage();

		expect(
			screen.getByRole('heading', { level: 2, name: 'The Octocat' }),
		).toBeInTheDocument();
		expect(screen.getByText('@octocat')).toBeInTheDocument();
	});
});
