#!/usr/bin/env node
import { runCli } from "./cli/run-cli.js";

void runCli(process.argv.slice(2)).then((code) => {
  process.exit(code);
});
