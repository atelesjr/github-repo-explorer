import Header from './components/layout/Header';
import AppRoutes from './routes';

function App() {
	return (
		<div style={{ paddingLeft: '10rem', paddingRight: '10rem' }}>
			<Header />
			<main style={{ paddingTop: '12rem', minHeight: '100vh' }}>
				<AppRoutes />
			</main>
		</div>
	);
}

export default App;
