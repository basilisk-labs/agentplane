import assert from "node:assert/strict";
import {
  constants,
  closeSync,
  existsSync,
  fstatSync,
  openSync,
  readSync,
  realpathSync,
} from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

// Reviewed configuration is host authority, never campaign/model input. Auth
// storage is not inspected. Unknown config layers stop before process startup.
export function assertBrokerConfiguration({ cwd, env, approvedConfigDigests = {} }) {
  assert.ok(path.isAbsolute(env?.CODEX_HOME ?? ""), "Explicit managed runtime required");
  assert.ok(path.isAbsolute(env?.HOME ?? ""), "Explicit managed home required");
  const files = new Set([
    path.join(env.CODEX_HOME, "config.toml"),
    path.join(env.HOME, ".codex", "config.toml"),
    "/etc/codex/config.toml",
    "/etc/codex/managed_config.toml",
  ]);
  for (let directory = realpathSync(cwd); ; directory = path.dirname(directory)) {
    files.add(path.join(directory, ".codex", "config.toml"));
    if (directory === path.dirname(directory)) break;
  }
  const bindings = [];
  for (const file of files) {
    if (!existsSync(file)) {
      assert.ok(!Object.hasOwn(approvedConfigDigests, file), "Reviewed configuration missing");
      continue;
    }
    assert.ok(Object.hasOwn(approvedConfigDigests, file), "Unreviewed ambient configuration");
    const fd = openSync(file, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
    let actual;
    try {
      const stat = fstatSync(fd);
      assert.ok(stat.isFile() && stat.size <= 1024 * 1024, "Invalid configuration file");
      const bytes = Buffer.alloc(stat.size + 1);
      let length = 0;
      while (length < bytes.length) {
        const count = readSync(fd, bytes, length, bytes.length - length, length);
        if (count === 0) break;
        length += count;
      }
      const after = fstatSync(fd);
      assert.ok(
        length === stat.size && after.size === stat.size && after.mtimeMs === stat.mtimeMs,
        "Configuration changed while binding",
      );
      actual = `sha256:${createHash("sha256").update(bytes.subarray(0, length)).digest("hex")}`;
    } finally {
      closeSync(fd);
    }
    assert.equal(actual, approvedConfigDigests[file], "Reviewed configuration changed");
    bindings.push({ path: file, digest: actual });
  }
  return bindings;
}

export function assertEffectiveBrokerConfiguration(result, disabledPlugins = []) {
  const config = result.config;
  assert.ok(config && Array.isArray(result.layers), "Effective configuration evidence required");
  for (const layer of result.layers)
    assert.ok(
      ["sessionFlags", "user", "system"].includes(layer.name?.type),
      "Unqualified managed or project configuration layer",
    );
  assert.deepEqual(config.mcp_servers ?? {}, {}, "MCP is not allowed in the provider harness");
  for (const [name, plugin] of Object.entries(config.plugins ?? {})) {
    assert.ok(disabledPlugins.includes(name), "Unreviewed plugin configuration");
    assert.equal(plugin.enabled, false, "Plugin remains enabled");
  }
  assert.ok(!config.notify || config.notify.length === 0, "Notification commands are not allowed");
  for (const feature of ["hooks", "apps", "remote_plugin", "shell_tool", "unified_exec"])
    assert.equal(config.features?.[feature], false, "Unexpected executable capability");
  assert.equal(config.agents?.enabled, false);
  assert.equal(config.web_search, "disabled");
}
