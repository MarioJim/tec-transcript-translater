export const sendRequest = <T>(request: ServiceWorkerRequest) =>
  new Promise<T>((resolve) => chrome.runtime.sendMessage(request, resolve));
