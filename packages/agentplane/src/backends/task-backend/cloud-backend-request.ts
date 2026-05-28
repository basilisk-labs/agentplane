import {
  CLOUD_REQUEST_TIMEOUT_MS,
  CloudHttpError,
  CloudNetworkError,
  cloudHttpErrorMessage,
  cloudNetworkErrorMessage,
  createTimeoutSignal,
  readCloudJson,
} from "./cloud-backend-utils.js";

export function buildCloudHeaders(token: string): Headers {
  return new Headers({
    "content-type": "application/json",
    authorization: `Bearer ${token}`,
  });
}

export async function requestCloudBackendJson<T>(opts: {
  endpoint: string;
  token: string;
  fetchImpl: typeof fetch;
  pathname: string;
  init: RequestInit;
  timeoutMs?: number;
}): Promise<T> {
  const headers = buildCloudHeaders(opts.token);
  for (const [key, value] of new Headers(opts.init.headers)) {
    headers.set(key, value);
  }

  let res: Response;
  try {
    res = await opts.fetchImpl(`${opts.endpoint}${opts.pathname}`, {
      ...opts.init,
      headers,
      signal: opts.init.signal ?? createTimeoutSignal(opts.timeoutMs ?? CLOUD_REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new CloudNetworkError(cloudNetworkErrorMessage(error, opts.timeoutMs));
  }
  if (!res.ok) {
    throw new CloudHttpError(await cloudHttpErrorMessage(res), res.status);
  }
  return await readCloudJson<T>(res, opts.timeoutMs);
}
