import type { GitHubUser } from '@/types/github';

type UserDetailsState = {
	user: GitHubUser | null;
	isLoading: boolean;
	error: string | null;
};

type UserDetailsAction =
	| { type: 'RESET' }
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: GitHubUser }
	| { type: 'FETCH_ERROR'; payload: string };

export const initialState: UserDetailsState = {
	user: null,
	isLoading: false,
	error: null,
};

export const reducer = (
	state: UserDetailsState,
	action: UserDetailsAction,
): UserDetailsState => {
	switch (action.type) {
		case 'RESET':
			return initialState;
		case 'FETCH_START':
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case 'FETCH_SUCCESS':
			return {
				user: action.payload,
				isLoading: false,
				error: null,
			};
		case 'FETCH_ERROR':
			return {
				user: null,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
