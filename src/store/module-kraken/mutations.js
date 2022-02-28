const { DeepstreamClient } = window.DeepstreamClient;

export function login(state, url) {
  state.cliente = new DeepstreamClient(url);
  state.cliente.login();
  state.uid = state.cliente.getUid();
  state.record = state.cliente.record.getRecord("I-am-Kraken");
}

export function setUsers(state, nombre) {
  state.listUser.push({
    nombre,
    activo: false,
  });

  state.record.set("lsUser", state.listUser);
}

export function getUsers(state) {
  state.record.subscribe("lsUser", function (value) {
    state.listUser = [...value];
  });
}

export function logout(state) {
  state.record.unsubscribe("lsUser");
  state.cliente.close();
}
