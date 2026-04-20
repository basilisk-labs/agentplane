import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = process.cwd();

function defaultScriptContext(name, argv) {
  return {
    name,
    argv,
    cwd: ROOT,
    stdout: process.stdout,
    stderr: process.stderr,
  };
}

export function defineScript({ name, run }) {
  if (!name) {
    throw new Error("defineScript requires a name");
  }
  if (typeof run !== "function") {
    throw new TypeError(`defineScript(${name}) requires a run function`);
  }
  return async function runDefinedScript(argv = process.argv.slice(2)) {
    await run(defaultScriptContext(name, argv));
  };
}

export function runScriptMain(main) {
  main().catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}

export function runBunx(args, options = {}) {
  const cwd = options.cwd ?? ROOT;
  return new Promise((resolve, reject) => {
    const child = spawn("bunx", args, {
      cwd,
      stdio: "inherit",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`bunx ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

export function resolveOutPathArg(argv, cwd, defaultPath) {
  const outIndex = argv.indexOf("--out");
  if (outIndex === -1) {
    return defaultPath;
  }
  return path.resolve(cwd, argv[outIndex + 1] ?? "");
}

export function parseCheckSyncMode(argv, scriptName) {
  const mode = argv[0];
  if (mode === "check" || mode === "sync") {
    return mode;
  }
  throw new Error(`Usage: node ${scriptName} <check|sync>`);
}

export function isDirectRun(importMetaUrl, argvEntry = process.argv[1]) {
  return (
    Boolean(argvEntry) && path.resolve(argvEntry) === path.resolve(fileURLToPath(importMetaUrl))
  );
}
