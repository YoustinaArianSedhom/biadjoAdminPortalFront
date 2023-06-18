<template>
  <vx-card class="pr-4 pl-4 mr-2 ml-2">
    <VuePerfectScrollbar
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
  </vx-card>
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
    deleteNotification(index) {
      //DELTE NOTIFICATIOB BY INDEX FROM ARRAY

      this.$store.commit("RemoveFrom_NotificationList", index);
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
