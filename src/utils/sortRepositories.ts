import type { GitHubRepository, RepositorySortOption } from '@/types/github';

export const sortRepositories = (
	repositories: GitHubRepository[],
	sortOption: RepositorySortOption,
): GitHubRepository[] => {
	const sorted = [...repositories];

	switch (sortOption) {
		case 'stars-desc':
			return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
		case 'stars-asc':
			return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count);
		case 'name-asc':
			return sorted.sort((a, b) =>
				a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
			);
		case 'name-desc':
			return sorted.sort((a, b) =>
				b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }),
			);
		default:
			return sorted;
	}
};
