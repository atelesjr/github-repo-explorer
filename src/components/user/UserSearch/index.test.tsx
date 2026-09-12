import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserSearch from './index';
import { useUserSearch } from '@/components/user/UserSearch/useUserSearch';
import { getUser } from '@/services/userService';

vi.mock('@/services/userService', () => ({
	getUser: vi.fn(),
}));

const mockedGetUser = vi.mocked(getUser);

function LocationDisplay() {
	const location = useLocation();

	return <output data-testid="location">{location.pathname}</output>;
}

function HookHarness() {
	const { error, isLoading, searchUser } = useUserSearch();

	return (
		<div>
			<button type="button" onClick={() => void searchUser('octocat')}>
				Search hook
			</button>
			<span data-testid="hook-loading">{String(isLoading)}</span>
			<span data-testid="hook-error">{error}</span>
		</div>
	);
}

function renderUserSearch() {
	return render(
		<MemoryRouter initialEntries={['/']}>
			<UserSearch />
			<LocationDisplay />
		</MemoryRouter>,
	);
}

describe('UserSearch', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('searches user on submit and navigates to user page', async () => {
		mockedGetUser.mockResolvedValue({} as Awaited<ReturnType<typeof getUser>>);
		const user = userEvent.setup();
		renderUserSearch();

		await user.type(
			screen.getByRole('textbox', { name: 'Username' }),
			'octocat',
		);
		await user.click(screen.getByRole('button', { name: 'Github User' }));

		await waitFor(() => {
			expect(mockedGetUser).toHaveBeenCalledWith('octocat');
			expect(screen.getByTestId('location')).toHaveTextContent(
				'/users/octocat',
			);
		});
	});

	it('shows an error when the user is not found', async () => {
		mockedGetUser.mockRejectedValue(new Error('Not found'));
		const user = userEvent.setup();
		renderUserSearch();

		await user.type(
			screen.getByRole('textbox', { name: 'Username' }),
			'unknown',
		);
		await user.click(screen.getByRole('button', { name: 'Github User' }));

		expect(await screen.findByRole('alert')).toHaveTextContent(
			'Usuário não encontrado.',
		);
	});

	it('clears input and navigates home when clear button is clicked', async () => {
		const user = userEvent.setup();
		renderUserSearch();

		const input = screen.getByRole('textbox', { name: 'Username' });
		await user.type(input, 'octocat');

		const clearButton = await screen.findByRole('button', {
			name: 'Clear search and return to homepage',
		});
		await user.click(clearButton);

		expect(input).toHaveValue('');
		expect(screen.getByTestId('location')).toHaveTextContent('/');
	});
});

describe('useUserSearch hook', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('exposes loading state and navigates after a successful search', async () => {
		let resolveUser: (
			value: Awaited<ReturnType<typeof getUser>>,
		) => void = () => {};
		mockedGetUser.mockImplementation(
			() =>
				new Promise((resolve) => {
					resolveUser = resolve;
				}),
		);

		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/']}>
				<HookHarness />
				<LocationDisplay />
			</MemoryRouter>,
		);

		await user.click(screen.getByRole('button', { name: 'Search hook' }));
		expect(screen.getByTestId('hook-loading')).toHaveTextContent('true');

		resolveUser({} as Awaited<ReturnType<typeof getUser>>);

		await waitFor(() => {
			expect(screen.getByTestId('hook-loading')).toHaveTextContent('false');
			expect(screen.getByTestId('location')).toHaveTextContent(
				'/users/octocat',
			);
		});
	});
});
