import { Request, Response, Router } from 'express';

import HttpCodes from '../../../common/httpCodes';
import { StringResponse } from '../../../common/types/responseTypes';
import { checkGuildAdmin } from '../../middleware/authMiddleware';
import { ConfigModel } from '../../models/dbConfig';
import { TypedRequestBody } from '../../types/expressTypes';

const router = Router();

router.get(
	'/getWelcomeMessage',
	checkGuildAdmin,
	async (req: Request, res: Response<StringResponse>) => {
		const mongoConfig = await ConfigModel.findOne({});
		if (mongoConfig === null) {
			return res.send({ result: 'Could not connect to mongodb' }).sendStatus(HttpCodes.ERROR);
		}
		const msg = mongoConfig.WELCOME_MESSAGE ?? '';
		return res.send({ result: msg });
	}
);

router.post('/setWelcomeMessage', checkGuildAdmin, async (req: TypedRequestBody<string>, res) => {
	const newMsg = req.body;
	const mongoConfig = await ConfigModel.findOne({});
	if (mongoConfig === null) {
		return res.send({ result: 'Could not connect to mongodb' }).sendStatus(HttpCodes.ERROR);
	}
	mongoConfig.WELCOME_MESSAGE = newMsg;
	mongoConfig.save();
});

export = router;
