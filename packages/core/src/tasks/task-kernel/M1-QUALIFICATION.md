# M1 kernel qualification receipt

- Task: `202608292032-1K47B8`.
- WorkItem: `requalify-isolated-kernel`.
- Output: `m1-kernel-qualification-receipt`.
- Qualified implementation: `e381232abf9f5dd613ec048c592a0b4e9ccecdb2`.
- Supervisor evidence commit: `4f7192396`.

## Result

The isolated canonical kernel and the verification environment regression pass
local qualification. The kernel model, reducer, authority checks, effect
invariants, transition vectors, and import boundary remain intact.

The preceding WorkItem, `isolate-supervisor-verification-environment`, is
recorded as `COMPLETED` with passing deterministic evidence and output manifest
`verification-child-environment-isolation`.

## Supervisor evidence

The supervisor ran the following declared checks through the environment used
by `runShellCommand`. Every command returned exit code zero.

| Command                                                                                                           | Result                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `bun run arch:check`                                                                                              | Passed; no dependency violations.                                                                                          |
| `bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel/model.test.ts`                  | Passed.                                                                                                                    |
| `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts` | Passed; helper and actual subprocess isolation.                                                                            |
| `bun run ci:local:full`                                                                                           | Passed; complete local regression, including type, architecture, fast suites, documentation, platform, and coverage gates. |

Evidence paths, relative to the repository root:

- `.agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json`
- `.agentplane/tasks/202608292032-1K47B8/supervision/implementation-evidence.json`
- `.agentplane/tasks/202608292032-1K47B8/README.md`

## Focused requalification

`bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-kernel packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts`

Result: four files and 26 tests passed. The subprocess regression confirms that
repository dotenv values, the dotenv marker, and runtime handoff state are not
forwarded. Explicit inherited values and the parent environment are preserved.

## Remaining delivery gates

This receipt establishes local qualification, not hosted delivery. Independent
evaluation, exact-head hosted checks, merge, and hosted task closure must still
be completed by AgentPlane. No release or publication readiness is implied.
