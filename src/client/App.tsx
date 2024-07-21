import React from 'react';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SettingsPage from './components/pages/SettingsPage';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { isLoggedIn } from './utils/auth';

/*
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
		),
		children: [
			{
				path: 'settings',
				element: <div>XDDD</div>
			}
		]
	},
	{
		path: '/login',
		element: <LoginPage />
	}
]);*/
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route
				path=""
				element={
					<ProtectedRoute
						element={<HomePage />}
						loadingElement={<div>LOADING</div>}
						fallbackRoute="/login"
						authFunction={isLoggedIn}
					/>
				}
			>
				<Route path="settings" element={<SettingsPage />} />
			</Route>
			<Route path="login" element={<LoginPage />} />
		</Route>
	)
);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
