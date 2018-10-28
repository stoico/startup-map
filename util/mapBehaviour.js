// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
export function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
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
