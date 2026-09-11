import { ButtonSearch } from '../Buttons';

interface InputProps {
	label?: string;
	placeholder?: string;
}

const Input = ({
	label = 'Label',
	placeholder = 'Placeholder',
}: InputProps) => {
	return (
		<div className="input-group mb-0" data-bs-theme="dark">
			<input
				type="text"
				className="form-control"
				placeholder={placeholder}
				aria-label={placeholder}
				aria-describedby="button-addon2"
				style={{ fontSize: '1.8rem' }}
			/>
			<ButtonSearch label={label} />
		</div>
	);
};

export default Input;
