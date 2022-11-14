<template>
  <q-page class="flex flex-center" v-if="!store.state.kraken.user.activo">
    <Login />
  </q-page>

  <MessageChat v-if="store.state.kraken.user.activo" />
</template>

<script>
import { defineComponent } from "vue";
import Login from "../components/login.vue";
import MessageChat from "../components/MessageChat.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PageIndex",
  components: { Login, MessageChat },
  setup() {
    const store = useStore();
    store.commit("kraken/dsLogin", "localhost:6020");

    return {
      store,
    };
  },
});
</script>
