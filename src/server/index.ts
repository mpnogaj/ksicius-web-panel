import express, { Express, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import * as fs from 'fs';
import * as path from 'path';

import { COOKIE_SECRET, PORT } from './config';
import { configurePassport } from './utility/auth';

const publicDir = path.join(__dirname, '../../public');
const routeDir = path.join(__dirname, 'routes');

const loadRoutes = async (routesPath: string, app: Express) => {
	const dirContent = fs.readdirSync(routesPath);
	for (const dirElem of dirContent) {
		const filepath = routesPath + '/' + dirElem;
		const file = path.parse(filepath);
		const stat = fs.statSync(filepath);
		if (stat.isDirectory()) {
			await loadRoutes(filepath, app);
		} else if (file.ext === '.js') {
			try {
				const relativePath = path.relative(routeDir, file.dir);
				const baseRoute = relativePath !== '' ? `/api/${relativePath}` : '/api';
				const router = (await import(filepath)).default;
				console.log(`Mapping router from module: ${file.name} with base route: ${baseRoute}`);
				app.use(baseRoute, router);
			} catch (ex) {
				console.error('Failed loading router');
				console.error(ex);
			}
		}
	}
};

const setupExpressApp = async (app: Express) => {
	app.use(express.static(publicDir));
	app.use(
		session({
			name: 'session',
			resave: false,
			saveUninitialized: true,
			secret: COOKIE_SECRET,
			cookie: {
				httpOnly: true,
				secure: false,
				maxAge: 1000 * 60 * 60 * 24 * 30
			}
		})
	);

	configurePassport(app);

	console.log('Loading routes');
	await loadRoutes(routeDir, app);
	console.log('Routes loaded');

	app.get('*', (req: Request, res: Response, next: NextFunction): void => {
		try {
			res.sendFile(path.join(publicDir, 'app.html'));
		} catch (ex) {
			console.error(ex);
			next(ex);
		}
	});

	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`);
	});
};

setupExpressApp(express());
