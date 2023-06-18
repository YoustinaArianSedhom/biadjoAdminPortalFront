<template>
  <div>
    <!-- RIGHT COL -->
    <div class="w-full" id="Scroll">
      <Bc-CountryVSelect @SearchByCountryCode="Search"></Bc-CountryVSelect>
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="ResponseModel"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <vs-th sort-key="BiadjoNo">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="ScheduelDate">{{ $t("Schedual") }}</vs-th>
              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="product-name font-medium truncate">
                      {{ tr.id }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      {{ tr.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.Status)"
                      class="PaymentStatus"
                      >{{ $t(tr.Status) }}</vs-chip
                    >
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <!-- <router-link :to="{name: 'Driver-add/Edit', params: { Id: tr.Id }}" svgClasses="w-5 h-5 hover:text-primary stroke-current">
                                        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" style="padding:2px" />
                                    </router-link> -->

                    <router-link
                      :to="{ name: 'BiadjoDetails', params: { Id: tr.id } }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
import "vue-slider-component/theme/default.css";

export default {
  components: {
    BcCountryVSelect: () => import("@/views/BComponents/BcCountryVSelect")
  },
  data() {
    return {
      Dropdown: false,
      currentPage: 1,
      CountryCode: "",
      search: "",
      Vehicles: [],
      selected: [],
      Hani: "",
      Drivers: [],
      itemsPerPage: 10,
      isMounted: false,
      Model: {
        Status: "BS12",
        CountryCode: "",
        id: "",
        DriverPaymentStatus: "",
        Rating: "",
        Schedual: "",
        Price: "",
        LessThan: "true",
        ClosingDate: ""
      },
      ResponseModel: []
    };
  },

  methods: {
    getOrderStatusColor(status) {
      if (status == "BS3" || status == "BS1" || status == "BS2") {
        return "#F8BD30";
      }
      if (status == "BS4") {
        return "dark";
      }
      if (
        status == "BS5" ||
        status == "BS6" ||
        status == "BS7" ||
        status == "BS8" ||
        status == "BS9" ||
        status == "BS10"
      ) {
        return "primary";
      }
      if (status == "BS11") {
        return "#039BE5";
      }
      if (status == "BS12" || status == "BS13" || status == "BS14") {
        return "dark";
      }
    },
    outside: function() {
      this.Dropdown = false;
    },

    Search(value) {
      this.$vs.loading();
      this.ResponseModel = [];
      this.Model.CountryCode = value;
      this.$store
        .dispatch("DriverList/NoDriverFound", this.Model)
        .then(response => {
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.ResponseModel = response.data;
              this.$vs.loading.close();
            } else {
              window.showNoRecords();
              this.$vs.loading.close();
            }
            this.$vs.loading.close();
          }
        })
        .catch(() => {
          window.showError();
          this.$vs.loading.close();
        });
    }
  },

  created() {
    // this.$vs.loading();

    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
#page-user-list {
  .user-list-filters {
    height: 10px;

    .vs__actions {
      position: absolute;
      right: 0;
      top: 20%;
      height: 100px;
      transform: translateY(-58%);
    }
  }
}

#instant-search-demo {
  .header {
    .filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .price-slider {
    max-width: 80%;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #instant-search-demo {
    #content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #content-container {
    .vs-sidebar {
      position: fixed !important;
      float: left !important;
    }
  }
}

.grid-view-item {
  // height: 450px;

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }

  button.page-link {
    display: inline-block;
  }

  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }

  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
}

#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;

      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);

        td {
          padding: 20px;

          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }

          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }

        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }

      th.td-check {
        padding: 0 15px !important;
      }

      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}</style
><style>
.vs-sidebar.vs-sidebar-parent {
  max-height: 1500px !important;
}
</style>
