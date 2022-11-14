<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%" :key="i" v-for="(val, i) in listChat">
      <q-chat-message
        v-if="emailX === val.email"
        name="tu"
        :text="[val.mensaje]"
        sent
      />
      <q-chat-message
        v-if="emailX !== val.email"
        :name="[val.email]"
        :text="[val.mensaje]"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "PageMessageChat",
  setup() {
    const $store = useStore();
    const emailX = $store.state.kraken.user.email;
    console.log(emailX);

    return {
      $store: $store,
      emailX,
    };
  },
  computed() {
    const listChat = () => {
      return $storeate.kraken.chat;
    };

    return {
      listChat,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
