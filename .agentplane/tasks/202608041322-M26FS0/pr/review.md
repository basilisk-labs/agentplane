# PR Review

Created: 2026-08-04T13:24:55.578Z

## Task

- Task: `202608041322-M26FS0`
- Title: Stabilize hosted release evidence closeout
- Status: DONE
- Branch: `task/202608041322-M26FS0/stabilize-hosted-release-evidence-closeout`
- Canonical task record: `.agentplane/tasks/202608041322-M26FS0/README.md`

## Verification

- State: ok
- Note: 0.7.3 hosted closeout and qualification provenance verified
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-04T13:26:21.628Z
- Branch: task/202608041322-M26FS0/stabilize-hosted-release-evidence-closeout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .agentplane/tasks/202608041057-WZRXEX/README.md    |   8 +-
 .github/workflows/publish.yml                      |  86 ++++--
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
 ...un-cli.core.route-decision.verification.test.ts |   2 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  16 +-
 ...cli.critical.agent-efficiency-candidate.test.ts |  63 +++-
 .../release/publish-workflow-contract.test.ts      |  36 ++-
 .../release/release-task-evidence-script.test.ts   |  61 +++-
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../src/commands/task/close-tail-state.test.ts     |  69 +++++
 .../src/commands/task/close-tail-state.ts          |  45 ++-
 .../agentplane/src/commands/task/finish-execute.ts |   1 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 packages/testkit/src/cli-harness.ts                |  20 +-
 .../baselines/v0.7-compatibility-candidate.json    |   8 +-
 .../bench/capture-agent-efficiency-candidate.mjs   | 332 ++++++++++++++++----
 .../check-compatibility-contract-baseline.mjs      |   8 +-
 .../check-v0.7.1-efficiency-evidence.mjs           |  46 ++-
 scripts/qualification/release-qualification.mjs    |  73 +++++
 .../qualification/release-qualification.test.mjs   |  85 +++++-
 .../run-v0.7.1-release-qualification.mjs           |  49 ++-
 .../v0.7.1-release-qualification.json              |  14 +-
 scripts/release/release-task-evidence.mjs          |   7 -
 website/static/img/social/docs/releases/v0.7.3.png | Bin 0 -> 53092 bytes
 website/static/img/social/manifest.json            |   8 +
 46 files changed, 1281 insertions(+), 200 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
