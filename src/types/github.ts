export interface GitHubUser {
	login: string;
	id: number;
	avatar_url: string;
	name: string | null;
	bio: string | null;
	location: string | null;
	public_repos: number;
	followers: number;
	following: number;
	html_url: string;
	email?: string | null;
}

export interface GitHubRepository {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	private: boolean;
	html_url: string;
	language: string | null;
	forks_count: number;
	stargazers_count: number;
	open_issues_count: number;
	created_at: string;
	updated_at: string;
	pushed_at: string | null;
	owner: Pick<GitHubUser, 'login' | 'id' | 'avatar_url' | 'html_url'>;
}

export type RepositorySortOption =
	| 'stars-desc'
	| 'stars-asc'
	| 'name-asc'
	| 'name-desc';
