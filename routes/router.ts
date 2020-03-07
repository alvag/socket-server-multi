import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usersConnected } from '../sockets/sockets';
import { GraficaData } from '../classes/grafica';

const router = Router();
const grafica = new GraficaData();

router.get( '/grafica', ( req: Request, res: Response ) => {
	res.json( grafica.getData() );
} );

router.post( '/grafica', ( req: Request, res: Response ) => {

	const month = req.body.month;
	const value = Number(req.body.value);

	grafica.incrementValue(month, value);


	const server = Server.instance;
	server.io.emit( 'grafico-data', grafica.getData() );

	res.json( grafica.getData());
} );

router.post( '/messages/:id', ( req: Request, res: Response ) => {

	const message = req.body.message;
	const from = req.body.from;
	const id = req.params.id;

	const payload = {
		from, message
	};

	const server = Server.instance;
	server.io.to( id ).emit( 'private-message', payload );

	res.json( {
		ok: true,
		message, from, id
	} );
} );

router.get( '/users', ( req: Request, res: Response ) => {

	const server = Server.instance;
	server.io.clients( ( error: any, clients: string[] ) => {
		if ( error ) {
			return res.json( {
				ok: false,
				error
			} );
		}

		res.json( {
			ok: true,
			clients
		} );
	} );

} );

router.get( '/users/detail', ( req: Request, res: Response ) => {

	res.json( {
		ok: true,
		clients: usersConnected.getList()
	} );

} );

export default router;
