import { printCliPerfHelpText, runSuiteRunner } from "./cli-benchmark-runner.mjs";

const args = process.argv.slice(2);
if (!args.includes("--suite")) {
  args.push("--suite", "cli-cold-path");
}

runSuiteRunner(args, process.stdout, "scripts/measure-cli-cold-path.mjs")
  .then((result) => {
    process.exitCode = result.exitCode;
    return result.exitCode;
  })
  .catch((error) => {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stderr.write(
      `${printCliPerfHelpText({ scriptName: "scripts/measure-cli-cold-path.mjs" })}\n`,
    );
    process.exitCode = 1;
    return 1;
  });
