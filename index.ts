import dotEnvExtended from 'dotenv-extended';
dotEnvExtended.load();

import express from 'express';
import router from './routes/router';
import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const publicPath = path.resolve(__dirname, '../../public');

const server = Server.instance;

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

server.app.use(cors({origin: true, credentials: true}));

server.app.use('/api', router);

server.app.use(express.static(publicPath));
server.app.get('*', (req, res, next) => {
	res.sendFile(path.resolve(`${publicPath}/index.html`))
});

server.start( () => {
	console.log( `Servidor corriendo en el pueto ${server.port}` );
} );
