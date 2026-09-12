import { useRef, useState, type FormEvent } from 'react';
import { ButtonClear, ButtonSearch } from '@/components/ui/Buttons/index';
import Input from '@/components/ui/Input';

export interface InputSearchProps {
	label?: string;
	placeholder?: string;
	id?: string;
	formAriaLabel?: string;
	isLoading?: boolean;
	error?: string;
	onSearch: (value: string) => void;
	onClear?: () => void;
}

const InputSearch = ({
	label = 'Search',
	placeholder = 'Placeholder',
	id = 'search-input',
	formAriaLabel = 'Search',
	isLoading = false,
	error,
	onSearch,
	onClear,
}: InputSearchProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [hasContent, setHasContent] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(inputRef.current?.value ?? '');
	};

	const clearSearch = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.focus();
			setHasContent(false);
		}

		onClear?.();
	};

	const errorId = error ? `${id}-error` : undefined;

	return (
		<form onSubmit={handleSubmit} aria-label={formAriaLabel}>
			<label htmlFor={id} className="visually-hidden">
				{placeholder}
			</label>
			<div className="input-group mb-0" data-bs-theme="dark">
				<div className="position-relative flex-grow-1">
					<Input
						placeholder={placeholder}
						inputRef={inputRef}
						id={id}
						ariaDescribedBy={errorId}
						ariaInvalid={Boolean(error)}
						onInput={(value) => setHasContent(Boolean(value.trim()))}
					/>
					{hasContent && (
						<ButtonClear onClick={clearSearch} disabled={isLoading} />
					)}
				</div>
				<ButtonSearch
					label={isLoading ? 'Searching...' : label}
					disabled={isLoading}
				/>
			</div>
			{error && (
				<div
					id={errorId}
					className="small text-danger mt-1"
					role="alert"
				>
					{error}
				</div>
			)}
		</form>
	);
};

export default InputSearch;
