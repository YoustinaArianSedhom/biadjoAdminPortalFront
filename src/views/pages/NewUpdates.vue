<template>
  <div class="flex w-full bg-img">
    <div
      class="vx-col flex items-center justify-center flex-col w-full mx-auto "
    >
      <vx-card class="w-full h-screen">
        <div v-if="!Loaded">
          <lottie-player
            src="https://assets6.lottiefiles.com/temp/lf20_gNBoNM.json"
            background="transparent"
            speed="1"
            class="items-center justify-center flex-col w-full mx-auto text-center"
            style="width: 500px; height: 500px;"
            autoplay
          ></lottie-player>
        </div>
        <div v-if="Loaded">
          <div class="flex mb-6">
            <span class="text-primary text-2xl ml-2 mr-2 ">{{
              $t("NewUpdates")
            }}</span>
            <span
              class="text-white text-sm ml-2 mr-2 flex-start bg-primary rounded-full p-2"
              >{{ UpdatesDate }}</span
            >
          </div>
          <vs-divider class="w-48" />

          <div
            class="vx-row mb-6"
            :key="index"
            v-for="(tr, index) in this.$options.UpdatesJSON"
          >
            <div class="vx-col w-full text-2xl">
              {{ index + 1 }} ) {{ $t(tr.Text) }}
              <span
                @click="NavigateTo(tr.URL)"
                class="text-primary cursor-pointer"
              >
                {{ $t(tr.Body) }}
              </span>
              <span v-if="tr.Details">
                {{ $t("From") }} {{ $t(tr.Details) }}</span
              >.
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import UpdatesJSON from "./newUpdates.json";
export default {
  UpdatesJSON: UpdatesJSON,

  data() {
    return {
      Loaded: false,
      UpdatesDate: "Wed Nov 11 2020"
    };
  },
  methods: {
    NavigateTo(URL) {
      this.$router.push({ name: URL });
    }
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    );
    document.head.appendChild(recaptchaScript);
    setTimeout(() => {
      this.Loaded = true;
    }, 1500);
  }
};
</script>
