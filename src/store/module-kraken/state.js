const { DeepstreamClient } = window.DeepstreamClient;

export default function () {
  return {
    cliente: DeepstreamClient,
    chat: "",
    uid: "",
    record: null,
    listUser: [],
  };
}
