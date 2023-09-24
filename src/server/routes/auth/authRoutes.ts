import { Router } from 'express';
import passport from 'passport';

import { DiscordUser } from '../../../common/types/discordTypes';
import { BooleanResponse } from '../../../common/types/responseTypes';
import { DSICORD_AUTH_SCOPES, KSI_GUILD_ID } from '../../config';
import { checkAuth } from '../../utility/auth';

const router = Router();

router.get('/login', passport.authenticate('discord', { scope: DSICORD_AUTH_SCOPES }));

router.get(
	'/callback',
	passport.authenticate('discord', { failureRedirect: '/', successRedirect: '/' })
);

router.get('/logout', function (req, res) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	req.logout({ keepSessionInfo: false }, _err => {});
	res.redirect('/');
});

router.get('/isAuth', checkAuth, (req, res) => {
	res.sendStatus(200);
});

router.get('/getUser', checkAuth, (req, res) => {
	res.send(req.user);
});

router.get('/isKsiMember', checkAuth, (req, res) => {
	const discordUser = req.user as DiscordUser;
	const guild = discordUser.guilds;
	const isMember = guild.filter(x => x.id == KSI_GUILD_ID).length > 0;
	const result: BooleanResponse = {
		result: isMember
	};
	res.send(result);
});

export = router;
