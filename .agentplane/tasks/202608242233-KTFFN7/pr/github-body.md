Task: `202608242233-KTFFN7`
Title: Allow evidence-only rework after an already committed implementation
Canonical task record: `.agentplane/tasks/202608242233-KTFFN7/README.md`

## Summary

Allow evidence-only rework after an already committed implementation

Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.

## Scope

- In scope: Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
- Out of scope: unrelated refactors not required for "Allow evidence-only rework after an already committed implementation".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-24T22:59:26.702Z
- Branch: task/202608242233-KTFFN7/allow-evidence-only-rework-after-an-already-comm
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-advance.test.ts      | 196 ++++++++++++++++++++-
 .../commands/task/direct-task-verification.test.ts |  26 +++
 .../src/commands/task/direct-task-verification.ts  |   7 +-
 .../external-agent-implementation-authority.ts     | 133 +++++++++++---
 4 files changed, 336 insertions(+), 26 deletions(-)
```

</details>
