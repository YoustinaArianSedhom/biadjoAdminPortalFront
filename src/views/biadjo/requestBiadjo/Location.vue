<template>
  <div>
    <!-- <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"> -->
    <!-- <vx-card> -->
    <form>
      <div class="mb-4 vx-row">
        <label class="text-sm opacity-75">{{ $t("PickupLocation") }}</label>
        <vs-input
          @keypress="isNumber($event)"
          v-validate="'required'"
          type="text"
          class="mt-1 w-full"
          v-model="LocationData.StartBiadjoLocationData.StPlaceDesicription"
          name="StPlaceDesicription"
          @click="popupActiveStartBiadjoLocationData = true"
          autocomplete="off"
          icon-pack="feather"
          icon="icon-map-pin"
          icon-after
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('PickupLocation')"
          >{{ errors.first("PickupLocation") }}</span
        >
      </div>

      <div v-if="NumberOfStops > 1" class="">
        <div class="mb-4 vx-row" v-for="(item, index) in Stops" :key="index">
          <div class="w-5/6">
            <label class="text-sm opacity-75">{{
              $t("PickupStopLocation")
            }}</label>
            <vs-input
              @keypress="isNumber($event)"
              v-validate="'required'"
              type="text"
              class="w-full"
              v-model="item.PlaceDescription"
              name="PlaceDesicription"
              @click="OpenPwMap(index)"
              autocomplete="off"
              icon-pack="feather"
              icon="icon-map-pin"
              icon-after
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('PickupLocation')"
              >{{ errors.first("PickupLocation") }}</span
            >
          </div>
          <div class="w-1/6">
            <vs-button
              color="danger"
              type="flat"
              icon-pack="feather"
              class="mt-6 ml-1 mr-1"
              @click="RemoveFromStops(index)"
              icon="icon-x"
            ></vs-button>
          </div>
        </div>
      </div>

      <div class="mb-4 vx-row">
        <label class="text-sm opacity-75">{{
          $t("DestinationLocation")
        }}</label>
        <vs-input
          type="text"
          v-validate="'required'"
          class="mt-1 w-full"
          v-model="LocationData.EndBiadjoLocationData.EnPlaceDesicription"
          name="EnPlaceDesicription"
          @click="popupActiveEndBiadjoLocationData = true"
          autocomplete="off"
          :disabled="!LocationData.StartBiadjoLocationData.StPlaceDesicription"
          icon-pack="feather"
          icon="icon-map-pin"
          icon-after
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('DestinationLocation')"
          >{{ errors.first("DestinationLocation") }}</span
        >
      </div>

      <div class="mb-4 vx-row">
        <vs-input-number
          v-model="LocationData.NumberOfTrips"
          :label="$t('NumberOfTrips')"
          min="1"
          @input="AddAndRemoveStops(LocationData.NumberOfTrips)"
          :max="25"
          :step="1"
          class="mt-1 w-full"
          v-validate="'required|min:1|max:2'"
          name="NumberOfTrips"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('NumberOfTrips')"
          >{{ errors.first("NumberOfTrips") }}</span
        >
        <!-- <vs-input-number class="ml-6 mr-6"  step="1" /> -->
      </div>

      <div class="mb-4 vx-row">
        <label class="text-sm opacity-75">{{ $t("Schedule") }}</label>
        <flat-pickr
          :config="configdateTimePicker"
          v-model="UserSelectedDate"
          class="mt-1 w-full"
          v-on:input="CheckValidation"
          v-on:click="CheckValidation"
          icon-pack="feather"
          icon="icon-map-pin"
          icon-after
        />
        <span class="text-danger text-sm" v-if="LocationData.OldDate">{{
          $t("DateNotValid")
        }}</span>
      </div>
    </form>

    <div>
      <vs-popup
        class="popup-example"
        :title="$t('SelectPickupLocation')"
        :active.sync="popupActiveStartBiadjoLocationData"
      >
        <StartLocation
          class="MapClass"
          v-if="popupActiveStartBiadjoLocationData"
          :StartBiadjoLocation="LocationData"
          @CloseStartMap="CloseStartMap"
          v-model="LocationData.StartBiadjoLocationData"
          v-on:close="popupActiveStartBiadjoLocationData = false"
        />
      </vs-popup>
    </div>

    <div>
      <vs-popup
        class="popup-example"
        :title="$t('SelectPickupLocation')"
        :active.sync="popupActiveStopsPoints"
      >
        <StopsPoints
          class="MapClass"
          v-if="popupActiveStopsPoints"
          :StopPointLocation="LocationData"
          @CloseWayPointsMap="CloseWayPointsMap"
          v-model="LocationData.StopPointLocation"
          v-on:close="popupActiveStopsPoints = false"
        />
      </vs-popup>
    </div>

    <div>
      <vs-popup
        class="popup-example"
        :title="$t('SelectDestinationLocation')"
        :active.sync="popupActiveEndBiadjoLocationData"
      >
        <EndLocation
          class="MapClass"
          v-if="popupActiveEndBiadjoLocationData"
          :EndBiadjoLocation="LocationData"
          @CloseEndMap="CloseEndMap"
          v-model="LocationData.EndBiadjoLocationData"
          v-on:close="popupActiveEndBiadjoLocationData = false"
        />
      </vs-popup>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";

