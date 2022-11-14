const { DeepstreamClient } = window.DeepstreamClient;

export default function () {
  return {
    cliente: DeepstreamClient,
    chat: [],
    user: {
      uid: "",
      email: "",
      password: "",
      activo: false,
    },
    err: false,
    mensaje: "",
    record: null,
    listUser: [],
  };
}
