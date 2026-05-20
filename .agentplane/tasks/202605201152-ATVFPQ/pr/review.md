# PR Review

Created: 2026-05-20T11:53:03.337Z

## Task

- Task: `202605201152-ATVFPQ`
- Title: Define context wiki contract surface
- Status: DOING
- Branch: `task/202605201152-ATVFPQ/context-wiki-contract`
- Canonical task record: `.agentplane/tasks/202605201152-ATVFPQ/README.md`

## Verification

- State: ok
- Note: EVALUATOR quality gate passed. Evidence: local pre-push fast CI completed through format, schema freshness, policy routing, release parity, build, bundle build, CLI cold baseline, docs freshness, recipe inventory, scripts README, onboarding, hotspot threshold, vitest projects, lint, unit tests 321 files/1925 passed/2 skipped, and critical CLI chunks 5/5 passed before push. Hosted PR #3967 checks on head 0b158ea3a all passed: CodeQL, Core CI plan, verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, PR verification, Release-ready manifest, Docs CI docs, and change detection.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T12:28:22.962Z
- Branch: task/202605201152-ATVFPQ/context-wiki-contract
- Head: 0b158ea3a160

```text
 .agentplane/context/agentplane.context.yaml        |  23 ++
 .agentplane/context/policies/wiki.rules.md         |  47 ++-
 .../blueprint/resolved-snapshot.json               | 397 +++++++++++++++++++++
 context/wiki/AGENTS.md                             |   2 +
 .../src/commands/context/init-manifest.ts          |  97 +++++
 .../src/commands/context/init-wiki-policy.ts       |  49 +++
 packages/agentplane/src/commands/context/init.ts   |  88 +----
 7 files changed, 617 insertions(+), 86 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
