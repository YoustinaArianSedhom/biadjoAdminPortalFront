<template>
  <div id="page-Biadjo-view">
    <vs-alert
      color="danger"
      title="Accident Report Not Found"
      :active.sync="Biadjo_not_found"
    >
      <span>Accident Report with id: {{ $route.params.Id }} not found.</span>
      <span>
        <span>Check</span>
        <router-link
          :to="{
            name: 'BiadjoDetails',
            params: { Id: $route.params.Id }
          }"
          class="text-inherit underline"
          >Biadjo Details</router-link
        >
      </span>
    </vs-alert>

    <div id="Biadjo-data" v-if="!Biadjo_not_found">
      <vx-card v-bind:title="$t('Biadjo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("BiadjoNumber") }}</td>
                <td>{{ FormData.BiadjoId }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("ClientId") }}</td>
                <td>{{ FormData.ClientId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("DriverID") }}</td>
                <td>{{ FormData.DriverId }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("AdminUserId") }}</td>
                <td>{{ FormData.AdminUserId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Date") }}</td>
                <td>{{ FormData.Date | formatDate("yyyy/MM/dd HH:mm") }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div></div>
      </vx-card>

      <!-- <vx-card
        v-for="q in Question"
        :key="q.Question"
        class="mb-base "
        :title="q.Question"
        title-color="primary"
      >
        <p class="mb-3" >{{ q.Answer }}</p>
      </vx-card> -->

      <vx-card v-for="q in Question" :key="q.Question" class="mb-base ">
        <vs-row vs-type="flex">
          <vs-col class="m-4 justify-end" vs-type="flex">
            <h1 class="m-1 text-primary">
              {{ q.Question }}
            </h1>
          </vs-col>
          <vs-col class="m-4 justify-end" vs-type="flex">
            <h3 class="m-1">
              {{ q.Answer }}
            </h3>
          </vs-col>
        </vs-row>
      </vx-card>

      <vs-button
        class="flex float-right mr-20"
        type="border"
        color="warning"
        icon-pack="feather"
        @click="Back"
        >{{ $t("Back") }}</vs-button
      >
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";

export default {
  data() {
    return {
      Biadjo_not_found: false,
      FormData: {},
      Question: []
    };
  },
  components: {},
  computed: {},
  methods: {
    Back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    var Biadjo = {};
    Biadjo.BiadjoID = this.$route.params.Id;
    this.$store
      .dispatch("BiadjoList/GetAccidentReportBiadjo", Biadjo)
      .then(res => {
        if (res.data != null) {
          this.Biadjo_not_found = false;
          this.FormData = res.data;
          let FullQuestion = this.FormData.Questionnaire.split("{")[1].split(
            "}"
          )[0];
          let StringArray = FullQuestion.split(",");

          StringArray.forEach(element => {
            let StringElement = element.split(":");
            var item = {
              Question: StringElement[0].split('"')[1],
              Answer: StringElement[1].split('"')[1]
            };
            this.Question.push(item);
          });

          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          this.Biadjo_not_found = true;
          window.showNoRecords();
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
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
