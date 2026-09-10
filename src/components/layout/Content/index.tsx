const Content = () => {
	return (
		<div
			className="content"
			style={{ paddingTop: '120px', minHeight: '150vh' }}
		>
			{Array.from({ length: 30 }, (_, index) => (
				<p key={index}>Conteúdo de teste {index + 1}</p>
			))}
		</div>
	);
};

export default Content;
