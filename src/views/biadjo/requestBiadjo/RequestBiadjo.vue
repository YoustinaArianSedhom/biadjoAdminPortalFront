<template>
  <div
    class="flex w-full  vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col md:w-full lg:w-4/5 xl:w-4/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div
              class="vx-col w-full sm:w-full md:w-full lg:w-4/5 xl:w-4/5  d-theme-dark-bg"
            >
              <div class="px-8 pt-8 mb-4 login-tabs-container">
                <form-wizard
                  @on-complete="formSubmitted"
                  stepSize="xs"
                  ref="wizard"
                  transition="fade"
                  color="rgba(var(--vs-primary), 1)"
                  :title="$t('RequestBiadjo')"
                  :subtitle="null"
                >
                  <tab-content
                    v-bind:title="$t('LocationErrorTitle')"
                    class="mb-5"
                    :before-change="() => beforeTabOneSwitch1(1)"
                  >
                    <div class="tab-text">
                      <Location
                        class="mt-4"
                        ref="firstTabForm"
                        :LocationData="RequestBiadjoModel"
                      />
                    </div>
                  </tab-content>

                  <!-- tab 2 content -->
                  <tab-content
                    v-bind:title="$t('TruckType')"
                    :before-change="() => beforeTabOneSwitch2(2)"
                    class="mb-5"
                  >
                    <div class="tab-text">
                      <TruckType
                        class="mt-4"
                        :TruckData="RequestBiadjoModel"
                        @Proceed="$refs.wizard.nextTab()"
                      />
                    </div>
                  </tab-content>
                  <!-- tab 3 content -->
                  <tab-content
                    v-bind:title="$t('CargoInfo')"
                    :before-change="() => beforeTabOneSwitch3(3)"
                    class="mb-5"
                  >
                    <CargoInfo class="mt-4" :CargoData="RequestBiadjoModel" />
                  </tab-content>

                  <!-- tab 4 content -->
                  <tab-content v-bind:title="$t('Preview')" class="mb-5">
                    <Review
                      class="mt-4"
                      :ReviewData="RequestBiadjoModel"
                      :ReviewData1="RequestBiadjoModel"
                    />
                  </tab-content>

                  <vs-button
                    slot="prev"
                    @click.native="scrollToTop"
                    class="wizard-btn p-2"
                    style="width:50px;"
                    >{{ $t("Back") }}</vs-button
                  >
                  <vs-button
                    slot="next"
                    @click.native="scrollToTop"
                    class="wizard-btn p-2"
                    >{{ $t("Next") }}</vs-button
                  >
                  <vs-button
                    slot="finish"
                    :disabled="!RequestBiadjoModel.AgreeTermsAndConditions"
                    class="wizard-btn p-2"
                    >{{ $t("Send") }}</vs-button
                  >
                </form-wizard>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleClient from "@/store/client/moduleClient.js";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Location from "./Location.vue";

