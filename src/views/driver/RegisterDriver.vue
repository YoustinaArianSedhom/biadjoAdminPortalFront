<template>
  <div id="page-user-view">
    <vx-card class="mb-base">
      <div class="vx-row">
        <div
          class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
          id="account-info-col-1"
        >
          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("FirstName") }}</label>
            <vs-input
              class="w-full"
              v-model="Model.FirstName"
              v-validate="'required'"
              name="FirstName"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('FirstName')"
              >{{ errors.first("FirstName") }}</span
            >
          </div>

          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
            <vue-tel-input
              class="w-full"
              v-model="Model.PhoneNo"
              v-validate="'required'"
              name="PhoneNumber"
              :dir="$vs.rtl ? 'ltr' : 'ltr'"
              v-bind="bindProps"
              @onInput="onInput"
            >
            </vue-tel-input>
            <span
              v-if="!isValid"
              class="text-danger text-sm"
              v-show="errors.has('PhoneNumber')"
              >{{ errors.first("PhoneNumber") }}</span
            >
          </div>
          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("Email") }}</label>
            <vs-input class="w-full" v-model="Model.Email" name="Email" />
          </div>

          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("Password") }}</label>
            <vs-input
              class="w-full"
              v-model="Model.Password"
              v-validate="'required'"
              name="Password"
              type="text"
            />
            <span class="text-danger text-sm" v-show="errors.has('Password')">{{
              errors.first("Password")
            }}</span>
          </div>
          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("VehicleType") }}</label>
            <v-select
              style="padding:0px !important"
              v-validate="'required'"
              :reduce="Code => Code.Code"
              class=" w-full"
              :options="this.$options.VehicleTypeJson"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              :get-option-label="option => $t(option.Code)"
              v-model="Model.VehicleType"
              :ignoreAccent="true"
            ></v-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('VehicleType')"
              >{{ errors.first("VehicleType") }}</span
            >
          </div>

          <div
            class="vx-row m-4"
            v-if="
              this.Model.VehicleType == 'TT2' ||
                this.Model.VehicleType == 'TT3' ||
                this.Model.VehicleType == 'TT4'
            "
          >
            <label class="text-sm opacity-75">{{ $t("VehicleOption") }}</label>
            <v-select
              :reduce="Code => Code.Code"
              class="w-full"
              :options="this.$options.VehiclOptionse1Json"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              :get-option-label="option => $t(option.Code)"
              v-model="Model.VehicleOption"
            ></v-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('VehicleOption')"
              >{{ errors.first("VehicleOption") }}</span
            >
          </div>
        </div>

        <div
          class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
          id="account-info-col-2"
        >
          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("LastName") }}</label>
            <vs-input
              class="w-full"
              v-model="Model.LastName"
              v-validate="'required'"
              name="LastName"
            />
            <span class="text-danger text-sm" v-show="errors.has('LastName')">{{
              errors.first("LastName")
            }}</span>
          </div>

          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("State") }}</label>
            <v-select
              :get-option-label="option => $t(option[StateWithLocale])"
              class="mt-1 w-full p-0"
              v-validate="'required'"
              name="State"
              v-model="Model.State"
              @input="GetCityList(Model.State)"
              :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
              :options="StateList"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />

            <span class="text-danger text-sm" v-show="errors.has('State')">{{
              errors.first("State")
            }}</span>
          </div>

          <div class="vx-row mx-4">
            <label class="text-sm opacity-75">{{ $t("City") }}</label>
            <v-select
              :get-option-label="option => $t(option[CityWithLocale])"
              class="mt-1 w-full p-0"
              v-validate="'required'"
              name="City"
              v-model="Model.City"
              :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
              :options="CityList"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />

            <span class="text-danger text-sm" v-show="errors.has('City')">{{
              errors.first("City")
            }}</span>
          </div>

          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("Address") }}</label>
            <vs-input
              class="w-full"
              v-model="Model.Address"
              v-validate="'required'"
              name="Address"
            />
            <span class="text-danger text-sm" v-show="errors.has('Address')">{{
              errors.first("Address")
            }}</span>
          </div>
          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("ZipCode") }}</label>

            <vs-input
              class="w-full"
              v-model="Model.ZibCode"
              v-validate="'required'"
              name="ZibCode"
            />
            <span class="text-danger text-sm" v-show="errors.has('ZibCode')">{{
              errors.first("ZibCode")
            }}</span>
          </div>

          <div class="vx-row m-4">
            <label class="text-sm opacity-75">{{ $t("Country") }}</label>

            <v-select
              label="Country"
              class="mt-1 w-full"
              name="Country"
              v-model="Model.CountryCode"
              :reduce="CountryCode => CountryCode.CountryCode"
              :options="Country"
              v-validate="'required'"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <span class="text-danger text-sm" v-show="errors.has('City')">{{
              errors.first("ZibCode")
            }}</span>
          </div>
        </div>
        <div class="vx-row w-full m-2" id="account-manage-buttons">
          <div class="mb-2 mt-2 ">
            <vs-button
              class="mr-4"
              @click="registerCompany"
              :disabled="!validateForm"
            >
              {{ $t("Create") }}
            </vs-button>
          </div>
          <div class="mb-2 mt-2 ">
            <vs-button
              class="mr-4"
              type="border"
              color="warning"
              icon-pack="feather"
              @click="Back"
              >{{ $t("Back") }}</vs-button
            >
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";

