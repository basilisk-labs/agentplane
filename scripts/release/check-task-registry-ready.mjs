import { checkTaskState } from "../checks/check-task-state.mjs";
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
    checkTaskState(process.cwd(), {
      releaseReady: true,
      ignoreReleaseTaskIds,
      allowActiveReleaseTask: flags["allow-active-release-task"] === true,
    });
  },
});

runScriptMain(main);
