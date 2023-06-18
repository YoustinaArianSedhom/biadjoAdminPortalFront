<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table
      ref="table"
      v-model="selected"
      pagination
      :max-items="itemsPerPage"
      search
      :data="Country"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <vs-button type="border" icon-pack="feather" @click="editData"
          >Add New</vs-button
        >
        <!-- <vs-button type="border" icon-pack="feather" icon="icon-plus" @click="addNewData">Add New</vs-button> -->

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"
              >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
              {{
                Country.length - currentPage * itemsPerPage > 0
                  ? currentPage * itemsPerPage
                  : Country.length
              }}
              of {{ Country.length }}</span
            >
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!--  <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>
            <vs-dropdown-item @click="itemsPerPage = 4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage = 20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="Country">{{ $t("Flag") }}</vs-th>
        <vs-th sort-key="Country">{{ $t("Country") }}</vs-th>
        <vs-th sort-key="Code">{{ $t("Code") }}</vs-th>
        <vs-th>{{ $t("Actions") }}</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>
              <!-- <p class="product-name font-medium truncate">{{ tr.flag}}</p> -->
              <img :src="tr.Flag" class="product-img" v-if="tr.Flag != null" />
              <!-- <img :src=" defaultUrl" class="product-img"  v-else/> -->
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.Country }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">
                {{ tr.CountryCode }}
              </p>
            </vs-td>
            <vs-td class="whitespace-no-wrap">
              <!-- <vx-tooltip text="Generate Exam" style="width: 20px;">
                    <feather-icon icon="HelpCircleIcon"  svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="generateExam(tr)" />                    
                </vx-tooltip>  -->
              <router-link
                :to="{
                  name: 'Country-add/Edit',
                  params: { Id: tr.Id },
                  query: { Code: tr.CountryCode }
                }"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
              >
                <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  style="padding: 2px;"
                />
              </router-link>

              <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" /> -->
              <!-- <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click="openConfirm(tr)" /> -->
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
export default {
  data() {
    return {
      selected: [],
      search: {},
      showSearchSidebar: false,
      itemsPerPage: 10,
      isMounted: false,
      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},
      rowDataForDelete: {},
      activeConfirm: false
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    Country() {
      return this.$store.state.CountryList.Country;
    }
  },

  methods: {
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },

    deleteData(data) {
      this.$store.dispatch("CountryList/removeCountry", data).catch(() => {});
    },

    editData() {
      this.$router.push({
        name: "Country-add/Edit"
      });
      //  this.$router.push('/Country/Add-Edit');
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },
    openConfirm(data) {
      this.rowDataForDelete = data;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Confirm"),
        text: this.$t("Areyousureyouwantdeletethisrecord"),
        accept: this.acceptAlert
      });
    },
    toggleSearchSidebar(val) {
      this.showSearchSidebar = val;
    },

    closeSearchSidebar(search) {
      if (search) {
        this.searchCountry();
      }

      this.showSearchSidebar = false;
    },

    searchCountry() {
      this.$store
        .dispatch("CountryList/searchCountry", this.search)
        .catch(() => {
          window.showError();
        });
    },

    acceptAlert() {
      this.deleteData(this.rowDataForDelete);
      this.$vs.notify({
        color: "danger",
        title: this.$t("Deletedrecord"),
        text: this.$t("The selected record was successfully deleted")
      });
    }
  },

  created() {
    this.$vs.loading();
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store
      .dispatch("CountryList/fetchCountrysByID")
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
      });
  },

  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
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

          .product-img {
            height: 70px;
            width: 100px;
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
}
</style>
