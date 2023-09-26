import { Router } from 'express';
import passport from 'passport';

import HttpCodes from '../../../common/httpCodes';
import { DSICORD_AUTH_SCOPES } from '../../config';
import { checkAuth, checkGuildAdmin, checkGuildMember } from '../../middleware/authMiddleware';
import { DiscordOAuthUser } from '../../types/discordTypes';

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
	res.sendStatus(HttpCodes.OK);
});

router.get('/getUser', checkAuth, (req, res) => {
	const oauthUser = req.user as DiscordOAuthUser;
	res.send(oauthUser.profile);
});

router.get('/isKsiGuildMember', checkGuildMember, (req, res) => {
	res.sendStatus(HttpCodes.OK);
});

router.get('/isGuildAdmin', checkGuildAdmin, (_req, res) => {
	res.sendStatus(HttpCodes.OK);
});

export = router;
