<template>
  <div>
    <div id="floating-panel">
      <b>Mode of Travel: </b>
      <select id="mode">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
    </div>
    <div id="map"></div>
  </div>
</template>
<style>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
#map {
  height: 500px;
}
/* Optional: Makes the sample page fill the window. */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
  padding-left: 10px;
}
</style>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      markers: [],
      latitude: 30.0,
      longitude: 29.0,
      directionsRenderer: new google.maps.DirectionsRenderer(),
      directionsService: new google.maps.DirectionsService()
    };
  },
  methods: {
    initLocationSearch() {
      var chicago = new google.maps.LatLng(41.850033, -87.6500523);
      var mapOptions = {
        zoom: 7,
        center: chicago
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      this.directionsRenderer.setMap(map);
    },
    calculateAndDisplayRoute(directionsService, directionsRenderer) {
      var directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: 37.77, lng: -122.447 }, // Haight.
          destination: { lat: 37.768, lng: -122.511 }, // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        },
        function(response, status) {
          if (status == "OK") {
            this.directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    calcRoute() {
      var request = {
        origin: { lat: 41.850033, lng: -87.6500523 },
        destination: { lat: 40.850033, lng: -87.6500523 },
        // Note that JavaScript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };

      this.directionsService.route(request, function(response, status) {
        if (status == "OK") {
          

          this.directionsRenderer.setDirections(response);
        }
      });
    }
    // calcRoute() {
    //   var start = { lat: 41.850033, lng: -87.6500523 };
    //   var end = { lat: 40.850033, lng: -87.6500523 };
    //   var request = {
    //     origin: start,
    //     destination: end,
    //     travelMode: "DRIVING"
    //   };
    //   directionsService.route(request, function(result, status) {
    //     if (status == "OK") {
    //       directionsRenderer.setDirections(result);
    //     }
    //   });
    // }
  },
  mounted() {
    this.initLocationSearch();

    const loadGoogleMaps = callback => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&language=en&callback=initLocationSearch`;
        script.id = "googleMaps";
        script.libraries = "geometry";
        script.travelMode = google.maps.DirectionsTravelMode.DRIVING;
        document.body.appendChild(script);

        script.onload = () => {
          if (callback) {
            callback();
          }
        };
      }
      if (existingScript && callback) {
        callback();
      }
    };
    this.calcRoute();
    this.calculateAndDisplayRoute();
  },
  created() {
    this.initLocationSearch();
  }
};
</script>
