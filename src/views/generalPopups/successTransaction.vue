<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center ">
    <vs-row vs-type="flex" vs-justify="center">
      <vs-col class="m-4" vs-type="flex" vs-justify="center" vs-align="center">
        <h2 class="m-1" style="color:green">
          {{ $t("NewBalance") }} : {{ $t(Response.NewBalance) }}
        </h2>
      </vs-col>
    </vs-row>
    <vs-row vs-type="flex" vs-justify="center">
      <vs-col class="m-4" vs-type="flex" vs-justify="center" vs-align="center">
        <h3 class="m-1">{{ $t("recieptNo") }}:</h3>
        <h2 class="m-1">
          {{ Response.recieptNo }}
        </h2>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
export default {
  props: {
    Response: {
      type: Object
    }
  },
  computed: {
    validateResponse() {
      return (
        !this.errors.any() &&
        this.Response.NewBalance !== "" &&
        this.Response.recieptNo !== ""
      );
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    }
  }
};
</script>
