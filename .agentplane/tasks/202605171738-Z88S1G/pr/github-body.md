Task: `202605171738-Z88S1G`
Title: Harden paths-filter checkout depth
Canonical task record: `.agentplane/tasks/202605171738-Z88S1G/README.md`

## Summary

Harden paths-filter checkout depth

Fix GitHub Actions dorny/paths-filter shallow fetch race on main push runs by ensuring changes jobs checkout full history before path filtering.

## Scope

- In scope: Fix GitHub Actions dorny/paths-filter shallow fetch race on main push runs by ensuring changes jobs checkout full history before path filtering.
- Out of scope: unrelated refactors not required for "Harden paths-filter checkout depth".

## Verification

- State: ok
- Note:

```text
Added fetch-depth: 0 to dorny/paths-filter changes jobs in Core CI, Docs CI, and Pre-publish
workflows. Local verification passed: targeted rg inspection, workflow command contract, policy
routing, and git diff --check. Remote PR checks will validate GitHub Actions behavior.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:41:23.606Z
- Branch: task/202605171738-Z88S1G/paths-filter-fetch-depth
- Head: 2821cb1d05a6

```text
 .../blueprint/resolved-snapshot.json               | 554 +++++++++++++++++++++
 .github/workflows/ci.yml                           |   1 +
 .github/workflows/docs-ci.yml                      |   2 +
 .github/workflows/prepublish.yml                   |   2 +
 4 files changed, 559 insertions(+)
```

</details>
