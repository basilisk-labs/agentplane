# RF-10a Verification Details

Verified implementation SHA: `40ea12e7f`.

## 1. Direct golden path

Command: `node packages/agentplane/bin/agentplane.js task run 202607290635-2E05TJ --sandbox danger-full-access --allow-danger-full-access --json`

Result: pass. The direct task reached `status=finalized` and `phase=finalized` with the terminal `done` route.

Evidence:

- Runner receipt: `.agentplane/cache/rf10-live-handoff-NOmXrZ/.git/agentplane/runner/tasks/202607290635-2E05TJ/runs/2026-07-29T06-35-24-940Z/execution-receipt.json`
- Supervisor journal: `.agentplane/cache/rf10-live-handoff-NOmXrZ/.git/agentplane/supervisor/episodes/202607290635-2E05TJ/journal.json`
- Final task evidence: `.agentplane/cache/rf10-live-handoff-NOmXrZ/.agentplane/tasks/202607290635-2E05TJ/supervision/implementation-evidence.json`
- EVALUATOR pass: `.agentplane/cache/rf10-live-handoff-NOmXrZ/.agentplane/tasks/202607290635-2E05TJ/quality/20260729-063649494-recovery-context/evaluator-result.json`

Observed metrics: `provider_episodes=2`, `executor_lifecycle_event_delta=0`, `declared_checks=2`, `lifecycle_calls=3`, `tool_calls=4`, and `duplicate_executor_context_bytes=15074`.

Scope: Verify step 1. The EXECUTOR returned a semantic result and committed only `docs/benchmark-docs-bounded-evaluator-final.md`; the parent CLI performed verification, EVALUATOR invocation, and finalization.

## 2. Formal docs checks and repository classification

Command: direct supervisor declared checks for task `202607290635-2E05TJ`.

Result: pass. `node .agentplane/policy/check-routing.mjs` exited 0 and `agentplane doctor` exited 0 through the active package binary.

Evidence: `.agentplane/cache/rf10-live-handoff-NOmXrZ/.agentplane/tasks/202607290635-2E05TJ/supervision/declared-checks.json`.

Scope: Verify steps 1 and 2. The implementation evidence records committed and staged diff checks, the authorized committed path, and a per-line classification of all pre-existing fixture artifacts; no concurrent artifact was attributed to the EXECUTOR.

## 3. Bounded EVALUATOR process tree

Command: `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts && bun run typecheck`

Result: pass (24 tests). The timeout test proves that a read-only evaluator runs in its own process group and that a 120000ms timeout sends `SIGKILL` to the whole group; the stdin failure path still falls back to the direct child.

Evidence: `packages/agentplane/src/commands/evaluator/evaluator-episode.stdin.test.ts` and `packages/agentplane/src/commands/evaluator/evaluator-episode.ts`.

Scope: Verify step 3. A hung provider cannot leave an inherited-pipe launcher process holding the direct supervisor indefinitely.

## 4. Efficiency comparison

Command: compare the finalized direct trace metrics with `scripts/baselines/agent-efficiency-pre-v0.7-replay.json` and run `bun run ci:contract`.

Result: pass. The frozen v0.6.24 direct baseline is `lifecycle_calls=7`, `tool_calls=7`, and `duplicate_input_bytes=20562`; the observed finalized direct trace is `3`, `4`, and `15074` respectively. Verified success and the zero EXECUTOR lifecycle-event delta are preserved.

Evidence: `scripts/baselines/agent-efficiency-pre-v0.7-replay.json`, `scripts/bench/agent-efficiency-replay-evidence/direct/run-01.json`, and the finalized supervisor journal cited above.

Scope: Verify step 4. All three measured cost dimensions are lower than the frozen baseline without relaxing the success or lifecycle-ownership checks.

## 5. Full repository gates

Command: `bun run ci:contract && bun run coverage:workflow-suite && bun run lifecycle:invariants && bun run test:critical`

Result: pass at `40ea12e7f`.

Evidence: contract CI completed including the 10-scenario RF-04 structural baseline and 50-run/70-outcome replay baseline; workflow coverage passed 52 tests; lifecycle invariants passed; all 11 critical-cli chunks passed.

Scope: Verify step 5. This includes formatting, schemas, policy routing, agent-efficiency replay, architecture, lint, clone baseline, and coverage threshold gates.
