<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

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
          <label class="text-sm opacity-75">{{ $t("Status") }}</label>
          <v-select
            v-model="BiadjoModel.Status"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="this.$options.conflictedStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
          ></v-select>
          <span class="text-danger text-sm" v-show="errors.has('Status')">
            {{ errors.first("Status") }}
          </span>
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <vs-checkbox
            v-model="BiadjoModel.UserId"
            icon-pack="feather"
            style="padding-top: 15px;"
            class="mt-5 w-full"
            >{{ $t("AssignToMe") }}</vs-checkbox
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
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="Biadjo != undefined || Biadjo != null"
        >
          <vs-table
            ref="table"
            v-model="selected"
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
              <!-- <vs-th>Image</vs-th> -->
              <vs-th sort-key="id">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="DriverId">{{ $t("DriverID") }}</vs-th>
              <vs-th sort-key="Biadjo_A">{{ $t("BiadjoA") }}</vs-th>
              <!-- <vs-th sort-key="Biadjo_A_Schedule">
                {{ $t("Biadjo_A_Schedule") }}
              </vs-th> -->
              <vs-th sort-key="Biadjo_B">{{ $t("BiadjoB") }}</vs-th>
              <!-- <vs-th sort-key="Biadjo_B_Schedule">
                {{ $t("Biadjo_B_Schedule") }}
              </vs-th> -->
              <vs-th sort-key="AssignedUserName">{{
                $t("AssignedUserName")
              }}</vs-th>

              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="DriverId">{{ tr.DriverId }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="Biadjo_A">{{ tr.Biadjo_A }}</p>
                  </vs-td>
                  <!-- <vs-td>
                    <p class="Biadjo_A_Schedule">
                      {{
                        tr.Biadjo_A_Schedule | formatDate("yyyy/MM/dd HH:mm")
                      }}
                    </p>
                  </vs-td> -->
                  <vs-td>
                    <p class="Biadjo_B">{{ tr.Biadjo_B }}</p>
                  </vs-td>
                  <!-- <vs-td>
                    <p class="Biadjo_B_Schedule">
                      {{
                        tr.Biadjo_B_Schedule | formatDate("yyyy/MM/dd HH:mm")
                      }}
                    </p>
                  </vs-td> -->
                  <vs-td>
                    <p class="AssignedUserName">{{ tr.AssignedUserName }}</p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.Status)"
                      class="Status"
                      >{{ $t(tr.Status) }}</vs-chip
                    >
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'ConflictedDetails',
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
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import Status_JSON from "./../biadjo/json/conflictedStatus.json";

export default {
  conflictedStatusJson: Status_JSON,
  data() {
    return {
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      BiadjoModel: {
        CountryCode: "",
        Status: "",
        UserId: ""
      },
      addNewDataSidebar: false,
      sidebarData: {},
      UserID: "",
      Biadjo: []
    };
  },
  computed: {
    Country() {
      return this.$store.state.CountryList.Country;
    },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },

    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.Biadjo.length;
    }

    // KeyToValConflictedStatus() {
    //   let ACObj = JSON.parse(
    //     JSON.stringify(this.$options.conflictedStatusJson)
    //   );
    //   return ACObj[this.tr.Status];
    // }
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
      if (this.BiadjoModel.UserId == true) {
        this.BiadjoModel.UserId = this.UserID;
      } else {
        this.BiadjoModel.UserId = "";
      }
      this.Biadjo = [];

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store
            .dispatch("BiadjoList/GetConflictedBiadjo", this.BiadjoModel)
            .then(res => {
              if (res.status == 200) {
                if (res.data.length > 0) {
                  this.Biadjo = res.data;
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
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.UserID = userInfo.Id;

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
