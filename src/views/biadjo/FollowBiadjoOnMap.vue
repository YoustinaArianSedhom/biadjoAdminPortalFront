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
    <div class="pr-2 pl-2" id="BiadjoMapCenterButton">
      <vx-tooltip text="Center Biadjo" position="top">
        <feather-icon
          icon="CrosshairIcon"
          svgClasses="h-8 w-8"
          class="BiadjoMapCenterBtn text-primary bg-white P-4"
        />
      </vx-tooltip>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
/* eslint-disable */
import googleMaps from "@/GoogleMaps/googleMap.js";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
export default {
  data() {
    return {
      clearSetInterval: false,

      StartLat: null,
      StartLng: null,
      EndLat: null,
      EndLng: null,
      BiadjoStatus: null,
      DriverID: null,
      interval: null,
      Accuracy: null
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },

    getDriverLocation() {
      var Driver = {};
      Driver.DriverID = this.DriverID;
      this.$store.dispatch("auth/getDriverLocation", Driver).then(response => {
        if (response.status == 200) {
          this.StartLat = Number(response.data.latitude);
          this.StartLng = Number(response.data.longitude);
          this.Accuracy = Number(response.data.bearing);

          this.$vs.loading.close();
        }
      });
      this.$vs.loading.close();
    },
    async fetchData() {
      await googleMaps.checkAndAttachMapScript(true);
      var Biadjo = {};
      Biadjo.id = this.$route.params.Id;
      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(async response => {
          if (response.status == 200) {
            var Stops = [];

            if (response.data[0].Stops) {
              Stops = response.data[0].Stops;
            }
            this.BiadjoStatus = response.data[0].Status;
            this.DriverID = response.data[0].DriverId;
            var Driver = {};
            Driver.DriverID = response.data[0].DriverId;
            if (
              this.BiadjoStatus === "BS5" ||
              this.BiadjoStatus === "BS6" ||
              this.BiadjoStatus === "BS7"
            ) {
              this.EndLat = Number(response.data[0].StLatitude);
              this.EndLng = Number(response.data[0].StLongitude);

              this.$store
                .dispatch("auth/getDriverLocation", Driver)
                .then(async response => {
                  if (response.status == 200) {
                    this.StartLat = Number(response.data.latitude);
                    this.StartLng = Number(response.data.longitude);
                    this.Accuracy = Number(response.data.bearing);

                    this.$vs.loading.close();
                  }
                  this.$vs.loading.close();

                  googleMaps.calculateAndDisplayRoute(
                    this.StartLat,
                    this.StartLng,
                    this.EndLat,
                    this.EndLng,
                    this.BiadjoStatus,
                    Stops,
                    this.Accuracy
                  );
                });
              this.clearSetInterval = setInterval(() => {
                this.$store
                  .dispatch("auth/getDriverLocation", Driver)
                  .then(async response => {
                    if (response.status == 200) {
                      this.StartLat = Number(response.data.latitude);
                      this.StartLng = Number(response.data.longitude);
                      this.Accuracy = Number(response.data.bearing);

                      googleMaps.IsDriverStillOnRoute(
                        this.StartLat,
                        this.StartLng,
                        this.EndLat,
                        this.EndLng,
                        this.BiadjoStatus,
                        Stops,
                        this.Accuracy
                      );
                    }
                  });
              }, 5000);
            }
            if (
              this.BiadjoStatus === "BS8" ||
              this.BiadjoStatus === "BS9" ||
              this.BiadjoStatus === "BS10"
            ) {
              this.EndLat = Number(response.data[0].EnLatitude);
              this.EndLng = Number(response.data[0].EnLongitude);
              this.$store
                .dispatch("auth/getDriverLocation", Driver)
                .then(async response => {
                  if (response.status == 200) {
                    this.StartLat = Number(response.data.latitude);
                    this.StartLng = Number(response.data.longitude);
                    this.Accuracy = Number(response.data.bearing);

                    googleMaps.calculateAndDisplayRoute(
                      this.StartLat,
                      this.StartLng,
                      this.EndLat,
                      this.EndLng,
                      this.BiadjoStatus,
                      Stops,
                      this.Accuracy
                    );
                    this.$vs.loading.close();
                  }
                  this.$vs.loading.close();
                });
              let timerId = setInterval(() => {
                this.$store
                  .dispatch("auth/getDriverLocation", Driver)
                  .then(async response => {
                    if (response.status == 200) {
                      this.StartLat = Number(response.data.latitude);
                      this.StartLng = Number(response.data.longitude);
                      this.Accuracy = Number(response.data.bearing);

                      googleMaps.IsDriverStillOnRoute(
                        this.StartLat,
                        this.StartLng,
                        this.EndLat,
                        this.EndLng,
                        this.BiadjoStatus,
                        Stops,
                        this.Accuracy
                      );
                    }
                  });
              }, 5000);
            }

            if (
              this.BiadjoStatus === "BS1" ||
              this.BiadjoStatus === "BS2" ||
              this.BiadjoStatus === "BS3" ||
              this.BiadjoStatus === "BS4" ||
              this.BiadjoStatus === "BS11" ||
              this.BiadjoStatus === "BS12" ||
              this.BiadjoStatus === "BS13" ||
              this.BiadjoStatus === "BS14" ||
              this.BiadjoStatus === "BS15" ||
              this.BiadjoStatus === "BS16"
            ) {
              this.StartLat = Number(response.data[0].StLatitude);
              this.StartLng = Number(response.data[0].StLongitude);
              this.EndLat = Number(response.data[0].EnLatitude);
              this.EndLng = Number(response.data[0].EnLongitude);
              googleMaps.calculateAndDisplayRoute(
                this.StartLat,
                this.StartLng,
                this.EndLat,
                this.EndLng,
                this.BiadjoStatus,
                Stops
              );
            }
          }
        })
        .catch(err => {
          console.log(err);
          alert("wrong here");
          this.$vs.loading.close();
          window.showError();
        });
      this.$vs.loading.close();
    },
    StopInterval() {
      clearInterval(this.clearSetInterval);
    }
  },
  mounted() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
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
.BiadjoMapCenterBtn {
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
