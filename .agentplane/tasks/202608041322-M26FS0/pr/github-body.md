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

- State: ok
- Note:

```bash
node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full \
  --provider --provider-evidence-subject 4d529ff0fa594fcf9cece44b56dd402b84e7f44c --subject \
  74cb0b80ae7a8447032d7b88bba607be9002f872; bun run release:prepublish
```
Result: pass
Evidence: .agentplane/tasks/202608041322-M26FS0/evidence/v0.7.3-qualification-74cb0b80/report.json (ready 18/19, 0 blocking); prepublish passed 101/101 release-ci-base, 50/50 workflow, 204/204 significant, 16/16 release-critical, package install and 8/8 migrations
Scope: pre-merge Verify Steps 1-3 on semantic target 74cb0b80; b17caf97 is task-artifact-only refresh; postpublish Verify Steps 4-5 remain hosted closeout gates
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
 scripts/qualification/release-qualification.mjs    |  81 +++++
 .../qualification/release-qualification.test.mjs   |  89 +++++-
 .../run-v0.7.1-release-qualification.mjs           |  49 ++-
 .../v0.7.1-release-qualification.json              |  14 +-
 scripts/release/release-task-evidence.mjs          |   7 -
 website/static/img/social/docs/releases/v0.7.3.png | Bin 0 -> 53092 bytes
 website/static/img/social/manifest.json            |   8 +
 46 files changed, 1296 insertions(+), 200 deletions(-)
```

</details>
