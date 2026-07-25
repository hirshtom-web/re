let map;

function initMap() {

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: {
                lat: 25.7617,
                lng: -80.1918
            },

            zoom: 11,

            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            rotateControl: false,
            scaleControl: false,
            clickableIcons: false,
            gestureHandling: "greedy",

            styles: [

                {
                    featureType: "poi",
                    stylers: [
                        { visibility: "off" }
                    ]
                },

                {
                    featureType: "transit",
                    stylers: [
                        { visibility: "off" }
                    ]
                },

                {
                    featureType: "road",
                    elementType: "labels.icon",
                    stylers: [
                        { visibility: "off" }
                    ]
                }

            ]

        }
    );

    loadPropertiesMap();

}


function loadPropertiesMap() {

    if (!window.properties) {
        console.warn("No properties found");
        return;
    }

    const bounds = new google.maps.LatLngBounds();

    window.properties.forEach(property => {

        if (!property.coordinates) {
            console.warn("Missing coordinates:", property.title);
            return;
        }

        const marker = new google.maps.Marker({

            position: {
                lat: property.coordinates.lat,
                lng: property.coordinates.lng
            },

            map: map,

            title: property.title

        });

        bounds.extend(marker.getPosition());

    });

    if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
    }

}
