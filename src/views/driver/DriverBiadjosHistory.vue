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
          <label class="text-sm opacity-75">{{ $t("BiadjoNumber") }}</label>
          <vs-input
            type="number"
            :min="0"
            class="mt-1 w-full"
            v-model="Model.BiadjoNo"
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
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Status") }}</label>
          <v-select
            v-model="Model.Status"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.BiadjoStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{
            $t("DriverPaymentStatus")
          }}</label>
          <v-select
            v-model="Model.DriverPaymentStatus"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.DriverPaymentStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Rating") }}</label>
          <vs-input
            type="Number"
            name="Rating"
            v-model="Model.Rating"
            min="0"
            max="5"
            class="mt-1 w-full"
            onkeyup="if(this.value>5){this.value='5';}else if(this.value<0){this.value='0';}"
          />
          <!-- <span class="text-danger text-sm" v-show="errors.has('Rating')">{{ errors.first('Rating') }}</span> -->
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Schedual") }}</label>
          <datepicker
            v-model="Model.Schedual"
            class="mt-1 w-full"
            name="Schedual"
            :language="DatepickerLang"
          ></datepicker>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("ClosingDate") }}</label>
          <datepicker
            v-model="Model.ClosingDate"
            class="mt-1 w-full"
            name="ClosingDate"
            :language="DatepickerLang"
          ></datepicker>
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
        <vs-button
          class="mr-3 mb-2"
          @click="Back"
          type="border"
          color="warning"
          icon-pack="feather"
        >
          {{ $t("Back") }}
        </vs-button>
      </div>
    </vx-card>
    <!-- RIGHT COL -->
    <div class="w-full" id="Scroll">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="FormData"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <!-- <vs-th>Image</vs-th> -->
              <vs-th sort-key="Biadjo Number">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Price">{{ $t("Price") }}</vs-th>
              <vs-th sort-key="Schedual">{{ $t("Schedual") }}</vs-th>
              <vs-th sort-key="Closing Date">{{ $t("ClosingDate") }}</vs-th>
              <vs-th sort-key="Payment Status">{{ $t("PaymentStatus") }}</vs-th>
              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <vs-th sort-key="Driver Payment Status">
                {{ $t("DriverPaymentStatus") }}
              </vs-th>
              <vs-th sort-key="Rating">{{ $t("Rating") }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <!-- <vs-td class="img-container">
              <img :src=" baseURL + tr.ImagePathUrl" class="product-img"  v-if="tr.ImagePathUrl != null"/>
              <img :src=" defaultUrl" class="product-img"  v-else/>
                  </vs-td>-->

                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.id }}</p>
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
                    <!-- <router-link :to="{name: 'User-add/Edit', params: { data:{ Id: tr.Id , CountryCode: tr.CountryCode ,PhoneNumber: tr.PhoneNumber}}}" svgClasses="w-5 h-5 hover:text-primary stroke-current">
                    <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" style="padding:2px" />
                    </router-link>-->

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
import BiadjoStatus_JSON from "./../biadjo/json/biadjoStatus.json";
import DriverPaymentStatus_JSON from "./../biadjo/json/driverPaymentStatus.json";
import moduleDriver from "@/store/driver/moduleDriver.js";
// import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import "vue-slider-component/theme/default.css";
import Datepicker from "vuejs-datepicker";
import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  components: {
    Datepicker
  },
  DriverPaymentStatusJson: DriverPaymentStatus_JSON,
  BiadjoStatusJson: BiadjoStatus_JSON,
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
      currentPage: 1,
      CountryCode: "",
      search: "",
      Vehicles: [],
      selected: [],
      ar: ar,
      en: en,
      Drivers: [],
      itemsPerPage: 10,
      isMounted: false,
      Model: {
        ClosingDate: "",
        Schedual: "",
        Rating: "",
        DriverPaymentStatus: "",
        Status: "",
        BiadjoNo: "",
        DriveId: ""
      },
      FormData: []
    };
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
        : this.driver.length;
    },
    Country() {
      return this.$store.state.CountryList.Country;
    }
  },

  methods: {
    Back() {
      this.$router.go(-1);
    },
    getOrderStatusColor(status) {
      if (status == "AS1") {
        return "#039BE5";
      }
      if (status == "AS2" || status == "AS3" || status == "AS4") {
        return "#F8BD30";
      }
      if (status == "AS5" || status == "AS6") {
        return "#F8BD30";
      }
      // return "primary";
    },
    outside: function() {
      this.Dropdown = false;
    },
    Search() {
      this.$vs.loading();
      this.FormData = [];
      this.Model.DriveId = this.$route.params.Id;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("DriverList/getDriverBiadjosHistory", this.Model)
            .then(response => {
              if (response.status == 200) {
                if (response.data.length > 0) {
                  this.FormData = response.data;
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
    // this.$vs.loading();

    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
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
}</style
><style>
.vs-sidebar.vs-sidebar-parent {
  max-height: 1500px !important;
}
</style>
