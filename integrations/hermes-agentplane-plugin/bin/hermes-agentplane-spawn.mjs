#!/usr/bin/env node
import { spawnAgentplaneWorker } from "../src/index.mjs";

const context = parseArgs(process.argv.slice(2));
const child = spawnAgentplaneWorker(context, {
  agentplaneBinary: process.env.AGENTPLANE_BIN || "agentplane",
});

if (child.pid) {
  process.stdout.write(`${child.pid}\n`);
}

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

function parseArgs(args) {
  const context = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (!arg.startsWith("--")) {
      continue;
    }

    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for ${arg}.`);
    }

    context[toCamelCase(arg.slice(2))] = next;
    index += 1;
  }

  return context;
}

function toCamelCase(flag) {
  return flag.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
