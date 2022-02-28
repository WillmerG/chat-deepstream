const { DeepstreamClient } = window.DeepstreamClient;

export default function () {
  return {
    cliente: DeepstreamClient,
    chat: "",
    record: null,
    listUser: [],
  };
}
