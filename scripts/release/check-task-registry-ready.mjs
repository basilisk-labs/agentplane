import { checkTaskState } from "../checks/check-task-state.mjs";
import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";

const main = defineScript({
  name: "check-task-registry-ready",
  async run() {
    checkTaskState(process.cwd(), { releaseReady: true });
  },
});

runScriptMain(main);
