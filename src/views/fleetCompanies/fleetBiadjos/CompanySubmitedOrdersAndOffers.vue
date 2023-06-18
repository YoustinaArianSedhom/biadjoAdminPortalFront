<!-- =========================================================================================
  File Name: BiadjoView.vue
  Description: Biadjo View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Biadjo/pixinvent
========================================================================================== -->
<template>
  <div id="page-Biadjo-view">
    <Bc-CountryVSelect @SearchByCountryCode="Search"></Bc-CountryVSelect>
    <vx-card
      ref="filterCard"
      v-bind:title="$t('Filters')"
      class="user-list-filters mb-8"
      collapse-action
    >
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO1">{{
            $t("SO1")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO2">{{
            $t("SO2")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO3">{{
            $t("SO3")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO4">{{
            $t("SO4")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="ALL">{{
            $t("ALL")
          }}</vs-radio>
        </div>
      </div>
    </vx-card>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="SubmittedOrderModel != undefined || SubmittedOrderModel != null"
        >
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="filteredSubmittedOrderModel"
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
              <vs-th sort-key="SubmittedOrderNumber">{{
                $t("SubmittedOrderNumber")
              }}</vs-th>
              <vs-th sort-key="BiadjoNumber">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Offer">{{ $t("Offer") }}</vs-th>
              <vs-th sort-key="Status"> {{ $t("Status") }} </vs-th>
              <vs-th sort-key="Date">{{ $t("Date") }}</vs-th>

              <vs-th>{{ $t("SubmitOffer") }}</vs-th>
              <vs-th>{{ $t("BiadjoDetails") }}</vs-th>
              <vs-th>{{ $t("BiadjMap") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="BiadjoRequestID">{{ tr.BiadjoRequestID }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="Offer">
                      {{ tr.Offer | numFormat("###,##0.00") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.Status)"
                      class="Status"
                      >{{ $t(tr.Status) }}</vs-chip
                    >
                  </vs-td>
                  <vs-td>
                    <p class="DateTime">
                      {{ tr.DateTime | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <feather-icon
                      v-if="tr.Status == 'SO1'"
                      icon="ArchiveIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      style="padding: 2px"
                      @click="CompanySubmitOfferOpen(tr)"
                    />
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      v-if="tr.Status == 'SO1' || tr.Status == 'SO4'"
                      :to="{
                        name: 'BiadjoDetails',
                        params: { Id: tr.BiadjoRequestID }
                      }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px"
                      />
                    </router-link>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <feather-icon
                      v-if="tr.Status == 'SO1' || tr.Status == 'SO4'"
                      icon="ArchiveIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      style="padding: 2px"
                    />
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('SubmitOffer')"
        :active.sync="CompanySubmitOffer"
      >
        <CompanySubmitOffer
          :PopupModel="PopupModel"
          @ClosePopup="CompanySubmitOffer = false"
        ></CompanySubmitOffer>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";

export default {
  data() {
    return {
      CompanySubmitOffer: false,

      itemsPerPage: 10,
      statusFilter: "SO1",
      PopupModel: {
        BiadjoId: "",
        DriverId: "",
        UserId: "",
        Offer: "",
        CountryCode: ""
      },

      SubmittedOrderModel: [],
      disable: true,
      popupActive: false
    };
  },
  components: {
    BcCountryVSelect: () => import("@/views/BComponents/BcCountryVSelect"),

    CompanySubmitOffer: () =>
      import("@/views/generalPopups/CompanySubmitOffer.vue")
  },
  computed: {
    filteredSubmittedOrderModel() {
      if (this.statusFilter != "ALL") {
        return this.SubmittedOrderModel.filter(order => {
          return order.Status == this.statusFilter;
        });
      } else {
        return this.SubmittedOrderModel;
      }
    }
  },
  methods: {
    CompanySubmitOfferOpen(tr) {
      this.PopupModel.BiadjoId = tr.BiadjoRequestID;
      this.PopupModel.DriverId = tr.DriverID;
      this.PopupModel.Offer = tr.Offer;
      this.CompanySubmitOffer = true;
    },
    getOrderStatusColor(status) {
      if (status == "SO3") {
        return "#F8BD30";
      }
      if (status == "SO1") {
        return "#F8BD30";
      }
      if (status == "SO2") {
        return "#F8BD30";
      }
      if (status == "SO4") {
        return "#039BE5";
      }
      // return "primary";
    },

    Back() {
      this.$router.go(-1);
    },
    Search(value) {
      this.$vs.loading();
      if (value) this.PopupModel.CountryCode = value;
      else {
        this.PopupModel.CountryCode = this.$route.params.CountryCode;
      }
      var company = {};
      company.CompanyId = this.$route.params.Id;

      this.$store
        .dispatch("CompanyList/SubmitedOrdersAndOffersForCompany", company)
        .then(response => {
          if (response.data.length > 0) {
            this.SubmittedOrderModel = response.data;

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
  },
  created() {
    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }

    this.Search();
  }
};
</script>
<style lang="scss" scopped>
#avatar-col {
  width: 10rem;
}
#page-Biadjo-view {
  table {
    td {
      vertical-align: baseline !important;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
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

  th.td-check {
    padding: 0 15px !important;
  }

  tr {
    background: none;
    box-shadow: none;
  }
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
