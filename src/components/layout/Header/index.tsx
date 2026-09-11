import Logo from '../../ui/Logo';
import UserSearch from '../../user/UserSearch';

const Header = () => {
	return (
		<header
			className="header fixed-top d-flex align-items-center bg-black"
			style={{ height: '100px', padding: '0 10rem' }}
		>
			<div className="d-flex align-items-center gap-4">
				<Logo />
				<h1 className="text-white fs-2">GitHub Repo Explorer</h1>
			</div>
			<div className="search ms-auto">
				<UserSearch />
			</div>
		</header>
	);
};

export default Header;
