<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center ">
    <div class="vx-row" id="printMe">
      <div class="text-center vx-col mb-2  w-full">
        <h3 class="mb-4 text-lg">
          {{ $t("FullName") }} : {{ Form.firstName }} {{ Form.lastName }}
        </h3>
        <h3 class="mb-4 text-lg">
          {{ $t("PhoneNumber") }} :<span :dir="$vs.rtl ? 'ltr' : 'ltr'">
            {{ Form.UserName }}</span
          >
        </h3>
      </div>
      <div
        class="text-center vx-col mb-2  w-full"
        v-for="(Value, Key) in PayResponse"
        :key="Key"
      >
        <h3
          class="mb-4 text-lg"
          v-if="
            Value.Key == 'PaiedBiadjosTotal' ||
              Value.Key == 'UnPaiedBiadjosTotal'
          "
        >
          {{ $t(Value.Key) }} : {{ Value.Value | numFormat("###,##0.00") }}
        </h3>
        <h3 class="mb-4 text-lg" v-else>
          {{ $t(Value.Key) }} : {{ Value.Value }}
        </h3>
      </div>
    </div>
    <div class="vx-row">
      <div
        class="text-center vx-col mb-2  w-full"
        style="padding: 20px; margin: auto;"
      >
        <vs-button
          color="primary"
          class="mr-4 mb-2"
          @click="Print"
          type="filled"
          >{{ $t("ConfirmAndPrint") }}</vs-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Form: {
      type: Object
    },
    PayResponse: {
      type: Array
    }
  },
  methods: {
    Print() {
      this.$htmlToPaper("printMe", null, () => {
        this.popupActivePaymentDetails = false;
        location.reload("/");
      });
    }
  }
};
</script>
