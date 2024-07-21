import { NextFunction, Request, Response } from 'express';

import HttpCodes from '../../common/httpCodes';
import { DiscordUser } from '../../common/types/discordTypes';
import { KSI_MEMBER_ROLE_IDS } from '../config';
import {
	ADMIN_PERMISSION,
	EVERYONE_ROLE_NAME,
	getKsiGuild,
	getKsiGuildMember
} from '../modules/discordApi';
import { DiscordOAuthUser } from '../types/discordTypes';

const isGuildMember = async (discordUser: DiscordUser): Promise<boolean> => {
	const guildMember = await getKsiGuildMember(discordUser.id);
	if (guildMember === undefined) return false;
	return KSI_MEMBER_ROLE_IDS.some(validRoleId => guildMember.roles.includes(validRoleId));
};

const isGuildAdmin = async (discordUser: DiscordUser): Promise<boolean> => {
	if (!(await isGuildMember(discordUser))) return false;

	const guild = await getKsiGuild();
	if (guild === undefined) return false;
	if (guild.owner_id === discordUser.id) return true;
	const guildMember = await getKsiGuildMember(discordUser.id);
	if (guildMember === undefined) return false;

	const adminRoles = guild.roles.filter(x => (BigInt(x.permissions) & ADMIN_PERMISSION) > 0);

	return adminRoles.some(
		/* we need to check if @everyone role has admin rights
		 * (guildMember.roles doesn't include this role for obvious reasons)
		 * very unlikely though
		 */
		role => role.name === EVERYONE_ROLE_NAME || guildMember.roles.includes(role.id)
	);
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

export const checkGuildMember = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) return res.sendStatus(HttpCodes.FORBIDDEN);
	const discordUser = tryGetDiscordUser(req);
	if (discordUser === undefined) return res.sendStatus(HttpCodes.FORBIDDEN);
	const guildMember = await isGuildMember(discordUser);
	if (!guildMember) return res.sendStatus(HttpCodes.FORBIDDEN);
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
