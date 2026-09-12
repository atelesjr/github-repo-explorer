import { useNavigate } from 'react-router-dom';
import InputSearch from '@/components/ui/InputSearch';
import { useUserSearch } from '@/components/user/UserSearch/useUserSearch';

const UserSearch = () => {
	const navigate = useNavigate();
	const { error, isLoading, searchUser } = useUserSearch();

	const handleClear = () => {
		navigate('/');
	};

	return (
		<div className="user-search">
			<InputSearch
				label="Github User"
				placeholder="Username"
				id="github-username"
				formAriaLabel="Search GitHub user"
				isLoading={isLoading}
				error={error}
				onSearch={(username) => void searchUser(username)}
				onClear={handleClear}
			/>
		</div>
	);
};

export default UserSearch;
