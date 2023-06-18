<template>
  <div>
    <div>
      <div :key="Key" v-for="(tr, Key) in this.$options.trucksJson">
        <div>
          <vx-card v-bind:title="$t(tr.Name)" class="mb-base">
            <h4 class="mb-2">{{ $t("AvailableSizes") }} :</h4>
            <p>{{ $t(tr.Description) }}</p>
            <div class="vx-row justify-center">
              <div v-for="(item, key) in tr.VehiclesTypes" :key="key">
                <vs-button type="flat" class=" pr-1 pl-1">
                  <img
                    class="Size"
                    alt="No Image"
                    :src="
                      require(`@/assets/images/ClientAssets/${item.realImage}`)
                    "
                  />
                  <br />
                  {{ $t(item.name) }}
                </vs-button>
              </div>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import trucks_JSON from "@/views/biadjo/json/trucks.json";

export default {
  trucksJson: trucks_JSON,
  props: {
    TruckData: {
      type: Object,
      required: true,
      default: () => ({
        VehicleType: "",
        VehicleOption: ""
      })
    }
  },
  data() {
    return {
      popupActive1: false,
      selected: false,
      types: [],
      image: "",
      VehicleOption: "",
      CanBeSeen: true,
      realImage: null,
      dumpTruck: null,
      IsDumpTruck: false,
      activeIndex: null
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.TruckData.VehicleType !== "";
    }
  },
  methods: {
    Proceed() {
      this.popupActive1 = false;
      this.$emit("Proceed");
    },
    selectedcar(tr, index) {
      this.activeIndex = index;
      this.CanBeSeen = true;
      this.TruckData.VehicleType = tr.VehicleType;
      this.image = tr.image;
      this.IsDumpTruck = false;
      if (tr.VehicleOption) {
        this.TruckData.VehicleOption = tr.VehicleOption;
      } else {
        this.TruckData.VehicleOption = "";
      }
      this.realImage = tr.realImage;
      if (tr.dumpTruck) {
        this.dumpTruck = tr.dumpTruck;
      } else {
        this.dumpTruck = null;
      }
      this.selected = true;
    },
    Select(tr) {
      this.activeIndex = null;
      if (this.types.length > 0) {
        this.types = [];
        this.IsDumpTruck = false;
        this.CanBeSeen = false;
        this.TruckData.VehicleType = null;
        this.TruckData.VehicleOption = "";
        this.types = tr;
        this.popupActive1 = true;
      } else {
        this.IsDumpTruck = false;
        this.types = tr;
        this.CanBeSeen = true;
        this.popupActive1 = true;
      }
    }
  }
};
</script>
<style lang="scss">
.Size {
  width: 300px !important;
  height: 90px !important;
}
.sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100px;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
      margin-left: 10px;
    }
  }
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}
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
.login-tabs-container {
  min-height: 495px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
