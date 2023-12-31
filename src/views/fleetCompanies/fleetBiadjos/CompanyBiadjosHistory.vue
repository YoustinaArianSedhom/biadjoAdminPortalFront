<template>
  <div>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="BiadjosHistoryModel != undefined || BiadjosHistoryModel != null"
        >
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="BiadjosHistoryModel"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4"
                @click="Back"
                type="border"
                color="warning"
                icon-pack="feather"
              >
                {{ $t("Back") }}
              </vs-button>
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
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
              <vs-th>{{ $t("BiadjoDetails") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
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
                      v-if="tr.PaymentStatus"
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
                      :to="{
                        name: 'BiadjoDetails',
                        params: { Id: tr.id }
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
import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";
import "vue-slider-component/theme/default.css";
import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  components: {},

  isSearchStalled: true,
  Autocomplete: {
    name: "autocomplete",
    template: "#autocomplete",
    props: {
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
      BiadjosHistoryModel: [],
      Dropdown: false,
      currentPage: 1,
      CountryCode: "",
      search: "",
      Vehicles: [],
      selected: [],
      ar: ar,
      en: en,
      itemsPerPage: 10,
      Model: {
        DriveId: ""
      }
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
    }
  },

  created() {
    this.$vs.loading();

    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }

    var company = {};
    company.CompanyId = this.$route.params.Id;
    this.$store
      .dispatch("CompanyList/BiadjoHistoryForCompany", company)
      .then(response => {
        if (response.data.length > 0) {
          this.BiadjosHistoryModel = response.data;

          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          window.showNoRecords();
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
        return;
      });
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
