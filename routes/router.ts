import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usersConnected } from '../sockets/sockets';

const router = Router();

router.get( '/messages', ( req: Request, res: Response ) => {
	res.json( { ok: true } );
} );

router.post( '/messages', ( req: Request, res: Response ) => {

	const message = req.body.message;
	const from = req.body.from;
	const id = req.params.id;

	const payload = {
		from, message
	};

	const server = Server.instance;
	server.io.emit( 'new-message', payload );

	res.json( {
		ok: true,
		message, from, id
	} );
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
