const ButtonSearch = ({ label = 'Search' }: { label?: string }) => {
	return (
		<button
			className="btn btn-outline-secondary"
			type="button"
			id="button-addon2"
			style={{ fontSize: '1.8rem' }}
		>
			{label}
		</button>
	);
};

export default ButtonSearch;
