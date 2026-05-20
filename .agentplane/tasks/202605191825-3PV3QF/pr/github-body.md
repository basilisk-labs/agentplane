Task: `202605191825-3PV3QF`
Title: Split GitHub PR verification into routed parallel gates
Canonical task record: `.agentplane/tasks/202605191825-3PV3QF/README.md`

## Summary

Split GitHub PR verification into routed parallel gates

Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.

## Scope

- In scope: Make GitHub PR verification faster and clearer by reusing the local CI selector for a planning job, splitting Core CI into parallel verification jobs, adding a stable aggregate gate, and caching Bun artifacts on Windows.
- Out of scope: unrelated refactors not required for "Split GitHub PR verification into routed parallel gates".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed after formatting the recovery contract test; format:check,
workflows:lint, and focused workflow contract test passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T05:15:29.384Z
- Branch: task/202605191825-3PV3QF/github-verification-gates
- Head: cc3e17188adc

```text
 .../blueprint/resolved-snapshot.json               | 594 +++++++++++++++++++++
 .github/workflows/ci.yml                           | 358 ++++++++++++-
 ...check-github-protection-contract-script.test.ts |  12 +-
 .../commands/release/ci-workflow-contract.test.ts  |  25 +-
 .../checks/check-github-protection-contract.mjs    |   2 +-
 scripts/checks/plan-github-ci.mjs                  |  67 +++
 6 files changed, 1039 insertions(+), 19 deletions(-)
```

</details>
