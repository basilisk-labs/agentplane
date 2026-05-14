#!/usr/bin/env node
import { runCli } from "./cli/run-cli.js";

void runCli(process.argv.slice(2)).then(
  (code) => {
    return (process.exitCode = code);
  },
  (err: unknown) => {
    const message = err instanceof Error ? (err.stack ?? err.message) : String(err);
    process.stderr.write(`${message}\n`);
    return (process.exitCode = 1);
  },
);
