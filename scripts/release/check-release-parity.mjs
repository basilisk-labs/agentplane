import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { assertReleaseParity } from "../lib/release-version-parity.mjs";

function parseArgs(argv) {
  const { flags } = parseScriptArgs(argv, { valueFlags: ["version"] });
  return { version: String(flags.version ?? "").trim() };
}

const main = defineCheck({
  name: "check-release-parity",
  parseArgs,
  async check({ options }) {
    const requiredVersion = options.version || undefined;
    const state = await assertReleaseParity(process.cwd(), { requiredVersion });
    process.stdout.write(
      `Release parity check passed (core=${state.coreVersion}, agentplane=${state.agentplaneVersion}, recipes=${state.recipesVersion}, coreDep=${String(
        state.coreDependency,
      )}, recipesDep=${String(state.recipesDependency)}, recipesRuntime=${String(
        state.recipesRuntimeVersion?.version,
      )}).\n`,
    );
  },
});

runScriptMain(main);
