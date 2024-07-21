import { Router } from 'express';

import HttpCodes from '../../../common/httpCodes';
import { BotSettings } from '../../../common/types/botTypes';
import { checkGuildAdmin, checkGuildMember } from '../../middleware/authMiddleware';
import BotSettingsManager from '../../modules/botSettingsManager';
import { TypedRequestBody } from '../../types/requestTypes';

const router = Router();

router.get('/fetch', checkGuildMember, async (req, res) => {
	const settings = await BotSettingsManager.getSettings();
	res.send(settings);
});

router.put('/update', checkGuildAdmin, async (req: TypedRequestBody<BotSettings>, res) => {
	const newSettings = req.body;
	await BotSettingsManager.updateSettings(newSettings);
	res.sendStatus(HttpCodes.OK);
});

export = router;
