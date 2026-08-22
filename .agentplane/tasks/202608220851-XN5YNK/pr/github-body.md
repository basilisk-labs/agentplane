Task: `202608220851-XN5YNK`
Title: Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the...
Canonical task record: `.agentplane/tasks/202608220851-XN5YNK/README.md`

## Summary

Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.

Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance.

## Scope

- In scope: Release-blocking lifecycle defect: evaluator run anchors evaluated_sha to the current task-artifact-only head; finish correctly resolves the underlying implementation commit but then rejects the review because evaluated_sha is not byte-equal to that implementation SHA. Preserve semantic freshness while accepting a proven task-artifact-only advance.
- Out of scope: unrelated refactors not required for "Fix the pre-merge closure quality gate so an EVALUATOR pass anchored on a task-artifact-only head is accepted for the underlying implementation commit, with a regression test covering evaluator-run evidence commits followed by finish.".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T09:31:11.730Z
- Branch: task/202608220851-XN5YNK/fix-the-pre-merge-closure-quality-gate-so-an-eva
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/finish-blueprint-evidence.ts | 39 +++++++-----
 .../task/finish.quality-review-target.unit.test.ts | 69 ++++++++++++++++++++++
 2 files changed, 93 insertions(+), 15 deletions(-)
```

</details>
