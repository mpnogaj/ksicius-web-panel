import { NextFunction, Request, Response } from 'express';

import HttpCodes from '../../common/httpCodes';
import { DiscordUser } from '../../common/types/discordTypes';
import { KSI_GUILD_ID } from '../config';
import {
	ADMIN_PERMISSION,
	EVERYONE_ROLE_NAME,
	getKsiGuild,
	getKsiGuildMember
} from '../modules/discordApi';
import { DiscordOAuthUser } from '../types/discordTypes';

const isGuildMember = (discordUser: DiscordUser): boolean => {
	const guilds = discordUser.guilds;
	const guildIds = guilds.map(x => x.id);
	return guildIds.includes(KSI_GUILD_ID);
};

const isGuildAdmin = async (discordUser: DiscordUser): Promise<boolean> => {
	if (!isGuildMember(discordUser)) return false;

	const guild = await getKsiGuild();
	if (guild === undefined) return false;
	if (guild.owner_id === discordUser.id) return true;
	const guildMember = await getKsiGuildMember(discordUser.id);
	if (guildMember === undefined) return false;

	const adminRoles = guild.roles.filter(x => (BigInt(x.permissions) & ADMIN_PERMISSION) > 0);

	for (const adminRole of adminRoles) {
		/* guildMember.roles for some reason doesn't include @everyone role id so we
		 * need to check role name too */
		if (adminRole.name === EVERYONE_ROLE_NAME || guildMember.roles.includes(adminRole.id)) {
			return true;
		}
	}
	return false;
};

const tryGetDiscordUser = (req: Request): DiscordUser | undefined => {
	try {
		const oauthUser = req.user as DiscordOAuthUser;
		const discordUser = oauthUser.profile;
		return discordUser;
	} catch (ex) {
		console.error(ex);
		return undefined;
	}
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) return res.sendStatus(HttpCodes.FORBIDDEN);
	return next();
};

export const checkGuildMember = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) return res.sendStatus(HttpCodes.FORBIDDEN);
	const discordUser = tryGetDiscordUser(req);
	if (discordUser === undefined) return res.sendStatus(HttpCodes.FORBIDDEN);
	if (!isGuildMember(discordUser)) return res.sendStatus(HttpCodes.FORBIDDEN);
	return next();
};

export const checkGuildAdmin = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) return res.sendStatus(HttpCodes.FORBIDDEN);
	const discordUser = tryGetDiscordUser(req);
	if (discordUser === undefined) return res.sendStatus(HttpCodes.FORBIDDEN);
	const guildAdmin = await isGuildAdmin(discordUser);
	if (!guildAdmin) return res.sendStatus(HttpCodes.FORBIDDEN);
	return next();
};
