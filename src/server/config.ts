import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const COOKIE_SECRET = process.env.COOKIE_SECRET || '';
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const CALLBACK_URL = process.env.CALLBACK_URL || '';
export const KSI_GUILD_ID = process.env.KSI_GUILD_ID || '';
export const BOT_TOKEN = process.env.BOT_TOKEN || '';

export const DISCORD_API_BASE = 'https://discord.com/api/v10';

export const DSICORD_AUTH_SCOPES = ['identify', 'guilds'];

export const MONGO_LINK = process.env.MONGO_LINK || '';
