export type { SupervisedProcessResult } from "./process-supervision/run.js";
export { runSupervisedProcess } from "./process-supervision/run.js";
export type { ObservedProcessIdentity } from "./process-supervision/signals.js";
export {
  exitCodeForSignal,
  isProcessAlive,
  readObservedProcessIdentity,
  waitForProcessExit,
} from "./process-supervision/signals.js";
export { waitForRunnerStateStop } from "./process-supervision/state.js";
