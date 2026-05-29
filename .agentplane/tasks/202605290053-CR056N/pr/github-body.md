Task: `202605290053-CR056N`
Title: Blueprint project-local decomposition
Canonical task record: `.agentplane/tasks/202605290053-CR056N/README.md`

## Summary

Blueprint project-local decomposition

Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint project-local decomposition".

## Verification

- State: ok
- Note:

```text
Verified project-local blueprint decomposition. Commands passed: project-local focused tests, bun
run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run
lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from
28 to 27; project-local.ts is below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T00:54:59.111Z
- Branch: task/202605290053-CR056N/blueprint-project-local-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/blueprints/project-local-files.ts          | 152 ++++++++
 .../src/blueprints/project-local-model.ts          | 111 ++++++
 .../src/blueprints/project-local-trust.ts          | 138 +++++++
 .../agentplane/src/blueprints/project-local.ts     | 417 +++------------------
 scripts/baselines/knip-baseline.json               |  55 ++-
 5 files changed, 484 insertions(+), 389 deletions(-)
```

</details>
