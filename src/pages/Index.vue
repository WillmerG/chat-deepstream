<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
// import { DeepstreamClient } from "@deepstream/client";
const { DeepstreamClient } = window.DeepstreamClient;

export default defineComponent({
  name: "PageIndex",
  setup() {
    const cliente = new DeepstreamClient("localhost:6020");
    cliente.login();

    return {};
  },
  unmounted() {
    cliente.logout();
  },
});
</script>
