// import { populateInfoWindow } from "./util/mapBehaviour.js";

// Create a new blank array for all the listing markers.
let markers = [];
let map;
let largeInfowindow;

let app = {
  options: [
    "Raised less than $20M",
    "Raised $20-$50M",
    "Raised more than $50M",
    "Any"
  ],
  selection: ko.observable(""),
  locations: [
    {
      title: "Bitfury",
      location: {
        lat: 52.374192,
        lng: 4.886953
      },
      fundingRaised: 40.0,
      domain: "bitfury.com",
      selectedByUser: ko.observable(true),
      description:
        "Bitfury is the leading full service bitcoin and blockchain technology company.",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    },
    {
      title: "WeTransfer",
      location: {
        lat: 52.333458,
        lng: 4.916989
      },
      fundingRaised: 25.0,
      domain: "wetransfer.com",
      selectedByUser: ko.observable(true),
      description:
        "WeTransfer offers a way to send files around the world through its platform.",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    },
    {
      title: "MessageBird",
      location: {
        lat: 52.344234,
        lng: 4.911617
      },
      fundingRaised: 60.1,
      domain: "messagebird.com",
      selectedByUser: ko.observable(true),
      description:
        "MessageBird is a cloud communications platform that connects enterprises to their global customers",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    },
    {
      title: "Framer",
      location: {
        lat: 52.37276,
        lng: 4.88816
      },
      fundingRaised: 9.3,
      domain: "framer.com",
      selectedByUser: ko.observable(true),
      description:
        "Framer is a tool to design interactive high-fidelity prototypes for iOS, Android, desktop, or the web.",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    },
    {
      title: "Adyen",
      location: {
        lat: 52.376501,
        lng: 4.905894
      },
      fundingRaised: 266.0,
      domain: "ayden.com",
      selectedByUser: ko.observable(true),
      description:
        "Adyen is a multichannel payment company outsourcing payment services to international merchants.",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    },
    {
      title: "Etergo",
      location: {
        lat: 52.352816,
        lng: 4.841205
      },
      fundingRaised: 6.1,
      domain: "etergo.com",
      selectedByUser: ko.observable(true),
      description:
        "Etergo is an automotive company that develops AppScooter, an electric smart vehicle for the future-ready industry.",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    },
    {
      title: "Impraise",
      location: {
        lat: 52.361258,
        lng: 4.899946
      },
      fundingRaised: 13.6,
      domain: "impraise.com",
      selectedByUser: ko.observable(true),
      description:
        "Impraise is a web and mobile app for sharing actionable, timely feedback between colleagues.",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    },
    {
      title: "Treatwell",
      location: {
        lat: 52.375289,
        lng: 4.891824
      },
      fundingRaised: 38.0,
      domain: "treatwell.com",
      selectedByUser: ko.observable(true),
      description:
        "Treatwell is Europe's leading marketplace for booking hair and beauty appointments online.",
      descriptionIsHidden: ko.observable(true),
      jobs: ko.observableArray()
    }
  ],
  initMap: function() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 52.37077,
        lng: 4.900014
      },
      zoom: 13,
      mapTypeControl: false
    });
    app.createMarkers();
  },

  createMarkers: function() {
    setMapOnAll(null);
    markers.length = 0; // empty array of markers
    largeInfowindow = new google.maps.InfoWindow();
    let _this = this;
    locations = this.locations;

    // The following group uses the location array to create an array of markers on initialize.
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].selectedByUser()) {
        // Get the position from the location array.
        let position = locations[i].location;
        let title = locations[i].title;
        // Create a marker per location, and put into markers array.
        let marker = new google.maps.Marker({
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i,
          icon: "./static/simple-icon-border.png",
          size: new google.maps.Size(27, 41),
          scaledSize: new google.maps.Size(27, 41)
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener("click", function() {
          populateInfoWindow(this, largeInfowindow);
        });
        marker.addListener("click", toggleBounce);
      }
    }
    this.showListings();

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent(`<div style="min-width: 120px; vertical-align: middle;">
            <img src="https://logo.clearbit.com/${
              marker.title
            }.com?size=50" style="border-radius: 6px; vertical-align: middle; text-align: center; margin: 8px; hight: 50px; object-fit: cover;" class="custom-font" {
              constructor() {

              }
          }>${marker.title}</div>`);
        // ^^ FIX The logos. Ayden is either stretched or to tall enough
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener("closeclick", function() {
          console.log(this);
          infowindow.marker = null;
        });
      }
    }

    function toggleBounce() {
      _this = this;
      _this.setAnimation(google.maps.Animation.BOUNCE);
      setInterval(function() {
        _this.setAnimation(null);
      }, 1400);
      // TO FIX. Use promises to fix the fact that if you click on a new location
      // while the previous marker is still bouncing, that marker will bounce forever
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
  },

  makeMarkerBounce: function(location) {
    for (const m of markers) {
      if (m.title == location.title) google.maps.event.trigger(m, "click");
    }
  },

  // Toggles the description's visibility of an item of the list
  toggleDescription: function(location) {
    if (location.descriptionIsHidden() == true) {
      location.descriptionIsHidden(false);
    } else {
      location.descriptionIsHidden(true);
    }
  },

  // Fetch data from the LeverAPI and  job postings are found
  // they are fed into the app data to be displayed in the view
  getJobPosting: function(location) {
    if (!location.jobs().length) {
      fetch("https://api.lever.co/v0/postings/" + location.title.toLowerCase())
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log(typeof data);

          for (const companyData of data) {
            console.log(companyData.text);
            console.log(typeof companyData);
            location.jobs.push(companyData.text);
            console.log(location.jobs());
          }
        })
        .catch(err => {
          console.log("Level API is not working. Try again later.");
        });
    }
  },

  // What happens when the user click on one of the items in the list
  listItemClick: function(location) {
    app.makeMarkerBounce(location);
    app.getJobPosting(location);
    app.toggleDescription(location);
  },

  // This function will loop through the markers array and display them all.
  showListings: function() {
    let bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  },

  // This function will loop through the listings and hide them all.
  hideListings: function() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  },

  // Filters the results list, based on the user's selection
  // via dropdown menu
  updateSelection: function() {
    selection = app.selection();
    options = app.options;
    for (const loc of app.locations) {
      if (selection == options[0]) {
        if (loc.fundingRaised < 20) loc.selectedByUser(true);
        else loc.selectedByUser(false);
      } else if (selection == options[1]) {
        if (loc.fundingRaised > 20 && loc.fundingRaised < 50)
          loc.selectedByUser(true);
        else loc.selectedByUser(false);
      } else if (selection == options[2]) {
        if (loc.fundingRaised > 50) loc.selectedByUser(true);
        else loc.selectedByUser(false);
      } else {
        loc.selectedByUser(true);
      }
    }
    this.createMarkers();
  },

  // Return error if the Google Maps API did not load
  mapsAPIError: function() {
    alert("Google Maps is not working. Try again later.");
  }
};

ko.applyBindings(app);
