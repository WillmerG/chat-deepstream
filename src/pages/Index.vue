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
import { useStore } from "vuex";

export default defineComponent({
  name: "PageIndex",
  setup() {
    const $store = useStore();

    console.log("Voy1", $store.state.kraken.uid);
    $store.commit("kraken/login", "localhost:6020");
    console.log("Voy2", $store.state.kraken.uid);

    return {};
  },
});
</script>
