import { ReactNode } from 'react';
import React from 'react';
import { Navigate } from 'react-router';

interface IProtectedRouteProps {
	element: ReactNode;
	loadingElement: ReactNode;
	fallbackRoute: string;
	authFunction: () => Promise<boolean>;
}

interface IProtectedRouteState {
	canAccess: boolean | undefined;
}

class ProtectedRoute extends React.Component<IProtectedRouteProps, IProtectedRouteState> {
	componentMounted = false;

	constructor(props: IProtectedRouteProps) {
		super(props);
		this.state = {
			canAccess: undefined
		};
	}

	componentDidMount(): void {
		this.componentMounted = true;
		this.props.authFunction().then(val => {
			if (this.componentMounted) this.setState({ canAccess: val });
		});
	}

	componentWillUnmount(): void {
		this.componentMounted = false;
	}

	render() {
		if (this.state.canAccess === undefined) return this.props.loadingElement;
		else if (this.state.canAccess) return this.props.element;
		else return <Navigate to={this.props.fallbackRoute} />;
	}
}

export default ProtectedRoute;
