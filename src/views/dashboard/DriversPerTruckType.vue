<template>
  <div>
    <e-charts autoresize :options="option" ref="bar" auto-resize />
    <div class="vx-row justify-center">
      <span class="text-xl text-primary mr-2 ml-2">{{ $t("Total") }} </span>
      <span class="text-xl text-primary mr-2 ml-2">
        {{ total }}
      </span>
      <div
        class="vx-col"
        v-for="(item, index) in DriversPerStatus"
        :key="index"
      >
        <span>{{ $t(item.Key) }}</span>
        <span class="text-xl mr-2 ml-2">{{ item.Value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moduleDashboard from "@/store/dashboard/moduleDashboard.js";

import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts-gl";

export default {
  data() {
    return {
      total: 0,
      DriversPerStatus: null,
      clearSetInterval: false,
      option: {
        title: {
          text: this.$t("DriversPerTruckType"),
          left: this.$vs.rtl ? "right" : "left",
          align: "right",
          textStyle: {
            fontFamily: "Cairo",
            color: this.$store.state.theme === "dark" ? "white" : "black"
          }
        },
        toolbox: {
          iconStyle: {
            borderColor: this.$store.state.theme === "dark" ? "white" : "black"
          },
          left: this.$vs.rtl ? "left" : "right",
          feature: {
            magicType: {
              show: true,
              title: this.$t("ChangeType"),
              type: ["line", "bar"]
            },
            restore: { show: true, title: this.$t("Reset") },
            saveAsImage: {
              title: this.$t("Save"),
              type: "png",
              name: "Save"
            }
          }
        },
        color: ["#27ABBE"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" //：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              rotate: 45,
              color: this.$store.state.theme === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: this.$store.state.theme === "dark" ? "white" : "black"
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  components: {
    ECharts
  },
  watch: {
    "$store.state.theme"(val) {
      if (val === "dark") {
        this.option.title.textStyle.color = "white";
        this.option.toolbox.iconStyle.borderColor = "white";
        this.option.xAxis[0].axisLabel.color = "white";
        this.option.yAxis[0].axisLabel.color = "white";
      } else {
        this.option.title.textStyle.color = "black";
        this.option.toolbox.iconStyle.borderColor = "black";
        this.option.xAxis[0].axisLabel.color = "black";
        this.option.yAxis[0].axisLabel.color = "black";
      }
    }
  },
  methods: {
    DriversPerTruckTypeComponent() {
      var Obj = {};
      Obj.CountryCode = this.$store.state.SelectedCountryCode;
      this.option.series[0].data = [];
      this.option.xAxis[0].data = [];
      this.total = 0;
      if (this.$store.state.SelectedCountryCode) {
        this.$store
          .dispatch("Dashboard/DriversPerTruckType", Obj)
          .then(response => {
            this.DriversPerStatus = response.data;
            response.data.forEach(element => {
              this.option.series[0].data.push(element.Value);
              this.option.xAxis[0].data.push(this.$t(element.Key));
            });
            response.data.forEach(element => {
              this.total += Number(element.Value);
            });
            return this.total;
          });
      }
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.DriversPerTruckTypeComponent();
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
    this.DriversPerTruckTypeComponent();
    window.DriversPerTruckTypeComponent = this.DriversPerTruckTypeComponent;
  },
  beforeDestroy() {
    this.StopInterval();
  },
  mounted() {}
};
</script>
<style>
.apexcharts-text .apexcharts-xaxis-label {
  padding-top: 120x;
}
</style>
