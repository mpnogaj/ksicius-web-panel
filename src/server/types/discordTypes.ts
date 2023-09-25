import { DiscordGuildPartial, DiscordUser } from '../../common/types/discordTypes';

export type DiscordOAuthUser = {
	profile: DiscordUser;
	accessToken: string;
};

export type DiscordRole = {
	id: string;
	name: string;
	permissions: string;
};

export type DiscordGuild = DiscordGuildPartial & {
	owner_id: string;
	roles: DiscordRole[];
};

export type DiscordGuildMember = {
	user: DiscordUser;
	roles: string[];
};
