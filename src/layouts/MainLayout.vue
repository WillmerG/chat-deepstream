<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-toolbar-title>{{
          store.state.kraken.user.activo
            ? store.state.kraken.user.email
            : "Chat"
        }}</q-toolbar-title>
        <q-btn
          flat
          @click="onSalir"
          round
          icon="input"
          v-if="store.state.kraken.user.activo"
        >
          <q-tooltip>Salir Del Chat</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      elevated
      class="bg-cyan-8 q-pa-sm"
      v-if="store.state.kraken.user.activo"
    >
      <q-input
        outlined
        v-model="texto"
        type="text"
        label="Mensaje"
        @keyup.enter="onMensaje"
        rounded
        bg-color="grey-4"
      >
        <template v-slot:after>
          <q-btn
            round
            color="grey-4"
            text-color="black"
            icon="send"
            @click="onMensaje"
          />
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    store.commit("kraken/setChat", "");
    const texto = ref("");

    const onSalir = () => {
      store.commit("kraken/setLogout");
    };

    const onMensaje = () => {
      store.commit("kraken/setChat", texto.value);
      texto.value = "";
    };

    return {
      texto,
      store,
      onSalir,
      onMensaje,
    };
  },
  unmounted() {
    store.commit("kraken/dsClose");
  },
};
</script>
