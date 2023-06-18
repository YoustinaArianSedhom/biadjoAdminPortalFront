<template>
  <e-charts autoresize :options="pie" ref="pie" auto-resize />
</template>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/chart/pie";
import moduleDashboard from "@/store/dashboard/moduleDashboard.js";

export default {
  data() {
    return {
      clearSetInterval: false,
      pie: {
        title: {
          text: this.$t("TodayBiadojsForTodayperStatus"),
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
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "horizontal",
          left: "left",
          textStyle: {
            color: this.$store.state.theme === "dark" ? "white" : "black"
          },
          data: [],
          padding: [
            50, // up
            0, // right
            25, // down
            0 // left
          ]
        },
        series: [
          {
            name: this.$t("BiadjosPerStatus"),
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            color: [
              "#27ABBE",
              "#fec185",
              "#b27237",
              "#EA5455",

              "#FF9F43",
              "#a54243"
            ],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
    TodayBiadojsForTodayperStatusComponent() {
      var Obj = {};
      Obj.CountryCode = this.$store.state.SelectedCountryCode;
      this.pie.series[0].data = [];
      this.pie.legend.data = [];
      if (this.$store.state.SelectedCountryCode) {
        this.$store
          .dispatch("Dashboard/TodayBiadojsForTodayperStatus", Obj)
          .then(response => {
            response.data.forEach(element => {
              if (element.Value == 0) {
                this.pie.series[0].data.push({
                  name: this.$t(element.Key),
                  value: null
                });
                this.pie.legend.data.push(this.$t(element.Key));
              } else {
                this.pie.series[0].data.push({
                  name: this.$t(element.Key),
                  value: element.Value
                });
                this.pie.legend.data.push(this.$t(element.Key));
              }
            });
          });
      }
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.TodayBiadojsForTodayperStatusComponent();
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
    this.TodayBiadojsForTodayperStatusComponent();
    window.TodayBiadojsForTodayperStatusComponent = this.TodayBiadojsForTodayperStatusComponent;
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
