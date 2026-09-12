import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import InputSearch from './index';

describe('InputSearch', () => {
	const onSearchMock = vi.fn();
	const onClearMock = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls onSearch on form submit', async () => {
		const user = userEvent.setup();
		render(
			<InputSearch
				label="Search"
				placeholder="Type here"
				onSearch={onSearchMock}
			/>,
		);

		const input = screen.getByRole('textbox', { name: 'Type here' });
		await user.type(input, 'query term');
		await user.click(screen.getByRole('button', { name: 'Search' }));

		expect(onSearchMock).toHaveBeenCalledWith('query term');
	});

	it('calls onSearch when pressing Enter', async () => {
		const user = userEvent.setup();
		render(
			<InputSearch
				label="Search"
				placeholder="Type here"
				onSearch={onSearchMock}
			/>,
		);

		const input = screen.getByRole('textbox', { name: 'Type here' });
		await user.type(input, 'query term');
		await user.keyboard('{Enter}');

		expect(onSearchMock).toHaveBeenCalledWith('query term');
	});

	it('renders error message when error prop is provided', () => {
		render(
			<InputSearch
				label="Search"
				placeholder="Type here"
				error="Some error"
				onSearch={onSearchMock}
			/>,
		);

		expect(screen.getByRole('alert')).toHaveTextContent('Some error');
	});

	it('shows loading state on the submit button', () => {
		render(
			<InputSearch
				label="Search"
				placeholder="Type here"
				isLoading={true}
				onSearch={onSearchMock}
			/>,
		);

		const button = screen.getByRole('button', { name: 'Searching...' });
		expect(button).toBeDisabled();
	});

	it('shows clear button when input has content and calls onClear when clicked', async () => {
		const user = userEvent.setup();
		render(
			<InputSearch
				label="Search"
				placeholder="Type here"
				onSearch={onSearchMock}
				onClear={onClearMock}
			/>,
		);

		const input = screen.getByRole('textbox', { name: 'Type here' });
		expect(
			screen.queryByRole('button', {
				name: 'Clear search and return to homepage',
			}),
		).not.toBeInTheDocument();

		await user.type(input, 'query term');
		const clearButton = await screen.findByRole('button', {
			name: 'Clear search and return to homepage',
		});
		await user.click(clearButton);

		expect(input).toHaveValue('');
		expect(onClearMock).toHaveBeenCalledTimes(1);
	});
});
