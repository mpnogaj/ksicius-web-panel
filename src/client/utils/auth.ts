import axios from 'axios';

import HttpCodes from '../../common/httpCodes';
import Endpoints from '../endpoints';

export const isLoggedIn = async (): Promise<boolean> => {
	try {
		const resp = await axios.get(Endpoints.AUTH_IS_AUTH);
		return resp.status === HttpCodes.OK;
	} catch {
		return false;
	}
};
