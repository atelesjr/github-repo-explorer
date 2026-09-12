import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserCard from './index';
import type { GitHubUser } from '@/types/github';

const mockFullUser: GitHubUser = {
	id: 1,
	login: 'octocat',
	name: 'The Octocat',
	avatar_url: 'https://github.com/images/error/octocat_happy.gif',
	bio: 'GitHub mascot',
	location: 'San Francisco',
	email: 'octocat@github.com',
	followers: 100,
	following: 10,
	public_repos: 8,
	html_url: 'https://github.com/octocat',
};

const mockMinimalUser: GitHubUser = {
	id: 2,
	login: 'johndoe',
	name: null,
	avatar_url: 'https://github.com/images/error/johndoe.gif',
	bio: null,
	location: null,
	email: null,
	followers: 0,
	following: 0,
	public_repos: 0,
	html_url: 'https://github.com/johndoe',
};

describe('UserCard', () => {
	it('renders user details correctly when all fields are provided', () => {
		render(<UserCard user={mockFullUser} />);

		const avatar = screen.getByRole('img', { name: 'The Octocat' });
		expect(avatar).toHaveAttribute('src', mockFullUser.avatar_url);

		expect(
			screen.getByRole('heading', { level: 2, name: 'The Octocat' }),
		).toBeInTheDocument();
		expect(screen.getByText('@octocat')).toBeInTheDocument();
		expect(screen.getByText('GitHub mascot')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('10')).toBeInTheDocument();
		expect(screen.getByText('San Francisco')).toBeInTheDocument();

		const emailLink = screen.getByRole('link', { name: 'octocat@github.com' });
		expect(emailLink).toHaveAttribute('href', 'mailto:octocat@github.com');

		const profileLink = screen.getByRole('link', {
			name: 'Ver perfil no GitHub',
		});
		expect(profileLink).toHaveAttribute('href', 'https://github.com/octocat');
		expect(profileLink).toHaveAttribute('target', '_blank');
		expect(profileLink).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('renders fallback name and omits optional fields when they are missing', () => {
		render(<UserCard user={mockMinimalUser} />);

		expect(
			screen.getByRole('heading', { level: 2, name: 'johndoe' }),
		).toBeInTheDocument();
		expect(screen.getByText('@johndoe')).toBeInTheDocument();

		expect(screen.queryByText('GitHub mascot')).not.toBeInTheDocument();
		expect(screen.queryByText('San Francisco')).not.toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /@/i })).not.toBeInTheDocument();
	});
});
