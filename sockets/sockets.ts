import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Map } from '../classes/map';
import { Marker } from '../classes/marker';

export const map = new Map();


export const mapSockets = (client: Socket, io: socketIO.Server) => {

    client.on('add-marker', (marker: Marker) => {
        map.addMarker(marker);

        client.broadcast.emit('add-marker', marker);
    });

    client.on('delete-marker', (id: string) => {
        map.deleteMarker(id);

        client.broadcast.emit('delete-marker', id);
    });

    client.on('move-marker', (marker: Marker) => {
        map.moveMarker(marker);

        client.broadcast.emit('move-marker', marker);
    })

};
