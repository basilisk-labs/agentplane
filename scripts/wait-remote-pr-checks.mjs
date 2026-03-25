import { spawn } from "node:child_process";

const REQUIRED_FLAGS = ["--watch", "--required", "--fail-fast"];

function usage() {
  process.stdout.write(
    [
      "Usage: bun run workflow:wait-remote-checks -- [<number>|<url>|<branch>] [gh-pr-checks-flags]",
      "",
      "Wait for required GitHub PR checks before integrate/finish in branch_pr workflow.",
      "This wrapper delegates to: gh pr checks ... --watch --required --fail-fast",
      "",
      "Examples:",
      "  bun run workflow:wait-remote-checks",
      "  bun run workflow:wait-remote-checks -- task/202603241919-QVGXZ5/remote-check-wait",
      "  bun run workflow:wait-remote-checks -- 123 --repo basilisk-labs/agentplane",
    ].join("\n"),
  );
}

function buildGhArgs(argv) {
  const forwarded = [...argv];
  for (const flag of REQUIRED_FLAGS) {
    if (!forwarded.includes(flag)) forwarded.push(flag);
  }
  return ["pr", "checks", ...forwarded];
}

function runGh(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("gh", args, {
      cwd: process.cwd(),
      stdio: "inherit",
      env: process.env,
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`gh pr checks terminated by signal ${signal}`));
        return;
      }
      resolve(code ?? 1);
    });
  });
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    usage();
    return;
  }

  try {
    const exitCode = await runGh(buildGhArgs(argv));
    process.exitCode = exitCode;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      process.stderr.write(
        [
          "error: Missing required gh CLI.",
          "Install GitHub CLI and authenticate before waiting for remote checks.",
        ].join("\n") + "\n",
      );
      process.exitCode = 1;
      return;
    }
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}

await main();
