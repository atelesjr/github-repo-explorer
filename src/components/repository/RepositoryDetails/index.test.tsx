import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RepositoryDetails from './index';
import type { GitHubRepository } from '@/types/github';

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

describe('RepositoryDetails', () => {
	it('displays name, description, stars and language', () => {
		render(<RepositoryDetails repo={mockRepo} />);

		expect(
			screen.getByRole('heading', { level: 1, name: 'demo-repo' }),
		).toBeInTheDocument();
		expect(screen.getByText('A demo repository')).toBeInTheDocument();
		expect(screen.getByText('42')).toBeInTheDocument();
		expect(screen.getByText('TypeScript')).toBeInTheDocument();
	});

	it('renders external link with correct href, target and rel', () => {
		render(<RepositoryDetails repo={mockRepo} />);

		const link = screen.getByRole('link', { name: /View on GitHub/i });
		expect(link).toHaveAttribute('href', 'https://github.com/octocat/demo-repo');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('handles missing description gracefully', () => {
		render(<RepositoryDetails repo={{ ...mockRepo, description: null }} />);

		expect(screen.queryByText('null')).not.toBeInTheDocument();
		expect(screen.queryByText('undefined')).not.toBeInTheDocument();
	});

	it('handles missing language gracefully', () => {
		render(<RepositoryDetails repo={{ ...mockRepo, language: null }} />);

		expect(screen.queryByText('null')).not.toBeInTheDocument();
		expect(screen.queryByText('undefined')).not.toBeInTheDocument();
	});
});
