import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import User from './index';
import { getUser } from '@/services/userService';
import { getUserRepos } from '@/services/userReposService';
import type { GitHubRepository, GitHubUser } from '@/types/github';

vi.mock('@/services/userService', () => ({
	getUser: vi.fn(),
}));

vi.mock('@/services/userReposService', () => ({
	getUserRepos: vi.fn(),
}));

const mockedGetUser = vi.mocked(getUser);
const mockedGetUserRepos = vi.mocked(getUserRepos);

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
	public_repos: 2,
	html_url: 'https://github.com/octocat',
};

const mockRepos: GitHubRepository[] = [
	{
		id: 1,
		name: 'beta-repo',
		full_name: 'octocat/beta-repo',
		description: 'Beta description',
		private: false,
		html_url: 'https://github.com/octocat/beta-repo',
		language: 'JavaScript',
		forks_count: 1,
		stargazers_count: 5,
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
	{
		id: 2,
		name: 'alpha-repo',
		full_name: 'octocat/alpha-repo',
		description: 'Alpha description',
		private: false,
		html_url: 'https://github.com/octocat/alpha-repo',
		language: 'TypeScript',
		forks_count: 2,
		stargazers_count: 50,
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

function LocationDisplay() {
	const location = useLocation();

	return <output data-testid="location">{location.pathname}</output>;
}

function renderUserPage(username = 'octocat') {
	return render(
		<MemoryRouter initialEntries={[`/users/${username}`]}>
			<Routes>
				<Route
					path="/users/:username"
					element={
						<>
							<User />
							<LocationDisplay />
						</>
					}
				/>
				<Route
					path="/users/:username/repos/:repoName"
					element={
						<>
							<h1>Repo Details Page</h1>
							<LocationDisplay />
						</>
					}
				/>
			</Routes>
		</MemoryRouter>,
	);
}

describe('User Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders loading spinner when user data is loading', () => {
		mockedGetUser.mockImplementation(() => new Promise(() => {}));
		mockedGetUserRepos.mockImplementation(() => new Promise(() => {}));

		renderUserPage();

		expect(screen.getByText('Carregando usuário...')).toBeInTheDocument();
	});

	it('renders error message when user search fails', async () => {
		mockedGetUser.mockRejectedValue(new Error('User not found'));
		mockedGetUserRepos.mockResolvedValue([]);

		renderUserPage();

		expect(await screen.findByRole('alert')).toHaveTextContent(
			'Usuário não encontrado.',
		);
	});

	it('renders UserCard beside Repositories section using responsive grid columns', async () => {
		mockedGetUser.mockResolvedValue(mockUser);
		mockedGetUserRepos.mockResolvedValue(mockRepos);

		renderUserPage();

		await waitFor(() => {
			expect(
				screen.getByRole('heading', { level: 2, name: 'The Octocat' }),
			).toBeInTheDocument();
		});

		const userCardColumn = screen
			.getByRole('heading', { level: 2, name: 'The Octocat' })
			.closest('.col-12');
		expect(userCardColumn).toHaveClass('col-xl-3');

		const repoSectionColumn = screen
			.getByRole('region', { name: 'Repositories' })
			.closest('.col-12');
		expect(repoSectionColumn).toHaveClass('col-xl-9');
	});

	it('defaults to "Most stars" sorting and displays repository details', async () => {
		mockedGetUser.mockResolvedValue(mockUser);
		mockedGetUserRepos.mockResolvedValue(mockRepos);

		renderUserPage();

		await waitFor(() => {
			expect(
				screen.getByRole('heading', { level: 2, name: 'The Octocat' }),
			).toBeInTheDocument();
		});

		const sortSelect = screen.getByRole('combobox', {
			name: 'Sort repositories',
		});
		expect(sortSelect).toHaveValue('stars-desc');

		const headings = screen.getAllByRole('heading', { level: 3 });
		expect(headings[0]).toHaveTextContent('alpha-repo');
		expect(headings[1]).toHaveTextContent('beta-repo');

		expect(screen.getByText('Alpha description')).toBeInTheDocument();
		expect(screen.getByText('TypeScript')).toBeInTheDocument();
		expect(screen.getByText('50')).toBeInTheDocument();
	});

	it('changes repository order when selecting a different sort option without triggering new API calls', async () => {
		mockedGetUser.mockResolvedValue(mockUser);
		mockedGetUserRepos.mockResolvedValue(mockRepos);

		const user = userEvent.setup();
		renderUserPage();

		await waitFor(() => {
			expect(
				screen.getByRole('heading', { level: 2, name: 'The Octocat' }),
			).toBeInTheDocument();
		});

		expect(mockedGetUserRepos).toHaveBeenCalledTimes(1);

		const sortSelect = screen.getByRole('combobox', {
			name: 'Sort repositories',
		});
		await user.selectOptions(sortSelect, 'stars-asc');

		const headings = screen.getAllByRole('heading', { level: 3 });
		expect(headings[0]).toHaveTextContent('beta-repo');
		expect(headings[1]).toHaveTextContent('alpha-repo');

		expect(mockedGetUserRepos).toHaveBeenCalledTimes(1);
	});

	it('navigates to repository details page when clicking a repository name link', async () => {
		mockedGetUser.mockResolvedValue(mockUser);
		mockedGetUserRepos.mockResolvedValue(mockRepos);

		const user = userEvent.setup();
		renderUserPage();

		await waitFor(() => {
			expect(
				screen.getByRole('heading', { level: 2, name: 'The Octocat' }),
			).toBeInTheDocument();
		});

		const link = screen.getByRole('link', { name: 'alpha-repo' });
		await user.click(link);

		expect(screen.getByTestId('location')).toHaveTextContent(
			'/users/octocat/repos/alpha-repo',
		);
	});
});
