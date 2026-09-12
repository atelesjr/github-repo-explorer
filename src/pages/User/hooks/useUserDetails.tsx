import { useEffect, useReducer } from 'react';
import { getUser } from '@/services/userService';
import { reducer, initialState } from '../reducer/useDetailsReducer';

export const useUserDetails = (username: string | undefined) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (!username) {
			dispatch({ type: 'RESET' });
			return;
		}

		let isMounted = true;
		dispatch({ type: 'FETCH_START' });

		getUser(username)
			.then((data) => {
				if (isMounted) dispatch({ type: 'FETCH_SUCCESS', payload: data });
			})
			.catch(() => {
				if (isMounted)
					dispatch({ type: 'FETCH_ERROR', payload: 'Usuário não encontrado.' });
			});

		return () => {
			isMounted = false;
		};
	}, [username]);

	return state;
};
