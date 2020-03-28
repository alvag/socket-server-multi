import { Marker } from './marker';

export class Map2 {

    private markers: Marker[] = [
        {
            id: '1',
            name: 'Udemy',
            lat: 37.784679,
            lng: -122.395936,
            color: '#DD8FEE'
        },
        {
            id: '2',
            name: 'BahÃ­a de San Francisco',
            lat: 37.798933,
            lng: -122.377732,
            color: '#790AF0'
        },
        {
            id: '3',
            name: 'The Palace Hotel',
            lat: 37.788578,
            lng: -122.401745,
            color: '#19884B'
        }
    ];

    constructor() {}

    getMarkers() {
        return this.markers;
    }

    addMarker( marker: Marker ) {
        this.markers.push( marker );
    }

    deleteMarker( id: string ) {
        this.markers = this.markers.filter( m => m.id !== id );
        return this.getMarkers();
    }

    moveMarker( marker: Marker ) {
        for ( const i in this.markers ) {
            if ( this.markers[ i ].id === marker.id ) {
                this.markers[ i ].lng = marker.lng;
                this.markers[ i ].lat = marker.lat;
                break;
            }
        }
    }
}
