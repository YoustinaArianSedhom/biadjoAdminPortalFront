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
            :text="Country"
            :value="Country"
            class="mt-1 w-full"
            name="Country"
            v-model="Model.CountryCode"
            :reduce="CountryCode => CountryCode.CountryCode"
            :options="Country"
            v-validate="'required'"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('Country')">
            {{ errors.first("Country") }}</span
          >
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
          <vs-input
            :dir="$vs.rtl ? 'ltr' : 'ltr'"
            type="number"
            :min="0"
            class="mt-1 w-full"
            v-model="Model.PhoneNumber"
          />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("DriverBalance") }}</label>
          <vs-input
            type="number"
            class="mt-1 w-full"
            name="Balance"
            v-model="Model.DriverBalance"
          />
        </div>
        <div
          class="vx-col md:w-1/4 sm:w-1/2 w-full"
          style="padding: 10px; margin-top: 10px;"
        >
          <vs-radio
            v-model="Model.LessThan"
            vs-value="true"
            class="mr-4 w-full"
            vs-name="layout-type-OfferingFood"
            >{{ $t("LessThanOrEqual") }}</vs-radio
          >
          <vs-radio
            v-model="Model.LessThan"
            vs-value="false"
            class="mr-4 w-full"
            vs-name="layout-type-Searchingforfood"
            >{{ $t("GreaterThanOrEqual") }}</vs-radio
          >
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("AccountStatus") }}</label>
          <v-select
            v-model="Model.AccountStatus"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.AccountStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("VacationMode") }}</label>
          <v-select
            v-model="Model.VacationMode"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.VacationModeJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            label="Value"
          ></v-select>
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("VehicleType") }}</label>
          <v-select
            v-model="Model.VehicleType"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.VehicleJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
        <div
          class="vx-col md:w-1/4 sm:w-1/2 w-full"
          v-if="
            this.Model.VehicleType == 'TT2' ||
              this.Model.VehicleType == 'TT3' ||
              this.Model.VehicleType == 'TT4'
          "
        >
          <label class="text-sm opacity-75">{{ $t("VehicleOption") }}</label>
          <v-select
            v-model="Model.VehicleOption"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.VehiclOptionsJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("State") }}</label>
          <v-select
            v-if="$i18n.locale == 'ar'"
            v-model="State"
            class="mt-1 w-full"
            :options="this.$options.StatesJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.StateAR)"
          ></v-select>
          <v-select
            v-if="$i18n.locale == 'en'"
            v-model="State"
            class="mt-1 w-full"
            :options="this.$options.StatesJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.StateEN)"
          ></v-select>
        </div>
      </div>

      <div class="vx-row" style="padding: 20px;">
        <vs-button
          class="mr-3 mb-2"
          @click.prevent="Search()"
          v-scroll-to="'#Scroll'"
        >
          {{ $t("Search") }}</vs-button
        >
      </div>
    </vx-card>
    <!-- RIGHT COL -->
    <div class="w-full" id="Scroll">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="Drivers"
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
              <vs-th sort-key="firstName">{{ $t("FullName") }}</vs-th>
              <vs-th sort-key="PhoneNumber">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="state"
                >{{ $t("State") }} → {{ $t("City") }}</vs-th
              >
              <vs-th sort-key="DriverBalance">{{ $t("DriverBalance") }}</vs-th>
              <vs-th sort-key="AccountStatus">{{ $t("AccountStatus") }}</vs-th>
              <!-- <vs-th sort-key="FleetDriver">{{ $t("FleetDriver") }}</vs-th> -->
              <vs-th sort-key="CompanyId">{{ $t("CompanyID") }}</vs-th>
              <vs-th sort-key="RegistrationDate">{{
                $t("RegistrationDate")
              }}</vs-th>
              <!-- <vs-th sort-key="vacationMode">{{ $t("VacationMode") }}</vs-th> -->
              <vs-th sort-key="VehicleType">{{ $t("VehicleType") }}</vs-th>
              <vs-th sort-key="VehicleOption">{{ $t("VehicleOption") }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-tr class="cursor-pointer hover:text-primary">
                  <vs-td>
                    <p class="product-name font-medium truncate">
                      {{ tr.firstName }} {{ tr.lastName }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                        tr.PhoneNumber
                      }}</span>
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category" :dir="$vs.rtl ? 'ltr' : 'ltr'">
                      {{ tr.state }} → {{ tr.city }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      {{ tr.DriverBalance | numFormat("###,##0.00") }}
                      {{ $t(tr.countrycode + "_Currency") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.AccountStatus)"
                      class="AccountStatus"
                      v-if="tr.AccountStatus"
                    >
                      {{ $t(tr.AccountStatus) }}
                    </vs-chip>
                  </vs-td>

                  <vs-td>
                    <vs-chip v-if="tr.CompanyId != 0" color="primary">
                      <p class="product-category">
                        {{ tr.CompanyId }}
                      </p>
                    </vs-chip>
                    <vs-chip v-else color="dark">
                      <p class="product-category">
                        {{ $t("AT0") }}
                      </p>
                    </vs-chip>
                  </vs-td>

                  <vs-td>
                    {{ tr.RegistrationDate | formatDate() }}
                  </vs-td>
                  <!-- <vs-td>
                    <p class="product-category">
                      {{ tr.vacationMode }}
                    </p>
                  </vs-td> -->
                  <vs-td>
                    <p class="product-category" v-if="tr.VehicleType">
                      {{ $t(tr.VehicleType) }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category" v-if="tr.VehicleOption">
                      {{ $t(tr.VehicleOption) }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <router-link
                      :to="{ name: 'DriverProfile', params: { Id: tr.Id } }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="UsersIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                  </vs-td>
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
import Vehicle_JSON from "./json/vehicles.json";
import AccountStatus_JSON from "./json/accountStatus.json";
import States_JSON from "./json/states.json";
import VacationMode_JSON from "./json/vacationMode.json";
import VehiclOptions_JSON from "./json/vehiclesOptions.json";
import moduleDriver from "@/store/driver/moduleDriver.js";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import "vue-slider-component/theme/default.css";

export default {
  StatesJson: States_JSON,
  VehicleJson: Vehicle_JSON,
  VehiclOptionsJson: VehiclOptions_JSON,
  VacationModeJson: VacationMode_JSON,
  AccountStatusJson: AccountStatus_JSON,
  isSearchStalled: true,
  Autocomplete: {
    name: "autocomplete",
    template: "#autocomplete",
    props: {
      // items: {
      //   type: Array,
      //   required: false,
      //   default: () => []
      // },
      Countries: {
        type: Array,
        required: false,
        default: () => []
      },
      isAsync: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  },

  data() {
    return {
      Dropdown: false,
      ToolTipObj: null,
      currentPage: 1,
      CountryCode: "",
      search: "",
      Vehicles: [],
      Hani: "",
      Drivers: [],
      itemsPerPage: 10,
      isMounted: false,
      State: null,
      Model: {
        LessThan: "true",
        AccountStatus: "",
        CountryCode: "",
        PhoneNumber: "",
        DriverBalance: "",
        VehicleType: "",
        VehicleOption: "",
        VacationMode: "",
        StateEN: "",
        StateAR: ""
      }
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
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.Drivers.length;
    },
    Country() {
      return this.$store.state.CountryList.Country;
    },
    firstAccountNames() {
      return this.Vehicles.map(Vehicles => Vehicles[0].account_name);
    }
  },

  methods: {
    SendObjectToToolTip(tr) {
      this.ToolTipObj = tr;
    },
    getOrderStatusColor(status) {
      if (status == "AS1") {
        return "#039BE5";
      }
      if (status == "AS2" || status == "AS3" || status == "AS4") {
        return "#EA5455";
      }
      if (status == "AS5" || status == "AS6") {
        return "#FF9F43";
      }
      // return "primary";
    },
    outside: function() {
      this.Dropdown = false;
    },

    Search() {
      this.$vs.loading();
      this.Drivers = [];

      if (this.State) {
        this.Model.StateAR = this.State.StateAR;
        this.Model.StateEN = this.State.StateEN;
      } else {
        this.Model.StateAR = "";
        this.Model.StateEN = "";
      }

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("DriverList/search", this.Model)
            .then(response => {
              if (response.status == 200) {
                if (response.data.length > 0) {
                  this.Drivers = response.data;
                  this.$vs.loading.close();
                } else {
                  window.showNoRecords();
                  this.$vs.loading.close();
                }
                this.$vs.loading.close();
              }
            })
            .catch(() => {
              window.showError();
              this.$vs.loading.close();
            });
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
    }
  },

  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountriesList").then(() => {
      // const result = this.Country.filter(
      //   x =>
      //     x.CountryCode ==
      //     JSON.parse(localStorage.getItem("userInfo")).countrycode
      // );
      // console.log(result);

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
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
#page-user-list {
  .user-list-filters {
    height: 10px;

    .vs__actions {
      position: absolute;
      right: 0;
      top: 20%;
      height: 100px;
      transform: translateY(-58%);
    }
  }
}

#instant-search-demo {
  .header {
    .filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .price-slider {
    max-width: 80%;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #instant-search-demo {
    #content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #content-container {
    .vs-sidebar {
      position: fixed !important;
      float: left !important;
    }
  }
}

.grid-view-item {
  // height: 450px;

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }

  button.page-link {
    display: inline-block;
  }

  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }

  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
}

#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
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
          padding: 10px;
          width: fit-content;

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
}</style
><style>
.vs-sidebar.vs-sidebar-parent {
  max-height: 1500px !important;
}
</style>
