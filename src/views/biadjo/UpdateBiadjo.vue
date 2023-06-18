<!-- =========================================================================================
  File Name: BiadjoView.vue
  Description: Biadjo View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Biadjo/pixinvent
========================================================================================== -->
<template>
  <div id="page-Biadjo-view">
    <vs-alert
      color="danger"
      title="Biadjo Not Found"
      :active.sync="Biadjo_not_found"
    >
      <span
        >Biadjo record with id: {{ $route.params.BiadjoId }} not found.</span
      >
      <span>
        <span>Check</span>
        <router-link
          :to="{ name: 'BiadjoProfile' }"
          class="text-inherit underline"
          >All Biadjos</router-link
        >
      </span>
    </vs-alert>

    <div id="Biadjo-data" v-if="Biadjo_data != undefined">
      <vx-card v-bind:title="$t('Biadjo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <!-- <tr>
               <td class="font-semibold">{{$t('BiadjoNumber')}}</td>
                 <td>{{  Biadjo_data.id }}</td>
              </tr>-->

              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <!-- <td>{{  Biadjo_data.UserId }}</td> -->
                <td style="width: 300px;">
                  <vs-input
                    @keypress="isNumber($event)"
                    type="text"
                    class="mt-1 w-full"
                    v-validate="'required'"
                    v-model="Biadjo_data.UserId"
                    name="UserId"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('UserId')"
                    >{{ errors.first("UserId") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("DriverID") }}</td>
                <!-- <td>{{  Biadjo_data.DriverId}}</td> -->
                <td>
                  <vs-input
                    @keypress="isNumber($event)"
                    type="text"
                    class="mt-1 w-full"
                    v-model="Biadjo_data.DriverId"
                    name="DriverId"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('DriverId')"
                    >{{ errors.first("DriverId") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>
                  <v-select
                    v-model="Biadjo_data.Status"
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full"
                    :options="this.$options.BiadjoStatusJson"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                  ></v-select>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("VehicleType") }}</td>
                <td>
                  <v-select
                    v-model="Biadjo_data.VehicleType"
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full"
                    :options="this.$options.VehicleJson"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                  ></v-select>
                </td>
              </tr>

              <!-- <tr>
                <td class="font-semibold">Price </td>
                <td>{{  Biadjo_data.Price}} $</td>
              </tr>-->

              <!-- <tr>
                <td class="font-semibold">Rating</td>

                 <td>
                <star-rating
                  v-model=" Biadjo_data.Rating"
                  v-bind:increment="0.01"
                  v-bind:max-rating="5"
                  inactive-color="black"
                  active-color="orange"
                  v-bind:read-only="true"
                  v-bind:show-rating="false"
                  v-bind:round-start-rating="false"
                  v-bind:star-size="20"
                >
                </star-rating>
                </td>
              </tr>-->
              <!-- <tr style="width:1400px">
                <td class="font-semibold">Country</td>
                <td >
                  {{  Biadjo_data.Country }}</td>
              </tr>

               <tr style="width:1400px">
                <td class="font-semibold">{{$t('CountryCode')}}</td>
                <td >{{  Biadjo_data.CountryCode }}</td>
              </tr>-->
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <!-- <tr>
                <td class="font-semibold">{{$t('PaymentMethod')}} </td>
                <td>{{ Biadjo_data.PaymentMethod }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Payment Status </td>
                <td>{{ Biadjo_data.PaymentStatus }}</td>
              </tr>-->

              <!-- <tr style="width:1400px">
                <td class="font-semibold">Driver Payment Status </td>
                <td >{{  Biadjo_data.DriverPaymentStatus }}</td>
              </tr>-->
              <tr>
                <td class="font-semibold">{{ $t("Schedual") }}</td>
                <!-- <td>{{ Biadjo_data.Schedual|formatDate("yyyy/MM/dd HH:mm") }}</td> -->
                <td>
                  <!-- <datepicker
                    class="mt-1 w-full"
                    :format="format"
                    v-model="Biadjo_data.Schedual"
                    name="Schedual"
                    :language="DatepickerLang"
                  ></datepicker> -->

                  <flat-pickr
                    :config="configdateTimePicker"
                    v-model="Biadjo_data.Schedual"
                    name="Schedual"
                    :format="format"
                  />
                </td>
              </tr>
              <!-- <tr>
                <td class="font-semibold">Date</td>
                <td>{{ Biadjo_data.Date|formatDate("yyyy/MM/dd HH:mm") }}</td>
              </tr>-->
              <tr>
                <td class="font-semibold">{{ $t("ClosingDate") }}</td>
                <!-- <td>{{  Biadjo_data.ClosingDate|formatDate("yyyy/MM/dd HH:mm")  }}</td> -->
                <td>
                  <!-- <datepicker
                    class="mt-1 w-full"
                    :format="format"
                    v-model="Biadjo_data.ClosingDate"
                    name="ClosingDate"
                    :language="DatepickerLang"
                  ></datepicker> -->

                  <flat-pickr
                    :config="configdateTimePicker"
                    v-model="Biadjo_data.ClosingDate"
                    name="ClosingDate"
                    :format="format"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("NumberOfWorkers") }}</td>
                <!-- <td>{{  Biadjo_data.DriverId}}</td> -->
                <td>
                  <vs-input
                    @keypress="isNumber($event)"
                    type="text"
                    class="mt-1 w-full"
                    v-model="Biadjo_data.NumberOfWorkers"
                    name="NumberOfWorkers"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('NumberOfWorkers')"
                    >{{ errors.first("NumberOfWorkers") }}</span
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="vx-row"></div>
      </vx-card>
      <vx-card class="mb-base">
        <div>
          <div class="mb-4 vx-row">
            <vs-input-number
              v-model="Biadjo_data.NumberOfTrips"
              :label="$t('NumberOfTrips')"
              min="1"
              @input="AddAndRemoveStops(Biadjo_data.NumberOfTrips)"
              :max="25"
              :step="1"
              class="mt-1 text-xl w-full"
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
            <span class="font-semibold">{{ $t("PickupLocation") }}</span>

            <vs-input
              @keypress="isNumber($event)"
              v-validate="'required'"
              type="text"
              tabindex="0"
              class="mt-1 w-full"
              v-model="Biadjo_data.StPlaceDesicription"
              name="StPlaceDesicription"
              @click="OpenStartLocation"
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
          <div v-if="Biadjo_data.NumberOfTrips > 1">
            <div
              class="mb-4 vx-row"
              v-for="(item, index) in Stops"
              :key="index"
            >
              <div class="w-5/6">
                <label class="text-sm opacity-75">{{
                  $t("PickupStopLocation")
                }}</label>
                <vs-input
                  @keypress="isNumber($event)"
                  v-validate="'required'"
                  type="text"
                  tabindex="0"
                  class="w-full"
                  v-model="item.PlaceDescription"
                  name="PlaceDesicription"
                  @click="OpenPwMap(index, item)"
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
                  @click="RemoveFromStops(index, item)"
                  icon="icon-x"
                ></vs-button>
              </div>
            </div>
          </div>
          <span class="text-sm opacity-75">
            {{ $t("DestinationLocation") }}
          </span>
          <div class="mb-4 vx-row">
            <vs-input
              type="text"
              tabindex="1"
              v-validate="'required'"
              class="mt-1 w-full"
              v-model="Biadjo_data.EnPlaceDesicription"
              @click="OpenEndLocation"
              name="EnPlaceDesicription"
              autocomplete="off"
              :disabled="!Biadjo_data.StPlaceDesicription"
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
        </div>
      </vx-card>
      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("CargoType") }}</td>
                <!-- <td>{{  Biadjo_data.CargoType }}</td> -->
                <td>
                  <div class="vx-row">
                    <vs-input
                      @keypress="isNumber($event)"
                      type="text"
                      class="mt-1 w-full"
                      v-model="Biadjo_data.CargoType"
                      v-validate="'required'"
                      name="CargoType"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('CargoType')"
                      >{{ errors.first("CargoType") }}</span
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CargoDescription") }}</td>
                <!-- <td >{{  Biadjo_data.CargoDescription }}</td> -->
                <td>
                  <div class="vx-row">
                    <vs-input
                      @keypress="isNumber($event)"
                      type="text"
                      :min="0"
                      class="mt-1 w-full"
                      v-model="Biadjo_data.CargoDescription"
                      name="CargoDescription"
                      v-validate="'required'"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('CargoDescription')"
                      >{{ errors.first("CargoDescription") }}</span
                    >
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("CargoValue") }}</td>
                <td>
                  <div class="vx-row">
                    <vs-input
                      @keypress="isNumber($event)"
                      type="Number"
                      :min="0"
                      class="mt-1 w-full"
                      v-model="Biadjo_data.CargoValue"
                      v-validate="'required|alpha_num'"
                      name="CargoValue"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('CargoValue')"
                      >{{ errors.first("CargoValue") }}</span
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CargoWeight") }}</td>
                <td>
                  <div class="vx-row">
                    <vs-input
                      @keypress="isNumber($event)"
                      type="Number"
                      :min="0"
                      class="mt-1 w-1/3 mr-2 ml-2"
                      v-model="Biadjo_data.CargoWeight"
                      name="CargoWeight"
                      v-validate="'required|alpha_num'"
                    />

                    <v-select
                      v-model="Biadjo_data.CargoWeightUnit"
                      :reduce="Code => Code.Code"
                      class=" w-1/3 mr-2 ml-2"
                      :options="this.$options.weightUnitJson"
                      :dir="$vs.rtl ? 'rtl' : 'ltr'"
                      :get-option-label="option => $t(option.Code)"
                    ></v-select>
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('CargoWeight')"
                      >{{ errors.first("CargoWeight") }}</span
                    >
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>

      <div class="vx-col w-full flex" id="account-manage-buttons">
        <div style="padding: 10px;">
          <vs-button
            class="ml-auto mt-2"
            @click="confirmSave"
            :disabled="!validateForm"
          >
            {{ $t("SaveChanges") }}
          </vs-button>
        </div>
        <div style="padding: 10px;">
          <vs-button
            class="ml-auto mt-2"
            type="border"
            color="warning"
            icon-pack="feather"
            @click="Back"
            >{{ $t("Back") }}</vs-button
          >
        </div>
      </div>
    </div>
    <div>
      <vs-popup
        class="popup-example"
        :title="$t('SelectPickupLocation')"
        :active.sync="popupActiveStartBiadjoLocationData"
      >
        <StartLocation
          class="MapClass"
          v-if="popupActiveStartBiadjoLocationData"
          :StartBiadjoLocation="StartBiadjoLocationData"
          @CloseStartMap="CloseStartMap"
          v-model="StartBiadjoLocationData"
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
          :StopPointLocation="Biadjo_data"
          @CloseWayPointsMap="CloseWayPointsMap"
          v-model="Biadjo_data.StopPointLocation"
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
          :EndBiadjoLocation="EndBiadjoLocationData"
          @CloseEndMap="CloseEndMap"
          v-model="EndBiadjoLocationData"
          v-on:close="popupActiveEndBiadjoLocationData = false"
        />
      </vs-popup>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Arabic } from "flatpickr/dist/l10n/ar.js";
