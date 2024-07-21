import { isNotNull } from '../../common/typeGuards';
import { BotSettings } from '../../common/types/botTypes';

class _BotSettingsManager {
	#botSettings: BotSettings | null;

	constructor() {
		this.#botSettings = null;
	}

	async getSettings() {
		if (isNotNull(this.#botSettings)) {
			return this.#botSettings;
		}
		this.#botSettings = await this.#fetchSettings();
		return this.#botSettings;
	}

	/* Fetch settings from source (ex. database)
	 */
	async #fetchSettings(): Promise<BotSettings> {
		// simulate delay
		await new Promise<void>(function (resolve) {
			setTimeout(function () {
				resolve();
			}, 1000);
		});

		return {
			welcomeMessage: 'Hi!',
			setAutorole: true
		};
	}

	async updateSettings(newSettings: BotSettings): Promise<void> {
		this.#botSettings = { ...newSettings };
	}
}

const BotSettingsManager = new _BotSettingsManager();

export default BotSettingsManager;
