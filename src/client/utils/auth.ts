import axios from 'axios';

import Endpoints from '../endpoints';

export const isLoggedIn = async (): Promise<boolean> => {
	try {
		const resp = await axios.get(Endpoints.AUTH_CHECK_IS_AUTH);
		return resp.status === 200;
	} catch {
		return false;
	}
};
