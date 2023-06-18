<template>
  <div id="page-user-view">
    <div id="user-data" v-if="FormData">
      <vx-card v-bind:title="$t('UserInfo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="FormData.ProfilePicture" class="rounded w-full" />
            </div>
          </div>
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ FormData.firstName }} {{ FormData.lastName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                    FormData.PhoneNumber
                  }}</span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ FormData.Email }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}</td>
                <td>{{ $t(FormData.AccountStatus) }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ FormData.Id }}</td>
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
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ FormData.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ FormData.countrycode }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
              <div class="btn-group mb-2 mt-2 ">
                <router-link
                  :to="{
                    name: 'EditCompanyUser',
                    params: {
                      Id: FormData.Id
                    }
                  }"
                >
                  <vs-button
                    icon-pack="feather"
                    class="mr-4"
                    icon="icon-edit"
                    >{{ $t("Edit") }}</vs-button
                  >
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
                  color="dark"
                  @click="popupNavigateToWeb = true"
                  class="mr-4"
                >
                  {{ $t("GoToWeb") }}
                </vs-button>
              </div>
              <div class="btn-group mb-2 mt-2 ">
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
        </div>
      </vx-card>

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

      <vs-popup :active.sync="popupNavigateToWeb">
        <div class="vx-row">
          <div
            class="vx-col w-full cursor-pointer hover:text-dark hover:bg-primary rounded-full"
            v-for="(item, index) in NavigateToWebList"
            :key="index"
          >
            <div @click="FCMconfirmation('GoTo', item)" class="mb-2">
              <span class="align-buttom m-2 text-lg"> {{ $t(item) }} </span>
            </div>
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";
import country_JSON from "@/views/jsonFiles/country.json";

export default {
  countryJson: country_JSON,

  data() {
    return {
      Type: null,
      search: "",
      routeName: null,
      popupCountryJson: false,
      popupNavigateToMob: false,
      popupNavigateToWeb: false,
      NavigateToMobList: [
        "BankAccountInformationScreen",
        "ChangeLanguageScreen",
        "ChangePhoneScreen",
        "ContactUsScreen",
        "EditProfileScreen",
        "SupportScreen",
        "WalletHistoryScreen"
      ],
      NavigateToWebList: [
        "ContactUs",
        "ScheduledBiadjosForCompany",
        "CompanySubmittedOrder",
        "ViewDrivers",
        "AddDriver",
        "CompanyProfile",
        "CompanyUsers",
        "CompanyWallet",
        "home"
      ],
      CountryModel: {},
      FormData: {}
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
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
          this.$t("User") +
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
          this.$t("User") +
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
        notification: {
          title: "Biadjo",
          body: "Biadjo Technical Controlling"
        },
        data: {
          controller: this.Type,
          country: this.CountryModel.name || "",
          countryCode: this.CountryModel.isoCode || "",
          routeName: this.routeName || ""
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
    }
  },
  computed: {
    filteredList() {
      return this.$options.countryJson.filter(Element => {
        return Element.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  created() {
    this.$vs.loading();

    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }

    var user = {};
    user.UserId = this.$route.params.Id;

    this.$store
      .dispatch("CompanyList/GetUserDetails", user)
      .then(response => {
        if (response.data != null) {
          this.OldAccountStatus = response.data.AccountStatus;
          this.FormData = response.data;
          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          this.FormData = null;
        }
      })
      .catch(err => {
        if (err.status === 404) {
          this.$vs.loading.close();
          window.showError();
          return;
        }
      });
  }
};
</script>

<style lang="scss">
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

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
