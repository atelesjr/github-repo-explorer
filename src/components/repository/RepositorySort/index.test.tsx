import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RepositorySort from './index';

describe('RepositorySort', () => {
	it('renders select with accessible label and default value', () => {
		const onChange = vi.fn();
		render(<RepositorySort value="stars-desc" onChange={onChange} />);

		const select = screen.getByRole('combobox', { name: 'Sort repositories' });
		expect(select).toBeInTheDocument();
		expect(select).toHaveValue('stars-desc');

		const options = screen.getAllByRole('option');
		expect(options).toHaveLength(4);
		expect(options[0]).toHaveTextContent('Most stars');
		expect(options[1]).toHaveTextContent('Fewest stars');
		expect(options[2]).toHaveTextContent('Name (A-Z)');
		expect(options[3]).toHaveTextContent('Name (Z-A)');
	});

	it('calls onChange when user selects a different option', async () => {
		const onChange = vi.fn();
		const user = userEvent.setup();
		render(<RepositorySort value="stars-desc" onChange={onChange} />);

		const select = screen.getByRole('combobox', { name: 'Sort repositories' });
		await user.selectOptions(select, 'name-asc');

		expect(onChange).toHaveBeenCalledWith('name-asc');
	});
});
