import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { appendFileSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { digest } from "./contract.mjs";
import { runBrokerWorker } from "./broker-worker.mjs";
import {
  assertBrokerConfiguration,
  assertEffectiveBrokerConfiguration,
} from "./broker-configuration.mjs";
import { connectAppServer } from "./app-server-port.mjs";

// Provider authentication stays in the trusted harness. Every model-directed
// process is a separately restricted worker with no provider or oracle grants.
export async function createBrokeredAppServer({
  policyPath,
  codexBinary,
  cwd,
  env,
  timeoutMs = 5000,
  auditPath,
  offlineProvider,
  approvedConfigDigests,
  disabledPlugins = [],
}) {
  const policy = JSON.parse(readFileSync(policyPath, "utf8"));
  assert.equal(policy.network, "deny");
  assert.equal(policy.cwd, cwd);
  const harnessCwd = realpathSync(env.CODEX_HOME);
  for (const grant of [...policy.read_only, ...policy.writable])
    assert.ok(
      harnessCwd !== grant && !harnessCwd.startsWith(grant + path.sep),
      "Worker grant exposes managed runtime",
    );
  assertBrokerConfiguration({ cwd: harnessCwd, env, approvedConfigDigests });
  assert.ok(Number.isSafeInteger(timeoutMs) && timeoutMs > 0);
  assert.ok(path.isAbsolute(auditPath));
  const args = ["app-server", "--listen", "stdio://", "--strict-config"];
  for (const feature of ["hooks", "apps", "remote_plugin", "shell_tool", "unified_exec"])
    args.push("--disable", feature);
  args.push("-c", 'web_search="disabled"', "-c", "mcp_servers={}", "-c", "agents.enabled=false");
  for (const plugin of disabledPlugins) {
    assert.match(plugin, /^[a-zA-Z0-9_@.-]+$/u);
    args.push("-c", `plugins={${JSON.stringify(plugin)}={enabled=false}}`);
  }
  if (offlineProvider) {
    const url = new URL(offlineProvider);
    assert.equal(url.protocol, "http:");
    assert.equal(url.hostname, "127.0.0.1");
    args.push(
      "-c",
      `model_providers.m05_offline={name="m05_offline",base_url=${JSON.stringify(offlineProvider)},wire_api="responses",requires_openai_auth=false}`,
    );
  }
  const environment = Object.fromEntries(
    ["PATH", "HOME", "CODEX_HOME", "TMPDIR", "SSL_CERT_FILE", "SSL_CERT_DIR"]
      .filter((key) => typeof env?.[key] === "string")
      .map((key) => [key, env[key]]),
  );
  const child = spawn(codexBinary, args, {
    cwd: harnessCwd,
    env: environment,
    stdio: ["pipe", "pipe", "pipe"],
    detached: true,
  });
  let calls = 0;
  const deadline = Date.now() + timeoutMs;
  const tool = {
    name: "m05_exec",
    description:
      "Run a bounded command inside the native task filesystem scope. Network, credentials, oracle and host files are unavailable. Use an absolute executable path.",
    inputSchema: {
      type: "object",
      properties: { argv: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 64 } },
      required: ["argv"],
      additionalProperties: false,
    },
  };
  const record = (value) =>
    appendFileSync(auditPath, JSON.stringify(value) + "\n", { mode: 0o600 });
  const workerAbort = new AbortController();
  const port = await connectAppServer(child, {
    timeoutMs,
    threadOptions: async () => ({
      cwd: harnessCwd,
      environments: [],
      dynamicTools: [tool],
      ...(offlineProvider ? { modelProvider: "m05_offline" } : {}),
      config: { web_search: "disabled", mcp_servers: {}, "agents.enabled": false },
    }),
    turnOptions: async () => ({
      environments: [],
      sandboxPolicy: { type: "externalSandbox", networkAccess: "restricted" },
    }),
    serverRequest: async (event) => {
      assert.equal(event.method, "item/tool/call");
      assert.equal(event.params?.tool, "m05_exec");
      assert.ok(++calls <= 64, "Tool call bound exhausted");
      const argv = event.params.arguments?.argv;
      assert.ok(Array.isArray(argv) && argv.length > 0 && argv.length <= 64);
      assert.ok(argv.every((value) => typeof value === "string" && value.length <= 16_384));
      assert.ok(path.isAbsolute(argv[0]));
      const remaining = deadline - Date.now();
      assert.ok(remaining > 0, "Tool deadline exhausted");
      const binding = {
        call: calls,
        thread_id: event.params.threadId,
        turn_id: event.params.turnId,
        call_id: event.params.callId,
        command_digest: digest(argv),
        policy_digest: digest(policy),
      };
      record({ ...binding, state: "intent", at: Date.now() });
      const output = await runBrokerWorker(policyPath, argv, {
        timeout: Math.min(remaining, 10_000),
        signal: workerAbort.signal,
      });
      record({
        ...binding,
        state: "result",
        at: Date.now(),
        result_digest: digest(output),
        status: output.status,
        signal: output.signal,
        error: output.error,
      });
      return {
        contentItems: [{ type: "inputText", text: JSON.stringify(output) }],
        success: output.status === 0 && output.error === null,
      };
    },
  });
  const qualifyConfiguration = async () => {
    assertBrokerConfiguration({ cwd: harnessCwd, env, approvedConfigDigests });
    assertEffectiveBrokerConfiguration(
      await port.request("config/read", { includeLayers: true, cwd: harnessCwd }),
      disabledPlugins,
    );
  };
  try {
    await qualifyConfiguration();
  } catch (error) {
    await port.close();
    throw error;
  }
  return {
    ...port,
    request: async (method, params) => {
      if (method === "thread/start" || method === "turn/start") await qualifyConfiguration();
      return port.request(method, params);
    },
    close: async () => {
      workerAbort.abort();
      await port.close();
    },
  };
}
