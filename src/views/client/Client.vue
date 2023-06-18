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
            {{ errors.first("Country") }}</span
          >
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75"
            ><span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
              $t("PhoneNumber")
            }}</span></label
          >
          <vs-input
            type="number"
            class="mt-1 w-full"
            v-model="Model.PhoneNumber"
            :min="0"
            @click.stop="Dropdown = !Dropdown"
          />
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("UserBalance") }}</label>
          <vs-input
            type="number"
            class="mt-1 w-full"
            name="Balance"
            v-model="Model.UserBalance"
          />
        </div>
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
      </div>

      <div class="vx-row" style="padding: 20px;">
        <vs-button class="mr-3 mb-2" @click="Search()" v-scroll-to="'#Scroll'">
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
            :data="Clients"
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
              <!-- <vs-th>Image</vs-th> -->
              <vs-th sort-key="firstName">{{ $t("FirstName") }}</vs-th>
              <vs-th sort-key="lastName">{{ $t("LastName") }}</vs-th>
              <vs-th sort-key="PhoneNumber">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="AccountStatus">{{ $t("AccountStatus") }}</vs-th>
              <vs-th sort-key="UserBalance">{{ $t("UserBalance") }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <!-- <vs-td class="img-container">
              <img :src=" baseURL + tr.ImagePathUrl" class="product-img"  v-if="tr.ImagePathUrl != null"/>
              <img :src=" defaultUrl" class="product-img"  v-else/>
            </vs-td> -->
                  <vs-td>
                    <p class="product-name font-medium truncate">
                      {{ tr.firstName }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">{{ tr.lastName }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                        tr.PhoneNumber
                      }}</span>
                    </p>
                  </vs-td>

                  <vs-td>
                    <!-- <vs-chip :color="getOrderStatusColor(tr.AccountStatus)" class="product-order-status">{{ tr.AccountStatus | text }}</vs-chip> -->
                    <vs-chip
                      :color="getOrderStatusColor(tr.AccountStatus)"
                      class="product-order-status"
                    >
                      <p>{{ $t(tr.AccountStatus) }}</p>
                    </vs-chip>
                  </vs-td>

                  <vs-td>
                    <p class="product-category">
                      {{ tr.UserBalance | numFormat("###,##0.00") }}
                      {{ $t(tr.WalletCountryCode + "_Currency") }}
                    </p>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <!-- <router-link :to="{name: 'Client-add/Edit', params: { data:{ Id: tr.Id , CountryCode: tr.CountryCode ,PhoneNumber: tr.PhoneNumber}}}" svgClasses="w-5 h-5 hover:text-primary stroke-current">
                    <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" style="padding:2px" />
                </router-link> -->

                    <router-link
                      :to="{ name: 'ClientProfile', params: { Id: tr.Id } }"
                    >
                      <feather-icon
                        icon="UserIcon"
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
import AccountStatus_JSON from "./../driver/json/accountStatusForClientAndUser";
import CountryCode_JSON from "./../driver/json/Countries";
import moduleClient from "@/store/client/moduleClient.js";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";

export default {
  AccountStatusJson: AccountStatus_JSON,
  CountryCodeJson: CountryCode_JSON,
  isSearchStalled: true,
  data() {
    return {
      Dropdown: false,
      Client: [],
      currentPage: 1,
      page: 1,
      perPage: 9,
      search: "",
      Clients: [],
      itemsPerPage: 10,
      Model: {
        CountryCode: "",
        PhoneNumber: "",
        UserBalance: "",
        AccountStatus: ""
      },
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "Enter phone number",
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
      }
    };
  },
  computed: {
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.Clients.length;
    },
    Country() {
      return this.$store.state.CountryList.Country;
    }
  },

  methods: {
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
      this.Clients = [];
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("ClientList/search", this.Model)
            .then(response => {
              if (response.status == 200) {
                if (response.data.length > 0) {
                  this.Clients = response.data;
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

  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  created() {
    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
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
