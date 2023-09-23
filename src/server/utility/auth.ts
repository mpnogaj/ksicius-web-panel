import { Express, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';

import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET, DSICORD_AUTH_SCOPES } from '../config';

export const configurePassport = (app: Express) => {
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj: Express.User, done) => {
		done(null, obj);
	});

	passport.use(
		new DiscordStrategy(
			{
				clientID: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				callbackURL: CALLBACK_URL,
				scope: DSICORD_AUTH_SCOPES
			},
			function (_accessToken, _refreshToken, profile, done) {
				return done(null, profile);
			}
		)
	);

	app.use(passport.initialize());
	app.use(passport.session());
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next();
	res.sendStatus(403);
};
