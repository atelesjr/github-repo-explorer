import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import RepositoryCard from './index';
import type { GitHubRepository } from '@/types/github';

const mockRepo: GitHubRepository = {
	id: 1,
	name: 'react-app',
	full_name: 'octocat/react-app',
	description: 'A React application',
	private: false,
	html_url: 'https://github.com/octocat/react-app',
	language: 'TypeScript',
	forks_count: 5,
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

function LocationDisplay() {
	const location = useLocation();

	return <output data-testid="location">{location.pathname}</output>;
}

describe('RepositoryCard', () => {
	it('displays name, description, stars, and language', () => {
		render(
			<MemoryRouter>
				<RepositoryCard repo={mockRepo} username="octocat" />
			</MemoryRouter>,
		);

		expect(
			screen.getByRole('heading', { name: 'react-app' }),
		).toBeInTheDocument();
		expect(screen.getByText('A React application')).toBeInTheDocument();
		expect(screen.getByText('42')).toBeInTheDocument();
		expect(screen.getByText('TypeScript')).toBeInTheDocument();
	});

	it('navigates to repository details route when repository name link is clicked', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/users/octocat']}>
				<Routes>
					<Route
						path="/users/:username"
						element={
							<>
								<RepositoryCard repo={mockRepo} username="octocat" />
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

		const link = screen.getByRole('link', { name: 'react-app' });
		await user.click(link);

		expect(screen.getByTestId('location')).toHaveTextContent(
			'/users/octocat/repos/react-app',
		);
	});
});
