<template>
  <div>
    <vx-card ref="filterCard" class="user-list-filters mb-8" collapse-action>
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Country") }}</label>
          <v-select
            label="Country"
            class="mt-1 w-full"
            name="Country"
            v-model="UserModel.CountryCode"
            :reduce="CountryCode => CountryCode.CountryCode"
            :options="Country"
            v-validate="'required'"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('Country')">{{
            errors.first("Country")
          }}</span>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Email") }}</label>
          <vs-input class="mt-1 w-full" v-model="UserModel.Email" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("AccountType") }}</label>
          <v-select
            v-model="UserModel.AccountType"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.AccountTypeJson"
            :get-option-label="option => $t(option.Code)"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            label="Value"
          ></v-select>
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("AccountStatus") }}</label>
          <v-select
            v-model="UserModel.Status"
            :reduce="Code => Code.Code"
            :get-option-label="option => $t(option.Code)"
            class="mt-1 w-full"
            :options="this.$options.AccountStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            label="Value"
          ></v-select>
        </div>

        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
          <vs-input
            :dir="$vs.rtl ? 'ltr' : 'ltr'"
            type="number"
            class="mt-1 w-full"
            :min="0"
            v-model="UserModel.PhoneNumber"
          />
        </div>
      </div>
      <div class="vx-row" style="padding: 20px;">
        <vs-button
          class="mr-3 mb-2"
          v-scroll-to="'#Scroll'"
          @click="Search()"
          >{{ $t("Search") }}</vs-button
        >
      </div>
    </vx-card>

    <div class="w-full" id="Scroll">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="User"
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
              <vs-th sort-key="country">{{ $t("Country") }}</vs-th>
              <vs-th sort-key="PhoneNumber">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="Email">{{ $t("Email") }}</vs-th>
              <vs-th sort-key="accounttype">{{ $t("AccountType") }}</vs-th>

              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="firstName">{{ tr.firstName }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="lastName">{{ tr.lastName }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="Country">{{ tr.country }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="PhoneNumber">
                      <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                        tr.PhoneNumber
                      }}</span>
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Email">{{ tr.Email }}</p>
                  </vs-td>
                  <!-- <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.status)"
                      class="AccountStatus"
                      >{{ tr.status }}</vs-chip
                    >
                  </vs-td>-->
                  <vs-td>
                    <p class="accounttype">{{ $t(tr.accounttype) }}</p>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'UserDetails',
                        params: { Id: tr.Id }
                      }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                    <!--
                <router-link :to="{name: 'UserProfile', params: { Id: tr.Id}}" svgClasses="w-5 h-5 hover:text-primary stroke-current">
                    <feather-icon icon="UsersIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" style="padding:2px" />
                    </router-link>-->
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
// import DataViewSidebar from '../DataViewSidebar.vue'
import moduleAuth from "@/store/auth/moduleAuth.js";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import AccountType_JSON from "./../driver/json/accountType.json";
import AccountStatus_JSON from "./../driver/json/accountStatusForClientAndUser.json";

export default {
  AccountTypeJson: AccountType_JSON,
  AccountStatusJson: AccountStatus_JSON,
  data() {
    return {
      selected: [],
      User: [],
      itemsPerPage: 10,
      isMounted: false,
      UserModel: {
        CountryCode: "",
        Email: "",
        AccountType: "",
        Status: "",
        PhoneNumber: ""
      }
    };
  },
  computed: {
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.User.length;
    },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    Country() {
      return this.$store.state.CountryList.Country;
    }
  },

  methods: {
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
      this.$vs.loading();
      this.User = [];
      this.$store
        .dispatch("UserList/search", this.UserModel)
        .then(response => {
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.$vs.loading.close();
              this.User = response.data;
            } else {
              this.$vs.loading.close();
              window.showNoRecords();
            }
          }
        })
        .catch(() => {
          window.showError();
          this.$vs.loading.close();
        });
    }
  },
  created() {
    if (!moduleAuth.isRegistered) {
      this.$store.registerModule("UserList", moduleAuth);
      moduleAuth.isRegistered = true;
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
          this.UserModel.CountryCode = JSON.parse(
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
