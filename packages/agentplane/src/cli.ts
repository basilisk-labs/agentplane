#!/usr/bin/env node
import { runCli } from "./run-cli.js";

void runCli(process.argv.slice(2)).then((code) => {
  process.exit(code);
});
