<template>
  <div id="app">
    <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="15"
      map-type-id="terrain"
      style="width: 800px; height: 500px"
    >
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      pos: {
        coords: {
          latitude: 30,
          longitude: 30
        }
      }
    };
  },
  methods: {
    fetchData() {
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }
      this.gettingLocation = true;
      navigator.geolocation.watchPosition(
        pos => {
          this.gettingLocation = false;
          this.initialPosition.lat = pos.coords.latitude;
          this.initialPosition.lng = pos.coords.longitude;
          const userData = {
            position: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            },
            userName: this.usersName
          };
          this.userlocation = userData;
          this.updateRoom(userData);
        },
        err => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    }
  }
};
</script>
