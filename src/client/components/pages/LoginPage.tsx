import React from 'react';

import Endpoints from '../../endpoints';

class HomePage extends React.Component {
	render(): React.ReactNode {
		return (
			<div>
				<a href={Endpoints.AUTH_LOGIN}>Login</a>
			</div>
		);
	}
}

export default HomePage;
