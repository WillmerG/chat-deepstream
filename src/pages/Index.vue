<template>
  <q-page class="flex flex-center">
    <Login v-if="!store.state.kraken.user.activo" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Login from "../components/login.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PageIndex",
  components: { Login },
  setup() {
    const store = useStore();
    store.commit("kraken/dsLogin", "localhost:6020");

    return {
      store,
    };
  },
});
</script>
