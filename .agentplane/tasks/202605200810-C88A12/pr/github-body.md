Task: `202605200810-C88A12`
Title: Gate release-ready manifest on task registry
Canonical task record: `.agentplane/tasks/202605200810-C88A12/README.md`

## Summary

Gate release-ready manifest on task registry

Make Core CI release-ready artifact fail closed when task registry is not release-ready, so Publish release does not discover pre-close DOING task races first.

## Scope

- In scope: Make Core CI release-ready artifact fail closed when task registry is not release-ready, so Publish release does not discover pre-close DOING task races first.
- Out of scope: unrelated refactors not required for "Gate release-ready manifest on task registry".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed for implementation commit 55d3669a. Evidence covers ready and DOING
task-registry manifest behavior, JSON stdout cleanliness, lint, typecheck, policy routing, and
doctor. Residual warning is unrelated pre-existing untracked DONE archive 202605200640-7AXZRX.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T08:14:48.483Z
- Branch: task/202605200810-C88A12/release-ready-task-registry
- Head: 55d3669a2595

```text
 .../blueprint/resolved-snapshot.json               | 455 +++++++++++++++++++++
 .../release/release-ready-manifest-script.test.ts  | 114 ++++++
 scripts/checks/check-task-state.mjs                |   4 +-
 scripts/release/manifest.mjs                       |  46 ++-
 4 files changed, 610 insertions(+), 9 deletions(-)
```

</details>
