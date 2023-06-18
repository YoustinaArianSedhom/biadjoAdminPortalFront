<template>
  <div>
    <vx-card
      ref="filterCard"
      v-bind:title="$t('Filters')"
      class="user-list-filters mb-8"
      collapse-action
    >
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Country") }}</label>
          <v-select
            label="Country"
            class="mt-1 w-full"
            name="Country"
            v-model="BiadjoModel.CountryCode"
            :reduce="CountryCode => CountryCode.CountryCode"
            :options="Country"
            v-validate="'required'"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('Country')">
            {{ errors.first("Country") }}
          </span>
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("BiadjoNumber") }}</label>
          <vs-input type="text" class="mt-1 w-full" v-model="BiadjoModel.id" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("BiadjoStatus") }}</label>
          <v-select
            v-model="BiadjoModel.Status"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.BiadjoStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">
            {{ $t("DriverPaymentStatus") }}
          </label>
          <v-select
            v-model="BiadjoModel.DriverPaymentStatus"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.DriverPaymentStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Rating") }}</label>
          <vs-input
            type="Number"
            name="Rating"
            v-model="BiadjoModel.Rating"
            min="0"
            max="5"
            class="mt-1 w-full"
            onkeyup="if(this.value>5){this.value='5';}else if(this.value<0){this.value='0';}"
          />
          <!-- <span class="text-danger text-sm" v-show="errors.has('Rating')">{{ errors.first('Rating') }}</span> -->
        </div>
        <div class="vx-col sm:w-1/2 w-full md:w-1/4">
          <label class="text-sm opacity-75">{{ $t("Schedual") }}</label>
          <datepicker
            :format="format"
            v-model="BiadjoModel.Schedual"
            class="mt-1 w-full"
            name="Schedual"
            :language="DatepickerLang"
          ></datepicker>
        </div>

        <div class="vx-col sm:w-1/2 w-full md:w-1/4">
          <label class="text-sm opacity-75">{{ $t("ClosingDate") }}</label>
          <datepicker
            :format="format"
            v-model="BiadjoModel.ClosingDate"
            class="mt-1 w-full"
            name="ClosingDate"
            :language="DatepickerLang"
          ></datepicker>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Price") }}</label>
          <vs-input
            type="Number"
            name="Price"
            class="mt-1 w-full"
            v-model="BiadjoModel.Price"
          />
          <!-- <span class="text-danger text-sm" v-show="errors.has('PriceMore')">{{ errors.first('PriceMore') }}</span> -->
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full" style="padding-top: 20px;">
          <vs-radio
            v-model="BiadjoModel.LessThan"
            vs-value="true"
            class="mr-4 w-full"
            vs-name="Less Than Or Equal"
            >{{ $t("LessThanOrEqual") }}</vs-radio
          >
          <vs-radio
            v-model="BiadjoModel.LessThan"
            vs-value="false"
            class="mr-4 w-full"
            vs-name="Greater Than Or Equal"
            >{{ $t("GreaterThanOrEqual") }}</vs-radio
          >
        </div>
      </div>

      <div class="vx-row" style="padding: 20px;">
        <vs-button
          class="mr-3 mb-2"
          @click="Search()"
          v-scroll-to="'#Scroll'"
          >{{ $t("Search") }}</vs-button
        >
      </div>
    </vx-card>

    <div class="w-full" id="Scroll">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="Biadjo"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center">
                <span v-if="queriedItems > 0" class="mr-2 text-xl"
                  >{{ $t("Total") }} :
                </span>
                <span v-if="queriedItems > 0" class="text-primary text-xl">
                  {{ queriedItems }}
                </span>
              </div>
            </div>

            <template slot="thead">
              <vs-th sort-key="id">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="id">{{ $t("VehicleType") }}</vs-th>
              <vs-th sort-key="Price">{{ $t("Price") }}</vs-th>
              <vs-th sort-key="Schedual">{{ $t("Schedual") }}</vs-th>
              <vs-th sort-key="ClosingDate">{{ $t("ClosingDate") }}</vs-th>
              <vs-th sort-key="PaymentStatus">{{ $t("PaymentStatus") }}</vs-th>
              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <vs-th sort-key="DriverPaymentStatus">
                {{ $t("DriverPaymentStatus") }}
              </vs-th>
              <vs-th sort-key="Rating">{{ $t("Rating") }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.id }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="VehicleType font-medium truncate">
                      {{ $t(tr.VehicleType) }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Price">
                      {{ tr.Price | numFormat("###,##0.00") }}
                      {{ $t(tr.CountryCode + "_Currency") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Schedual">
                      {{ tr.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Status">
                      {{ tr.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      v-if="tr.PaymentStatus"
                      :color="getOrderStatusColor(tr.PaymentStatus)"
                      class="PaymentStatus"
                    >
                      <p>{{ $t(tr.PaymentStatus) }}</p>
                    </vs-chip>
                  </vs-td>

                  <vs-td>
                    <p class="Status">{{ $t(tr.Status) }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="DriverPaymentStatus">
                      {{ $t(tr.DriverPaymentStatus) }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Rating">{{ tr.Rating | numFormat("0.00") }}</p>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{ name: 'BiadjoDetails', params: { Id: tr.id } }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                  </vs-td>

                  <template class="expand-user" slot="expand">
                    <div class="con-expand-users w-full">
                      <div class="vx-row w-full ">
                        <vs-button
                          class="m-2"
                          @click="NavigateTo('ClientProfile', tr.UserId)"
                          >{{ $t("ViewUserDetails") }}</vs-button
                        >

                        <vs-button
                          v-show="tr.DriverId"
                          class="m-2"
                          @click="NavigateTo('DriverProfile', tr.DriverId)"
                          >{{ $t("ViewDriverDetails") }}</vs-button
                        >
                        <vs-button
                          v-show="tr.ClientCompanyId"
                          class="m-2"
                          @click="
                            NavigateTo(
                              'ClientCompanyDetails',
                              tr.ClientCompanyId
                            )
                          "
                        >
                          {{ $t("ClientCompanyDetails") }}</vs-button
                        >

                        <vs-button
                          v-show="tr.FleetCompanyId"
                          class="m-2"
                          @click="
                            NavigateTo(
                              'FleetCompaniesDetails',
                              tr.FleetCompanyId
                            )
                          "
                        >
                          {{ $t("FleetCompaniesDetails") }}
                        </vs-button>
                      </div>

                      <div
                        class="con-btns-user flex items-center justify-between"
                      >
                        <table>
                          <tr>
                            <td class="font-semibold">
                              {{ $t("TotalPrice") }}
                            </td>
                            <td>
                              {{ tr.Total | numFormat("###,##0.00") }}
                              {{ $t(tr.CountryCode + "_Currency") }}
                            </td>
                          </tr>

                          <tr>
                            <td class="font-semibold">{{ $t("Date") }}</td>
                            <td>
                              {{ tr.Date | formatDate("yyyy/MM/dd HH:mm") }}
                            </td>
                          </tr>
                        </table>

                        <table>
                          <tr>
                            <td class="font-semibold">
                              {{ $t("NumberOfWorkers") }}
                            </td>
                            <td>
                              {{ tr.NumberOfWorkers }}
                            </td>
                          </tr>

                          <tr>
                            <td class="font-semibold">
                              {{ $t("NumberOfStops") }}
                            </td>
                            <td>{{ tr.NumberOfTrips }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </template>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import BiadjoStatus_JSON from "./../biadjo/json/biadjoStatus";
import paymentStatus_JSON from "./../biadjo/json/paymentStatus.json";
import DriverPaymentStatus_Json from "./../biadjo/json/driverPaymentStatus.json";
import CountryCode_JSON from "./../driver/json/Countries";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import Datepicker from "vuejs-datepicker";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  components: {
    Datepicker
  },
  paymentStatusJson: paymentStatus_JSON,
  BiadjoStatusJson: BiadjoStatus_JSON,
  CountryCodeJson: CountryCode_JSON,
  DriverPaymentStatusJson: DriverPaymentStatus_Json,

  data() {
    return {
      Dropdown: false,
      Biadjo: [],
      ar: ar,
      en: en,
      format: "dd/MM/yyyy",
      itemsPerPage: 10,
      BiadjoModel: {
        LessThan: "true",
        CountryCode: "",
        Status: "",
        DriverPaymentStatus: "",
        Rating: "",
        Schedual: "",
        Price: "",
        id: "",
        ClosingDate: ""
      },
      disable: true
    };
  },
  watch: {
    $route() {
      if (this.Dropdown) {
        this.Dropdown = false;
      }
    }
  },
  computed: {
    DatepickerLang() {
      var SelectedLanguage = {};

      if (this.$i18n.locale == "ar") {
        SelectedLanguage = this.ar;
      } else {
        SelectedLanguage = this.en;
      }
      return SelectedLanguage;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.Biadjo.length;
    },
    Country() {
      return this.$store.state.CountryList.Country;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },

  methods: {
    NavigateTo(RouteName, Param) {
      this.$router.push({ name: RouteName, params: { Id: Param } });
    },

    getOrderStatusColor(status) {
      if (status == "PS3") {
        return "#F8BD30";
      }
      if (status == "PS1") {
        return "#039BE5";
      }
      if (status == "PS2") {
        return "#F8BD30";
      }
      // return "primary";
    },

    Search() {
      if (this.Biadjo.length > 0) {
        let rows = document.querySelectorAll(".tr-expand");
        for (var i = rows.length - 1; i >= 0; i--) {
          rows[i].remove();
        }
      }
      this.$vs.loading();
      this.Biadjo = [];
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("BiadjoList/search", this.BiadjoModel)
            .then(response => {
              if (response.status == 200) {
                if (response.data.length > 0) {
                  this.Biadjo = response.data;
                  this.Biadjo = this.Biadjo.reverse();
                  this.$vs.loading.close();
                } else {
                  this.$vs.loading.close();
                  window.showNoRecords();
                }
              }
            })
            .catch(() => {
              this.$vs.loading.close();
              window.showError();
            });
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
    }
  },

  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountriesList").then(() => {
      this.Country.forEach(element => {
        if (
          element.CountryCode ==
          JSON.parse(localStorage.getItem("userInfo")).countrycode
        ) {
          this.BiadjoModel.CountryCode = JSON.parse(
            localStorage.getItem("userInfo")
          ).countrycode;
        }
      });
    });
  }
};
</script>
<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
