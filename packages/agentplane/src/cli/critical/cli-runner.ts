import { runCli } from "../run-cli.js";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const code = await runCli(argv);
  process.exitCode = code;
}

main().catch((err) => {
  // Last-resort fallback. The contract for tests is "exit non-zero and surface the error".
  const message = err instanceof Error ? (err.stack ?? err.message) : String(err);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
