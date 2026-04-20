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

export function defineCheck({ name, parseArgs = (argv) => argv, check }) {
  if (typeof parseArgs !== "function") {
    throw new TypeError(`defineCheck(${name}) requires parseArgs to be a function`);
  }
  if (typeof check !== "function") {
    throw new TypeError(`defineCheck(${name}) requires check to be a function`);
  }
  return defineScript({
    name,
    async run(context) {
      const options = await parseArgs(context.argv, context);
      await check({ ...context, options });
    },
  });
}

function normalizeFlagToken(token, aliases) {
  if (token.startsWith("--")) {
    return token.slice(2);
  }
  if (token.startsWith("-")) {
    const alias = token.slice(1);
    return aliases[alias] ?? alias;
  }
  return null;
}

function parseBooleanFlagValue(value, flagName) {
  if (value === undefined) return true;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`Invalid boolean value for --${flagName}: ${value}`);
}

export function parseScriptArgs(
  argv,
  { valueFlags = [], booleanFlags = [], aliases = {}, allowUnknown = false } = {},
) {
  const valueFlagSet = new Set(valueFlags);
  const booleanFlagSet = new Set(booleanFlags);
  const flags = {};
  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const raw = argv[index] ?? "";
    if (raw === "--") {
      positionals.push(...argv.slice(index + 1));
      break;
    }
    if (!raw.startsWith("-") || raw === "-") {
      positionals.push(raw);
      continue;
    }

    const equalsIndex = raw.indexOf("=");
    const token = equalsIndex === -1 ? raw : raw.slice(0, equalsIndex);
    const inlineValue = equalsIndex === -1 ? undefined : raw.slice(equalsIndex + 1);
    const flagName = normalizeFlagToken(token, aliases);
    if (!flagName) {
      positionals.push(raw);
      continue;
    }

    if (valueFlagSet.has(flagName)) {
      const value = inlineValue ?? argv[index + 1];
      if (!value) {
        throw new Error(`Missing value for --${flagName}`);
      }
      flags[flagName] = value;
      if (inlineValue === undefined) {
        index += 1;
      }
      continue;
    }

    if (booleanFlagSet.has(flagName)) {
      flags[flagName] = parseBooleanFlagValue(inlineValue, flagName);
      continue;
    }

    if (allowUnknown) {
      positionals.push(raw);
      continue;
    }
    throw new Error(`unknown argument: ${raw}`);
  }

  return { flags, positionals };
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
