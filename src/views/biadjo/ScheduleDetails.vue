<template>
  <div id="page-Biadjo-view">
    <vs-alert
      color="danger"
      title="Biadjo Not Found"
      :active.sync="Biadjo_not_found"
    >
      <span>schedual record with data: {{ $route.params.Id }} not found.</span>
    </vs-alert>
    <div id="FormData" v-if="FormData != undefined">
      <vx-card v-bind:title="$t('schedual')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img src="https://www.gravatar.com/avatar/HASH?s=400" class="rounded w-full" />
            </div>
          </div>-->

          <div class="vx-col flex-1" id="account-info-col-1">
            <!-- <div class="vx-row "> -->
            <table>
              <tr>
                <td class="font-semibold">{{ $t("BiadjoNumber") }}</td>
                <td>{{ FormData.id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ FormData.UserId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("DriverID") }}</td>
                <td>{{ FormData.DriverId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Price") }}</td>
                <td>
                  {{ FormData.Price | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Insurance") }}</td>
                <td>{{ FormData.Insurance }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("InsuranceValue") }}</td>
                <td>
                  {{ FormData.InsuranceValue | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Rating") }}</td>
                <td>
                  <star-rating
                    v-model="FormData.Rating"
                    v-bind:increment="0.01"
                    v-bind:max-rating="5"
                    inactive-color="gray"
                    active-color="orange"
                    v-bind:read-only="true"
                    v-bind:show-rating="false"
                    v-bind:round-start-rating="false"
                    v-bind:star-size="20"
                    :rtl="StarRatingRTL"
                  ></star-rating>
                </td>
                <td
                  style="left: 280px;right: 240px; position: absolute; padding-right: 80px;"
                >
                  ({{ FormData.Rating | numFormat("###,##0.00") }})
                </td>
              </tr>
              <tr style="width: 1400px;">
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ FormData.Country }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("PaymentMethod") }}</td>
                <td>{{ $t(FormData.PaymentMethod) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PaymentStatus") }}</td>
                <td>{{ $t(FormData.PaymentStatus) }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(FormData.Status) }}</td>
              </tr>

              <tr style="width: 1400px;">
                <td class="font-semibold">{{ $t("DriverPaymentStatus") }}</td>
                <td>{{ $t(FormData.DriverPaymentStatus) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Schedual") }}</td>
                <td>
                  {{ FormData.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Date") }}</td>
                <td>
                  {{ FormData.Date | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("ClosingDate") }}</td>
                <td>
                  {{ FormData.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>
              <tr style="width: 1400px;">
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ FormData.CountryCode }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="vx-row">
          <!-- <vs-button
            icon-pack="feather"
            icon="icon-edit"
            class="mr-4"
            :to="{ name: 'UpdateBiadjo', params: { Id: FormData.id } }"
            :disabled="disable"
            >{{ $t("Edit") }}</vs-button
          > -->
          <router-link
            :to="{
              name: 'DriverProfile',
              params: { Id: FormData.DriverId }
            }"
          >
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4">{{
              $t("ViewDriverDetails")
            }}</vs-button>
          </router-link>

          <router-link
            :to="{
              name: 'ClientProfile',
              params: { Id: FormData.UserId }
            }"
          >
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4">{{
              $t("ViewUserDetails")
            }}</vs-button>
          </router-link>

          <router-link
            :to="{
              name: 'BiadjoViewSubmittedOrders',
              params: { Id: FormData.id }
            }"
          >
            <vs-button
              v-show="!disable"
              icon-pack="feather"
              icon="icon-edit"
              class="mr-4"
              >{{ $t("ViewSubmittedOrders") }}</vs-button
            >
          </router-link>

          <!-- <vs-button
            icon-pack="feather"
            icon="icon-edit"
            class="mr-4"
            :to="{ name: 'Driver-add/Edit', params: { Id: FormData.id } }"
          >{{ $t("ViewOffers") }}</vs-button>-->

          <vs-button
            v-show="!disable"
            class="mr-4"
            icon-pack="feather"
            icon="icon-users"
            @click="GetNearByDrivers"
            v-scroll-to="'#Scroll'"
            >{{ $t("FindNearByDrivers") }}</vs-button
          >
          <vs-button
            class="mr-4"
            type="border"
            color="warning"
            icon-pack="feather"
            @click="Back"
            >{{ $t("Back") }}</vs-button
          >
        </div>
      </vx-card>

      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("CargoType") }}</td>
                <td>{{ FormData.CargoType }}</td>
              </tr>

              <tr style="width: 1400px;">
                <td class="font-semibold">{{ $t("CargoDescription") }}</td>
                <td>{{ FormData.CargoDescription }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CargoValue") }}</td>
                <td>
                  {{ FormData.CargoValue | numFormat("###,##0.00") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CargoWeight") }}</td>
                <td>
                  {{ FormData.CargoWeight | numFormat("###,##0.00") }}
                  {{ $t(FormData.CargoWeightUnit) }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Width") }}</td>
                <td>{{ FormData.Width }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("VehicleType") }}</td>
                <td>{{ $t(FormData.VehicleType) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("VehicleOption") }}</td>
                <td>{{ FormData.VehicleOption }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("NumberOfTrips") }}</td>
                <td>{{ FormData.NumberOfTrips }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Height") }}</td>
                <td>{{ FormData.Height }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Length") }}</td>
                <td>{{ FormData.Length }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>
      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("TripDistance") }}</td>
                <td>{{ FormData.distance.text }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("StartLocation") }}</td>
                <td>
                  <vx-tooltip
                    text="Check Location On Google Maps"
                    position="top"
                  >
                    <a
                      target="_blank"
                      v-bind:href="
                        `${StartLink}${FormData.StLatitude},${FormData.StLongitude}${EndLink}`
                      "
                      >{{ FormData.StLatitude }},{{ FormData.StLongitude }}</a
                    >
                  </vx-tooltip>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("StartPlaceId") }}</td>
                <td>{{ FormData.StPlaceId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("StartCity") }}</td>
                <td>{{ FormData.StartCity }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("StartCountry") }}</td>
                <td>{{ FormData.StartCountry }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("StartCountryCode") }}</td>
                <td>{{ FormData.StartCountryCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("StartState") }}</td>
                <td>{{ FormData.StartState }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("StartAddress") }}</td>
                <td>{{ FormData.StPlaceDesicription }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("TripDuration") }}</td>
                <td>{{ FormData.duration.text }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("EndLocation") }}</td>
                <td>
                  <vx-tooltip
                    text="Check Location On Google Maps"
                    position="top"
                  >
                    <a
                      target="_blank"
                      v-bind:href="
                        `${StartLink}${FormData.EnLatitude},${FormData.EnLongitude}${EndLink}`
                      "
                      >{{ FormData.EnLatitude }},{{ FormData.EnLongitude }}</a
                    >
                  </vx-tooltip>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("EndPlaceId") }}</td>
                <td>{{ FormData.EnPlaceId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("EndCountry") }}</td>
                <td>{{ FormData.EndCountry }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("EndCountryCode") }}</td>
                <td>{{ FormData.EndCountryCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("EndCity") }}</td>
                <td>{{ FormData.EndCity }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("EndState") }}</td>
                <td>{{ FormData.EndState }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("EndAddress") }}</td>
                <td>{{ FormData.EnPlaceDesicription }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>
    </div>

    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="NearByDrivers != undefined || NearByDrivers != null"
        >
          <vs-table ref="table" pagination search :data="NearByDrivers">
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <!-- <vs-th>Image</vs-th> -->
              <vs-th sort-key="id">{{ $t("Id") }}</vs-th>
              <vs-th sort-key="firstName">{{ $t("FirstName") }}</vs-th>
              <vs-th sort-key="lastName">{{ $t("LastName") }}</vs-th>
              <vs-th sort-key="PhoneNumber">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="Distance">{{ $t("Distance") }}</vs-th>
              <vs-th sort-key="Duration">{{ $t("Duration") }}</vs-th>
              <vs-th sort-key="DriverInfo">{{ $t("DriverInfo") }}</vs-th>

              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id">{{ tr.Id }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="firstName">{{ tr.FirstName }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="lastName">{{ tr.LastName }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="PhoneNumber">
                      <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                        tr.PhoneNumber
                      }}</span>
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Distance">{{ tr.Distance }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="Duration">{{ tr.Duration }}</p>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'DriverProfile',
                        params: { Id: tr.Id }
                      }"
                    >
                      <vs-button size="small">{{
                        $t("ViewDriverDetails")
                      }}</vs-button>
                    </router-link>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vs-button size="small" @click="confirmSave(tr.Id)">{{
                      $t("AssignToDriver")
                    }}</vs-button>
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
/* eslint-disable */

