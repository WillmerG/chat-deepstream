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
          dense
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

    <!-- <q-footer elevated class="bg-cyan-8"> -->
    <q-footer elevated class="bg-cyan-8 q-pa-sm">
      <q-input
        outlined
        v-model="text"
        label="Mensaje"
        rounded
        bg-color="grey-4"
        @input="onChange()"
      >
        <template v-slot:after>
          <q-btn round color="grey-4" text-color="black" icon="send" />
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  data() {
    return {
      ds: null,
      record: null,
    };
  },
  setup() {
    const store = useStore();

    const onSalir = () => {
      store.commit("kraken/setLogout");
    };

    const onChange = () => {
      this.record.set("texto", this.text);
    };

    return {
      text: ref(""),
      dense: ref(false),
      store,
      onSalir,
    };
  },
  unmounted() {
    store.commit("kraken/dsClose");
  },
};
</script>
