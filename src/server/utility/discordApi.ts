import axios from 'axios';

import { BOT_TOKEN, DISCORD_API_BASE, KSI_GUILD_ID } from '../config';
import { DiscordGuild, DiscordGuildMember } from '../types/discordTypes';

const botAuthConfig = {
	headers: {
		Authorization: `Bot ${BOT_TOKEN}`
	}
};

const makeBotGetRequest = async <T>(apiPath: string): Promise<T | undefined> => {
	try {
		const resp = await axios.get(`${DISCORD_API_BASE}${apiPath}`, botAuthConfig);
		return resp.data as T;
	} catch (ex) {
		console.error(ex);
		return undefined;
	}
};

export const getKsiGuild = async () => {
	return makeBotGetRequest<DiscordGuild>(`/guilds/${KSI_GUILD_ID}`);
};

export const getKsiGuildMember = async (userId: string) => {
	return makeBotGetRequest<DiscordGuildMember>(`/guilds/${KSI_GUILD_ID}/members/${userId}`);
};

export const EVERYONE_ROLE_NAME = '@everyone';

export const ADMIN_PERMISSION = BigInt('0x8');
