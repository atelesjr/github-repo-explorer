interface ButtonClearProps {
	onClick: () => void;
	disabled?: boolean;
}

const ButtonClear = ({ onClick, disabled = false }: ButtonClearProps) => {
	return (
		<button
			className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-white p-2 fs-3 me-n1"
			type="button"
			aria-label="Clear search and return to homepage"
			onClick={onClick}
			disabled={disabled}
		>
			<i className="bi bi-x" aria-hidden="true" />
		</button>
	);
};

export default ButtonClear;