import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import StarRating from "vue-star-rating";
export default {
  data() {
    return {
      FormData: {},
      driver_id: "",
      biadjo_id: "",
      Biadjo_not_found: false,
      disable: false,
      StartLink: "https://maps.google.com/maps?q=@",
      EndLink: "&17z",
      Model: {
        CountryCode: "",
        StartLatitude: "",
        StartLongitude: "",
        VehicleType: "",
        VehicleOption: ""
      },
      NearByDrivers: null
    };
  },
  components: {
    StarRating
  },
  computed: {
    StarRatingRTL() {
      if (this.$vs.rtl) {
        return true;
      } else return false;
    }
  },
  methods: {
    GetNearByDrivers() {
      this.$vs.loading();
      this.NearByDrivers = [];
      var Model = {};
      Model.Language = this.$i18n.locale;
      Model.BiadjoId = this.FormData.id;
      Model.CountryCode = this.FormData.CountryCode;
      Model.StartLatitude = this.FormData.StLatitude;
      Model.StartLongitude = this.FormData.StLongitude;
      Model.VehicleType = this.FormData.VehicleType;
      Model.VehicleOption = this.FormData.VehicleOption;
      this.$store
        .dispatch("BiadjoList/GetNearByDrivers", Model)
        .then(response => {
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.$vs.loading.close();
              this.NearByDrivers = response.data;
            } else {
              this.$vs.loading.close();
              window.showError();
            }
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    Back() {
      this.$router.go(-1);
    },
    confirmSave(driverID) {
      this.driver_id = driverID;
      this.biadjo_id = this.$route.params.Id;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToAssignDriver"),
        accept: this.assignDriverToBiadjo,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    },
    assignDriverToBiadjo() {
      let Biadjo = {};
      Biadjo.BiadjoId = this.biadjo_id;
      Biadjo.DriverId = this.driver_id;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("BiadjoList/AssignDriverToBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showAddDriverToBiadjoSuccess();
          }
        });
    },

    fetchDistance() {
      return new Promise((resolve, reject) => {
        let response;

        let origin1 = {
          lat: this.FormData.StLatitude,
          lng: this.FormData.StLongitude
        };
        let destinationA = {
          lat: this.FormData.EnLatitude,
          lng: this.FormData.EnLongitude
        };
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          },
          function(resp, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
              response = reject(status);
            } else {
              response = resolve(resp);
            }
          }
        );
        return response;
      });
    }
  },
  created() {
    window.checkAndAttachMapScript(this.fetchDistance);
    this.$vs.loading();
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    var Biadjo = {};
    Biadjo.id = this.$route.params.Id;
    this.$store
      .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
      .then(res => {
        if (res.data.length > 0) {
          this.FormData = res.data[0];
          this.fetchDistance().then(resp => {
            this.FormData = {
              ...res.data[0],
              ...resp.rows[0].elements[0]
            };
          });
          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          window.showError();
          this.$router.go(-1);
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
        this.$router.go(-1);
      });
  },
  mounted() {}
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
