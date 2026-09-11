interface InputProps {
	placeholder?: string;
}

const Input = ({ placeholder = 'Placeholder' }: InputProps) => {
	return (
		<input
			type="text"
			className="form-control"
			placeholder={placeholder}
			aria-label={placeholder}
			aria-describedby="button-addon2"
			style={{ fontSize: '1.8rem' }}
		/>
	);
};

export default Input;
