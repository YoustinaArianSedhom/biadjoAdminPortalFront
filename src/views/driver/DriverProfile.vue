<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      v-bind:title="$t('DriverNotFound')"
      :active.sync="ID_not_found"
    >
      <span>record with ID : {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link :to="{ name: 'Driver' }" class="text-inherit underline"
          >All Drivers</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData">
      <vx-card v-bind:title="$t('DriverInfo')" class="mb-base">
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ FormData.firstName }} {{ FormData.lastName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">
                  {{ $t("VehicleOwnerFullName") }}
                </td>
                <td>{{ FormData.VehicleOWnerFullName }}</td>
              </tr>
              <tr v-clipboard:copy="FormData.Id" v-clipboard:success="onCopy">
                <td class="font-semibold">
                  {{ $t("DriverID") }}
                </td>
                <td>{{ FormData.Id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                    FormData.UserName
                  }}</span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ FormData.Email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("DriverBalance") }}</td>
                <td>
                  {{ FormData.DriverBalance | numFormat("###,##0.00") }}
                  {{ $t(FormData.WalletCountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CreditLimit") }}</td>
                <td>
                  {{ FormData.CreditLimit | numFormat("###,##0.00") }}
                  {{ $t(FormData.WalletCountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("FreeTrips") }}</td>
                <td>{{ FormData.FreeTrips }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PaymentID") }}</td>
                <td>{{ FormData.CustomerId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CompanyID") }}</td>
                <td v-if="FormData.CompanyId != 0">{{ FormData.CompanyId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}</td>
                <td style="width: 75vw">
                  <v-select
                    style="padding: 0px !important"
                    :reduce="Code => Code.Code"
                    class="w-full"
                    :options="this.$options.AccountStatusJson"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="FormData.AccountStatus"
                    @input="confirmChangeStatus"
                  >
                  </v-select>
                </td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("DriverNo") }}</td>
                <td>{{ FormData.driverNo }}</td>
              </tr>
              <tr>
                <td
                  class="font-semibold"
                  style="vertical-align: inherit !important"
                >
                  {{ $t("vacationMode") }}
                </td>
                <td v-if="FormData.vacationMode === 'False'">
                  <vs-chip color="Green">OFF</vs-chip>
                </td>
                <td v-else-if="FormData.vacationMode === 'True'">
                  <vs-chip color="red">ON</vs-chip>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CompletedTrips") }}</td>
                <td>{{ FormData.CompletedTrips }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Rating") }}</td>
                <td style="display: flex !important">
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
                  >
                  </star-rating>
                  <span class="ml-2 mr-2">
                    ( {{ FormData.Rating | numFormat("0.00") }} )
                  </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("RegistrationDate") }}</td>
                <td>
                  {{
                    FormData.RegistrationDate | formatDate("yyyy/MM/dd HH:mm")
                  }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BirthDate") }}</td>
                <td>
                  {{ FormData.BirthDate | formatDate("yyyy/MM/dd") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("DriverLicense") }}</td>
                <td>{{ FormData.DriverLicense }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("NationalID") }}</td>
                <td>{{ FormData.NationalID }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("TaxID") }}</td>
                <td>{{ FormData.TaxID }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>{{ FormData.state }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>{{ FormData.city }}</td>
              </tr>
            </table>
          </div>
          <!-- Buttons - Col 2 -->
          <div class="flex flex-wrap m-4">
            <div class="btn-group mb-2 mt-2">
              <vx-tooltip v-bind:text="$t('ClickRefresh')">
                <vs-button
                  radius
                  v-hotkey="keymap"
                  class="mr-4 mt-1"
                  @click="fetchData()"
                  color="success"
                  type="filled"
                  icon-pack="feather"
                  icon="icon-refresh-cw"
                ></vs-button>
              </vx-tooltip>
            </div>

            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'Driver-add/Edit',
                  params: {
                    Id: FormData.Id
                  }
                }"
              >
                <vs-button class="mr-4">{{ $t("Edit") }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <vs-button
                @click="popupActiveAssignBiadjo = true"
                icon-pack="feather"
                icon="icon-edit"
                class="mr-4"
                >{{ $t("AssignBiadjo") }}</vs-button
              >
            </div>
            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'Documents',
                  params: { DriverId: FormData.Id }
                }"
                target="_blank"
              >
                <vs-button
                  color="warning"
                  icon-pack="feather"
                  icon="icon-image"
                  class="mr-4"
                  >{{ $t("Documents") }}</vs-button
                >
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'DriverScheduledBiadjos',
                  params: { DriverId: FormData.Id }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("ScheduledBiadjos")
                }}</vs-button>
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'TransactionsHistoryOfDriver',
                  params: { Id: FormData.Id }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("ViewTransactionsHistory")
                }}</vs-button>
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'driverSubmittedOrders',
                  params: {
                    Id: FormData.Id
                  }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("ViewSubmittedOrders")
                }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'DriverBiadjosHistory',
                  params: { DriverId: FormData.Id }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("BiadjosHistory")
                }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'DriverUnpaidBiadjos',
                  params: { DriverId: FormData.Id }
                }"
                v-show="$acl.check('Accountant')"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("UnpaidBiadjos")
                }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'AddDriverBalance',
                  params: {
                    DriverId: FormData.Id,
                    CC: FormData.WalletCountryCode
                  }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("AddBalance")
                }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'DeductDriverBalance',
                  params: {
                    DriverId: FormData.Id,
                    CC: FormData.WalletCountryCode
                  }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("DeductBalance")
                }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'FollowDriverOnMap',
                  params: { DriverId: FormData.Id }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("FollowDriver")
                }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <vs-button
                v-show="!CheckDriverFleet"
                class="mr-4"
                icon-pack="feather"
                @click="confirmRemoveDriverFromCompany"
                >{{ $t("RemoveDriver") }}</vs-button
              >
            </div>

            <div class="btn-group mb-2 mt-2">
              <router-link
                :to="{
                  name: 'FleetCompaniesDetails',
                  params: { Id: FormData.CompanyId }
                }"
                v-show="FormData.CompanyId"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("CompanyDetails")
                }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="FCMconfirmation('logout')"
                v-show="$acl.check('UserManagement') && FormData.FCMToken"
                class="mr-4"
              >
                {{ $t("logout") }}
              </vs-button>
            </div>
            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="FCMconfirmation('reset')"
                v-show="$acl.check('UserManagement') && FormData.FCMToken"
                class="mr-4"
              >
                {{ $t("reset") }}
              </vs-button>
            </div>
            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="popupCountryJson = true"
                v-show="$acl.check('UserManagement') && FormData.FCMToken"
                class="mr-4"
              >
                {{ $t("changeCountry") }}
              </vs-button>
            </div>

            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="popupNavigateToMob = true"
                class="mr-4"
              >
                {{ $t("GoToMob") }}
              </vs-button>
            </div>
            <div class="btn-group mb-2 mt-2">
              <vs-button
                type="border"
                color="warning"
                class="mr-4"
                icon-pack="feather"
                @click="Back"
                >{{ $t("Back") }}</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>

      <vx-card v-bind:title="$t('VehicleInfo')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <table>
                <tr>
                  <td class="font-semibold">{{ $t("LicensePlate") }}</td>
                  <td>{{ FormData.LicensePlate }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("VehicleType") }}</td>
                  <td>{{ $t(FormData.VehicleType) }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("VehicleOption") }}</td>
                  <td>{{ $t(FormData.VehicleOption) }}</td>
                </tr>
              </table>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("VehicleMake") }}</td>
                <td>{{ $t(FormData.VehicleMake) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("VehicleModel") }}</td>
                <td>{{ $t(FormData.VehicleModel) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("VehicleColor") }}</td>
                <td>{{ $t(FormData.VehicleColor) }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>

      <vx-card v-bind:title="$t('BankAccountInfo')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <table>
                <tr>
                  <td class="font-semibold">{{ $t("FullName") }}</td>
                  <td>{{ BankAccountData.FullName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("BankName") }}</td>
                  <td>{{ BankAccountData.BankName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("BranchName") }}</td>
                  <td>{{ BankAccountData.BranchName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("AccountNumber") }}</td>
                  <td>{{ BankAccountData.AccountNumber }}</td>
                </tr>
              </table>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("SWIFT") }}</td>
                <td>{{ BankAccountData.SWIFT }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankAddress") }}</td>
                <td>{{ BankAccountData.BankAddress }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>{{ BankAccountData.City }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>{{ BankAccountData.State }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ BankAccountData.Country }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>
      <vx-card v-bind:title="$t('DeviceInfo')" class="mb-base">
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table v-if="FormData.DeviceInfo">
              <tr>
                <td class="font-semibold">{{ $t("DeviceModel") }}</td>
                <td>{{ FormData.DeviceInfo.DeviceModel }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("DeviceType") }}</td>
                <td>{{ FormData.DeviceInfo.DeviceType }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Manufacture") }}</td>
                <td>{{ FormData.DeviceInfo.Manufacture }}</td>
              </tr>
            </table>
          </div>
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table v-if="FormData.DeviceInfo">
              <tr>
                <td class="font-semibold">{{ $t("PlatformVer") }}</td>
                <td>{{ FormData.DeviceInfo.PlatformVer }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("VersionCode") }}</td>
                <td>{{ FormData.DeviceInfo.VersionCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("VersionName") }}</td>
                <td>{{ FormData.DeviceInfo.VersionName }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>
      <vx-card>
        <div class="vx-row">
          <div class="vx-col w-full">
            <VxTimeline v-if="IsDriverNotes" :data="DriverNotes"></VxTimeline>
            <span v-else class="text-warning text-lg">{{
              $t("NoNotesAvailable")
            }}</span>
          </div>
        </div>
        <div>
          <vs-row>
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <vs-textarea
                class="w-full"
                color="primary"
                label-placeholder="Note"
                v-model="NoteModel.Notice"
              />
            </div>

            <div class="vx-col sm:w-1/3 w-full">
              <vs-button
                class="mt-4 ml-2"
                radius
                color="primary"
                type="filled"
                icon-pack="feather"
                icon="icon-check"
                :disabled="NoteModel.Notice == ''"
                @click="AddDriverNote"
              ></vs-button>
            </div>
          </vs-row>
        </div>
      </vx-card>
    </div>
    <vs-popup fullscreen :active.sync="popupCountryJson">
      <div class="vx-row">
        <vs-input
          class="w-full m-4"
          placeholder="Country Search"
          v-model="search"
        />
      </div>
      <div class="vx-row w-full">
        <div
          class="vx-col w-1/2 cursor-pointer hover:text-dark hover:bg-primary rounded-full"
          v-for="(item, index) in filteredList"
          :key="index"
        >
          <span @click="FCMconfirmation('changeCountry', item)">
            <img
              class=" w-8 h-8"
              :src="require(`@/assets/flags/${item.asset}`)"
            />
            <span class="align-buttom m-1 text-lg"> {{ item.name }} </span>
          </span>
        </div>
      </div>
    </vs-popup>

    <vs-popup :active.sync="popupNavigateToMob">
      <div class="vx-row">
        <div
          class="vx-col w-full cursor-pointer hover:text-dark hover:bg-primary rounded-full"
          v-for="(item, index) in NavigateToMobList"
          :key="index"
        >
          <div @click="FCMconfirmation('GoTo', item)" class="mb-2">
            <span class="align-buttom m-2 text-lg"> {{ $t(item) }} </span>
          </div>
        </div>
      </div>
    </vs-popup>

    <!-- <vs-popup fullscreen :active.sync="popupNavigateToWeb">
      <div class="vx-row">
        <vs-input
          class="w-full m-4"
          placeholder="Country Search"
          v-model="search"
        />
      </div>
      <div class="vx-row w-full">
        <div
          class="vx-col w-1/2 cursor-pointer hover:text-dark hover:bg-primary rounded-full"
          v-for="(item, index) in filteredList"
          :key="index"
        >
          <span @click="FCMconfirmation('changeCountry', item)">
            <img
              class=" w-8 h-8"
              :src="require(`@/assets/flags/${item.asset}`)"
            />
            <span class="align-buttom m-1 text-lg"> {{ item.name }} </span>
          </span>
        </div>
      </div>
    </vs-popup> -->

    <vs-popup
      classContent="popup-example"
      v-bind:title="$t('AssignBiadjoToDriver')"
      :active.sync="popupActiveAssignBiadjo"
    >
      <popupActiveAssignBiadjo
        :Biadjo="Biadjo"
        @AssignBiadjo="AssignBiadjo"
        @ClosePopup="popupActiveAssignBiadjo = false"
      ></popupActiveAssignBiadjo>
    </vs-popup>
  </div>
</template>
<script>
/* eslint-disable */
import country_JSON from "@/views/jsonFiles/country.json";
import moduleDriver from "@/store/driver/moduleDriver.js";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";
import VxTimeline from "@/components/timeline/VxTimeline.vue";

import StarRating from "vue-star-rating";
import AccountStatus_JSON from "./json/accountStatus.json";
import Vehicle_JSON from "./json/vehicles.json";

export default {
  countryJson: country_JSON,
  AccountStatusJson: AccountStatus_JSON,
  VehicleJson: Vehicle_JSON,
  data() {
    return {
      popupCountryJson: false,
      popupNavigateToMob: false,
      popupNavigateToWeb: false,
      NavigateToMobList: [
        //  "BankAccountInformationScreen",
        "ChangeLanguageScreen",
        "ChangePhoneScreen",
        "ContactUsScreen",
        "EditProfileScreen",
        "SupportScreen",
        "WalletHistoryScreen"
      ],

      AdminUserId: "",
      NoteModel: {
        AdminUserId: "",
        DriverID: "",
        Notice: ""
      },

      IsDriverNotes: false,
      DriverNotes: [
        {
          time: null,
          desc: null,
          title: null,
          color: "primary",
          icon: "PlusIcon"
        }
      ],
      Type: null,
      Biadjo: {},
      FormData: {},
      search: "",
      routeName: null,
      BankAccountData: {},
      ID_not_found: false,
      CountryModel: {},
      OldAccountStatus: "",
      popupActiveAssignBiadjo: false,
      ReportPopup: false,
      CheckDriverFleet: false
    };
  },
  components: {
    StarRating,
    VxTimeline,
    popupActiveAssignBiadjo: () =>
      import("@/views/generalPopups/popupActiveAssignBiadjo.vue")
  },
  computed: {
    StarRatingRTL() {
      if (this.$vs.rtl) {
        return true;
      } else return false;
    },
    filteredList() {
      return this.$options.countryJson.filter(Element => {
        return Element.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    keymap() {
      return {
        "alt+l": this.fetchData
      };
    }
  },
  methods: {
    FCMconfirmation(Type, Model) {
      switch (Type) {
        case "changeCountry":
          this.CountryModel = Model;
          this.popupCountryJson = false;

          break;
        case "GoTo":
          this.routeName = Model;
          this.popupNavigateToMob = false;
          this.popupNavigateToWeb = false;

          break;

        default:
          break;
      }

      this.Type = Type;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("Confirm"),
        text:
          this.$t("YouAreAboutTo") +
          " " +
          this.$t(Type) +
          " " +
          this.$t("Driver") +
          " (" +
          this.FormData.firstName +
          " " +
          this.FormData.lastName +
          ")",
        cancelText: this.$t("Cancel"),
        accept: this.FCMdReConfirmation,
        acceptText: this.$t("Confirm")
      });
    },
    FCMdReConfirmation() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ReConfirm"),
        text:
          this.$t("YouAreAboutTo") +
          " " +
          this.$t(this.Type) +
          " " +
          this.$t("Driver") +
          " (" +
          this.FormData.firstName +
          " " +
          this.FormData.lastName +
          ")",
        cancelText: this.$t("Cancel"),
        accept: this.FCM,
        acceptText: this.$t("Confirm")
      });
    },
    FCM() {
      this.$vs.loading();
      let FcmModel = {
        to: this.FormData.FCMToken,
        // notification: {
        //   title: "Biadjo",
        //   body: "Biadjo Technical Controlling"
        // },
        data: {
          controller: this.Type,
          country: this.CountryModel.name || "",
          countryCode: this.CountryModel.isoCode || "",
          routeName: this.routeName
        }
      };
      this.$store
        .dispatch("auth/FcmController", FcmModel)
        .then(res => {
          if (res.status == 200) {
            this.NoteModel.Notice = `FCM Action was occured (${this.Type})`;
            this.AddDriverNote();
            this.$vs.loading.close();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },
    onCopy() {
      window.onCopy();
    },
    confirmRemoveDriverFromCompany() {
      this.$vs.dialog({
        type: "confirm",
        color: "primary",
        title: this.$t("ConfirmRemove"),
        text: this.$t("YouAreAboutToRemoveDriver"),
        accept: this.RemoveDriverFromCompany,
        acceptText: this.$t("Remove"),
        cancelText: this.$t("Cancel")
      });
    },
    RemoveDriverFromCompany() {
      this.$vs.loading();
      let driver = {};
      driver.PhoneNo = this.FormData.PhoneNumber;
      driver.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("CompanyList/RemoveDriverFromCompany", driver)
        .then(res => {
          if (res.status === 200) {
            this.$vs.loading.close();
            window.showSuccess();
            var driver = {};
            driver.DriverId = this.$route.params.Id;
            this.$store.dispatch("DriverList/GetDriverById", driver);
            window.location.reload();
          }
        })
        .catch(err => {
          this.$vs.loading.close();

          window.showError();
        });
      this.$vs.loading.close();
    },
    AssignBiadjo(biadjoID) {
      let Biadjo = {};
      if (biadjoID == "" || biadjoID == null) {
        window.showFillData();
        return;
      }
      Biadjo.BiadjoId = biadjoID;
      Biadjo.DriverId = this.$route.params.Id;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("BiadjoList/AssignDriverToBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            this.popupActiveAssignBiadjo = false;
            window.showSuccess();
          }
        })
        .catch(err => {
          this.popupActiveAssignBiadjo = false;
          this.$vs.notify({
            color: "red",
            position: "right-bottom",
            title: this.$t("Error"),
            text: err.response.data.Error
          });
        });
    },
    Back() {
      this.$router.go(-1);
    },
    confirmChangeStatus() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeDriverStatus"),
        accept: this.ChangeRecord,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel"),

        cancel: this.CancelAlert
      });
    },
    CancelAlert() {
      this.FormData.AccountStatus = this.OldAccountStatus;
    },
    ChangeRecord() {
      if (this.FormData.AccountStatus == null) {
        this.FormData.AccountStatus = this.OldAccountStatus;
        return;
      }

      //this.FormData.Id = this.$route.params.Id;

      var driver = {};
      driver.Id = this.$route.params.Id;
      driver.AccountStatus = this.FormData.AccountStatus;
      driver.AdminUserId = this.AdminUserId;
      this.$store
        .dispatch("DriverList/UpdateDriverAccountStatus", driver)
        .then(res => {
          if (res.status === 200) {
            this.OldAccountStatus = this.FormData.AccountStatus;
            window.showSuccess();
          }
        })
        .catch(err => {
          window.showError();
        });
    },
    getDriverNotes() {
      this.$vs.loading();
      this.DriverNotes = [];
      var Driver = {};
      Driver.DriverID = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/GetDriverNotes", Driver)
        .then(response => {
          if (response.data.length > 0) {
            this.DriverNotes = response.data;
            this.IsDriverNotes = true;
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
          }
        });
    },
    AddDriverNote() {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.NoteModel.AdminUserId = userInfo.Id;
      this.NoteModel.DriverID = this.$route.params.Id;
      this.$vs.loading();
      this.$store
        .dispatch("DriverList/AddNoticeToDriver", this.NoteModel)
        .then(response => {
          if (response.data == true) {
            this.NoteModel.Notice = "";
            this.getDriverNotes();
            window.showSuccess();
            this.$vs.loading.close();
          } else {
            window;
            this.$vs.loading.close();
            window.showError;
          }
        });
    },
    fetchData() {
      this.$vs.loading();
      if (!moduleBiadjo.isRegistered) {
        this.$store.registerModule("BiadjoList", moduleBiadjo);
        moduleBiadjo.isRegistered = true;
      }
      if (!moduleFleetCompanies.isRegistered) {
        this.$store.registerModule("CompanyList", moduleFleetCompanies);
        moduleFleetCompanies.isRegistered = true;
      }

      if (!moduleDriver.isRegistered) {
        this.$store.registerModule("DriverList", moduleDriver);
        moduleDriver.isRegistered = true;
      }
      var driver = {};
      driver.Id = this.$route.params.Id;
      //  driver.CountryCode= this.$route.params.data.CountryCode ;
      driver.PhoneNumber = "";
      this.$store
        .dispatch("DriverList/GetDriverById", driver)
        .then(response => {
          if (response.data.length > 0) {
            this.OldAccountStatus = response.data[0].AccountStatus;
            this.FormData = response.data[0];
            if (
              this.FormData.CompanyId != 0 &&
              this.FormData.FleetDriver == true
            ) {
              this.CheckDriverFleet = false;
            } else {
              this.CheckDriverFleet = true;
            }
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            this.ID_not_found = true;
            this.FormData = null;
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          return;
        });
      this.BankAccountData = {};
      this.$store
        .dispatch("DriverList/bankAccountInfoData", driver.Id)
        .then(response => {
          this.BankAccountData = response.data[0];
        });
      this.getDriverNotes();
      this.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {}
};
</script>

<style lang="scss">
/* width */

.scroll::-webkit-scrollbar {
  width: 15px;
}

/* Track */
.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

/* Handle */
.scroll::-webkit-scrollbar-thumb {
  background: #27abbe;
  border-radius: 5px;
}

.scroll-area {
  overflow: auto;
  height: 400px;
}
#avatar-col {
  width: 10rem;
}
#page-user-view {
  table {
    td {
      vertical-align: top;
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

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
