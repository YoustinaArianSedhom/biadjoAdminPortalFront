<template>
  <div>
    <!-- <Bc-CountryVSelect @SearchByCountryCode="Search"></Bc-CountryVSelect> -->
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
            v-model="Model.CountryCode"
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
          <label class="text-sm opacity-75">{{ $t("ClosingDateFrom") }}</label>
          <datepicker
            v-model="Model.ClosingDateStart"
            class="mt-1 w-full"
            name="Schedual"
            :language="DatepickerLang"
            v-validate="'required'"
          ></datepicker>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("ClosingDateTo") }}</label>
          <datepicker
            v-model="Model.ClosingDateEnd"
            class="mt-1 w-full"
            name="ClosingDate"
            :language="DatepickerLang"
            v-validate="'required'"
          ></datepicker>
        </div>
      </div>

      <div class="vx-row" style="padding: 20px;">
        <vs-button
          class="mr-3 mb-2"
          @click.prevent="Search()"
          :disabled="!validateModel"
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
            :data="UnPaidDriverList"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <vs-th sort-key="FullName">{{ $t("FullName") }}</vs-th>
              <vs-th sort-key="PhoneNumber">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="UnPaidBiadjosCount">{{
                $t("UnPaidBiadjosCount")
              }}</vs-th>
              <vs-th sort-key="DriverInfo">{{ $t("DriverInfo") }}</vs-th>
              <vs-th sort-key="BankAccountInfo">{{
                $t("BankAccountInfo")
              }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="product-category">
                      {{ tr.FirstName }} {{ tr.LastName }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                        tr.PhoneNo
                      }}</span>
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      {{ tr.UnPaidBiadjosCount }}
                    </p>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'DriverProfile',
                        params: { Id: tr.DriverId }
                      }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="UsersIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'BankAccountInfo',
                        params: { Id: tr.DriverId }
                      }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'DriverUnpaidBiadjos',
                        params: { Id: tr.DriverId }
                      }"
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
import moduleDriver from "@/store/driver/moduleDriver.js";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import CountryCode_JSON from "./../driver/json/Countries";
import Datepicker from "vuejs-datepicker";
import { en, ar } from "vuejs-datepicker/src/locale";
import "vue-slider-component/theme/default.css";

export default {
  CountryCodeJson: CountryCode_JSON,
  components: {
    Datepicker
    // BcCountryVSelect: () => import("@/views/BComponents/BcCountryVSelect")
  },
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
      ar: ar,
      en: en,
      Dropdown: false,
      currentPage: 1,
      UnPaidDriverList: [],
      search: "",
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      Model: {
        CountryCode: "",
        ClosingDateStart: "",
        ClosingDateEnd: ""
      }
    };
  },
  computed: {
    Country() {
      return this.$store.state.CountryList.Country;
    },
    DatepickerLang() {
      var SelectedLanguage = {};

      if (this.$i18n.locale == "ar") {
        SelectedLanguage = this.ar;
      } else {
        SelectedLanguage = this.en;
      }
      return SelectedLanguage;
    },
    validateModel() {
      return (
        !this.errors.any() &&
        this.Model.CountryCode !== "" &&
        this.Model.ClosingDateStart !== "" &&
        this.Model.ClosingDateEnd !== ""
      );
    }
  },

  methods: {
    outside: function() {
      this.Dropdown = false;
    },

    Search() {
      this.$vs.loading();
      this.UnPaidDriverList = [];
      // this.Model.CountryCode = value;
      this.$store
        .dispatch("DriverList/GetUnpaidDriverlist", this.Model)
        .then(res => {
          if (res.status == 200) {
            if (res.data.length > 0) {
              this.UnPaidDriverList = res.data;
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
