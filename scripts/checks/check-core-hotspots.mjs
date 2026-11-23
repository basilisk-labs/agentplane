import { main } from "./hotspot-report.mjs";

// `packages/core/src` was outside the 600-line module check. These modules already exceeded
// it when the check was extended (2026-11-23). The list is a ratchet: remove an entry when the
// module is split below the limit; never add one without a reviewed exception.
const CORE_OVERSIZED_ALLOWLIST = [
  "packages/core/src/config/schema.impl.ts",
  "packages/core/src/runner/execution-receipt.ts",
  "packages/core/src/runner/knowledge-ref.ts",
  "packages/core/src/runner/runner-effect-operation.ts",
  "packages/core/src/runner/supervisor-execution-episode.ts",
  "packages/core/src/tasks/task-artifact-schema.task.ts",
  "packages/core/src/tasks/task-centric/compatibility.ts",
  "packages/core/src/tasks/task-centric/graph.ts",
  "packages/core/src/tasks/task-kernel/kernel.ts",
  "packages/core/src/tasks/task-store.ts",
  "packages/core/src/tasks/tasks-export.ts",
];

process.exitCode = await main([
  "--check",
  "--runtime-dir",
  "packages/core/src",
  "--test-dir",
  "packages/core/src",
  "--warning-lines",
  "400",
  "--oversized-lines",
  "600",
  "--test-warning-lines",
  "1000",
  "--oversized-test-lines",
  "1300",
  ...CORE_OVERSIZED_ALLOWLIST.flatMap((file) => ["--allow-oversized", file]),
]);
