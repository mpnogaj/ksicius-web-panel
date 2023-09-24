import axios from 'axios';
import React from 'react';

import { DiscordUser } from '../../../common/types/discordTypes';
import { BooleanResponse } from '../../../common/types/responseTypes';
import Endpoints from '../../endpoints';
import { empty } from '../../types/others';

interface ICompState {
	username: string;
	memberOfGuild: boolean;
	error: boolean;
}

class HomePage extends React.Component<empty, ICompState> {
	constructor(props: empty) {
		super(props);
		this.state = {
			username: '',
			memberOfGuild: false,
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

	loadUserData = async () => {
		const username = await this.loadUsername();
		const isMember = await this.loadIsMember();
		if (username === null || isMember === null) {
			this.setState({ error: true });
		} else {
			this.setState({ username: username, memberOfGuild: isMember, error: false });
		}
	};

	async componentDidMount() {
		this.loadUserData();
	}

	render(): React.ReactNode {
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
					</div>
				)}

				<a href={Endpoints.AUTH_LOGOUT}>Logout</a>
			</div>
		);
	}
}

export default HomePage;
