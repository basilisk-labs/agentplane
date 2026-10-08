import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const landlockRunner = fileURLToPath(new URL("landlock-runner.py", import.meta.url));

// These are read-only runtime paths, not repository or home-directory grants.
export function runtimeReadPaths() {
  return [
    ...new Set(
      [
        "/usr",
        "/lib",
        "/lib64",
        "/etc/ld.so.cache",
        "/etc/ssl/openssl.cnf",
        "/dev/null",
        "/dev/urandom",
        process.execPath,
      ]
        .filter(existsSync)
        .map((p) => realpathSync(p)),
    ),
  ];
}
export function writeIsolationPolicy(file, { cwd, readOnly, writable = [], network = "deny" }) {
  assert.ok(["deny", "provider"].includes(network));
  const canonical = (p) => {
    const absolute = path.resolve(p);
    assert.equal(realpathSync(absolute), absolute, "Noncanonical isolation path");
    assert.notEqual(absolute, "/", "Root access is not an isolation boundary");
    return absolute;
  };
  const policy = {
    cwd: canonical(cwd),
    read_only: [...new Set([...runtimeReadPaths(), ...readOnly.map((p) => canonical(p))])],
    writable: writable.map((p) => canonical(p)),
    network,
  };
  writeFileSync(file, `${JSON.stringify(policy)}\n`, { flag: "wx", mode: 0o600 });
  return policy;
}
export function isolatedCommand(policyPath, command) {
  assert.ok(path.isAbsolute(command[0]), "Use a pinned absolute executable");
  return ["-I", landlockRunner, path.resolve(policyPath), ...command];
}
export function runIsolated(policyPath, command, options = {}) {
  // The unrestricted host enforces the finite subprocess deadline. Restricted
  // descendants cannot signal unrelated host processes or open host IPC sockets.
  return spawnSync("python3", isolatedCommand(policyPath, command), {
    ...options,
    env: { PATH: "/usr/bin:/bin", LANG: "C.UTF-8", TZ: "UTC" },
    encoding: "utf8",
    timeout: options.timeout ?? 5000,
    maxBuffer: 1024 * 1024,
  });
}
