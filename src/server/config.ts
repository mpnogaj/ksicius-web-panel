import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const SESSION_SECRET = process.env.SESSION_SECRET || '';
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const CALLBACK_URL = process.env.CALLBACK_URL || '';
export const KSI_GUILD_ID = process.env.KSI_GUILD_ID || '';
export const BOT_TOKEN = process.env.BOT_TOKEN || '';

export const DISCORD_API_BASE = 'https://discord.com/api/v10';

export const DSICORD_AUTH_SCOPES = ['identify', 'guilds'];

export const ACTIVE_MEMBER_ROLE_ID = process.env.ACTIVE_MEMBER_ROLE_ID || '';
export const HONOURED_MEMBER_ROLE_ID = process.env.HONOURED_MEMBER_ROLE_ID || '';

export const KSI_MEMBER_ROLE_IDS = [ACTIVE_MEMBER_ROLE_ID, HONOURED_MEMBER_ROLE_ID];
