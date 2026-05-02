import { printCliPerfHelpText, runSuiteRunner } from "./cli-benchmark-runner.mjs";

runSuiteRunner(process.argv.slice(2), process.stdout, "scripts/measure-cli-perf.mjs")
  .then((result) => {
    process.exitCode = result.exitCode;
    return result.exitCode;
  })
  .catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stderr.write(`${printCliPerfHelpText()}\n`);
    process.exitCode = 1;
    return 1;
  });
