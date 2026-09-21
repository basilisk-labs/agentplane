import { checkTaskState } from "../checks/check-task-state.mjs";
import { loadValidatedReleaseScopeExclusions } from "../lib/release-scope-exclusions.mjs";
import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const main = defineScript({
  name: "check-task-registry-ready",
  async run({ argv }) {
    const { flags } = parseScriptArgs(argv, {
      valueFlags: ["ignore-release-task"],
      booleanFlags: ["allow-active-release-task"],
    });
    const ignoreReleaseTaskIds = Array.isArray(flags["ignore-release-task"])
      ? flags["ignore-release-task"]
      : typeof flags["ignore-release-task"] === "string"
        ? [flags["ignore-release-task"]]
        : [];
    const releaseScope = loadValidatedReleaseScopeExclusions(process.cwd());
    checkTaskState(process.cwd(), {
      releaseReady: true,
      ignoreReleaseTaskIds,
      validatedReleaseScopeTaskIds: releaseScope.taskIds,
      allowActiveReleaseTask: flags["allow-active-release-task"] === true,
    });
    if (releaseScope.exclusions.length > 0) {
      process.stdout.write(
        `accepted release scope exclusions: ${releaseScope.exclusions
          .map((entry) => `${entry.taskId} (${entry.evidenceKind} at ${entry.gitRef})`)
          .join(", ")}\n`,
      );
    }
  },
});

runScriptMain(main);
