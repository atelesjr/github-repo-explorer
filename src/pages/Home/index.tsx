const Home = () => {
	return (
		<div className="py-5 text-center">
			<h1 className="display-5 fw-bold text-white mb-5">
				Explore GitHub Users &amp; Repositories
			</h1>
			<p
				className="lead text-secondary mx-auto fs-2 mb-5"
				style={{ maxWidth: '640px' }}
			>
				Search for a GitHub user, explore their repositories, compare repository
				popularity by stars, and view detailed repository information.
			</p>
			<p className="text-secondary fs-3">
				Enter a GitHub username above to get started.
			</p>
		</div>
	);
};

export default Home;
