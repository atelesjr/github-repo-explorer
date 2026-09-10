import Logo from '../../ui/logo';

const Header = () => {
	return (
		<div
			className="header fixed-top d-flex justify-content-start align-items-center gap-4 bg-black"
			style={{ height: '100px' }}
		>
			<Logo />
			<h1>GitHub Repo Explorer</h1>
		</div>
	);
};

export default Header;
