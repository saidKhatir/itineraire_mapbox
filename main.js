import { map } from './map.js';
import { populateLocationDropdown } from './locations.js';
import { generateRoute } from './routing.js';

// Populate location dropdown
const locationSelect = document.getElementById('locations');
populateLocationDropdown(locationSelect);

// Handle route generation
document.getElementById('getRoute').addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const userCoords = [position.coords.longitude, position.coords.latitude];
        const destinationCoords = locationSelect.value.split(',').map(Number);
        const mode = document.getElementById('mode').value;

        await generateRoute(userCoords, destinationCoords, mode);
    }, () => {
        alert('Unable to retrieve your location.');
    });
});
