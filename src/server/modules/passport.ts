import { Express } from 'express';
import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';

import { DiscordUser } from '../../common/types/discordTypes';
import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET, DSICORD_AUTH_SCOPES } from '../config';
import { DiscordOAuthUser } from '../types/discordTypes';

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
			function (accessToken, _refreshToken, profile, done) {
				const user: DiscordOAuthUser = {
					profile: profile as DiscordUser,
					accessToken: accessToken
				};
				return done(null, user);
			}
		)
	);

	app.use(passport.initialize());
	app.use(passport.session());
};
