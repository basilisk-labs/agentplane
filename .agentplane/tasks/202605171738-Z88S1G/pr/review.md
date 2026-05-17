# PR Review

Created: 2026-05-17T17:39:54.087Z

## Task

- Task: `202605171738-Z88S1G`
- Title: Harden paths-filter checkout depth
- Status: DOING
- Branch: `task/202605171738-Z88S1G/paths-filter-fetch-depth`
- Canonical task record: `.agentplane/tasks/202605171738-Z88S1G/README.md`

## Verification

- State: ok
- Note: Added fetch-depth: 0 to dorny/paths-filter changes jobs in Core CI, Docs CI, and Pre-publish workflows. Local verification passed: targeted rg inspection, workflow command contract, policy routing, and git diff --check. Remote PR checks will validate GitHub Actions behavior.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
