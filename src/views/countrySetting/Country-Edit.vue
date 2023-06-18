<template>
  <div id="data-list-list-view" class="data-list-container">
    <vx-card class="p-5 mb-5" title="Country">
      <vx-card class="flex-1 mb-5">
        <!-- <div class=" vx-col">   -->
        <div class="vx-row">
          <div
            style="margin: auto !important;"
            class="vx-col w-1/2 sm:w-1/5 md:w-1/6 xl:1/6"
          >
            <img
              v-if="!Model.Flag"
              src="@/assets/images/empty-image.png"
              alt="Choose Country"
              class="rounded mb-4 user-latest-image responsive"
            />

            <img
              v-else
              :src="Model.Flag"
              alt="latest-upload"
              class="rounded mb-4 user-latest-image responsive"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-select
              autocomplete
              class="w-full"
              :label="$t('Country')"
              v-model="Model.Country"
              v-on:change="getall()"
              name="Country"
              v-validate="'required'"
              :ignoreAccent="true"
            >
              <vs-select-item
                :key="index"
                :value="item.name"
                :text="item.name"
                v-for="(item, index) in AllCountries"
              />
            </vs-select>
            <span class="text-danger text-sm" v-show="errors.has('Country')">{{
              errors.first("Country")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('CountryCode')"
              disabled="true"
              v-bind:value="Model.CountryCode"
              v-model="Model.CountryCode"
              name="CountryCode"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('CountryCode')"
              >{{ errors.first("CountryCode") }}</span
            >
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('SupportPhoneNo')"
              v-model="Model.SupportPhoneNo"
              type="number"
              name="SupportPhoneNo"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('SupportPhoneNo')"
              >{{ errors.first("SupportPhoneNo") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('SupportEmail')"
              v-model="Model.SupportEmail"
              name="SupportEmail"
              v-validate="'required|email'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('SupportEmail')"
              >{{ errors.first("SupportEmail") }}</span
            >
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              @keypress="isNumber($event)"
              :label="$t('UserInitialFreeTrips')"
              v-model="Model.UserInitialFreeTrips"
              type="number"
              name="UserInitialFreeTrips"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('UserInitialFreeTrips')"
              >{{ errors.first("UserInitialFreeTrips") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              class="w-full"
              @keypress="isNumber($event)"
              :label="$t('UserInitialBalance')"
              v-model="Model.UserInitialBalance"
              type="number"
              name="UserInitialBalance"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('UserInitialBalance')"
              >{{ errors.first("UserInitialBalance") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              @keypress="isNumber($event)"
              :min="0"
              :label="$t('MaxUserCredit')"
              v-model="Model.MaxUserCredit"
              type="number"
              name="MaxUserCredit"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('MaxUserCredit')"
              >{{ errors.first("MaxUserCredit") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              class="w-full"
              :label="$t('DriverInitialFreeTrips')"
              v-model="Model.DriverInitialFreeTrips"
              type="number"
              name="DriverInitialFreeTrips"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('DriverInitialFreeTrips')"
              >{{ errors.first("DriverInitialFreeTrips") }}</span
            >
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              @keypress="isNumber($event)"
              :label="$t('DriverInitialBalance')"
              v-model="Model.DriverInitialBalance"
              type="number"
              name="DriverInitialBalance"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('DriverInitialBalance')"
              >{{ errors.first("DriverInitialBalance") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              class="w-full"
              @keypress="isNumber($event)"
              :min="0"
              :max="100"
              :label="$t('DriverPercentage')"
              v-model="Model.DriverPercentage"
              type="number"
              name="DriverPercentage"
              icon-pack="feather"
              icon="icon-percent"
              v-validate="'required|max_value:100'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('DriverPercentage')"
              >{{ errors.first("DriverPercentage") }}</span
            >
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              @keypress="isNumber($event)"
              :min="0"
              :label="$t('DriverInitialRating')"
              :max="5"
              v-model="Model.DriverInitialRating"
              type="number"
              name="DriverInitialRating"
              v-validate="'max:1'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('DriverInitialRating')"
              >{{ errors.first("DriverInitialRating") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <vs-input
              class="w-full"
              :min="0"
              @keypress="isNumber($event)"
              :label="$t('MaxDriverCredit')"
              v-model="Model.MaxDriverCredit"
              type="number"
              name="MaxDriverCredit"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('MaxDriverCredit')"
              >{{ errors.first("MaxDriverCredit") }}</span
            >
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              @keypress="isNumber($event)"
              :min="0"
              :max="100"
              icon-pack="feather"
              icon="icon-percent"
              :label="$t('CancelationFeePercentage')"
              v-model="Model.CancelationFeePercentage"
              type="number"
              name="CancelationFeePercentage"
              v-validate="'required|max_value:100'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('CancelationFeePercentage')"
              >{{ errors.first("CancelationFeePercentage") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              :label="$t('CommercialRegistrationNo')"
              class="w-full"
              v-model="Model.CommercialRegistrationNo"
              name="CommercialRegistrationNo"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('CommercialRegistrationNo')"
              >{{ errors.first("CommercialRegistrationNo") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('AddCity')"
              v-model="Model.AddCity"
              name="AddCity"
              v-validate="'required'"
            />
            <span class="text-danger text-sm" v-show="errors.has('AddCity')">{{
              errors.first("AddCity")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('AddCountry')"
              v-model="Model.AddCountry"
              name="AddCountry"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('AddCountry')"
              >{{ errors.first("AddCountry") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('AddState')"
              v-model="Model.AddState"
              name="AddState"
              v-validate="'required'"
            />
            <span class="text-danger text-sm" v-show="errors.has('AddState')">{{
              errors.first("AddState")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('Address')"
              v-model="Model.Address"
              name="Address"
              v-validate="'required'"
            />
            <span class="text-danger text-sm" v-show="errors.has('Address')">{{
              errors.first("Address")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              :label="$t('AddZibCode')"
              class="w-full"
              v-model="Model.AddZibCode"
              name="AddZibCode"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('AddZibCode')"
              >{{ errors.first("AddZibCode") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('AddPhone')"
              v-model="Model.AddPhone"
              name="AddPhone"
              v-validate="'required'"
            />
            <span class="text-danger text-sm" v-show="errors.has('AddPhone')">{{
              errors.first("AddPhone")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('IntAddCity')"
              v-model="Model.IntAddCity"
              name="IntAddCity"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('IntAddCity')"
              >{{ errors.first("IntAddCity") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('IntAddCountry')"
              v-model="Model.IntAddCountry"
              name="IntAddCountry"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('IntAddCountry')"
              >{{ errors.first("IntAddCountry") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('IntAddState')"
              v-model="Model.IntAddState"
              name="IntAddState"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('IntAddState')"
              >{{ errors.first("IntAddState") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('IntAddress')"
              v-model="Model.IntAddress"
              name="IntAddress"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('IntAddress')"
              >{{ errors.first("IntAddress") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              :label="$t('IntAddZibCode')"
              class="w-full"
              v-model="Model.IntAddZibCode"
              name="IntAddZibCode"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('IntAddZibCode')"
              >{{ errors.first("IntAddZibCode") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('IntAddPhone')"
              v-model="Model.IntAddPhone"
              name="IntAddPhone"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('IntAddPhone')"
              >{{ errors.first("IntAddPhone") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('Currancy')"
              v-model="Model.Currancy"
              name="Currancy"
              v-validate="'required'"
            />
            <span class="text-danger text-sm" v-show="errors.has('Currancy')">{{
              errors.first("Currancy")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('CurrancyISOCode')"
              v-model="Model.CurrancyISOCode"
              name="CurrancyISOCode"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('CurrancyISOCode')"
              >{{ errors.first("CurrancyISOCode") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('DriverTAXPercentage')"
              v-model="Model.DriverTAXPercentage"
              name="DriverTAXPercentage"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('DriverTAXPercentage')"
              >{{ errors.first("DriverTAXPercentage") }}</span
            >
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('InsurancePercentage')"
              v-model="Model.InsurancePercentage"
              name="InsurancePercentage"
              v-validate="'required|max_value:100'"
              icon-pack="feather"
              icon="icon-percent"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('InsurancePercentage')"
              >{{ errors.first("InsurancePercentage") }}</span
            >
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('VATID')"
              v-model="Model.VATID"
              name="VATID"
              v-validate="'required'"
            />
            <span class="text-danger text-sm" v-show="errors.has('VATID')">{{
              errors.first("VATID")
            }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              class="w-full"
              :label="$t('VATPercentage')"
              v-model="Model.VATPercentage"
              name="VATPercentage"
              v-validate="'required|max_value:100'"
              icon-pack="feather"
              icon="icon-percent"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('VATPercentage')"
              >{{ errors.first("VATPercentage") }}</span
            >
          </div>

          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label class="text-sm opacity-75">{{ $t("PaymentGateway") }}</label>
            <v-select
              :reduce="Code => Code.Code"
              class="mt-1 w-full"
              v-model="Model.PaymentGatway"
              :get-option-label="option => $t(option.Code)"
              :options="this.$options.PaymentGatewaysJSON"
              v-validate="'required'"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('PaymentGatway')"
              >{{ errors.first("PaymentGatway") }}</span
            >
          </div>
        </div>

        <!-- </div> -->
      </vx-card>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button
              class="ml-auto mt-2"
              @click.prevent="save_changes()"
              :disabled="!validateForm"
              >{{ $t("Submit") }}
            </vs-button>
            <vs-button
              class="ml-4 mt-2"
              type="border"
              color="danger"
              @click="cancel"
              >{{ $t("Cancel") }}</vs-button
            >
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import PaymentGateways_JSON from "@/views/jsonFiles/PaymentGateways.json";

export default {
  PaymentGatewaysJSON: PaymentGateways_JSON,
  data() {
    return {
      config: {
        dateFormat: "Y-m-d H:i ",
        enableTime: true
      },
      instructors: [],
      courseModules: [],
      Providers: [],
      selected: [],
      activePrompt: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3
      },
      itemsPerPage: 10,
      isMounted: false,
      Model: {},
      ApiModel: {},
      country_not_found: false,
      alpha2Code: ""
    };
  },
  computed: {
    AllCountries() {
      return this.$store.state.CountryList.AllCountries;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.Flag != undefined &&
        this.Model.Country != undefined &&
        this.Model.CountryCode != undefined &&
        this.Model.SupportPhoneNo != "" &&
        this.Model.SupportPhoneNo != undefined &&
        this.Model.SupportEmail != "" &&
        this.Model.SupportEmail != undefined &&
        this.Model.UserInitialFreeTrips !== "" &&
        this.Model.UserInitialFreeTrips !== undefined &&
        this.Model.UserInitialBalance !== "" &&
        this.Model.UserInitialBalance !== undefined &&
        this.Model.MaxUserCredit !== "" &&
        this.Model.MaxUserCredit !== undefined &&
        this.Model.DriverInitialFreeTrips !== "" &&
        this.Model.DriverInitialFreeTrips !== undefined &&
        this.Model.DriverInitialBalance !== "" &&
        this.Model.DriverInitialBalance !== undefined &&
        this.Model.DriverPercentage !== "" &&
        this.Model.DriverPercentage !== undefined &&
        this.Model.DriverInitialRating !== "" &&
        this.Model.DriverInitialRating !== undefined &&
        this.Model.MaxDriverCredit !== "" &&
        this.Model.MaxDriverCredit !== undefined &&
        this.Model.CancelationFeePercentage !== "" &&
        this.Model.CancelationFeePercentage !== undefined &&
        this.Model.AddCity !== "" &&
        this.Model.AddCountry !== "" &&
        this.Model.AddPhone !== "" &&
        this.Model.AddState !== "" &&
        this.Model.AddZibCode !== "" &&
        this.Model.Address !== "" &&
        this.Model.CommercialRegistrationNo !== "" &&
        this.Model.Currancy !== "" &&
        this.Model.CurrancyISOCode !== "" &&
        this.Model.DriverTAXPercentage !== "" &&
        this.Model.InsurancePercentage !== "" &&
        this.Model.IntAddCity !== "" &&
        this.Model.IntAddCountry !== "" &&
        this.Model.IntAddPhone !== "" &&
        this.Model.IntAddState !== "" &&
        this.Model.IntAddZibCode !== "" &&
        this.Model.IntAddress !== "" &&
        this.Model.VATID !== "" &&
        this.Model.VATPercentage !== "" &&
        this.Model.AddCity !== undefined &&
        this.Model.AddCountry !== undefined &&
        this.Model.AddPhone !== undefined &&
        this.Model.AddState !== undefined &&
        this.Model.AddZibCode !== undefined &&
        this.Model.Address !== undefined &&
        this.Model.CommercialRegistrationNo !== undefined &&
        this.Model.Currancy !== undefined &&
        this.Model.CurrancyISOCode !== undefined &&
        this.Model.DriverTAXPercentage !== undefined &&
        this.Model.InsurancePercentage !== undefined &&
        this.Model.IntAddCity !== undefined &&
        this.Model.IntAddCountry !== undefined &&
        this.Model.IntAddPhone !== undefined &&
        this.Model.IntAddState !== undefined &&
        this.Model.IntAddZibCode !== undefined &&
        this.Model.IntAddress !== undefined &&
        this.Model.VATID !== undefined &&
        this.Model.VATPercentage !== undefined &&
        this.Model.PaymentGatway !== undefined &&
        this.Model.PaymentGatway !== ""
      );
    }
  },

  methods: {
    getall() {
      this.ApiModel = this.AllCountries.find(
        AllCountries => AllCountries.name === this.Model.Country
      );
      this.Model.CountryCode = this.ApiModel.alpha2Code;
      this.Model.Flag = this.ApiModel.flag;
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

    cancel() {
      this.$router.push("/Country");
    },

    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }

      this.$vs.loading();

      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.Model.Id) {
            this.$store
              .dispatch("CountryList/updateCountry", this.Model)
              .then(res => {
                if (res.status == 200) {
                  this.$vs.loading.close();
                  window.showSuccess();
                  this.$router.push("/Country");
                }
              })
              .catch(() => {
                this.$vs.loading.close();
                window.showError();
              });
          } else {
            this.$store
              .dispatch("CountryList/addCountry", this.Model)
              .then(res => {
                if (res.status == 200) {
                  this.$vs.loading.close();
                  window.showSuccess();
                  this.$router.push("/Country");
                }
              })
              .catch(() => {
                this.$vs.loading.close();
                window.showError();
              });
          }
        }
      });
    }
  },
  created() {
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountries");

    if (this.$route.params.Id) {
      var country = {};
      country.Id = this.$route.params.Id;
      country.CountryCode = this.$route.query.Code;
      this.$store
        .dispatch("CountryList/GetCountryById", country)
        .then(response => {
          this.Model = response.data[0];
        })
        .catch(() => {
          window.showError();
        });
    }
  }
};
</script>
