Task: `202608041322-M26FS0`
Title: Stabilize hosted release evidence closeout
Canonical task record: `.agentplane/tasks/202608041322-M26FS0/README.md`

## Summary

Stabilize hosted release evidence closeout

Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.

## Scope

- In scope: Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.
- Out of scope: unrelated refactors not required for "Stabilize hosted release evidence closeout".

## Verification

- State: needs_rework
- Note:

```text
Matched CLI latency gate is not repeatable under transient host contention; aggregate medians pass
while command-level p95 failures change between runs.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-04T13:26:21.628Z
- Branch: task/202608041322-M26FS0/stabilize-hosted-release-evidence-closeout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .agentplane/tasks/202608041057-WZRXEX/README.md    |   8 +-
 .github/workflows/publish.yml                      |  89 ++++--
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/releases/v0.7.3.md                            |  28 ++
 packages/agentplane/package.json                   |   6 +-
 .../run-cli.core.release-evidence-route.test.ts    | 337 +++++++++++++++++++++
 .../run-cli.core.route-decision.quality.test.ts    |   9 +-
 ...un-cli.core.route-decision.verification.test.ts |  32 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  16 +-
 ...cli.critical.agent-efficiency-candidate.test.ts |  63 +++-
 ...critical.agent-efficiency-replay-driver.test.ts |   6 +
 ...tical.agent-efficiency-replay-hardening.test.ts |   2 +
 ...un-cli.critical.agent-efficiency-replay.test.ts |   9 +-
 .../release/publish-workflow-contract.test.ts      |  36 ++-
 .../release/release-task-evidence-script.test.ts   |  61 +++-
 .../route-decision-blockers.quality-review.test.ts |   5 +-
 .../src/commands/shared/route-decision-blockers.ts |  41 +--
 .../route-decision-blockers.worktree.test.ts       |  27 ++
 .../shared/route-decision-verification.test.ts     |   4 +
 .../commands/shared/route-decision-verification.ts |  23 ++
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../commands/shared/task-verification-records.ts   |  24 +-
 .../src/commands/task/close-tail-state.test.ts     |  69 +++++
 .../src/commands/task/close-tail-state.ts          |  45 ++-
 .../agentplane/src/commands/task/finish-execute.ts |   3 +-
 .../task/finish.pre-merge-closure.unit.test.ts     |  30 ++
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 packages/testkit/src/cli-harness.ts                |  20 +-
 .../baselines/v0.7-compatibility-candidate.json    |   8 +-
 .../bench/capture-agent-efficiency-candidate.mjs   | 335 ++++++++++++++++----
 scripts/bench/capture-agent-efficiency-replay.mjs  |   3 +
 .../internal/agent-efficiency-codex-runtime.mjs    |  33 +-
 .../bench/run-agent-efficiency-codex-replay.mjs    |   3 +
 .../check-compatibility-contract-baseline.mjs      |   8 +-
 scripts/lib/agent-efficiency-replay-safety.mjs     |   1 +
 scripts/lib/agent-efficiency-replay.mjs            |   2 +
 .../check-v0.7.1-efficiency-evidence.mjs           |  46 ++-
 .../measure-v0.7.1-matched-cli-latency.mjs         | 139 +++++++--
 scripts/qualification/release-qualification.mjs    |  81 +++++
 .../qualification/release-qualification.test.mjs   | 152 +++++++++-
 .../run-v0.7.1-release-qualification.mjs           |  57 +++-
 .../v0.7.1-release-qualification.json              |  14 +-
 scripts/release/release-task-evidence.mjs          |   7 -
 website/static/img/social/docs/releases/v0.7.3.png | Bin 0 -> 53092 bytes
 website/static/img/social/manifest.json            |   8 +
 63 files changed, 1658 insertions(+), 305 deletions(-)
```

</details>
