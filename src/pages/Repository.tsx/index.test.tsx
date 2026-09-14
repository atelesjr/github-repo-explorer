import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Repository from './index';
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
	description: 'A demo repository',
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

function renderRepositoryPage(username = 'octocat', repoName = 'demo-repo') {
	return render(
		<MemoryRouter initialEntries={[`/users/${username}/repos/${repoName}`]}>
			<Routes>
				<Route
					path="/users/:username/repos/:repoName"
					element={<Repository />}
				/>
			</Routes>
		</MemoryRouter>,
	);
}

describe('Repository Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('displays loading state while fetching repository details', () => {
		mockedGetRepoDetails.mockImplementation(() => new Promise(() => {}));

		renderRepositoryPage();

		expect(screen.getByText('Carregando repositório...')).toBeInTheDocument();
	});

	it('displays repository details after successful fetch', async () => {
		mockedGetRepoDetails.mockResolvedValue(mockRepo);

		renderRepositoryPage();

		await waitFor(() => {
			expect(
				screen.getByRole('heading', { level: 1, name: 'demo-repo' }),
			).toBeInTheDocument();
		});

		expect(screen.getByText('A demo repository')).toBeInTheDocument();
		expect(screen.getByText('42')).toBeInTheDocument();
		expect(screen.getByText('TypeScript')).toBeInTheDocument();
		expect(mockedGetRepoDetails).toHaveBeenCalledWith('octocat/demo-repo');
	});

	it('displays error state when repository is not found', async () => {
		mockedGetRepoDetails.mockRejectedValue(new Error('Not found'));

		renderRepositoryPage();

		expect(await screen.findByRole('alert')).toHaveTextContent(
			'Repositório não encontrado.',
		);
	});

	it('renders back link pointing to the user repository list', async () => {
		mockedGetRepoDetails.mockResolvedValue(mockRepo);

		renderRepositoryPage();

		const backLink = await screen.findByRole('link', {
			name: /Back to repositories/i,
		});
		expect(backLink).toHaveAttribute('href', '/users/octocat');
	});

	it('renders external GitHub link with correct attributes', async () => {
		mockedGetRepoDetails.mockResolvedValue(mockRepo);

		renderRepositoryPage();

		const githubLink = await screen.findByRole('link', {
			name: /View on GitHub/i,
		});
		expect(githubLink).toHaveAttribute(
			'href',
			'https://github.com/octocat/demo-repo',
		);
		expect(githubLink).toHaveAttribute('target', '_blank');
		expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('does not display literal "null" or "undefined" when description or language are missing', async () => {
		mockedGetRepoDetails.mockResolvedValue({
			...mockRepo,
			description: null,
			language: null,
		});

		renderRepositoryPage();

		await waitFor(() => {
			expect(
				screen.getByRole('heading', { level: 1, name: 'demo-repo' }),
			).toBeInTheDocument();
		});

		expect(screen.queryByText('null')).not.toBeInTheDocument();
		expect(screen.queryByText('undefined')).not.toBeInTheDocument();
	});
});

describe('Repository Page navigation from RepositoryCard', () => {
	it('navigates from a repository card link to the repository details page', async () => {
		mockedGetRepoDetails.mockResolvedValue(mockRepo);
		const user = userEvent.setup();

		const RepositoryCard = (
			await import('@/components/repository/RepositoryCard')
		).default;

		render(
			<MemoryRouter initialEntries={['/users/octocat']}>
				<Routes>
					<Route
						path="/users/:username"
						element={<RepositoryCard repo={mockRepo} username="octocat" />}
					/>
					<Route
						path="/users/:username/repos/:repoName"
						element={<Repository />}
					/>
				</Routes>
			</MemoryRouter>,
		);

		const link = screen.getByRole('link', { name: 'demo-repo' });
		await user.click(link);

		await waitFor(() => {
			expect(
				screen.getByRole('heading', { level: 1, name: 'demo-repo' }),
			).toBeInTheDocument();
		});
	});
});
