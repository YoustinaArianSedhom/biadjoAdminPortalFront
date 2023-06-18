<template>
  <div id="page-user-view">
    <form>
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
            <!-- <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("CompanyName") }}</label>
              <vs-input
                class="w-full"
                v-model="Model.CompanyName"
                name="CompanyName"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('CompanyName')"
                >{{ errors.first("CompanyName") }}</span
              >
            </div> -->
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
              <vue-tel-input
                @onInput="onInput"
                class="w-full"
                v-model="Model.PhoneNo"
                v-validate="'required'"
                name="PhoneNumber"
                :dir="$vs.rtl ? 'ltr' : 'ltr'"
                v-bind="bindProps"
              >
              </vue-tel-input>
              <span v-if="!isValid" class="text-danger text-sm">{{
                $t("InvalidPhoneNumber")
              }}</span>
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Email") }}</label>
              <vs-input
                class="w-full"
                v-model="Model.Email"
                v-validate="'required|email'"
                name="Email"
              />
              <span class="text-danger text-sm" v-show="errors.has('Email')">{{
                errors.first("Email")
              }}</span>
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
              <span
                class="text-danger text-sm"
                v-show="errors.has('Password')"
                >{{ errors.first("Password") }}</span
              >
            </div>
            <!-- <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("AccountType") }}</label>
              <v-select
                style="padding:0px !important"
                v-validate="'required'"
                :reduce="Code => Code.Code"
                class=" w-full"
                :options="this.$options.AccountTypeJson"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                :get-option-label="option => $t(option.Code)"
                v-model="Model.AccountType"
                :ignoreAccent="true"
              ></v-select>
              <span class="text-danger text-sm" v-show="errors.has('Email')">{{
                errors.first("Email")
              }}</span>
            </div> -->
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
              <span
                class="text-danger text-sm"
                v-show="errors.has('LastName')"
                >{{ errors.first("LastName") }}</span
              >
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Country") }}</label>

              <v-select
                label="Country"
                class="mt-1 w-full p-0"
                name="Country"
                v-model="Model.CountryCode"
                :reduce="CountryCode => CountryCode.CountryCode"
                :options="Country"
                v-validate="'required'"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Country')"
                >{{ errors.first("Country") }}</span
              >
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

            <!-- <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Address") }}</label>
              <vs-input
                class="w-full"
                v-model="Model.Address"
                v-validate="'required'"
                name="Address"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Address')"
                >{{ errors.first("Address") }}</span
              >
            </div> -->

            <!-- <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("ZipCode") }}</label>

              <vs-input
                class="w-full"
                v-model="Model.ZibCode"
                v-validate="'required'"
                name="ZibCode"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('ZibCode')"
                >{{ errors.first("ZibCode") }}</span
              >
            </div> -->
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
    </form>
  </div>
</template>

<script>
import moduleClient from "@/store/client/moduleClient.js";
import AccountType_JSON from "./../driver/json/AcountType.json";
import vSelect from "vue-select";
import CountryCode_JSON from "./../driver/json/Countries";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";

/* eslint-disable */
export default {
  AccountTypeJson: AccountType_JSON,
  CountryCodeJson: CountryCode_JSON,

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
        AccountType: "AT0",
        Password: "",
        CompanyName: "",
        City: "",
        State: "",
        AdminUserId: "",
        CompanyId: "0",
        CompanyUser: "flase"
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
        this.Model.Email !== "" &&
        this.Model.Password != "" &&
        this.isValid == true &&
        this.Model.State != "" &&
        this.Model.AccountType != "" &&
        this.Model.AccountType != null &&
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

      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      this.ApiModel = this.Country.find(
        Country => Country.CountryCode === this.Model.CountryCode
      );
      this.Model.Country = this.ApiModel.Country;
      this.Model.CountryCode = this.ApiModel.CountryCode;
      this.Model.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$vs.loading();
      this.$store
        .dispatch("ClientList/RegisterUser", this.Model)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccessCreate();
            this.$router.push({
              name: "ClientProfile",
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
    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
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
