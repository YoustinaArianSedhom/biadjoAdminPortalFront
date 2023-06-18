<!-- =========================================================================================
    File Name: VxTimeline.vue
    Description: Timeline Component
    Component Name: VxTimeline
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <div class="vx-row w-full">
      <vs-input
        class="w-full m-4"
        placeholder="Search for specific note"
        v-model="search"
      />
    </div>
    <div id="ScrollToEnd" class="vx-col w-full scroll-area scroll">
      <ul class="vx-timeline">
        <li v-for="item in filteredList" :key="item.id">
          <div class="timeline-icon bg-primary">
            <!-- <div class="timeline-icon" :class="`bg-${item.color}`"> -->

            <feather-icon
              icon="CheckIcon"
              style="color:white"
              svgClasses="text-white  w-5 h-5"
            />
          </div>
          <div class="timeline-info">
            <p class="font-semibold">{{ item.Notice }}</p>
            <span class="activity-desc">{{ item.AdminUserFullName }}</span>
          </div>
          <small class="text-grey activity-e-time">{{
            item.DateTime | formatDate()
          }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filteredList() {
      return this.data.filter(Element => {
        return (
          Element.Notice.toLowerCase().includes(this.search.toLowerCase()) +
          Element.AdminUserFullName.toLowerCase().includes(
            this.search.toLowerCase()
          ) +
          Element.DateTime.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  },
  name: "vx-timeline",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        var div = document.getElementById("ScrollToEnd");
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }, 1000);
    }
  },
  created() {
    setTimeout(() => {
      var div = document.getElementById("ScrollToEnd");
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }, 1000);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxTimeline.scss";
</style>
