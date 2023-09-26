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
	const guild = makeBotGetRequest<DiscordGuild>(`/guilds/${KSI_GUILD_ID}`);
	if (guild === undefined) console.error('Could not fetch KSI guild.');
	return guild;
};

export const getKsiGuildMember = async (userId: string) => {
	const guildMember = makeBotGetRequest<DiscordGuildMember>(
		`/guilds/${KSI_GUILD_ID}/members/${userId}`
	);
	if (guildMember === undefined)
		console.error(`Could not fetch guild member with given user id: ${userId}.`);
	return guildMember;
};

export const EVERYONE_ROLE_NAME = '@everyone';

export const ADMIN_PERMISSION = BigInt('0x8');
