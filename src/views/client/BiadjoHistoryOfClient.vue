<template>
  <div>
    <div style="padding: 10px;">
      <!-- <vs-button class="ml-auto mt-2" @click="editData" >Add Client </vs-button> -->
    </div>
    <vx-card
      ref="filterCard"
      v-bind:title="$t('Filters')"
      class="client-list-filters mb-8"
      collapse-action
    >
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full md:w-1/5">
          <label class="text-sm opacity-75">{{ $t("BiadjoNumber") }}</label>
          <vs-input
            type="number"
            class="mt-1 w-full"
            v-model="Model.BiadjoNo"
            :min="0"
            @click.stop="Dropdown = !Dropdown"
          />
        </div>

        <div class="vx-col sm:w-1/2 w-full md:w-1/5">
          <label class="text-sm opacity-75">{{ $t("Status") }}</label>
          <v-select
            v-model="Model.Status"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.biadjoStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
        </div>
        <div class="vx-col sm:w-1/2 w-full md:w-1/5">
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
        <div class="vx-col sm:w-1/2 w-full md:w-1/5">
          <label class="text-sm opacity-75">{{ $t("Schedual") }}</label>
          <datepicker
            :format="format"
            v-model="Model.Schedual"
            class="mt-1 w-full"
            name="Schedual"
            :language="DatepickerLang"
          ></datepicker>
        </div>

        <div class="vx-col sm:w-1/2 w-full md:w-1/5">
          <label class="text-sm opacity-75">{{ $t("ClosingDate") }}</label>
          <datepicker
            :format="format"
            v-model="Model.ClosingDate"
            class="mt-1 w-full"
            name="ClosingDate"
            :language="DatepickerLang"
          ></datepicker>
        </div>
      </div>

      <div class="vx-row" style="padding: 20px;">
        <vs-button class="mr-3 mb-2" @click="Search()" v-scroll-to="'#Scroll'">
          {{ $t("Search") }}</vs-button
        >
        <vs-button
          type="border"
          class="mr-3 mb-2"
          color="warning"
          icon-pack="feather"
          @click="Back"
        >
          {{ $t("Back") }}</vs-button
        >
      </div>
    </vx-card>
    <!-- RIGHT COL -->
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="BiadjoHistory_data != undefined || BiadjoHistory_data != null"
        >
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="BiadjoHistory_data"
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
                    <p class="ClosingDate">
                      {{ tr.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      v-if="tr.PaymentStatus"
                      :color="getOrderStatusColor(tr.PaymentStatus)"
                      class="PaymentStatus"
                      >{{ $t(tr.PaymentStatus) }}</vs-chip
                    >
                  </vs-td>

                  <vs-td>
                    <vs-chip
                      v-if="tr.Status"
                      :color="getStatusColor(tr.Status)"
                      class="Status"
                    >
                      <p>{{ $t(tr.Status) }}</p>
                    </vs-chip>
                    <!-- <p class="Status">{{ $t(tr.Status) }}</p> -->
                  </vs-td>
                  <vs-td>
                    <p class="DriverPaymentStatus">
                      {{ $t(tr.DriverPaymentStatus) }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Status">{{ tr.Rating | numFormat("0.00") }}</p>
                  </vs-td>
                  <vs-td>
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
import moduleClient from "@/store/client/moduleClient.js";
import biadjoStatus_Json from "./../biadjo/json/biadjoStatus";
import Datepicker from "vuejs-datepicker";
import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  biadjoStatusJson: biadjoStatus_Json,
  components: {
    Datepicker
    // Vehicles
  },

  isSearchStalled: true,
  Autocomplete: {
    name: "autocomplete",
    template: "#autocomplete",
    props: {
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
      format: "dd/MM/yyyy",
      Dropdown: false,
      // Client:[],
      currentPage: 1,
      BiadjoHistory_data: [],
      page: 1,
      perPage: 9,
      search: "",
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      Model: {
        BiadjoNo: "",
        UserId: "",
        Status: "",
        Rating: "",
        Schedual: "",
        ClosingDate: ""
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
    windowWidth() {
      return this.$store.state.windowWidth;
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
    getStatusColor(status) {
      if (status == "BS1") {
        return "#F8BD30";
      }
      if (status == "BS2") {
        return "#F8BD30";
      }
      if (status == "BS3") {
        return "#F8BD30";
      }
      if (status == "BS4") {
        return "dark";
      }
      if (status == "BS11") {
        return "#039BE5";
      }
      if (status == "BS12") {
        return "#B11226";
      }
      if (status == "BS13") {
        return "#B11226";
      }
      if (status == "BS14") {
        return "#B11226";
      }
      return "primary";
    },
    Back() {
      this.$router.go(-1);
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
    outside: function() {
      this.Dropdown = false;
    },
    Search() {
      this.$vs.loading();
      this.$validator.validateAll().then(result => {
        if (result) {
          this.Model.UserId = this.$route.params.Id;
          this.$store
            .dispatch("ClientList/BiadjoHistory", this.Model)
            .then(res => {
              if (res.status == 200) {
                if (res.data.length > 0) {
                  this.BiadjoHistory_data = res.data;
                  this.$vs.loading.close();
                } else {
                  this.BiadjoHistory_data = [];
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
    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
    }
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
#page-client-list {
  .client-list-filters {
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
