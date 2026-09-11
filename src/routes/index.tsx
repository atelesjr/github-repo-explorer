import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Repository from '../pages/Repository.tsx';
import User from '../pages/User';

function NotFound() {
	return (
		<div className="py-4">
			<h1>Página não encontrada</h1>
		</div>
	);
}

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/users/:username" element={<User />} />
			<Route
				path="/users/:username/repos/:repoName"
				element={<Repository />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
