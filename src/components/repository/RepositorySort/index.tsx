import type { RepositorySortOption } from '@/types/github';

interface RepositorySortProps {
	value: RepositorySortOption;
	onChange: (option: RepositorySortOption) => void;
}

const RepositorySort = ({ value, onChange }: RepositorySortProps) => {
	return (
		<div className="d-flex align-items-center gap-2">
			<label
				htmlFor="repository-sort-select"
				className="form-label mb-0 text-secondary fs-6 fw-semibold text-nowrap"
			>
				Sort by:
			</label>
			<select
				id="repository-sort-select"
				className="form-select bg-dark text-light border-secondary"
				data-bs-theme="dark"
				value={value}
				onChange={(e) => onChange(e.target.value as RepositorySortOption)}
				aria-label="Sort repositories"
			>
				<option value="stars-desc">Most stars</option>
				<option value="stars-asc">Fewest stars</option>
				<option value="name-asc">Name (A-Z)</option>
				<option value="name-desc">Name (Z-A)</option>
			</select>
		</div>
	);
};

export default RepositorySort;
