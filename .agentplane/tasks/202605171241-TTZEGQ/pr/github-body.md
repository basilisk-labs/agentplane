Task: `202605171241-TTZEGQ`
Title: Harden release platform publication guidance
Canonical task record: `.agentplane/tasks/202605171241-TTZEGQ/README.md`

## Summary

Harden release platform publication guidance

Update AgentPlane release guidance so agents verify every publication platform and cannot treat external distribution handoffs as completed releases without evidence.

## Scope

- In scope: Update AgentPlane release guidance so agents verify every publication platform and cannot treat external distribution handoffs as completed releases without evidence.
- Out of scope: unrelated refactors not required for "Harden release platform publication guidance".

## Verification

- State: ok
- Note:

```bash
bun run test:project -- agentplane \
  packages/agentplane/src/commands/release/audit-platform-publication-script.test.ts \
  packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts \
  packages/agentplane/src/commands/release/publish-workflow-contract.test.ts | Result: pass | \
  Evidence: 3 files, 16 tests passed. Command: bun run docs:scripts:check | Result: pass | Evidence: \
  scripts/README.md up to date. Command: node .agentplane/policy/check-routing.mjs | Result: pass | \
  Evidence: policy routing OK. Command: ap doctor | Result: pass with existing warnings | Evidence: \
  doctor OK, warnings are pre-existing hook/runtime/branch_pr reconciliation drift outside this \
  task.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T12:49:12.637Z
- Branch: task/202605171241-TTZEGQ/release-platform-evidence
- Head: 81baff4874e3

```text
 .../blueprint/resolved-snapshot.json               | 416 +++++++++++++++++++++
 .github/workflows/publish.yml                      |   2 +
 docs/developer/release-and-publishing.mdx          |  11 +
 package.json                                       |   1 +
 .../audit-platform-publication-script.test.ts      | 138 +++++++
 .../release/publish-workflow-contract.test.ts      |   2 +
 .../write-publish-result-manifest-script.test.ts   |  17 +
 scripts/README.md                                  |   1 +
 scripts/audit-platform-publication.mjs             |   1 +
 scripts/release/audit-platform-publication.mjs     | 162 ++++++++
 scripts/release/manifest.mjs                       |  14 +
 .../SKILL.md                                       |  55 ++-
 12 files changed, 818 insertions(+), 2 deletions(-)
```

</details>
