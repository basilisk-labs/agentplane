import { runCli } from "../run-cli.ts";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const code = await runCli(argv);
  process.exitCode = code;
}

main().catch((err) => {
  // Last-resort fallback. The contract for tests is "exit non-zero and surface the error".
  console.error(err);
  process.exitCode = 1;
});
