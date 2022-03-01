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

    <q-drawer v-model="drawer" :width="200">
      <h6 class="q-my-none q-pa-sm" style="border-right: 1px solid #ddd">
        Usuarios Conectados
      </h6>
      <q-scroll-area
        style="height: calc(100% - 80px); border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Star </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Send </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

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
  setup() {
    const drawer = ref(true);
    const store = useStore();

    const onSalir = () => {
      store.commit("kraken/setLogout");
    };

    return {
      drawer,
      text: ref(""),
      dense: ref(false),
      store,
      onSalir,
    };
  },
};
</script>
