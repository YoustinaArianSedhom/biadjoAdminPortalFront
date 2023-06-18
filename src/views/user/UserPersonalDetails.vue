<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="user_not_found"
    >
      <span>user record with id: {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'ClientProfile' }"
          class="text-inherit underline"
          >All Clients</router-link
        >
      </span>
    </vs-alert>
    <div id="user-data" v-if="user_data != undefined">
      <vx-card v-bind:title="$t('UserInfo')" class="mb-base" id="account-info">
        <div class="vx-row">
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.ProfilePic" class="rounded w-full" />
            </div>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ user_data.firstName }} {{ user_data.lastName }}</td>
              </tr>
            </table>

            <table>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                    user_data.PhoneNumber
                  }}</span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ user_data.Id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ user_data.Email }}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ user_data.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ user_data.countrycode }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <td>{{ $t(user_data.accounttype) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(user_data.status) }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col w-full flex" id="account-manage-buttons">
            <div>
              <input
                type="file"
                class="hidden"
                ref="updateImgInput"
                @change="updateCurrImg"
                accept="image/*"
              />
              <vs-button
                icon-pack="feather"
                icon="icon-user"
                class="mr-4"
                @click="$refs.updateImgInput.click()"
              >
                {{ $t("UpdateImage") }}</vs-button
              >
            </div>
            <div>
              <vs-button
                icon-pack="feather"
                icon="icon-lock"
                class="mr-4"
                :to="{
                  name: 'ResetPasswordByUser',
                  params: { Id: user_data.Id }
                }"
              >
                {{ $t("ResetPassword") }}</vs-button
              >
            </div>
            <div>
              <vs-button
                type="border"
                color="warning"
                icon-pack="feather"
                @click="Back"
              >
                {{ $t("Back") }}</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleAuth from "@/store/auth/moduleAuth.js";
import AccountStatus_JSON from "./../driver/json/accountStatusForClientAndUser";
import AccountType_JSON from "./../driver/json/accountType";
/* eslint-disable */
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";

export default {
  AccountStatusJson: AccountStatus_JSON,
  AccountTypeJSON: AccountType_JSON,

  data() {
    return {
      user_data: {},
      user_not_found: false
    };
  },
  methods: {
    async updateCurrImg(input) {
      // if (
      //   event.target.files[0].type != "image/jpg" ||
      //   event.target.files[0].type != "image/jpeg" ||
      //   event.target.files[0].type != "image/png" ||
      //   event.target.files[0].type != "image/tiff" ||
      //   event.target.files[0].type != "image/tif"
      // ) {
      //   window.InvalidImageType();
      //   return;
      // }
      if (input.target.files && input.target.files[0]) {
        this.$vs.loading();
        const file = event.target.files[0];
        var newFile = await FileEncryptionHandler.encrypt(file);
        this.$store
          .dispatch("UserList/UploadProfilePic", {
            params: {
              Id: this.$route.params.Id,
              file: newFile
            }
          })
          .then(response => {
            if (response.data) {
              this.user_data.ProfilePic = FileEncryptionHandler.decrypt(
                response.data
              );
              this.$store.dispatch("auth/refreshCurrentUser");
            }
            this.$vs.loading.close();
          });
      }
    },
    Back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleAuth.isRegistered) {
      this.$store.registerModule("UserList", moduleAuth);
      moduleAuth.isRegistered = true;
    }
    var user = {};
    user.Id = this.$route.params.Id;
    user.Email = "";
    this.$store
      .dispatch("UserList/fetchUserDetailsList", user)
      .then(res => {
        this.user_data = res.data;
        if (res.data.ProfilePic) {
          this.user_data.ProfilePic = FileEncryptionHandler.decrypt(
            JSON.parse(res.data.ProfilePic)
          );
        }
        this.$vs.loading.close();
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.$vs.loading.close();
          this.user_not_found = true;
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

#page-client-view {
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
