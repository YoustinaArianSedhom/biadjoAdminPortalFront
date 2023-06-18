<template>
  <div>
    <vs-button
      class="mr-3 mb-2"
      @click="Back"
      type="border"
      color="warning"
      icon-pack="feather"
    >
      {{ $t("Back") }}
    </vs-button>
    <div class="pr-2 pl-2" id="MapCenterButton">
      <vx-tooltip text="Center Marker" position="top">
        <feather-icon
          icon="CrosshairIcon"
          svgClasses="h-8 w-8"
          class="MapCenterBtn text-primary bg-white P-4"
        />
      </vx-tooltip>
    </div>

    <div id="map"></div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
import googleMaps from "@/GoogleMaps/googleMap.js";

export default {
  data() {
    return {
      clearSetInterval: false,
      location: null,
      Hidden: false,
      latitude: null,
      longitude: null,
      Accuracy: null
    };
  },

  methods: {
    Back() {
      this.$router.go(-1);
    },
    openLoading() {
      this.$vs.loading();
      setTimeout(() => {
        this.$vs.loading.close();
      }, 2000);
    },
    refreshDriverLocation() {
      var Driver = {};

      Driver.DriverID = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/getDriverLocation", Driver)
        .then(response => {
          if (response.status == 200) {
            this.latitude = response.data.latitude;
            this.longitude = response.data.longitude;
          }
        });
    },

    async fetchData() {
      var Driver = {};
      await googleMaps.checkAndAttachMapScript(true);
      Driver.DriverID = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/getDriverLocation", Driver)
        .then(async response => {
          if (response.status == 200) {
            this.latitude = response.data.latitude;
            this.longitude = response.data.longitude;
            this.Accuracy = response.data.accuracy;

            googleMaps.SetMarker(this.latitude, this.longitude, this.Accuracy);
          }
        });
      this.clearSetInterval = setInterval(() => {
        this.refreshDriverLocation();
        googleMaps.SetMarker(this.latitude, this.longitude, this.Accuracy);
      }, 5000);
    },
    StopInterval() {
      clearInterval(this.clearSetInterval);
    }
  },
  mounted() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.fetchData();
  },
  beforeDestroy() {
    this.StopInterval();
    location.reload("/");
  }
};
</script>
<style>
#map {
  width: 100% !important;
  height: 500px;
  margin: auto;
}
.my-custom-class-for-label {
  width: 50px;
  height: 20px;

  border: 1px solid #eb3a44;
  border-radius: 5px;
  background: #fee1d7;
  text-align: center;
  line-height: 20px;
  font-weight: bold;
  font-size: 14px;
  color: #eb3a44;
}
.MapCenterBtn {
  background: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  border-radius: 2px;
  display: block;
  border: 0px;
  margin: 5px;
  padding: 5px;
  text-transform: none;
  appearance: none;
  position: relative;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  top: 0px;
  left: 0px;
}
</style>
