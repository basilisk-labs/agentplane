import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { isolatedCommand } from "./isolation.mjs";

// Only the trusted host constructs this port. The Python launcher installs the
// inherited boundary before exec; externalSandbox does not replace enforcement.
export async function createIsolatedAppServer({
  policyPath,
  codexBinary,
  cwd,
  env,
  timeoutMs = 5000,
}) {
  const isolation = JSON.parse(readFileSync(policyPath, "utf8"));
  assert.ok(["deny", "provider"].includes(isolation.network));
  assert.ok(Number.isSafeInteger(timeoutMs) && timeoutMs > 0);
  const environment = Object.fromEntries(
    ["PATH", "HOME", "CODEX_HOME", "TMPDIR", "SSL_CERT_FILE", "SSL_CERT_DIR"]
      .filter((key) => typeof env?.[key] === "string")
      .map((key) => [key, env[key]]),
  );
  const child = spawn(
    "python3",
    isolatedCommand(policyPath, [
      codexBinary,
      "app-server",
      "--listen",
      "stdio://",
      "--disable",
      "hooks",
      "--disable",
      "apps",
      "--disable",
      "remote_plugin",
    ]),
    { cwd, env: environment, stdio: ["pipe", "pipe", "pipe"], detached: true },
  );
  return connectAppServer(child, {
    cwd,
    timeoutMs,
    threadOptions: async () => ({ cwd, sandbox: "read-only" }),
    turnOptions: async () => ({
      sandboxPolicy: {
        type: "externalSandbox",
        networkAccess: isolation.network === "deny" ? "restricted" : "enabled",
      },
    }),
  });
}

export async function connectAppServer(
  child,
  { timeoutMs, serverRequest, threadOptions, turnOptions },
) {
  child.stderr.resume();
  const pending = new Map();
  const listeners = new Set();
  let id = 0;
  let fatal;
  const send = (message) => child.stdin.write(`${JSON.stringify(message)}\n`);
  const fail = (error) => {
    fatal = error;
    for (const entry of pending.values()) {
      clearTimeout(entry.timer);
      entry.reject(error);
    }
    pending.clear();
  };
  child.on("error", fail);
  child.on("exit", (code) => fail(new Error(`Restricted app-server exited (${code})`)));
  const lines = createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    try {
      const event = JSON.parse(line);
      if (event.id === undefined) {
        for (const listener of listeners) listener(event);
      } else {
        if (event.method) {
          if (serverRequest) {
            Promise.resolve()
              .then(() => serverRequest(event))
              .then(
                (result) => send({ id: event.id, result }),
                () =>
                  send({ id: event.id, error: { code: -32_601, message: "Host request denied" } }),
              )
              .catch(fail);
          } else
            send({
              id: event.id,
              error: { code: -32_601, message: "No host approval or tool authority on this port" },
            });
          return;
        }
        const entry = pending.get(event.id);
        if (!entry) return;
        pending.delete(event.id);
        clearTimeout(entry.timer);
        if (event.error) entry.reject(new Error("App-server request rejected"));
        else entry.resolve(event.result);
      }
    } catch (error) {
      fail(error);
    }
  });
  function request(method, params) {
    if (fatal) return Promise.reject(fatal);
    const requestId = ++id;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(requestId);
        reject(new Error("App-server response deadline expired"));
      }, timeoutMs);
      pending.set(requestId, { resolve, reject, timer });
      send({ id: requestId, method, params });
    });
  }
  async function close() {
    fail(new Error("App-server port closed"));
    lines.close();
    child.stdin.destroy();
    if (child.exitCode === null) {
      try {
        process.kill(-child.pid, "SIGTERM");
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
    await new Promise((resolve) => {
      if (child.exitCode !== null) {
        resolve();
        return;
      }
      const timer = setTimeout(() => {
        try {
          process.kill(-child.pid, "SIGKILL");
        } catch (error) {
          if (error.code !== "ESRCH") throw error;
        }
        resolve();
      }, 1000);
      child.once("exit", () => {
        clearTimeout(timer);
        resolve();
      });
    });
  }
  try {
    await request("initialize", {
      clientInfo: { name: "agentplane_m05_subscription", version: "4" },
      capabilities: { experimentalApi: true },
    });
    send({ method: "initialized", params: {} });
  } catch (error) {
    await close();
    throw error;
  }
  return {
    request,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    close,
    threadOptions,
    turnOptions,
  };
}
