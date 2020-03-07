import { Router, Request, Response } from 'express';
import Server from '../classes/server';
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


export default router;
