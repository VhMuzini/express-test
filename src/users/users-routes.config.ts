
import { RoutesConfig } from '../routes.config';
import express from 'express';

export class UsersRoutes extends RoutesConfig {

	constructor(app: express.Application) {
		super(app, 'UsersRoutes');
	}

	// Configuração das rotas
	configureRoutes() {

		this.app.route('/users').get((req: express.Request, res: express.Response) => {

			res.status(200).send('List of users');
		}).post((req: express.Request, res: express.Response) => {

			res.status(200).send('Post to users');
		});

		this.app.route('/users/:IDUser').all((req: express.Request, res: express.Response, next: express.NextFunction) => {

			// Esse middleware roda antes de qualquer request para '/users/:IDUser

			next();
		})
			.get((req: express.Request, res: express.Response) => {

				res.status(200).send(`GET requested for id ${req.params.IDUser}`)
			})
			.put((req: express.Request, res: express.Response) => {

				res.status(200).send(`PUT requested for id ${req.params.IDUser}`);
			})
			.patch((req: express.Request, res: express.Response) => {

				res.status(200).send(`PATCH requested for id ${req.params.IDUser}`);
			})
			.delete((req: express.Request, res: express.Response) => {

				res.status(200).send(`DELETE requested for id ${req.params.IDUser}`);
			})

		return this.app;
	}
}
