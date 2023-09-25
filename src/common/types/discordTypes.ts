export type DiscordUser = {
	id: string;
	username: string;
	guilds: DiscordGuildPartial[];
};

export type DiscordGuildPartial = {
	id: string;
	name: string;
};
