import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { isLoggedIn } from './utils/auth';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute
				element={<HomePage />}
				loadingElement={<div>LOADING</div>}
				fallbackRoute="/login"
				authFunction={isLoggedIn}
			/>
		)
	},
	{
		path: '/login',
		element: <LoginPage />
	}
]);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
