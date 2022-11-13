<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="people">
          <q-tooltip>Lista de Usuarios Conectados</q-tooltip>
        </q-btn>
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
import { DeepstreamClient } from "@deepstream/client";

export default {
  data() {
    return {
      ds: null,
      record: null,
    };
  },
  setup() {
    const drawer = ref(true);
    const store = useStore();

    const onSalir = () => {
      store.commit("kraken/setLogout");
    };

    const onChange = () => {
      this.record.set("texto", this.text);
    };

    return {
      drawer,
      text: ref(""),
      dense: ref(false),
      store,
      onSalir,
    };
  },
  created() {
    this.ds = new DeepstreamClient("localhost:6020");
    this.ds.login();
    console.log(this.ds);

    this.record = this.ds.record.getRecord("text/chat");
    this.record.set({ texto: this.text });
    this.record.subscribe((val) => {
      this.text = val.texto;
    });
  },
};
</script>
