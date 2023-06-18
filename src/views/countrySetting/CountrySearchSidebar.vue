<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>search</h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>

    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar
      class="scroll-area--data-list-add-new"
      :settings="settings"
    >
      <div class="p-5">
        <!-- start date -->
        <div class="spacer"></div>
        <label for="startDate" class="vs-input--label">From</label>
        <datepicker
          :format="format"
          placeholder="Start Date"
          v-model="search.StartDate"
          input-class="mt-5 w-full"
          name="startDate"
          :language="DatepickerLang"
        ></datepicker>

        <!-- End date -->
        <div class="spacer"></div>
        <label for="startDate" class="vs-input--label">To</label>
        <datepicker
          :format="format"
          placeholder="End Date"
          v-model="search.EndDate"
          class="mt-5 w-full"
          :language="DatepickerLang"
          name="endDate"
        ></datepicker>

        <vs-select
          class="mt-5 w-full"
          name="Course"
          label="Course"
          v-model="search.CourseID"
        >
          <vs-select-item
            :key="index"
            :value="item.ID"
            :text="item.Name"
            v-for="(item, index) in Courses"
          />
        </vs-select>

        <vs-select
          class="mt-5 w-full"
          name="ClassRoom"
          label="ClassRoom"
          v-model="search.ClassRoomID"
        >
          <vs-select-item
            :key="index"
            :value="item.ID"
            :text="item.Name"
            v-for="(item, index) in classRooms"
          />
        </vs-select>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="searchCourseClass">Search</vs-button>
      <vs-button type="border" class="mr-6" color="danger" @click="resetModel"
        >Reset</vs-button
      >
      <vs-button
        type="border"
        color="danger"
        @click="isSidebarActiveLocal = false"
        >Cancel</vs-button
      >
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Datepicker from "vuejs-datepicker";
import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  props: {
    search: {
      type: Object,
      required: true
    },
    isSidebarActive: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      format: "dd-MM-yyyy",
      courses: [],
      ar: ar,
      en: en,
      // search:{},
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },

  computed: {
    DatepickerLang() {
      var SelectedLanguage = {};

      if (this.$i18n.locale == "ar") {
        SelectedLanguage = this.ar;
      } else {
        SelectedLanguage = this.en;
      }
      return SelectedLanguage;
    },
    Courses() {
      return this.$store.state.courseList.courses;
    },

    classRooms() {
      return this.$store.state.classRoomList.classRooms;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSearchSidebar");
        }
      }
    }
  },
  methods: {
    resetModel() {
      //  this.search={}
    },
    searchCourseClass() {
      this.$emit("closeSearchSidebar", true);
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  height: calc(100% - 4.3rem);
}
</style>
