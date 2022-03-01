<template>
  <div padding class="col-12" style="width: 35%">
    <h2 class="q-my-none text-center">
      {{ !loginRegistro ? "Login" : "Registrarse" }}
    </h2>
    <q-form @submit.prevent="onSubmit" ref="formulariLogin">
      <q-input
        class="col-12 q-my-md"
        label="Email"
        v-model="email"
        lazy-rules
        type="email"
        :rules="[(val) => (val && val.length > 0) || 'Debe ingresar el Email']"
      />
      <q-input
        class="col-12"
        label="Password"
        v-model="password"
        lazy-rules
        type="password"
        :rules="[
          (val) => (val && val.length > 0) || 'Debe ingresar un Password',
        ]"
      />
      <div class="row justify-center q-mt-lg">
        <q-btn
          color="secondary"
          :label="!loginRegistro ? 'Entrar' : 'Registrar'"
          type="submit"
        />
        <q-toggle
          class="q-ml-lg"
          :label="!loginRegistro ? 'Registrar' : 'Login'"
          v-model="loginRegistro"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "Login",
  setup() {
    const $store = useStore();
    const q$ = useQuasar();
    const email = ref("");
    const password = ref("");
    const formulariLogin = ref(null);
    const loginRegistro = ref(false);

    const onReset = () => {
      email.value = null;
      password.value = null;
      loginRegistro.value = false;
    };

    const onSubmit = () => {
      $store.commit("kraken/setLoginRegis", [
        email.value,
        password.value,
        loginRegistro.value,
      ]);

      if ($store.state.kraken.mensaje.trim() !== "") {
        q$.notify({
          message: $store.state.kraken.mensaje,
          color: $store.state.kraken.err ? "negative" : "positive",
          icon: $store.state.kraken.err ? "warning" : "done",
        });
      }

      if (loginRegistro.value && !$store.state.kraken.err) {
        formulariLogin.value.resetValidation();
        onReset();
      }
    };

    return {
      email,
      password,
      loginRegistro,
      formulariLogin,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
