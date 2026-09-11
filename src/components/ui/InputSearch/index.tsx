import { ButtonSearch } from '@/components/ui/Buttons/index';
import Input from '@/components/ui/Input';

interface InputSearchProps {
	label?: string;
	placeholder?: string;
}

const InputSearch = ({
	label = 'Label',
	placeholder = 'Placeholder',
}: InputSearchProps) => {
	return (
		<div className="input-group mb-0" data-bs-theme="dark">
			<Input placeholder={placeholder} />
			<ButtonSearch label={label} />
		</div>
	);
};

export default InputSearch;
