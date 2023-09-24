export type DiscordUser = {
	id: string;
	username: string;
	guilds: DiscordGuild[];
};

export type DiscordGuild = {
	id: string;
	name: string;
};