import { english } from "flatpickr/dist/l10n/default.js";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import weightUnit_JSON from "@/views/biadjo/json/weightUnit.json";
import BiadjoStatus_JSON from "@/views/biadjo/json/biadjoStatus";
import { en, ar } from "vuejs-datepicker/src/locale";
import moment from "moment";
import Vehicle_JSON from "@/views/driver/json/vehicles.json";

export default {
  weightUnitJson: weightUnit_JSON,
  VehicleJson: Vehicle_JSON,
  BiadjoStatusJson: BiadjoStatus_JSON,

  data() {
    return {
      Stops: [],
      deleteStop: [],
      index: null,
      CurrentId: null,
      CurrentIndex: null,
      popupActiveStartBiadjoLocationData: false,
      popupActiveStopsPoints: false,
      popupActiveEndBiadjoLocationData: false,
      StartBiadjoLocationData: {},
      EndBiadjoLocationData: {},
      English: english,
      Arabic: Arabic,
      configdateTimePickerObject: {
        enableTime: true,
        locale: ""
      },
      Biadjo_data: {},
      Biadjo_not_found: false,
      format: "dd/MM/yyyy",
      ar: ar,
      en: en
    };
  },
  components: {
    flatPickr,
    StartLocation: () => import("./../googleMap/StartLocation.vue"),
    StopsPoints: () => import("./../googleMap/StopsPoints.vue"),
    EndLocation: () => import("./../googleMap/EndLocation.vue")
  },

  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Biadjo_data.UserId != "" &&
        this.Biadjo_data.ClosingDate != "" &&
        this.Biadjo_data.Schedual != "" &&
        this.Biadjo_data.Status != null &&
        this.Biadjo_data.NumberOfTrips != "" &&
        this.Biadjo_data.CargoType != "" &&
        this.Biadjo_data.CargoDescription != "" &&
        this.Biadjo_data.CargoValue != "" &&
        this.Biadjo_data.CargoWeight != "" &&
        this.Biadjo_data.CargoWeightUnit != null &&
        this.Biadjo_data.VehicleType != null
      );
    },
    configdateTimePicker() {
      this.DatepickerLang();

      return this.configdateTimePickerObject;
    }
  },
  methods: {
    OpenStartLocation() {
      var StartLocationData = {};
      StartLocationData.StLatitude = this.Biadjo_data.StLatitude;
      StartLocationData.StLongitude = this.Biadjo_data.StLongitude;
      this.$store.commit("BiadjoList/StartLocationData", StartLocationData);
      this.popupActiveStartBiadjoLocationData = true;
    },
    OpenEndLocation() {
      var EndLocationData = {};
      EndLocationData.EnLatitude = this.Biadjo_data.EnLatitude;
      EndLocationData.EnLongitude = this.Biadjo_data.EnLongitude;
      this.$store.commit("BiadjoList/EndLocationData", EndLocationData);
      this.popupActiveEndBiadjoLocationData = true;
    },
    OpenPwMap(index, item) {
      this.CurrentIndex = index;
      this.CurrentId = item.Id;
      var StopPointLocationData = {};
      debugger;
      StopPointLocationData.Latitude = item.Latitude;
      StopPointLocationData.Longitude = item.Longitude;
      this.$store.commit(
        "BiadjoList/StopPointLocationData",
        StopPointLocationData
      );
      this.popupActiveStopsPoints = true;
    },

    AddAndRemoveStops(NumberOfTrips) {
      this.Biadjo_data.NumberOfTrips = parseInt(NumberOfTrips);
      if (this.Stops == null) {
        this.Stops = [];
      }
      if (this.Biadjo_data.NumberOfTrips - this.Stops.length > 0) {
        for (
          let i = this.Stops.length + 1;
          i < this.Biadjo_data.NumberOfTrips;
          i++
        ) {
          // if (this.Stops.length < this.Biadjo_data.NumberOfTrips) {
          this.Stops.push({});
          // this.Stops.pop();
          // } else {
          // }
        }
      } else {
        for (
          let i = this.Stops.length;
          i > this.Biadjo_data.NumberOfTrips - 1;
          i--
        ) {
          // if (this.Stops.length < this.Biadjo_data.NumberOfTrips) {
          this.Stops.pop();
          // this.Stops.pop();
          // } else {
          // }
        }
      }
    },
    CloseEndMap(value) {
      this.EndBiadjoLocationData = value;
      // if (this.StartBiadjoLocationData.StLatitude) {
      //   window.checkAndAttachMapScriptGoogleMaps(this.fetchDistance);
      // }
      this.Biadjo_data.EnLatitude = this.EndBiadjoLocationData.EnLatitude;
      this.Biadjo_data.EnLongitude = this.EndBiadjoLocationData.EnLongitude;
      this.Biadjo_data.EnPlaceId = this.EndBiadjoLocationData.EnPlaceId;
      this.Biadjo_data.EnPlaceDesicription = this.EndBiadjoLocationData.EnPlaceDesicription;
      this.Biadjo_data.EndCity = this.EndBiadjoLocationData.EndCity;
      this.Biadjo_data.EndState = this.EndBiadjoLocationData.EndState;
      console.clear();
    },
    CloseStartMap(value) {
      if (
        value.StartCountryCode ==
        JSON.parse(localStorage.getItem("userInfo")).countrycode
      ) {
        this.StartBiadjoLocationData = value;

        this.Biadjo_data.StLatitude = this.StartBiadjoLocationData.StLatitude;
        this.Biadjo_data.StLongitude = this.StartBiadjoLocationData.StLongitude;
        this.Biadjo_data.StartCity = this.StartBiadjoLocationData.StartCity;
        this.Biadjo_data.StartState = this.StartBiadjoLocationData.StartState;
        this.Biadjo_data.StPlaceDesicription = this.StartBiadjoLocationData.StPlaceDesicription;
        this.Biadjo_data.StPlaceId = this.StartBiadjoLocationData.StPlaceId;
        console.clear();
      } else {
        this.$vs.notify({
          color: "#FF9F43",
          position: "bottom-center",
          title: this.$t("Warning"),
          text: this.$t("StartCountryCodeShouldEqualYourCountryCode")
        });
        this.StartBiadjoLocationData = {};
      }
    },
    isNumber: function(evt) {
      evt = evt || window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    DatepickerLang() {
      if (this.$i18n.locale == "ar") {
        this.configdateTimePickerObject.locale = this.Arabic;
      } else {
        this.configdateTimePickerObject.locale = this.English;
      }
    },
    CloseWayPointsMap(value) {
      if (this.CurrentId) {
        value.Id = this.CurrentId;
      }
      this.Stops[this.CurrentIndex] = value;
      this.Biadjo_data.Stops = this.Stops;
      // window.checkAndAttachMapScriptGoogleMaps(this.fetchDistance);
    },
    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      let AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$vs.loading();
      let UpdateBiadjoObj = {};
      UpdateBiadjoObj.AdminUserId = AdminUserId;
      this.Biadjo_data.Schedual = moment
        .utc(new Date(this.Biadjo_data.Schedual))
        .format("YYYY-MM-DDTHH:mm:ss");

      UpdateBiadjoObj.BiadjoData = JSON.stringify(this.Biadjo_data);
      this.Biadjo_data.id = this.$route.params.Id;

      this.$store
        .dispatch("BiadjoList/UpdateBiadjo", UpdateBiadjoObj)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();

            this.getBiadjoDetails();
            if (this.deleteStop.length > 0) {
              this.deletedStop();
            }
            window.showSuccess();
          }
        })
        .catch(() => {
          window.showError();
          this.getBiadjoDetails();
          this.$vs.loading.close();
        });
    },
    confirmSave() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeBiadjoData"),
        accept: this.save_changes,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    },

    RemoveFromStops(index, item) {
      this.Stops.splice(this.index, 1);
      this.Biadjo_data.NumberOfTrips = this.Stops.length + 1;
      this.Biadjo_data.Stops = this.Stops;
      this.index = index;
      this.deleteStop.push(item);
    },
    deletedStop() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      let AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$vs.loading();
      let deletedStop = {};
      deletedStop.AdminUserId = AdminUserId;

      deletedStop.Stops = JSON.stringify(this.deleteStop);

      this.$store
        .dispatch("BiadjoList/DeleteStop", deletedStop)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            this.getBiadjoDetails();
            this.deleteStop = [];
          }
        })
        .catch(() => {
          window.showError();
          this.getBiadjoDetails();
          this.$vs.loading.close();
          this.deleteStop = [];
        });
    },
    Back() {
      this.$router.go(-1);
    },
    getBiadjoDetails() {
      var Biadjo = {};
      Biadjo.id = this.$route.params.Id;

      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(response => {
          this.Biadjo_data = response.data[0];
          this.Stops = this.Biadjo_data.Stops;
          this.$vs.loading.close();
          window.notAllowedToAccessCurrentPage(this.Biadjo_data.Status);
        })
        .catch(() => {
          this.Biadjo_not_found = true;
          this.$vs.loading.close();
        });
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }

    this.getBiadjoDetails();
  },
  beforeCreate() {
    window.notAuthorizeToAccessCurrentPage(
      JSON.parse(localStorage.getItem("userInfo")).accounttype
    );
  }
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

#avatar-col {
  width: 10rem;
}
#page-Biadjo-view {
  table {
    td {
      vertical-align: baseline !important;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        vertical-align: baseline !important;
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
