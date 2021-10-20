import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

// Routes
import { RoutesConfig } from './src/routes.config';
import { UsersRoutes } from './src/users/users-routes.config';


const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<RoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// Middleware para converter todas as requests em JSON
app.use(express.json());

// Permitir cross-origin request
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
};

if (!process.env.DEBUG) {
	loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions));
routes.push(new UsersRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
	res.status(200).send(runningMessage)
});

server.listen(port, () => {
	routes.forEach((route: RoutesConfig) => {
		debugLog(`Routes configured for ${route.getName()}`);
	});
	console.log(runningMessage);
});
