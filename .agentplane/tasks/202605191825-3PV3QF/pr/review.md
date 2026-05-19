# PR Review

Created: 2026-05-19T18:26:31.579Z

## Task

- Task: `202605191825-3PV3QF`
- Title: Split GitHub PR verification into routed parallel gates
- Status: DOING
- Branch: `task/202605191825-3PV3QF/github-verification-gates`
- Canonical task record: `.agentplane/tasks/202605191825-3PV3QF/README.md`

## Verification

- State: ok
- Note: EVALUATOR pass: approved CI-routing scope is satisfied by commit a67500fdb; Verify Steps are backed by local command evidence; residual deployment risk is limited to updating GitHub branch protection to require Core CI / PR verification after this workflow lands.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T18:34:58.519Z
- Branch: task/202605191825-3PV3QF/github-verification-gates
- Head: a67500fdbb90

```text
 .../blueprint/resolved-snapshot.json               | 594 +++++++++++++++++++++
 .github/workflows/ci.yml                           | 322 ++++++++++-
 .../checks/check-github-protection-contract.mjs    |   2 +-
 scripts/checks/plan-github-ci.mjs                  |  67 +++
 4 files changed, 976 insertions(+), 9 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
