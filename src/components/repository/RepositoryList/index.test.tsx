import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import RepositoryList from './index';
import type { GitHubRepository } from '@/types/github';

const mockRepos: GitHubRepository[] = [
	{
		id: 1,
		name: 'alpha',
		full_name: 'octocat/alpha',
		description: 'Alpha repo',
		private: false,
		html_url: 'https://github.com/octocat/alpha',
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

describe('RepositoryList', () => {
	it('renders loading spinner when isLoading is true', () => {
		render(
			<MemoryRouter>
				<RepositoryList repos={[]} username="octocat" isLoading={true} />
			</MemoryRouter>,
		);

		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('Carregando repositórios...')).toBeInTheDocument();
	});

	it('renders error message when error is provided', () => {
		render(
			<MemoryRouter>
				<RepositoryList
					repos={[]}
					username="octocat"
					error="Erro ao carregar repositórios."
				/>
			</MemoryRouter>,
		);

		expect(screen.getByRole('alert')).toHaveTextContent(
			'Erro ao carregar repositórios.',
		);
	});

	it('renders empty message when repos array is empty', () => {
		render(
			<MemoryRouter>
				<RepositoryList repos={[]} username="octocat" />
			</MemoryRouter>,
		);

		expect(
			screen.getByText('Nenhum repositório encontrado.'),
		).toBeInTheDocument();
	});

	it('renders list of RepositoryCard items when repos are provided', () => {
		render(
			<MemoryRouter>
				<RepositoryList repos={mockRepos} username="octocat" />
			</MemoryRouter>,
		);

		expect(
			screen.getByRole('heading', { name: 'alpha' }),
		).toBeInTheDocument();
	});
});
