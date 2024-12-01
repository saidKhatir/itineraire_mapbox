// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpZGtoYXRpciIsImEiOiJjbHNrZHJpamcwMm03MmpuYWN4MWsxdHJrIn0.Lv3Bzhrab6Qw2sKs5rHarw';

// Initialize and export the map instance
export const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [100.523186, 13.736717], // Bangkok par défaut
    zoom: 12 // starting zoom
});

// Add navigation control
map.addControl(new mapboxgl.NavigationControl());

// Add route to the map
export function addRouteToMap(route) {
    if (map.getSource('route')) {
        map.getSource('route').setData(route);
    } else {
        map.addSource('route', {
            type: 'geojson',
            data: route
        });
        map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#0074D9',
                'line-width': 5
            }
        });
    }

    // Fit map to the route
    const bounds = route.coordinates.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds(route.coordinates[0], route.coordinates[0])
    );
    map.fitBounds(bounds, { padding: 20 });
}
