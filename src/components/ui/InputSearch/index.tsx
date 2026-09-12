import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonClear, ButtonSearch } from '@/components/ui/Buttons/index';
import Input from '@/components/ui/Input';
import { useUserSearch } from '@/components/ui/InputSearch/hooks/useUserSearch';

interface InputSearchProps {
	label?: string;
	placeholder?: string;
}

const InputSearch = ({
	label = 'Label',
	placeholder = 'Placeholder',
}: InputSearchProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [hasContent, setHasContent] = useState(false);
	const navigate = useNavigate();
	const { error, isLoading, searchUser } = useUserSearch();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		void searchUser(inputRef.current?.value ?? '');
	};

	const clearSearch = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.focus();
			setHasContent(false);
		}

		navigate('/');
	};

	return (
		<form onSubmit={handleSubmit} aria-label="Search GitHub user">
			<label htmlFor="github-username" className="visually-hidden">
				{placeholder}
			</label>
			<div className="input-group mb-0" data-bs-theme="dark">
				<div className="position-relative flex-grow-1">
					<Input
						placeholder={placeholder}
						inputRef={inputRef}
						id="github-username"
						ariaDescribedBy={error ? 'github-search-error' : undefined}
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
					id="github-search-error"
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
