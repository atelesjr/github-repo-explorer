import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/services/userService';

interface UseUserSearchResult {
	error: string;
	isLoading: boolean;
	searchUser: (username: string) => Promise<void>;
	reset: () => void;
}

export const useUserSearch = (): UseUserSearchResult => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const searchUser = async (username: string) => {
		const trimmedUsername = username.trim();

		if (!trimmedUsername || isLoading) {
			return;
		}

		setError('');
		setIsLoading(true);

		try {
			await getUser(trimmedUsername);
			navigate(`/users/${encodeURIComponent(trimmedUsername)}`);
		} catch {
			setError('Usuário não encontrado.');
		} finally {
			setIsLoading(false);
		}
	};

	const reset = () => {
		setError('');
	};

	return { error, isLoading, searchUser, reset };
};
