// List of points of interest
export const locations = {
    Bangkok: [
        { name: 'Grand Palace', coords: [100.4913, 13.7512] },
        { name: 'Wat Arun', coords: [100.4889, 13.7437] },
        { name: 'Chatuchak Market', coords: [100.5500, 13.8156] },
        { name: 'MBK Center', coords: [100.5295, 13.7455] },
        { name: 'Siam Paragon', coords: [100.5344, 13.7467] }
    ],
    Phuket: [
        { name: 'Patong Beach', coords: [98.3000, 7.8963] },
        { name: 'Big Buddha', coords: [98.3038, 7.8276] },
        { name: 'Old Phuket Town', coords: [98.3662, 7.8841] },
        { name: 'Karon View Point', coords: [98.2955, 7.8066] },
        { name: 'Phuket Elephant Sanctuary', coords: [98.4086, 8.0448] }
    ]
};

// Populate dropdown with locations
export function populateLocationDropdown(locationSelect) {
    Object.entries(locations).forEach(([city, places]) => {
        const group = document.createElement('optgroup');
        group.label = city;
        places.forEach(place => {
            const option = document.createElement('option');
            option.value = `${place.coords}`;
            option.textContent = `${city} - ${place.name}`;
            group.appendChild(option);
        });
        locationSelect.appendChild(group);
    });
}