export default {
  components: {
    flatPickr,
    StartLocation: () => import("./../../googleMap/StartLocation.vue"),
    StopsPoints: () => import("./../../googleMap/StopsPoints.vue"),

    EndLocation: () => import("./../../googleMap/EndLocation.vue")
  },
  props: {
    LocationData: {
      type: Object,
      required: true,
      default: () => ({
        NumberOfTrips: null,
        Schedual: ""
      })
    }
  },
  data() {
    return {
      Stops: [],
      CurrentIndex: null,
      NumberOfStops: null,
      AcceptedMinDate: null,
      UserSelectedDate: null,
      configdateTimePicker: {
        enableTime: true,
        defaultDate: new Date(),
        minDate: new Date()
      },
      popupActiveStartBiadjoLocationData: false,
      popupActiveStopsPoints: false,
      popupActiveEndBiadjoLocationData: false
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.LocationData.StartBiadjoLocationData.StPlaceDesicription !== "" &&
        this.LocationData.EndBiadjoLocationData.EnPlaceDesicription !== "" &&
        this.LocationData.NumberOfTrips > 0 &&
        this.LocationData.NumberOfTrips < 26 &&
        this.LocationData.Schedual !== "" &&
        this.LocationData.OldDate !== true
      );
    }
  },
  methods: {
    RemoveFromStops(index) {
      this.Stops.splice(index, 1);
      this.LocationData.NumberOfTrips = this.Stops.length + 1;
      this.NumberOfStops = this.Stops.length + 1;
    },
    AddAndRemoveStops(NumberOfTrips) {
      this.NumberOfStops = parseInt(NumberOfTrips);
      if (this.NumberOfStops - this.Stops.length > 0) {
        for (let i = this.Stops.length + 1; i < this.NumberOfStops; i++) {
          // if (this.Stops.length < this.NumberOfStops) {
          this.Stops.push({});
          // this.Stops.pop();
          // } else {
          // }
        }
      } else {
        for (let i = this.Stops.length; i > this.NumberOfStops - 1; i--) {
          // if (this.Stops.length < this.NumberOfStops) {
          this.Stops.pop();
          // this.Stops.pop();
          // } else {
          // }
        }
      }
    },
    CheckValidation() {
      var date = new Date();
      date = date.setHours(date.getHours() + 2);
      this.AcceptedMinDate = moment(new Date(date)).format("YYYY-MM-DD HH:mm");

      // this.LocationData.Schedual = this.LocationData.Schedual.setHours(
      //   this.LocationData.Schedual.getHours() + 4
      // );

      this.LocationData.Schedual = this.UserSelectedDate;

      if (
        new Date(this.LocationData.Schedual) > new Date(this.AcceptedMinDate)
      ) {
        this.LocationData.OldDate = false;
      }
      if (
        new Date(this.AcceptedMinDate) > new Date(this.LocationData.Schedual)
      ) {
        this.LocationData.OldDate = true;
      }
    },

    OpenPwMap(index) {
      this.CurrentIndex = index;
      this.popupActiveStopsPoints = true;
    },
    CloseWayPointsMap(value) {
      this.Stops[this.CurrentIndex] = value;
      this.LocationData.Stops = this.Stops;
      // window.checkAndAttachMapScriptGoogleMaps(this.fetchDistance);
    },
    CloseStartMap(value) {
      console.clear();
      if (
        value.StartCountryCode ==
        JSON.parse(localStorage.getItem("userInfo")).countrycode
      ) {
        this.LocationData.StartBiadjoLocationData = value;
        // if (this.LocationData.EndBiadjoLocationData.EnLongitude) {
        //   window.checkAndAttachMapScriptGoogleMaps(this.fetchDistance);
        // }
      } else {
        this.$vs.notify({
          color: "#FF9F43",
          position: "bottom-center",
          title: this.$t("Warning"),
          text: this.$t("StartCountryCodeShouldEqualYourCountryCode")
        });
        this.LocationData.StartBiadjoLocationData = {};
      }
    },
    CloseEndMap(value) {
      console.clear();
      this.LocationData.EndBiadjoLocationData = value;
      // if (this.LocationData.StartBiadjoLocationData.StLatitude) {
      //   window.checkAndAttachMapScriptGoogleMaps(this.fetchDistance);
      // }
    }
  },
  mounted() {
    debugger;
    if (this.LocationData.NumberOfTrips > 1) {
      alert("no of trips >1");
      this.Stops = this.LocationData.Stops;
      this.AddAndRemoveStops(this.LocationData.NumberOfTrips);
    } else {
      this.LocationData.NumberOfTrips = 1;
      this.LocationData.Stops = this.Stops;
    }
    debugger;
    // this.LocationData.Stops = this.Stops;
    var date = new Date();
    date = date.setHours(date.getHours() + 4, 0, 0);
    this.UserSelectedDate = moment(new Date(date)).format();
  },
  created() {}
};
</script>
<style lang="scss">
.login-tabs-container {
  min-height: 495px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
.con-vs-popup .vs-popup {
  width: 683px;
  background-color: #fff;
  color: white;
  border-radius: 15px;
  padding: 12px;
}
.popup-example {
  border: none !important;
  z-index: 1000;
}
.MapClass {
  width: 640px;
  height: 430px;
}
</style>
