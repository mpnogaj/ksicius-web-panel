enum Endpoints {
	AUTH_IS_AUTH = '/api/auth/isAuth',
	AUTH_GET_USER = '/api/auth/getUser',
	AUTH_LOGOUT = '/api/auth/logout',
	AUTH_LOGIN = '/api/auth/login',
	AUTH_IS_GUILD_MEMBER = '/api/auth/isKsiGuildMember',
	AUTH_IS_GUILD_ADMIN = '/api/auth/isGuildAdmin',
	PING_PING = '/api/ping',
	SETTINGS_FETCH = '/api/settings/fetch',
	SETTINGS_UPDATE = '/api/settings/update'
}

export default Endpoints;
