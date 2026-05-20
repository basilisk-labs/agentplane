Task: `202605201152-ATVFPQ`
Title: Define context wiki contract surface
Canonical task record: `.agentplane/tasks/202605201152-ATVFPQ/README.md`

## Summary

Define context wiki contract surface

Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.

## Scope

- In scope: Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.
- Out of scope: unrelated refactors not required for "Define context wiki contract surface".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed. Evidence: local pre-push fast CI completed through format, schema
freshness, policy routing, release parity, build, bundle build, CLI cold baseline, docs freshness,
recipe inventory, scripts README, onboarding, hotspot threshold, vitest projects, lint, unit tests
321 files/1925 passed/2 skipped, and critical CLI chunks 5/5 passed before push. Hosted PR #3967
checks on head 0b158ea3a all passed: CodeQL, Core CI plan, verify-contract, verify-static,
verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, PR verification,
Release-ready manifest, Docs CI docs, and change detection.
```
- Canonical workflow state lives in the task README.

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
