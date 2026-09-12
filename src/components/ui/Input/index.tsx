import type { RefObject } from 'react';

interface InputProps {
	placeholder?: string;
	inputRef?: RefObject<HTMLInputElement | null>;
	id?: string;
	ariaDescribedBy?: string;
	ariaInvalid?: boolean;
	onInput?: (value: string) => void;
}

const Input = ({
	placeholder = 'Placeholder',
	inputRef,
	id,
	ariaDescribedBy,
	ariaInvalid,
	onInput,
}: InputProps) => {
	return (
		<input
			type="text"
			className="form-control border-secondary pe-5"
			placeholder={placeholder}
			ref={inputRef}
			id={id}
			aria-describedby={ariaDescribedBy}
			aria-invalid={ariaInvalid}
			name="username"
			onInput={(event) => onInput?.(event.currentTarget.value)}
			style={{ fontSize: '1.8rem' }}
		/>
	);
};

export default Input;
