interface ButtonSearchProps {
	label?: string;
	disabled?: boolean;
}

const ButtonSearch = ({
	label = 'Search',
	disabled = false,
}: ButtonSearchProps) => {
	return (
		<button
			className="btn btn-outline-secondary"
			type="submit"
			id="button-addon2"
			disabled={disabled}
			style={{ fontSize: '1.8rem' }}
		>
			{label}
		</button>
	);
};

export default ButtonSearch;
