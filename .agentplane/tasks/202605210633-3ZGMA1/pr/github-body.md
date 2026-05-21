Task: `202605210633-3ZGMA1`
Title: Fix README stale run examples
Canonical task record: `.agentplane/tasks/202605210633-3ZGMA1/README.md`

## Summary

Fix README stale run examples

Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.

## Scope

- In scope: Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.
- Out of scope: unrelated refactors not required for "Fix README stale run examples".

## Verification

- State: ok
- Note:

```text
Post-commit quality gate pass for HEAD 706bd5839: README-only behavior change matches approved
scope, stale public README run/trace/yaml examples are absent across README files, and required docs
checks passed. Residual gap remains broader non-README docs with historical run/trace references,
outside this task scope.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T06:40:22.990Z
- Branch: task/202605210633-3ZGMA1/readme-cli-drift
- Head: 706bd5839dad

```text
 .../blueprint/resolved-snapshot.json               | 402 +++++++++++++++++++++
 README.md                                          |  45 ++-
 2 files changed, 424 insertions(+), 23 deletions(-)
```

</details>
