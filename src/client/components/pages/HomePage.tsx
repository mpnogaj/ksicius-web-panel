import axios from 'axios';
import React from 'react';

import { DiscordUser } from '../../../common/types/discordTypes';
import { BooleanResponse } from '../../../common/types/responseTypes';
import Endpoints from '../../endpoints';
import { empty } from '../../types/others';

interface ICompState {
	isLoading: boolean;
	username: string;
	memberOfGuild: boolean;
	isAdmin: boolean;
	error: boolean;
}

class HomePage extends React.Component<empty, ICompState> {
	constructor(props: empty) {
		super(props);
		this.state = {
			isLoading: true,
			username: '',
			memberOfGuild: false,
			isAdmin: false,
			error: false
		};
	}

	loadUsername = async (): Promise<string | null> => {
		try {
			const resp = await axios.get<DiscordUser>(Endpoints.AUTH_GET_USER);
			return resp.data.username;
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	loadIsMember = async (): Promise<boolean | null> => {
		try {
			const resp = await axios.get<BooleanResponse>(Endpoints.AUTH_IS_KSI_MEMBER);
			return resp.data.result;
		} catch (ex) {
			console.error(ex);
			return null;
		}
	};

	loadIsAdmin = async (): Promise<boolean> => {
		try {
			const resp = await axios.get<BooleanResponse>(Endpoints.DISCORD_IS_SERVER_ADMIN);
			return resp.data.result;
		} catch (ex) {
			console.error(ex);
			return false;
		}
	};

	loadUserData = async () => {
		const username = await this.loadUsername();
		const isMember = await this.loadIsMember();
		if (username === null || isMember === null) {
			this.setState({ isLoading: false, error: true });
		} else {
			const isAdmin = await this.loadIsAdmin();
			this.setState({
				isLoading: false,
				username: username,
				memberOfGuild: isMember,
				isAdmin: isAdmin,
				error: false
			});
		}
	};

	async componentDidMount() {
		this.loadUserData();
	}

	render(): React.ReactNode {
		if (this.state.isLoading) return <h1>Loading...</h1>;
		return (
			<div>
				{this.state.error ? (
					<h1> ERROR </h1>
				) : (
					<div>
						<h1>Hi {this.state.username}</h1>
						<h1>
							{this.state.memberOfGuild ? 'You are a KSI member' : 'You are not a KSI member'}
						</h1>
						<h1>{this.state.isAdmin ? 'Admin' : "Adminn't"}</h1>
					</div>
				)}

				<a href={Endpoints.AUTH_LOGOUT}>Logout</a>
			</div>
		);
	}
}

export default HomePage;
