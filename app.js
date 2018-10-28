// Create a new blank array for all the listing markers.
var markers = [];
var map;
var largeInfowindow;

var app = new Vue({

    // the root element that will be compiled
    el: '#container',

    // app initial state
    data: {
        city: 'NYC',
        selected: '',
        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
        locations: [{
                title: 'Park Ave Penthouse',
                location: {
                    lat: 40.7713024,
                    lng: -73.9632393
                }
            },
            {
                title: 'Chelsea Loft',
                location: {
                    lat: 40.7444883,
                    lng: -73.9949465
                }
            },
            {
                title: 'Union Square Open Floor Plan',
                location: {
                    lat: 40.7347062,
                    lng: -73.9895759
                }
            },
            {
                title: 'East Village Hip Studio',
                location: {
                    lat: 40.7281777,
                    lng: -73.984377
                }
            },
            {
                title: 'TriBeCa Artsy Bachelor Pad',
                location: {
                    lat: 40.7195264,
                    lng: -74.0089934
                }
            },
            {
                title: 'Chinatown Homey Space',
                location: {
                    lat: 40.7180628,
                    lng: -73.9961237
                }
            }
        ]
    },

    methods: {

        // This function will loop through the markers array and display them all.
        showListings: function() {
            var bounds = new google.maps.LatLngBounds();
            // Extend the boundaries of the map for each marker and display the marker
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        },


        // This function will loop through the listings and hide them all.
        hideListings: function() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        },


        // This function takes in a COLOR, and then creates a new marker
        // icon of that color. The icon will be 21 px wide by 34 high, have an origin
        // of 0, 0 and be anchored at 10, 34).
        makeMarkerIcon: function(markerColor) {
            var markerImage = new google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
                '|40|_|%E2%80%A2',
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34),
                new google.maps.Size(21, 34));
            return markerImage;
        },


        // This function populates the infowindow when the marker is clicked. We'll only allow
        // one infowindow which will open at the marker that is clicked, and populate based
        // on that markers position.
        populateInfoWindow: function(marker, infowindow) {
            // Check to make sure the infowindow is not already opened on this marker.
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.setContent('<div>' + marker.title + '</div>');
                infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick', function() {
                    console.log(this);
                    infowindow.marker = null;
                });
            }
        },

        initMap: function() {
            // Constructor creates a new map - only center and zoom are required.
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 52.367356,
                    lng: 4.907849
                },
                zoom: 17,
                mapTypeControl: false
            });
            largeInfowindow = new google.maps.InfoWindow()
            // var largeInfowindow = new google.maps.InfoWindow();
            var _this = this;
            locations = this.locations;
            // Style the markers a bit. This will be our listing marker icon.
            // var defaultIcon = makeMarkerIcon('0091ff');

            // Create a "highlighted location" marker color for when the user
            // mouses over the marker.
            // var highlightedIcon = makeMarkerIcon('FFFF24');

            // The following group uses the location array to create an array of markers on initialize.
            for (var i = 0; i < locations.length; i++) {
                // Get the position from the location array.
                var position = locations[i].location;
                var title = locations[i].title;
                // Create a marker per location, and put into markers array.
                var marker = new google.maps.Marker({
                    position: position,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    id: i
                });
                // Push the marker to our array of markers.
                markers.push(marker);
                // Create an onclick event to open an infowindow at each marker.
                marker.addListener('click', _this.populateInfoWindow(marker, largeInfowindow));
                console.log(title);
            } 
        },


        initFoursquare: function() {
            console.log("Run foursquare");
        //    console.log(response);
        },


        // Return error if the Google Maps API did not load
        mapsAPIError: function() {
            alert("Google Maps is not working. Try again later.");
        },


        // Return error if the Foursquare API did not load
        foursquareAPIError: function() {
            alert("Foursquare is not working. Try again later.");
        }
    } // /Methods
});


var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function() {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            const p = document.createElement('p');
            movie.description = movie.description.substring(0, 300);
            p.textContent = `${movie.description}...`;

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
}

request.send();
