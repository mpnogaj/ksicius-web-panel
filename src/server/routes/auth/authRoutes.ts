import { Router } from 'express';
import passport from 'passport';

import { DSICORD_AUTH_SCOPES } from '../../config';
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

export = router;
