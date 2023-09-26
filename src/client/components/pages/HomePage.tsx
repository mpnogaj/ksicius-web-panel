import axios from 'axios';
import React from 'react';

import HttpCodes from '../../../common/httpCodes';
import { DiscordUser } from '../../../common/types/discordTypes';
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

	loadIsMember = async (): Promise<boolean> => {
		try {
			const resp = await axios.get(Endpoints.AUTH_IS_GUILD_MEMBER);
			return resp.status === HttpCodes.OK;
		} catch (ex) {
			return false;
		}
	};

	loadIsAdmin = async (): Promise<boolean> => {
		try {
			const resp = await axios.get(Endpoints.AUTH_IS_GUILD_ADMIN);
			return resp.status === HttpCodes.OK;
		} catch (ex) {
			return false;
		}
	};

	loadUserData = async () => {
		const username = await this.loadUsername();
		if (username === null) {
			this.setState({ isLoading: false, error: true });
		} else {
			const isMember = await this.loadIsMember();
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

	componentDidMount() {
		this.loadUserData().catch(x => console.error(x));
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
