import axios from 'axios';
import React from 'react';

import { isNotNull } from '../../../common/typeGuards';
import { BotSettings } from '../../../common/types/botTypes';
import Endpoints from '../../endpoints';
import { empty } from '../../types/others';
import BooleanSettingEditor from '../BooleanSettingEditor';
import StringSettingEditor from '../StringSettingEditor';

interface ICompState {
	botSettings: BotSettings | null;
}

class SettingsPage extends React.Component<empty, ICompState> {
	constructor(props: empty) {
		super(props);
		this.state = {
			botSettings: null
		};
	}

	async componentDidMount(): Promise<void> {
		try {
			const resp = await axios.get<BotSettings>(Endpoints.SETTINGS_FETCH);
			console.log(resp.data);
			this.setState({
				botSettings: resp.data
			});
		} catch (err) {
			console.error(err);
			alert('Error occured while fetching bot settings');
		}
	}

	updateSettings = <K extends keyof BotSettings>(
		oldSettings: BotSettings,
		newSettings: Pick<BotSettings, K> | BotSettings | null
	) => {
		this.setState({ botSettings: Object.assign(oldSettings, newSettings) });
	};

	saveChanges = async () => {
		try {
			await axios.put(Endpoints.SETTINGS_UPDATE, this.state.botSettings);
			alert('Changes saved successfully');
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		const settings = this.state.botSettings;
		if (!isNotNull(settings)) {
			return <div>Fetching settings</div>;
		}
		return (
			<div>
				<StringSettingEditor
					settingName="Welcome message"
					value={settings.welcomeMessage}
					valueChanged={(oldValue, newValue) =>
						this.updateSettings(settings, { welcomeMessage: newValue })
					}
				/>
				<BooleanSettingEditor
					settingName="Autorole enabled"
					value={settings.setAutorole}
					valueChanged={(oldValue, newValue) => {
						this.updateSettings(settings, { setAutorole: newValue });
					}}
				/>
				<button type="button" onClick={() => this.saveChanges()}>
					Save changes
				</button>
			</div>
		);
	}
}

export default SettingsPage;
