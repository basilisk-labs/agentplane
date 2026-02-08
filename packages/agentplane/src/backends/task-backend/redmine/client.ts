import { isRecord } from "../../../shared/guards.js";

import { BackendError, RedmineUnavailable, sleep, toStringSafe } from "../shared.js";

export async function requestJson(
  opts: { baseUrl: string; apiKey: string },
  method: string,
  reqPath: string,
  payload?: Record<string, unknown>,
  params?: Record<string, unknown>,
  requestOpts?: { attempts?: number; backoff?: number },
): Promise<Record<string, unknown>> {
  let url = `${opts.baseUrl}/${reqPath.replace(/^\//u, "")}`;
  if (params) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      search.append(key, toStringSafe(value));
    }
    const qs = search.toString();
    if (qs) url += `?${qs}`;
  }

  const attempts = Math.max(1, requestOpts?.attempts ?? 3);
  const backoff = requestOpts?.backoff ?? 0.5;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const resp = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": opts.apiKey,
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });
      const text = await resp.text();
      if (!resp.ok) {
        if ((resp.status === 429 || resp.status >= 500) && attempt < attempts) {
          await sleep(backoff * attempt * 1000);
          continue;
        }
        throw new BackendError(`Redmine API error: ${resp.status} ${text}`, "E_BACKEND");
      }
      if (!text) return {};
      try {
        const parsed = JSON.parse(text) as unknown;
        if (isRecord(parsed)) return parsed;
        return {};
      } catch {
        return {};
      }
    } catch (err) {
      lastError = err;
      if (err instanceof BackendError) throw err;
      if (attempt >= attempts) {
        throw new RedmineUnavailable("Redmine unavailable");
      }
      await sleep(backoff * attempt * 1000);
    }
  }

  throw lastError instanceof Error ? lastError : new RedmineUnavailable("Redmine unavailable");
}
