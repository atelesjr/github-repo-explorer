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
}
