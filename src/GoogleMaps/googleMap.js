/* eslint-disable */
import i18n from "@/i18n/i18n";
import store from "@/store/store.js";
var Styles = [];
if (store.state.theme == "dark") {
  Styles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }]
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }]
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }]
    }
  ];
}
var map;
var Bearing;
var StartLat;
var StartLng;
var EndLat;
var EndLng;
var directionsService,
  CurrentResponse,
  MapCenterButton,
  BiadjoMapCenterButton,
  directionsDisplay,
  polyline,
  DriverMarker;

var MapNotInjected = false;
var zoomValue = 15;
var myLatlng;
var IsFirstTime = true;
var mapOptions = {
  zoom: zoomValue,
  backgroundColor: "#3B6077",
  styles: Styles,
  // noClear: true,
  maxZoom: 20,
  minZoom: 5,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  center: myLatlng,
  fullscreenControl: true,
  mapTypeId: "roadmap" //satellite //hybrid //terrain
};

export default {
  checkAndAttachMapScript(MapIsNeeded) {
    window.StartLoading();
    for (let i = 0; i < document.scripts.length; i++) {
      const element = document.scripts[i].outerHTML;
      if (element.includes("https://maps.googleapis.com/maps/api/js?key=")) {
        MapNotInjected = false;
        break;
      } else {
        MapNotInjected = true;
      }
    }
    if (MapNotInjected) {
      let initialized = !!window.google;
      return new Promise((resolve, reject) => {
        if (initialized) {
          return resolve(window.google);
        }
        initialized = true;
        window.mapApiInitialized = () => resolve(window.google);
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&libraries=places,geometry&callback=mapApiInitialized&language=${i18n.locale}`;
        script.onload = () => {
          resolve(window.google);
          if (MapIsNeeded) {
            this.mapApiInitialized();
          }
        };
        script.onerror = () => reject(new Error("Script load error: " + src));
        document.querySelector("head").appendChild(script);
      });
    } else {
      if (MapIsNeeded) {
        this.mapApiInitialized();
      }
    }
  },
  fetchDistance(origin, dest, WyPoints) {
    return new Promise(async (resolve, reject) => {
      let response;
      let origin1 = origin;
      let destinationA = dest;
      const waypts = [];
      if (WyPoints && WyPoints.length > 0) {
        for (let i = 0; i < WyPoints.length; i++) {
          waypts.push({
            location: new google.maps.LatLng(
              WyPoints[i].Latitude,
              WyPoints[i].Longitude
            ),
            stopover: true
          });
        }
        var directionsService = new google.maps.DirectionsService();

        directionsService.route(
          {
            origin: await origin1,
            destination: await destinationA,
            // avoidHighways: false,
            // avoidTolls: false,
            waypoints: waypts,
            optimizeWaypoints: true,
            // drivingOptions: {
            //   departureTime: new Date(Date.now() + 1000), // for the time N milliseconds from now.
            //   trafficModel: "optimistic"
            // },
            unitSystem: google.maps.UnitSystem.METRIC,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          },
          (response, status) => {
            if (status === "OK") {
              response.distance = 0;
              response.duration = 0;
              var myroute = response.routes[0];
              for (let i = 0; i < myroute.legs.length; i++) {
                response.distance += myroute.legs[i].distance.value;
                response.duration += myroute.legs[i].duration.value;
              }
              var num = response.duration / 60;
              var hours = num / 60;
              var rhours = Math.floor(hours);
              var minutes = (hours - rhours) * 60;
              var rminutes = Math.round(minutes);
              let X;
              if (rhours > 0) {
                X =
                  rhours +
                  " " +
                  i18n.t("Hour") +
                  " " +
                  rminutes +
                  " " +
                  i18n.t("Minute");
              } else {
                X = rminutes + " " + i18n.t("Minute");
              }
              response.duration = X;
              response.distance = response.distance / 1000 + " " + i18n.t("KM");
              resolve(response);
            }
          }
        );
      } else {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          },
          (response, status) => {
            if (status === "OK") {
              response.distance = 0;
              response.duration = 0;
              response.distance = response.rows[0].elements[0].distance.text;
              response.duration = response.rows[0].elements[0].duration.text;
              resolve(response);
            }
          }
        );
      }
      return response;
    });
  },
  mapApiInitialized() {
    var myLatlng = new google.maps.LatLng(
      10.777662144173254,
      106.67312622070312
    );
    // document.addEventListener("DOMContentLoaded", () => {
    // });
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsService = new google.maps.DirectionsService();

    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      // directions: response,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#27ABBE",
        strokeOpacity: 0.7,
        strokeWeight: 5
      }
      // strokeColor: "#ff1493",
    });
    // google.maps.event.addListener(map, "idle", () => {});
    google.maps.event.addListenerOnce(map, "tilesloaded", () => {
      directionsDisplay.setMap(map);
      window.CloseLoading();
    });

    // map.addListener("zoom_changed", () => {
    //   zoomValue = map.getZoom();
    // });

    DriverMarker = new google.maps.Marker({
      map: map,
      icon: require("@/assets/images/DriverMarker.png"),
      animation: google.maps.Animation.DROP,
      // size: new google.maps.Size(120, 120),
      // The origin for this image is (0, 0).
      // origin: new google.maps.Point(100, 100)
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(-120, 180)
    });
    MapCenterButton = document.getElementById("MapCenterButton");
    if (MapCenterButton) {
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        MapCenterButton
      );
    }

    BiadjoMapCenterButton = document.getElementById("BiadjoMapCenterButton");
    if (BiadjoMapCenterButton) {
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        BiadjoMapCenterButton
      );
    }
  },
  async calculateAndDisplayRoute(
    StartLat,
    StartLng,
    EndLat,
    EndLng,
    BiadjoStatus,
    Stops,
    Accuracy
  ) {
    StartLat = Number(StartLat);
    StartLng = Number(StartLng);
    EndLat = Number(EndLat);
    EndLng = Number(EndLng);

    window.RotationPoint = RotationPoint;

    const waypts = [];

    if (Stops && Stops.length > 0) {
      for (let i = 0; i < Stops.length; i++) {
        waypts.push({
          location: new google.maps.LatLng(
            Stops[i].Latitude,
            Stops[i].Longitude
          ),
          stopover: true
        });
      }
      directionsService.route(
        {
          origin: {
            lat: Number(StartLat),
            lng: Number(StartLng)
          },
          destination: {
            lat: Number(EndLat),
            lng: Number(EndLng)
          },
          // unitSystem: google.maps.UnitSystem.IMPERIAL, // Mile
          avoidHighways: false,
          avoidTolls: false,
          waypoints: waypts,
          optimizeWaypoints: true,
          drivingOptions: {
            departureTime: new Date(Date.now() + 1000), // for the time N milliseconds from now.
            trafficModel: "optimistic"
          },
          unitSystem: google.maps.UnitSystem.METRIC,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        },
        (response, status) => {
          if (status === "OK") {
            CurrentResponse = response;
            // if (directionsDisplay != null) {
            //   directionsDisplay.setMap(null);
            //   directionsDisplay = null;
            // }
            var leg = response.routes[0].legs[0];
            // var Oldstart_location = leg.start_location;

            var legLength = response.routes[0].legs.length - 1;
            var startLeg = response.routes[0].legs[0];
            var endtLeg = response.routes[0].legs[legLength];
            if (
              BiadjoStatus === "BS5" ||
              BiadjoStatus === "BS6" ||
              BiadjoStatus === "BS7"
            ) {
              DriverMarker.setPosition(startLeg.start_location);

              var StartMarker = new google.maps.Marker({
                position: endtLeg.end_location,
                map: map,
                icon: require("@/assets/images/Map Icon-A.png")
              });
            }
            if (
              BiadjoStatus === "BS8" ||
              BiadjoStatus === "BS9" ||
              BiadjoStatus === "BS10"
            ) {
              DriverMarker.setPosition(startLeg.start_location);

              var EndtMarker = new google.maps.Marker({
                position: endtLeg.end_location,
                map: map,
                icon: require("@/assets/images/Map Icon-B.png")
              });
            }
            if (
              BiadjoStatus === "BS1" ||
              BiadjoStatus === "BS2" ||
              BiadjoStatus === "BS3" ||
              BiadjoStatus === "BS4" ||
              BiadjoStatus === "BS11" ||
              BiadjoStatus === "BS12" ||
              BiadjoStatus === "BS13" ||
              BiadjoStatus === "BS14" ||
              BiadjoStatus === "BS15" ||
              BiadjoStatus === "BS16"
            ) {
              var StartMarker = new google.maps.Marker({
                position: startLeg.start_location,
                map: map,
                icon: require("@/assets/images/Map Icon-A.png")
              });
              var EndtMarker = new google.maps.Marker({
                position: endtLeg.end_location,
                map: map,
                icon: require("@/assets/images/Map Icon-B.png")
              });
            }

            for (var i = 0; i < waypts.length; i++) {
              var wayPointMarker = new google.maps.Marker({
                map: map,
                size: new google.maps.Size(2, 3),
                icon: require("@/assets/images/WayPointMarker.png"),
                title: "Stop Point!"
              });
              wayPointMarker.setPosition(waypts[i].location);
            }
            // directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
            BiadjoMapCenterButton.addEventListener("click", () => {
              directionsDisplay.setDirections(response);
            });
          } else {
            console.log("Directions request failed due to " + status);
          }
        }
      );
    } else {
      directionsService.route(
        {
          origin: {
            lat: Number(StartLat),
            lng: Number(StartLng)
          },
          destination: {
            lat: Number(EndLat),
            lng: Number(EndLng)
          },
          // unitSystem: google.maps.UnitSystem.IMPERIAL, // Mile
          avoidHighways: false,
          avoidTolls: false,
          drivingOptions: {
            departureTime: new Date(Date.now() + 1000), // for the time N milliseconds from now.
            trafficModel: "optimistic"
          },
          unitSystem: google.maps.UnitSystem.METRIC,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        },
        (response, status) => {
          if (status === "OK") {
            CurrentResponse = response;
            var leg = response.routes[0].legs[0];

            if (
              BiadjoStatus === "BS5" ||
              BiadjoStatus === "BS6" ||
              BiadjoStatus === "BS7"
            ) {
              DriverMarker.setPosition(leg.start_location);

              var StartMarker = new google.maps.Marker({
                position: leg.end_location,
                map: map,
                icon: require("@/assets/images/Map Icon-A.png")
              });
            }
            if (
              BiadjoStatus === "BS8" ||
              BiadjoStatus === "BS9" ||
              BiadjoStatus === "BS10"
            ) {
              DriverMarker.setPosition(leg.start_location);
              // DriverMarker.setIcon(icon);

              var EndtMarker = new google.maps.Marker({
                position: leg.end_location,
                map: map,
                icon: require("@/assets/images/Map Icon-B.png")
              });
            }
            if (
              BiadjoStatus === "BS1" ||
              BiadjoStatus === "BS2" ||
              BiadjoStatus === "BS3" ||
              BiadjoStatus === "BS4" ||
              BiadjoStatus === "BS11" ||
              BiadjoStatus === "BS12" ||
              BiadjoStatus === "BS13" ||
              BiadjoStatus === "BS14" ||
              BiadjoStatus === "BS15" ||
              BiadjoStatus === "BS16"
            ) {
              var StartMarker = new google.maps.Marker({
                position: leg.start_location,
                map: map,
                icon: require("@/assets/images/Map Icon-A.png")
              });
              var EndtMarker = new google.maps.Marker({
                position: leg.end_location,
                map: map,
                icon: require("@/assets/images/Map Icon-B.png")
              });
            }

            // map.setZoom(zoomValue);
            directionsDisplay.setMap(map);

            directionsDisplay.setDirections(response);
            BiadjoMapCenterButton.addEventListener("click", () => {
              directionsDisplay.setDirections(response);
            });
          } else {
            console.log("Directions request failed due to " + status);
          }
        }
      );
    }
  },
  // bearing(StartLat, StartLng, EndLat, EndLng) {
  //   // Convert to radians.
  //   var lat1 = StartLat;
  //   var lon1 = StartLng;
  //   var lat2 = EndLat;
  //   var lon2 = EndLng;
  //   // Compute the Bearing.
  //   Bearing = -Math.atan2(
  //     Math.sin(lon1 - lon2) * Math.cos(lat2),
  //     Math.cos(lat1) * Math.sin(lat2) -
  //       Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
  //   );
  //   if (Bearing < 0.0) Bearing += Math.PI * 2.0;
  //   if (Bearing == 0) {
  //     Bearing = 1.5;
  //   }
  //   return Bearing;
  // },
  IsDriverStillOnRoute(
    StartLat,
    StartLng,
    EndLat,
    EndLng,
    BiadjoStatus,
    Stops,
    Accuracy
  ) {
    var Position = new google.maps.LatLng(StartLat, StartLng);
    // var xxx = new google.maps.Polyline(CurrentResponse.routes[0].overview_path);
    // console.log(directionsDisplay);
    // console.log(CurrentResponse);
    // var cascadiaFault = new google.maps.Polyline(
    //   CurrentResponse.routes[0].overview_path
    // );
    var paths = CurrentResponse.routes[0].overview_path;
    polyline = new google.maps.Polyline({
      path: paths
    });
    if (google.maps.geometry.poly.isLocationOnEdge(Position, polyline, 0.001)) {
      this.SetMarker(StartLat, StartLng, Accuracy);
    } else {
      this.calculateAndDisplayRoute(
        StartLat,
        StartLng,
        EndLat,
        EndLng,
        BiadjoStatus,
        Stops,
        Accuracy
      );
    }
  },
  SetMarker(lat, lng, Accuracy) {
    //Remove previous Marker.
    if (DriverMarker != null) {
      DriverMarker.setMap(null);
    }
    //Set Marker on Map.
    myLatlng = new google.maps.LatLng(lat, lng);
    // map.setZoom(17);
    DriverMarker.setMap(map);
    DriverMarker.setPosition(myLatlng);
    if (!CurrentResponse) {
      MapCenterButton.addEventListener("click", () => {
        map.panTo(myLatlng);
      });
      if (IsFirstTime) {
        map.setCenter(myLatlng);
        IsFirstTime = false;
      }
    }

    // map.setCenter(myLatlng); // setCenter takes a LatLng object
  }
};
