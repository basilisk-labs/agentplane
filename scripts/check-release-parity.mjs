import { assertReleaseParity } from "./lib/release-version-parity.mjs";

function parseArgs(argv) {
  const out = { version: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i] ?? "";
    if (arg === "--version") {
      out.version = String(argv[i + 1] ?? "").trim();
      i += 1;
    }
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const requiredVersion = args.version || undefined;
  const state = await assertReleaseParity(process.cwd(), { requiredVersion });
  process.stdout.write(
    `Release parity check passed (core=${state.coreVersion}, agentplane=${state.agentplaneVersion}, dep=${String(
      state.coreDependency,
    )}).\n`,
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
