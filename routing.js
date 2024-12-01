import { addRouteToMap } from './map.js';

// Fetch route from Mapbox Directions API
export async function getRoute(origin, destination, mode) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin.join(',')};${destination.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.routes || data.routes.length === 0) {
            throw new Error('No routes found.');
        }

        // Extract distance and duration
        const { distance, duration } = data.routes[0];

        return {
            geometry: data.routes[0].geometry,
            distance,
            duration
        };
    } catch (error) {
        console.error('Error fetching route:', error);
        throw error;
    }
}


export async function generateRoute(userCoords, destinationCoords, mode) {
    try {
        const routeData = await getRoute(userCoords, destinationCoords, mode);
        const { geometry, distance, duration } = routeData;

        // Convert distance to kilometers and duration to hours/minutes
        const distanceKm = (distance / 1000).toFixed(2);
        const durationMin = Math.floor(duration / 60);
        const durationHrs = Math.floor(durationMin / 60);
        const remainingMinutes = durationMin % 60;

        // Update the UI
        document.getElementById('route-distance').textContent = `${distanceKm} km`;
        document.getElementById('route-duration').textContent =
            durationHrs > 0
                ? `${durationHrs} h ${remainingMinutes} min`
                : `${remainingMinutes} min`;

        // Add route to the map
        addRouteToMap(geometry);
    } catch (error) {
        alert('Unable to generate route. Check your inputs and try again.');
    }
}

