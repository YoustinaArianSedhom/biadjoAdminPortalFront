<template>
  <!-- NOTIFICATIONS -->
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <feather-icon
      icon="BellIcon"
      class="cursor-pointer mt-1 sm:mr-6 mr-2"
      :badge="Notifications.length"
    />

    <vs-dropdown-menu
      class="notification-dropdown  dropdown-custom vx-navbar-dropdown"
    >
      <div
        v-if="Notifications.length > 0"
        class="notification-top flex justify-between  text-center p-5 bg-primary text-white "
      >
        <div class="flex items-start">
          <h3 class="text-white ">
            {{ Notifications.length }} {{ $t("New") }}
          </h3>
        </div>
        <div class="flex items-end">
          <span
            class="text-right text-xs cursor-pointer"
            @click="MarkAsReadAll"
          >
            {{ $t("MarkAsReadAll") }}
          </span>
        </div>
        <!-- <p class="opacity-75">App Notifications</p> -->
      </div>

      <VuePerfectScrollbar
        v-if="Notifications.length > 0"
        ref="mainSidebarPs"
        class="scroll-area--nofications-dropdown p-0 mb-10"
        :settings="settings"
        :key="$vs.rtl"
      >
        <ul class="bordered-items pb-8 mb-4">
          <li
            v-for="(ntf, index) in Notifications"
            :key="index"
            class="flex justify-between px-4 py-4 notification cursor-pointer"
          >
            <div
              class="flex items-start w-full"
              @click="routeToNotificationPage(ntf, index)"
            >
              <!-- <feather-icon
                :icon="ntf.icon"
                :svgClasses="[
                  `text-${ntf.category}`,
                  'stroke-current mr-1 h-6 w-6'
                ]"
              ></feather-icon> -->
              <div class="mx-2">
                <span
                  class="font-medium block notification-title"
                  :class="[`font-${getStatus(ntf.Seen)}`]"
                  >{{ getTitle(ntf) }}</span
                >
                <small>{{ getMessage(ntf) }}</small>
              </div>
            </div>
            <div class="flex items-end">
              <vx-tooltip text="Mark As Read">
                <feather-icon
                  icon="BookOpenIcon"
                  svgClasses="stroke-current mr-2 ml-2 h-5 w-5 text-primary"
                  @click="markAsRead(index)"
                ></feather-icon>
              </vx-tooltip>
              <vx-tooltip text="Remove Notification">
                <feather-icon
                  icon="DeleteIcon"
                  @click="deleteNotification(index)"
                  svgClasses="stroke-current mr-2 ml-2 h-5 w-5 text-danger"
                ></feather-icon>
              </vx-tooltip>
            </div>
            <!-- <small class="mt-1 whitespace-no-wrap">{{
              elapsedTime(ntf.time)
            }}</small> -->
          </li>
        </ul>
      </VuePerfectScrollbar>

      <VuePerfectScrollbar
        v-else
        ref="mainSidebarPs"
        class="scroll-area--nofications-dropdown p-0 mb-10"
        :settings="settings"
        :key="$vs.rtl"
      >
        <ul class="m-4 justify-center">
          <li class="flex justify-center px-4 py-4 notification ">
            {{ $t("NONotifications") }}
          </li>
        </ul>
      </VuePerfectScrollbar>

      <div
        v-if="Notifications.length > 0"
        class="checkout-footer  fixed flex justify-between bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold  border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light "
      >
        <router-link
          class="pl-5 cursor-pointer"
          :to="{
            name: 'Notifications'
          }"
        >
          <span>{{ $t("ViewAllNotifications") }}</span>
        </router-link>
        <span
          @click="deleteAllNotification"
          class="pr-5 text-xs cursor-pointer"
          >{{ $t("deleteAllNotification") }}</span
        >
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      body: "",
      ID: "",
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    Notifications() {
      return this.$store.state.NotificationList;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
    markAsRead(ntf) {
      // this.$vs.loading();

      this.$store.commit("update_NotificationSeen", ntf);
      // Add mutation to update status to be true for current notification with index
    },

    MarkAsReadAll() {
      // this.$vs.loading();
      for (let i = 0; i < this.Notifications.length; i++) {
        this.$store.commit("update_NotificationSeen", i);
      }
      // Add mutation to update status to be true for current notification with index
    },

    deleteNotification(index) {
      //DELTE NOTIFICATIOB BY INDEX FROM ARRAY

      this.$store.commit("RemoveFrom_NotificationList", index);
    },
    deleteAllNotification() {
      //DELTE NOTIFICATIOB BY INDEX FROM ARRAY

      this.$store.commit("RemoveFrom_AllNotificationList", []);
    },
    getTitle(notification) {
      switch (notification.Type) {
        case "RecieveBiadjoRequest":
          return this.$t("RecieveBiadjoRequest");

        case "NewOffer":
          return this.$t("NewOffer");

        case "ConflictedBiadjo":
          return this.$t("ConflictedBiadjo");

        case "OfferAccepted":
          return this.$t("OfferAccepted");

        case "DriverWaitingForVerfication":
          return this.$t("DriverWaitingForVerfication");

        case "NewBiadjo":
          return this.$t("NewBiadjo");

        case "BiadjoWithoutDrivers":
          return this.$t("BiadjoWithoutDrivers");

        case "OffersWaitingForApproval":
          return this.$t("OffersWaitingForApproval");

        case "DoneBiadjos":
          return this.$t("DoneBiadjos");

        case "UnstartedBiadjos":
          return this.$t("UnstartedBiadjos");

        default:
          return "";
      }
    },

    getMessage(notification) {
      switch (notification.Type) {
        case "RecieveBiadjoRequest":
          return (
            this.$t("bodyRecieveBiadjoRequest") + ": " + notification["ID"]
          );
        case "NewOffer":
          return this.$t("BodyNewOffer") + ": " + notification["ID"];

        case "OfferAccepted":
          return this.$t("BodyOfferAccepted") + ": " + notification["ID"];

        case "ConflictedBiadjo":
          return (
            this.$t("BodyConflictedBiadjo") +
            ": " +
            notification["Biadjos_Count"]
          );

        case "DriverWaitingForVerfication":
          return (
            this.$t("BodyDriverWaitingForVerfication") +
            ": " +
            notification["ID"]
          );

        case "NewBiadjo":
          return this.$t("BodyNewBiadjo") + ": " + notification["ID"];

        case "BiadjoWithoutDrivers":
          return (
            this.$t("BodyBiadjoWithoutDrivers") + ": " + notification["ID"]
          );
        case "OffersWaitingForApproval":
          return (
            this.$t("BodyOffersWaitingForApproval") + ": " + notification["ID"]
          );

        case "DoneBiadjos":
          return this.$t("BodyDoneBiadjos") + ": " + notification["ID"];

        case "UnstartedBiadjos":
          return this.$t("BodyUnstartedBiadjos") + ": " + notification["ID"];

        default:
          return "";
      }
    },
    getStatus(notification) {
      switch (notification) {
        case true:
          return "thin";

        case false:
          return "semibold";

        default:
          return "thin";
      }
    },

    routeToNotificationPage(notification, index) {
      this.markAsRead(index);
      switch (notification.Type) {
        case "RecieveBiadjoRequest":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "NewOffer":
          this.$router
            .push({
              name: "OffersForBiadjo",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "OfferAccepted":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "ConflictedBiadjo":
          this.$router
            .push({
              name: "ConflictedBiadjo"
            })
            .then(() => location.reload("/"));
          break;

        case "DriverWaitingForVerfication":
          this.$router
            .push({
              name: "DriverProfile",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "UnstartedBiadjos":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "NewBiadjo":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "BiadjoWithoutDrivers":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "OffersWaitingForApproval":
          this.$router
            .push({
              name: "OffersForBiadjo",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;

        case "DoneBiadjos":
          this.$router
            .push({
              name: "BiadjoDetails",
              params: { Id: notification.ID }
            })
            .then(() => location.reload("/"));
          break;
      }
    }
  }
};
</script>
<style>
.CustomHeight {
  height: 50vh;
}
</style>
