import { useNavigate } from 'react-router-dom';
import InputSearch from '@/components/ui/InputSearch';
import { useUserSearch } from '@/components/user/UserSearch/hooks/useUserSearch';

const UserSearch = () => {
	const navigate = useNavigate();
	const { error, isLoading, searchUser, reset } = useUserSearch();

	const handleClear = () => {
		reset();
		navigate('/');
	};

	return (
		<div className="user-search">
			<InputSearch
				label="Search User"
				placeholder="GitHub Username"
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
