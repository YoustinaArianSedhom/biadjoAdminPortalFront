<template>
  <div id="page-Biadjo-view">
    <div class="w-full" id="Scroll">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            :max-items="itemsPerPage"
            pagination
            search
            :data="SubmittedOrderModel"
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
              <vx-tooltip v-bind:text="$t('ClickRefresh')">
                <vs-button
                  radius
                  v-hotkey="keymap"
                  @click="fetchData()"
                  color="success"
                  type="filled"
                  icon-pack="feather"
                  icon="icon-refresh-cw"
                ></vs-button>
              </vx-tooltip>

              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <vs-th sort-key="BiadjoNumber">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Offer">{{ $t("Offer") }}</vs-th>
              <vs-th>{{ $t("EditOffer") }}</vs-th>

              <vs-th sort-key="ViewDriverDetails">{{
                $t("ViewDriverDetails")
              }}</vs-th>
              <vs-th>{{ $t("BiadjoDetails") }}</vs-th>

              <vs-th>{{ $t("Accept") }}</vs-th>
              <vs-th>{{ $t("Reject") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="BiadjoRequestID">{{ tr.BiadjoRequesId }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="Offer">
                      {{ tr.Offer | numFormat("###,##0.00") }}
                    </p>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      :disabled="BiadjoStatus != 'BS3'"
                      size="small"
                      class=" w-full"
                      @click="EditDriverOfferPopup(tr)"
                      >{{ $t("EditOffer") }}</vs-button
                    >
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'DriverProfile',
                        params: { Id: tr.DriverId }
                      }"
                    >
                      <vs-button size="small">{{
                        $t("ViewDriverDetails")
                      }}</vs-button>
                    </router-link>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'BiadjoDetails',
                        params: { Id: tr.BiadjoRequesId }
                      }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <vs-button size="small">{{
                        $t("BiadjoDetails")
                      }}</vs-button>
                    </router-link>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <feather-icon
                      icon="CheckIcon"
                      svgClasses="w-7 h-7
                    hover:text-dark stroke-current"
                      style="padding: 2px; color:#27ABBE"
                      @click="OpenPopup(tr, 'A')"
                    />
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <feather-icon
                      icon="XIcon"
                      svgClasses="w-7 h-7
                    hover:text-dark stroke-current"
                      style="padding: 2px; color:#EA5455"
                      @click="OpenPopup(tr, 'R')"
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
        v-bind:title="$t('EditOffer')"
        :active.sync="ViewEditOfferPopup"
      >
        <EditDriverOffer
          :PopupModel="PopupModel"
          @ClosePopup="ViewEditOfferPopup = false"
          @Refresh="RefreshPage"
        ></EditDriverOffer>
      </vs-popup>
    </div>

    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('Confirm')"
        :active.sync="ViewAcceptOfferPopup"
      >
        <AcceptOrRejectOffer
          :result="result"
          @ClosePopup="ViewAcceptOfferPopup = false"
          @Refresh="RefreshPage"
        ></AcceptOrRejectOffer>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
export default {
  data() {
    return {
      result: {
        BiadjoId: "",
        DriverId: "",
        Approval: ""
      },
      itemsPerPage: 10,
      ViewAcceptOfferPopup: false,
      ViewEditOfferPopup: false,

      PopupModel: {
        BiadjoRequestID: "",
        DriverID: "",
        AdminUserId: "",
        Price: "",
        CountryCode: null
      },
      driver_id: "",
      biadjo_id: "",
      SubmittedOrderModel: {
        Offer: 0
      },
      Biadjo_not_found: false,
      disable: true,

      driver: {},
      BiadjoStatus: null
    };
  },
  computed: {
    keymap() {
      return {
        "alt+l": this.fetchData
      };
    }
  },
  components: {
    EditDriverOffer: () => import("@/views/generalPopups/EditDriverOffer.vue"),
    AcceptOrRejectOffer: () =>
      import("@/views/generalPopups/AcceptOrRejectOffer.vue")
  },
  methods: {
    OpenPopup(result, Approval) {
      this.ViewAcceptOfferPopup = true;

      this.result.Approval = Approval;
      this.result.BiadjoId = result.BiadjoRequesId;
      this.result.DriverId = result.DriverId;
    },
    RefreshPage() {
      this.ViewEditOfferPopup = false;
      this.ViewAcceptOfferPopup = false;
      this.fetchData();
    },
    EditDriverOfferPopup(tr) {
      this.PopupModel.BiadjoRequestID = tr.BiadjoRequesId;
      this.PopupModel.DriverID = tr.DriverId;
      this.PopupModel.Price = "";
      this.PopupModel.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;
      this.PopupModel.CountryCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode;
      this.ViewEditOfferPopup = true;
    },

    Back() {
      this.$router.go(-1);
    },
    fetchData() {
      this.$vs.loading();
      var Biadjo = {};
      this.SubmittedOrderModel = [];
      this.ViewAcceptOfferPopup = false;
      this.ViewEditOfferPopup = false;
      Biadjo.BiadjoId = this.$route.params.Id;
      this.$store
        .dispatch("BiadjoList/GetOffersForBiadjo", Biadjo)
        .then(response => {
          if (response.data.length > 0) {
            this.SubmittedOrderModel = response.data;
            var Status = {};
            Status.id = this.$route.params.Id;
            this.$store
              .dispatch("BiadjoList/GetBiadjoByid", Status)
              .then(response => {
                this.BiadjoStatus = response.data[0].Status;
                if (
                  this.BiadjoStatus == "BS4" ||
                  this.BiadjoStatus == "BS5" ||
                  this.BiadjoStatus == "BS6" ||
                  this.BiadjoStatus == "BS7" ||
                  this.BiadjoStatus == "BS8" ||
                  this.BiadjoStatus == "BS9" ||
                  this.BiadjoStatus == "BS10"
                ) {
                  this.disable = false;
                }
              });
            this.$vs.loading.close();
            // if (this.SubmittedOrderModel.Status == "BS11") {
            //   this.disable = true;
            // }
          } else {
            this.$vs.loading.close();
            window.showNoRecords();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          this.$router.push("/BiadjoSearch");
        });
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>
<style lang="scss">
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

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
