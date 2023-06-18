<template>
  <vx-card>
    <div class="vx-row m-4">
      <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("Country") }}</label>
        <v-select
          label="Country"
          :text="Country"
          :value="Country"
          class="mt-1 w-full"
          name="Country"
          v-model="ReportModel.CountryCode"
          :reduce="CountryCode => CountryCode.CountryCode"
          :options="Country"
          v-validate="'required'"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
        />
        <span class="text-danger text-sm" v-show="errors.has('Country')">
          {{ errors.first("Country") }}</span
        >
      </div>
      <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
        <vue-tel-input
          :dir="$vs.rtl ? 'ltr' : 'ltr'"
          v-validate="'required'"
          @change="onChange($event)"
          v-bind="bindProps"
          @onValidate="onValidate"
          name="PhoneNo"
          v-model="ReportModel.PhoneNo"
        >
        </vue-tel-input>
        <span v-if="!isValid" class="text-danger text-sm">{{
          $t("PhoneNumberIsNotValid")
        }}</span>
      </div>
      <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("StartDate") }}</label>
        <datepicker
          v-model="ReportModel.StartDate"
          class="mt-1 w-full"
          name="Schedual"
          :language="DatepickerLang"
        ></datepicker>
      </div>

      <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("EndDate") }}</label>
        <datepicker
          v-model="ReportModel.EndDate"
          class="mt-1 w-full"
          name="ClosingDate"
          :language="DatepickerLang"
        ></datepicker>
      </div>
    </div>
    <div class="vx-row" style="padding-top:20px">
      <div class="btn-group mb-2 mt-2 ">
        <vs-button
          class="mr-4"
          style="margin:auto;"
          icon-pack="feather"
          icon="icon-close"
          :disabled="!ReportModelData"
          @click="GenerateReport"
          >{{ $t("GenerateReport") }}</vs-button
        >
      </div>
      <div class="btn-group mb-2 mt-2 ">
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
  </vx-card>
</template>
<script>
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import Datepicker from "vuejs-datepicker";
import { en, ar } from "vuejs-datepicker/src/locale";
import moment from "moment";

export default {
  data() {
    return {
      ar: ar,
      en: en,
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "Enter a phone number",
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US"],
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
      isValid: false,
      ReportModel: {
        StartDate: null,
        EndDate: null,
        CountryCode: null,
        Lang: "ClientExpensesStatement",
        PhoneNo: null
      }
    };
  },
  components: {
    Datepicker
  },
  computed: {
    Country() {
      return this.$store.state.CountryList.Country;
    },
    ReportModelData() {
      return (
        !this.errors.any() &&
        this.ReportModel.StartDate != "" &&
        this.ReportModel.EndDate != "" &&
        this.ReportModel.StartDate != null &&
        this.ReportModel.EndDate != null &&
        this.ReportModel.CountryCode != null &&
        this.ReportModel.PhoneNo != null &&
        this.ReportModel.PhoneNo != ""
      );
    },

    DatepickerLang() {
      var SelectedLanguage = {};

      if (this.$i18n.locale == "ar") {
        SelectedLanguage = this.ar;
      } else {
        SelectedLanguage = this.en;
      }
      return SelectedLanguage;
    }
  },

  methods: {
    Back() {
      this.$router.go(-1);
    },
    onValidate({ number, isValid, country }) {
      this.bindProps.country = country;
      this.bindProps.number = number;
      this.isValid = isValid;
    },
    GenerateReport() {
      if (!this.ReportModelData) {
        window.showFillData();
        return;
      }

      let routeData = this.$router.resolve({
        name: "Reports",
        query: {
          C: this.ReportModel.CountryCode,
          L: this.ReportModel.Lang,
          M: this.ReportModel.PhoneNo,
          SD: moment(this.ReportModel.StartDate).format("MM/DD/yyyy"),
          ND: moment(this.ReportModel.EndDate).format("MM/DD/yyyy")
        }
      });
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountriesList");

    this.ReportModel.CountryCode = this.$route.params.C;
    this.ReportModel.PhoneNo = this.$route.params.M;
  }
};
</script>