import VehicleType_JSON from "./../driver/json/vehicles.json";
import vSelect from "vue-select";
import CountryCode_JSON from "./../driver/json/Countries";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import VacationMode_JSON from "./json/vacationMode.json";
import VehiclOptions_JSON from "./json/vehiclesOptions.json";
import VehiclOptions1_JSON from "./json/vehiclesOptions1.json";
import VehiclOptions2_JSON from "./json/vehiclesOptions2.json";

/* eslint-disable */
export default {
  VehicleTypeJson: VehicleType_JSON,
  CountryCodeJson: CountryCode_JSON,
  VehiclOptionseJson: VehiclOptions_JSON,
  VehiclOptionse1Json: VehiclOptions1_JSON,
  VehiclOptionse2Json: VehiclOptions2_JSON,
  VacationModeJson: VacationMode_JSON,
  Option: [],
  components: {
    vSelect
  },
  data() {
    return {
      isValid: true,
      StateList: [],
      CityList: [],
      ApiModel: {},
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "",
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US", "CZ", "LY", "GB"],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        },
        inputOptions: {
          showDialCode: false,
          tabindex: 0
        }
      },
      Model: {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Country: "",
        CountryCode: "",
        VehicleType: "",
        VehicleOption: "",
        Password: "",
        City: "",
        State: "",
        AdminUserId: "",
        ZibCode: ""
      }
    };
  },
  computed: {
    StateWithLocale() {
      let State = "admin1Name_en";
      if (this.$i18n.locale == "ar") {
        State = "admin1Name_ar";
      }
      return State;
    },
    CityWithLocale() {
      let City = "admin2Name_en";
      if (this.$i18n.locale == "ar") {
        City = "admin2Name_ar";
      }
      return City;
    },
    Country() {
      return this.$store.state.CountryList.Country;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.FirstName !== "" &&
        this.Model.LastName !== "" &&
        this.Model.Password != "" &&
        this.Model.State != "" &&
        this.Model.VehicleType != "" &&
        this.Model.VehicleType != null &&
        this.Model.CountryCode != "" &&
        this.Model.CountryCode != null &&
        this.Model.City != ""
      );
    }
  },
  methods: {
    GetCityList(StateName) {
      this.Model.City = "";
      var Model = {};
      Model.StateName = StateName;
      this.$store
        .dispatch("CountryList/GetCityList", Model)
        .then(res => {
          debugger;
          this.CityList = res.data;
        })
        .catch(() => {});
    },
    Back() {
      this.$router.go(-1);
    },
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    registerCompany() {
      if (!this.validateForm) {
        window.showFillData();

        return;
      }

      if (this.Model.VehicleOption == null) {
        this.Model.VehicleOption == "";
      }
      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      this.ApiModel = this.Country.find(
        Country => Country.CountryCode === this.Model.CountryCode
      );
      this.Model.Country = this.ApiModel.Country;
      this.Model.CountryCode = this.ApiModel.CountryCode;
      this.Model.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$vs.loading();
      this.$store
        .dispatch("DriverList/RegisterDriver", this.Model)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccessCreate();
            this.$router.push({
              name: "DriverProfile",
              params: { Id: response.data }
            });
          }
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: this.$t("Error"),
            text: error.response.data,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
        });
    }
  },
  mounted() {},
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    var Model = {};
    Model.CountryCode = "EG";
    this.$store
      .dispatch("CountryList/GetStateList", Model)
      .then(res => {
        debugger;
        this.StateList = res.data;
      })
      .catch(() => {});
    this.$store.dispatch("CountryList/fetchAllCountriesList").then(() => {
      this.Country.forEach(element => {
        if (
          element.CountryCode ==
          JSON.parse(localStorage.getItem("userInfo")).countrycode
        ) {
          this.Model.CountryCode = JSON.parse(
            localStorage.getItem("userInfo")
          ).countrycode;
        }
      });
    });
  }
};
</script>

<style lang="scss">
.regist-tabs-container {
  min-height: 500px;
}
</style>