import moment from "moment";
/* eslint-disable */
export default {
  components: {
    Location,
    CargoInfo: () => import("./CargoInfo.vue"),
    TruckType: () => import("./TruckType.vue"),
    FormWizard,
    TabContent,
    // : () => import("./Location.vue"),
    Review: () => import("./Review.vue")
  },

  data() {
    return {
      submittedData: {},
      RequestBiadjoModel: {
        Insurance: true,
        CargoWeightUnit: "U2",
        StartBiadjoLocationData: {},
        EndBiadjoLocationData: {},
        TotalDistance: null,
        TotalDuration: null,
        NumberOfWorkers: null
      },
      formOptions: {
        validationErrorClass: "has-error",
        validationSuccessClass: "has-success",
        validateAfterChanged: true
      }
    };
  },
  computed: {},
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    formSubmitted() {
      debugger;
      if (this.RequestBiadjoModel.AgreeTermsAndConditions) {
        this.$vs.loading();
        // this.$validator.validateAll().then(result => {
        //   if (result) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.submittedData.CargoDescription = this.RequestBiadjoModel.CargoDescription;
        this.submittedData.CargoType = this.RequestBiadjoModel.CargoType;
        this.submittedData.CargoValue = this.RequestBiadjoModel.CargoValue;
        this.submittedData.CargoWeight = this.RequestBiadjoModel.CargoWeight;
        this.submittedData.CargoWeightUnit = this.RequestBiadjoModel.CargoWeightUnit;

        this.submittedData.Insurance = this.RequestBiadjoModel.Insurance;
        this.submittedData.NumberOfTrips = this.RequestBiadjoModel.NumberOfTrips;
        this.submittedData.Schedual = moment
          .utc(new Date(this.RequestBiadjoModel.Schedual))
          .format("YYYY-MM-DDTHH:mm:ss");

        // this.submittedData.TotalDistance = this.RequestBiadjoModel.TotalDistance;
        // this.submittedData.TotalDuration = this.RequestBiadjoModel.TotalDuration;
        this.submittedData.VehicleOption = this.RequestBiadjoModel.VehicleOption;
        this.submittedData.VehicleType = this.RequestBiadjoModel.VehicleType;
        this.submittedData.InsuranceValue = 0;
        this.submittedData.StLatitude = this.RequestBiadjoModel.StartBiadjoLocationData.StLatitude;
        this.submittedData.StLongitude = this.RequestBiadjoModel.StartBiadjoLocationData.StLongitude;
        this.submittedData.StartCity = this.RequestBiadjoModel.StartBiadjoLocationData.StartCity;
        this.submittedData.StartState = this.RequestBiadjoModel.StartBiadjoLocationData.StartState;
        this.submittedData.StPlaceDesicription = this.RequestBiadjoModel.StartBiadjoLocationData.StPlaceDesicription;
        this.submittedData.StPlaceId = this.RequestBiadjoModel.StartBiadjoLocationData.StPlaceId;

        this.submittedData.EnLatitude = this.RequestBiadjoModel.EndBiadjoLocationData.EnLatitude;
        this.submittedData.EnLongitude = this.RequestBiadjoModel.EndBiadjoLocationData.EnLongitude;
        this.submittedData.EnPlaceId = this.RequestBiadjoModel.EndBiadjoLocationData.EnPlaceId;
        this.submittedData.EnPlaceDesicription = this.RequestBiadjoModel.EndBiadjoLocationData.EnPlaceDesicription;
        this.submittedData.EndCity = this.RequestBiadjoModel.EndBiadjoLocationData.EndCity;
        this.submittedData.EndState = this.RequestBiadjoModel.EndBiadjoLocationData.EndState;

        this.submittedData.StartCountry = this.RequestBiadjoModel.StartBiadjoLocationData.StartCountry;
        this.submittedData.StartCountryCode = this.RequestBiadjoModel.StartBiadjoLocationData.StartCountryCode;
        this.submittedData.EndCountry = this.RequestBiadjoModel.EndBiadjoLocationData.EndCountry;
        this.submittedData.EndCountryCode = this.RequestBiadjoModel.EndBiadjoLocationData.EndCountryCode;

        this.submittedData.ClosingDate = moment.utc(new Date());
        this.submittedData.Date = moment.utc(new Date());
        this.submittedData.Country = this.userInfo.country;
        this.submittedData.UserId = this.$route.params.CID;
        this.submittedData.Stops = this.RequestBiadjoModel.Stops;
        this.submittedData.CountryCode = this.userInfo.countrycode;
        this.submittedData.NumberOfWorkers = this.RequestBiadjoModel.NumberOfWorkers;

        var Obj = {
          AdminUserId: this.userInfo.Id,
          SendToDrivers: this.RequestBiadjoModel.SendToDrivers || false,
          BiadjoDetails: this.submittedData
        };
        this.$store
          .dispatch("ClientList/CreateBiadjo", Obj)
          .then(res => {
            if (res.status == 200) {
              this.$vs.loading.close();
              window.showSuccess();
              this.RequestBiadjoModel.AgreeTermsAndConditions = false;
              this.$router.push({
                name: "BiadjoDetails",
                params: { Id: res.data }
              });
            } else {
              this.$vs.loading.close();
              window.showError();
            }
          })
          .catch(() => {
            this.$vs.loading.close();
            window.showError();
          });
      } else {
        this.$vs.loading.close();
        this.$vs.notify({
          color: "#FF9F43",
          position: "bottom-center",
          title: this.$t("Warning"),
          text: this.$t("PleaseAcceptTermsAndConditions")
        });
      }
    },
    fetchDistance() {
      let origin1 = {
        lat: this.RequestBiadjoModel.StartBiadjoLocationData.StLatitude,
        lng: this.RequestBiadjoModel.StartBiadjoLocationData.StLongitude
      };
      let destinationA = {
        lat: this.RequestBiadjoModel.EndBiadjoLocationData.EnLatitude,
        lng: this.RequestBiadjoModel.EndBiadjoLocationData.EnLongitude
      };

      return new Promise(async (resolve, reject) => {
        let response;
        const waypts = [];
        var DirectionsService = new google.maps.DirectionsService();
        if (this.RequestBiadjoModel.Stops.length > 0) {
          for (let i = 0; i < this.RequestBiadjoModel.Stops.length; i++) {
            waypts.push({
              location: new google.maps.LatLng(
                this.RequestBiadjoModel.Stops[i].Latitude,
                this.RequestBiadjoModel.Stops[i].Longitude
              ),
              stopover: true
            });
          }
          DirectionsService.route(
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
                this.RequestBiadjoModel.TotalDistance = 0;
                this.RequestBiadjoModel.TotalDuration = 0;
                var myroute = response.routes[0];
                for (let i = 0; i < myroute.legs.length; i++) {
                  this.RequestBiadjoModel.TotalDistance +=
                    myroute.legs[i].distance.value;
                  this.RequestBiadjoModel.TotalDuration +=
                    myroute.legs[i].duration.value;
                }
                var num = this.RequestBiadjoModel.TotalDuration / 60;
                var hours = num / 60;
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);
                let X;
                if (rhours > 0) {
                  X =
                    rhours +
                    " " +
                    this.$t("Hour") +
                    " " +
                    rminutes +
                    " " +
                    this.$t("Minute");
                } else {
                  X = rminutes + " " + this.$t("Minute");
                }
                this.RequestBiadjoModel.TotalDuration = X;
                this.RequestBiadjoModel.TotalDistance =
                  this.RequestBiadjoModel.TotalDistance / 1000 +
                  " " +
                  this.$t("KM");
              }
            }
          );
        } else {
          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: await [origin1],
              destinations: await [destinationA],
              travelMode: "DRIVING",
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false
            },
            (resp, status) => {
              if (status !== google.maps.DistanceMatrixStatus.OK) {
                response = reject(status);
                this.RequestBiadjoModel.TotalDistance = "";
                this.RequestBiadjoModel.TotalDuration = "";
              } else {
                response = resolve(resp);
                this.RequestBiadjoModel.TotalDistance =
                  resp.rows[0].elements[0].distance.text;
                this.RequestBiadjoModel.TotalDuration =
                  resp.rows[0].elements[0].duration.text;
              }
            }
          );
        }
      });
      return response;
    },
    beforeTabOneSwitch1: function() {
      if (
        this.RequestBiadjoModel.NumberOfTrips &&
        this.RequestBiadjoModel.Schedual &&
        this.RequestBiadjoModel.EndBiadjoLocationData.EnPlaceDesicription &&
        this.RequestBiadjoModel.StartBiadjoLocationData.StPlaceDesicription
      ) {
        if (
          parseInt(this.RequestBiadjoModel.NumberOfTrips) > 0 &&
          parseInt(this.RequestBiadjoModel.NumberOfTrips) < 26 &&
          this.RequestBiadjoModel.Schedual !== null &&
          this.RequestBiadjoModel.OldDate !== true &&
          this.RequestBiadjoModel.EndBiadjoLocationData.EnPlaceDesicription !==
            null &&
          this.RequestBiadjoModel.StartBiadjoLocationData
            .StPlaceDesicription !== null
        ) {
          var result = true;
          if (
            this.RequestBiadjoModel.Stops &&
            this.RequestBiadjoModel.Stops.length > 0
          ) {
            for (let i = 0; i < this.RequestBiadjoModel.Stops.length; i++) {
              if (
                this.RequestBiadjoModel.Stops[i].Latitude &&
                this.RequestBiadjoModel.Stops[i].Longitude &&
                this.RequestBiadjoModel.Stops[i].PlaceId &&
                this.RequestBiadjoModel.Stops[i].PlaceDescription
              ) {
                result = true;
              } else {
                window.ErrorData();
                return false;
              }
            }
          }
          if (result) {
            window.checkAndAttachMapScriptGoogleMaps(this.fetchDistance);
            return true;
          }
        } else {
          window.ErrorData();
          return false;
        }
      } else {
        window.ErrorData();
        return false;
      }
    },
    beforeTabOneSwitch2: function() {
      if (this.RequestBiadjoModel.VehicleType) {
        if (this.RequestBiadjoModel.VehicleType.length > 0) {
          return true;
        }
      } else {
        window.ErrorData();
        return false;
      }
    },
    beforeTabOneSwitch3: function() {
      if (
        this.RequestBiadjoModel.CargoWeight &&
        this.RequestBiadjoModel.CargoWeightUnit &&
        this.RequestBiadjoModel.CargoValue &&
        this.RequestBiadjoModel.CargoDescription &&
        this.RequestBiadjoModel.CargoType
      ) {
        if (
          this.RequestBiadjoModel.CargoWeight !== null &&
          this.RequestBiadjoModel.CargoWeightUnit !== null &&
          this.RequestBiadjoModel.CargoValue !== null &&
          this.RequestBiadjoModel.CargoDescription !== null &&
          this.RequestBiadjoModel.CargoType !== null
        ) {
          return true;
        }
      } else {
        window.ErrorData();
        return false;
      }
    }
  },

  created() {
    debugger;
    let x = this.$route.params.data;
    this.RequestBiadjoModel.CargoDescription = x.CargoDescription;
    this.RequestBiadjoModel.CargoType = x.CargoType;
    this.RequestBiadjoModel.CargoValue = x.CargoValue;
    this.RequestBiadjoModel.CargoWeight = x.CargoWeight;
    this.RequestBiadjoModel.CargoWeightUnit = x.CargoWeightUnit;

    this.RequestBiadjoModel.Insurance = x.Insurance;
    this.RequestBiadjoModel.NumberOfTrips = x.NumberOfTrips;
    //  moment
    //   .utc(new Date(this.RequestBiadjoModel.Schedual))
    //   .format("YYYY-MM-DDTHH:mm:ss") == x.;

    // this.submittedData.TotalDistance = this.RequestBiadjoModel.TotalDistance;
    // this.submittedData.TotalDuration = this.RequestBiadjoModel.TotalDuration;
    this.RequestBiadjoModel.VehicleOption = x.VehicleOption;
    this.RequestBiadjoModel.VehicleType = x.VehicleType;
    this.submittedData.InsuranceValue = x.InsuranceValue;
    this.RequestBiadjoModel.StartBiadjoLocationData.StLatitude = x.StLatitude;
    this.RequestBiadjoModel.StartBiadjoLocationData.StLongitude = x.StLongitude;
    this.RequestBiadjoModel.StartBiadjoLocationData.StartCity = x.StartCity;
    this.RequestBiadjoModel.StartBiadjoLocationData.StartState = x.StartState;
    this.RequestBiadjoModel.StartBiadjoLocationData.StPlaceDesicription =
      x.StPlaceDesicription;
    this.RequestBiadjoModel.StartBiadjoLocationData.StPlaceId = x.StPlaceId;

    this.RequestBiadjoModel.EndBiadjoLocationData.EnLatitude = x.EnLatitude;
    this.RequestBiadjoModel.EndBiadjoLocationData.EnLongitude = x.EnLongitude;
    this.RequestBiadjoModel.EndBiadjoLocationData.EnPlaceId = x.EnPlaceId;
    this.RequestBiadjoModel.EndBiadjoLocationData.EnPlaceDesicription =
      x.EnPlaceDesicription;
    this.RequestBiadjoModel.EndBiadjoLocationData.EndCity = x.EndCity;
    this.RequestBiadjoModel.EndBiadjoLocationData.EndState = x.EndState;

    this.RequestBiadjoModel.StartBiadjoLocationData.StartCountry =
      x.StartCountry;
    this.RequestBiadjoModel.StartBiadjoLocationData.StartCountryCode =
      x.StartCountryCode;
    this.RequestBiadjoModel.EndBiadjoLocationData.EndCountry = x.EndCountry;
    this.RequestBiadjoModel.EndBiadjoLocationData.EndCountryCode =
      x.EndCountryCode;

    // this.submittedData.ClosingDate = moment.utc(new Date());
    // this.submittedData.Date = moment.utc(new Date());
    this.RequestBiadjoModel.Country = x.Country;
    debugger;
    this.RequestBiadjoModel.UserId = this.$route.params.CID;
    this.RequestBiadjoModel.Stops = x.Stops;
    this.RequestBiadjoModel.CountryCode = x.CountryCode;
    this.RequestBiadjoModel.NumberOfWorkers = x.NumberOfWorkers;

    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
    }
  }
};
</script>

<style lang="scss">
.wizard-btn {
  min-width: 80px !important;
  width: fit-content;
  padding: 10px !important;
}
.login-tabs-container {
  min-height: 500px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
