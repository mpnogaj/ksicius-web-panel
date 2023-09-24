import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const COOKIE_SECRET = process.env.COOKIE_SECRET || '';
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const CALLBACK_URL = process.env.CALLBACK_URL || '';

export const DSICORD_AUTH_SCOPES = ['identify', 'guilds'];

export const KSI_GUILD_ID = process.env.KSI_GUILD_ID || '';
