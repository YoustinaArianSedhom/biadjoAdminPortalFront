<template>
  <div class="vx-col w-full md:w-3/3 mb-base">
    <template slot="actions">
      <feather-icon
        icon="SettingsIcon"
        svgClasses="w-6 h-6 text-grey"
      ></feather-icon>
    </template>
    <div slot="no-body" class="h3-6 pb-0">
      <div class="flex">
        <div class="m-6">
          <p class="mb-3 font-semibold">
            {{ $t("UnStartedBiadjosCount") }}
          </p>
          <p class="text-4xl text-warning">
            <sup class="text-base mr-1">#</sup>{{ UnStartedBiadjosCount }}
          </p>
        </div>
        <!-- <div class="m-6">
          <p class="mb-3 font-semibold">{{ $t("outStandingBalance") }}</p>
          <p class="text-4xl text-danger">
            <sup class="text-base mr-1">$</sup>{{ UnStartedBiadjosCount[1].Value }}
            <span class="text-xl" style="color:black">
              {{ $t(CountryCode + "_Currency") }}
            </span>
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moduleDashboard from "@/store/dashboard/moduleDashboard.js";
export default {
  data() {
    return {
      clearSetInterval: false,
      UnStartedBiadjosCount: 0,
      CountryCode: null
    };
  },
  methods: {
    UnStartedBiadjosCountComponent() {
      var Obj = {};
      Obj.CountryCode = this.$store.state.SelectedCountryCode;

      if (this.$store.state.SelectedCountryCode) {
        this.$store
          .dispatch("Dashboard/UnStartedBiadjosCount", Obj)
          .then(response => {
            this.UnStartedBiadjosCount = response.data;
          });
      }
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.UnStartedBiadjosCountComponent();
      }, this.duration * 1000 * 60);
    },
    StopInterval() {
      clearInterval(this.clearSetInterval);
    }
  },
  created() {
    if (!moduleDashboard.isRegistered) {
      this.$store.registerModule("Dashboard", moduleDashboard);
      moduleDashboard.isRegistered = true;
    }
    this.UnStartedBiadjosCountComponent();
    window.UnStartedBiadjosCountComponent = this.UnStartedBiadjosCountComponent;
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
