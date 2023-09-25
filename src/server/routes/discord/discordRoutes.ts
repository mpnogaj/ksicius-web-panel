import { Response, Router } from 'express';

import { BooleanResponse } from '../../../common/types/responseTypes';
import { DiscordOAuthUser } from '../../types/discordTypes';
import { checkAuth } from '../../utility/auth';
import {
	ADMIN_PERMISSION,
	EVERYONE_ROLE_NAME,
	getKsiGuild,
	getKsiGuildMember
} from '../../utility/discordApi';

const router = Router();

router.get('/isServerAdmin', checkAuth, async (req, res: Response<BooleanResponse>) => {
	const discordUser = (req.user as DiscordOAuthUser).profile;
	const guild = await getKsiGuild();
	if (guild === undefined) {
		console.error('Guild is undefined');
		res.send({ result: false });
		return;
	}
	if (guild.owner_id === discordUser.id) {
		res.send({ result: true });
		return;
	}
	const guildMember = await getKsiGuildMember(discordUser.id);
	console.log(guildMember);
	if (guildMember === undefined) {
		console.error('Guild member is undefined');
		res.send({ result: false });
		return;
	}
	const adminRoles = guild.roles.filter(x => (BigInt(x.permissions) & ADMIN_PERMISSION) > 0);

	for (const adminRole of adminRoles) {
		/* guildMember.roles for some reason doesn't include @everyone role id so we
		 * need to check role name too */
		if (adminRole.name === EVERYONE_ROLE_NAME || guildMember.roles.includes(adminRole.id)) {
			res.send({ result: true });
			return;
		}
	}
	res.send({ result: false });
});

export = router;
