import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserSearch from './index';
import { getUser } from '@/services/userService';

vi.mock('@/services/userService', () => ({
	getUser: vi.fn(),
}));

const mockedGetUser = vi.mocked(getUser);

function LocationDisplay() {
	const location = useLocation();

	return <output data-testid="location">{location.pathname}</output>;
}

function renderUserSearch() {
	return render(
		<MemoryRouter initialEntries={['/']}>
			<UserSearch />
			<LocationDisplay />
		</MemoryRouter>,
	);
}

describe('UserSearch Component', () => {
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

	it('clears input, resets error, and navigates home when clear button is clicked', async () => {
		mockedGetUser.mockRejectedValue(new Error('Not found'));
		const user = userEvent.setup();
		renderUserSearch();

		const input = screen.getByRole('textbox', { name: 'Username' });
		await user.type(input, 'unknown');
		await user.click(screen.getByRole('button', { name: 'Github User' }));

		expect(await screen.findByRole('alert')).toHaveTextContent(
			'Usuário não encontrado.',
		);

		const clearButton = screen.getByRole('button', {
			name: 'Clear search and return to homepage',
		});
		await user.click(clearButton);

		expect(input).toHaveValue('');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		expect(screen.getByTestId('location')).toHaveTextContent('/');
	});
});
