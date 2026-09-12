import { describe, expect, it } from 'vitest';
import { sortRepositories } from './sortRepositories';
import type { GitHubRepository } from '@/types/github';

const createMockRepo = (
	id: number,
	name: string,
	stars: number,
): GitHubRepository => ({
	id,
	name,
	full_name: `octocat/${name}`,
	description: `Description for ${name}`,
	private: false,
	html_url: `https://github.com/octocat/${name}`,
	language: 'TypeScript',
	forks_count: 0,
	stargazers_count: stars,
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
});

const sampleRepos: GitHubRepository[] = [
	createMockRepo(1, 'repo-b', 50),
	createMockRepo(2, 'repo-a', 100),
	createMockRepo(3, 'repo-c', 10),
];

describe('sortRepositories', () => {
	it('sorts by stars descending (most stars)', () => {
		const sorted = sortRepositories(sampleRepos, 'stars-desc');

		expect(sorted.map((r) => r.name)).toEqual(['repo-a', 'repo-b', 'repo-c']);
		expect(sorted.map((r) => r.stargazers_count)).toEqual([100, 50, 10]);
	});

	it('sorts by stars ascending (fewest stars)', () => {
		const sorted = sortRepositories(sampleRepos, 'stars-asc');

		expect(sorted.map((r) => r.name)).toEqual(['repo-c', 'repo-b', 'repo-a']);
		expect(sorted.map((r) => r.stargazers_count)).toEqual([10, 50, 100]);
	});

	it('sorts by name ascending (A-Z)', () => {
		const sorted = sortRepositories(sampleRepos, 'name-asc');

		expect(sorted.map((r) => r.name)).toEqual(['repo-a', 'repo-b', 'repo-c']);
	});

	it('sorts by name descending (Z-A)', () => {
		const sorted = sortRepositories(sampleRepos, 'name-desc');

		expect(sorted.map((r) => r.name)).toEqual(['repo-c', 'repo-b', 'repo-a']);
	});

	it('handles empty repository list', () => {
		const sorted = sortRepositories([], 'stars-desc');

		expect(sorted).toEqual([]);
	});

	it('does not mutate the original array', () => {
		const originalCopy = [...sampleRepos];
		sortRepositories(sampleRepos, 'stars-asc');

		expect(sampleRepos).toEqual(originalCopy);
	});
});
