const { DeepstreamClient } = window.DeepstreamClient;

export function dsLogin(state, url) {
  state.cliente = new DeepstreamClient(url);
  state.cliente.login();
  state.user.uid = state.cliente.getUid();
  state.record = state.cliente.record.getRecord("I-am-Kraken");
}

export function setLoginRegis(state, valores) {
  const email = valores[0];
  const password = valores[1];
  const swLR = valores[2];
  state.err = false;
  state.mensaje = "";

  const index = buscaUser(state, email);

  if (!swLR) {
    if (index < 0) {
      state.mensaje = "Usuario no registrado";
    } else if (state.listUser[index].password !== password) {
      state.mensaje = "Password inválidos";
    }
  } else {
    if (index !== -1) {
      state.mensaje = "Usuario ya esta registrado";
    }
  }

  if (state.mensaje.trim() !== "") {
    state.err = true;
    return;
  }

  setUsers(state, index, email, password);
}

export function setLogout(state) {
  setUsers(
    state,
    buscaUser(state, state.user.email),
    state.user.email,
    state.user.email
  );
}

export function getUsersList(state) {
  state.record.subscribe("lsUser", function (value) {
    state.listUser = [...value];
  });
}

export function dsLogout(state) {
  state.record.unsubscribe("lsUser");
  state.cliente.close();
}

function setUsers(state, index, email, password) {
  state.err = false;
  state.mensaje = "";

  if (index !== -1 && state.listUser[index].password === password) {
    state.listUser[index].activo = !state.listUser[index].activo;
  } else {
    state.listUser.push({
      email,
      password,
      activo: false,
    });

    index = state.listUser.length - 1;
    state.mensaje = "Registro exitoso";
  }

  state.user.activo = state.listUser[index].activo;
  state.user.email = state.listUser[index].email;

  state.record.set("lsUser", state.listUser);
}

function buscaUser(state, email) {
  const index = state.listUser.findIndex(
    (val) => val.email.toLowerCase() === email.toLowerCase()
  );

  return index;
}
