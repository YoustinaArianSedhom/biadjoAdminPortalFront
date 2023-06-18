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
          v-scroll-to="'#Scroll'"
          :disabled="!validateModel"
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
            multiple
            ref="table"
            v-model="selected"
            search
            :data="FormData"
            @input="PrintSelected"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <span>
                {{ $t("SelectedBiadjoNo") }} :<a>
                  {{ selected.length }}
                </a></span
              >
              <span>
                {{ $t("TotalPrice") }}:<a>
                  {{ total | numFormat("###,##0.00") }}
                </a></span
              >
              <span>
                {{ $t("DriverTotalPayment") }}:<a>
                  {{
                    (total * (DriverPercentage / 100)) | numFormat("###,##0.00")
                  }}
                </a></span
              >
              <vs-button :disabled="selected.length == 0" @click="confirmSave">
                {{ $t("Pay") }}
              </vs-button>
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <!-- <vs-th>Image</vs-th> -->
              <vs-th sort-key="Biadjo Number">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Price">{{ $t("Price") }}</vs-th>
              <vs-th sort-key="Closing Date">{{ $t("ClosingDate") }}</vs-th>
              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <vs-th sort-key="Driver Payment Status">
                {{ $t("DriverPaymentStatus") }}
              </vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
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
                    <p class="Status">
                      {{ tr.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Status">{{ $t(tr.Status) }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="DriverPaymentStatus">
                      {{ $t(tr.DriverPaymentStatus) }}
                    </p>
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
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('PaymentDetails')"
        :active.sync="popupActivePaymentDetails"
      >
        >
        <popupActivePaymentDetails
          :Form="Form"
          :PayResponse="PayResponse"
        ></popupActivePaymentDetails>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
import "vue-slider-component/theme/default.css";
import Datepicker from "vuejs-datepicker";
import { en, ar } from "vuejs-datepicker/src/locale";
var numeral = require("numeral");

export default {
  data() {
    return {
      Dropdown: false,
      CountryCode: "",
      search: "",
      selected: [],
      Form: {},
      PayModel: {
        BiadjoList: [],
        AdminUserId: null
      },
      PayResponse: [],
      popupActivePaymentDetails: false,
      CountryCodestatic: "",
      total: 0,
      ar: ar,
      en: en,
      DriverPercentage: null,
      Model: {
        ClosingDateEnd: "",
        ClosingDateStart: "",
        DriveId: ""
      },
      FormData: []
    };
  },
  components: {
    Datepicker,
    popupActivePaymentDetails: () =>
      import("@/views/generalPopups/popupActivePaymentDetails.vue")
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
    },
    validateModel() {
      return (
        !this.errors.any() &&
        // this.Model.CountryCode !== "" &&
        this.Model.ClosingDateStart !== "" &&
        this.Model.ClosingDateEnd !== ""
      );
    }
  },

  methods: {
    Back() {
      this.$router.go(-1);
    },
    PrintSelected() {
      this.total = this.selected.reduce(function(prev, cur) {
        return prev + cur.Price;
      }, 0);
      return this.total;
    },

    confirmSave() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("Confirm"),
        text:
          this.$t("YouAreAboutToPay") +
          " " +
          numeral(this.total * (this.DriverPercentage / 100)).format("0.00") +
          " " +
          this.$t(this.CountryCodestatic + "_Currency"),
        accept: this.PayUnpaidBiadjos,
        acceptText: this.$t("Pay"),
        cancelText: this.$t("Cancel")
      });
    },
    PayUnpaidBiadjos() {
      this.$vs.loading();

      var element;
      this.PayModel.BiadjoList = [];
      for (let id = 0; id < this.selected.length; id++) {
        element = this.selected[id];
        this.PayModel.BiadjoList.push(element.id);
        this.PayModel.AdminUserId = JSON.parse(
          localStorage.getItem("userInfo")
        ).Id;
      }
      this.$store
        .dispatch("DriverList/PayDriver", this.PayModel)
        .then(response => {
          if (response.status == 200) {
            this.PayResponse = response.data;
            this.$vs.loading.close();
            window.showSuccess();
            this.popupActivePaymentDetails = true;
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
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
      this.selected = [];
      this.total = 0;
      this.Model.DriveId = this.$route.params.Id;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("DriverList/getDriverUnpaidBiadjos", this.Model)
            .then(response => {
              if (response.status == 200) {
                if (response.data.length > 0) {
                  this.FormData = response.data;
                  this.CountryCodestatic = response.data[0].CountryCode;
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
    // this.$store.dispatch("DriverList/fetchDataListItems");
    var driver = {};
    driver.Id = this.$route.params.Id;
    //  driver.CountryCode= this.$route.params.data.CountryCode ;
    driver.PhoneNumber = "";
    this.$store
      .dispatch("DriverList/GetDriverById", driver)
      .then(response => {
        if (response.data.length > 0) {
          this.Form = response.data[0];
          let WalletCountryCodeObj = {};

          WalletCountryCodeObj.WalletCountryCode = this.Form.WalletCountryCode;

          this.$store
            .dispatch("DriverList/GetDriverPercentage", WalletCountryCodeObj)
            .then(response => {
              if (response.status == 200) {
                this.DriverPercentage = response.data.value;
                this.$vs.loading.close();
              } else {
                this.$vs.loading.close();
              }
            })
            .catch(() => {
              this.$vs.loading.close();
              window.showError();
            });
          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          this.Form = null;
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
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
