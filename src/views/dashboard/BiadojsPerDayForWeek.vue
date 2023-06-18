<template>
  <e-charts autoresize :options="option" ref="bar" auto-resize />
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
      clearSetInterval: false,
      option: {
        title: {
          text: this.$t("BiadojsPerDayForWeek"),
          left: this.$vs.rtl ? "right" : "left",
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
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
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
              fontWeight: "bold",
              color: this.$store.state.theme === "dark" ? "white" : "black",
              fontSize: 10
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
    BiadojsPerDayforweekComponent() {
      var Obj = {};
      this.option.series[0].data = [];
      this.option.xAxis[0].data = [];
      Obj.CountryCode = this.$store.state.SelectedCountryCode;
      if (this.$store.state.SelectedCountryCode) {
        this.$store
          .dispatch("Dashboard/BiadojsPerDayforweek", Obj)
          .then(response => {
            response.data.forEach(element => {
              this.option.series[0].data.push(element.Value);
              this.option.xAxis[0].data.push(element.Key);
            });
          });
      }
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.BiadojsPerDayforweekComponent();
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
    this.BiadojsPerDayforweekComponent();
    window.BiadojsPerDayforweekComponent = this.BiadojsPerDayforweekComponent;
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
