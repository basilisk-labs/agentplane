Task: `202608021231-SHYJGK`
Title: Remove the v0.7.1 matched CLI latency regression
Canonical task record: `.agentplane/tasks/202608021231-SHYJGK/README.md`

## Summary

Remove the v0.7.1 matched CLI latency regression

Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.

## Scope

- In scope: Profile the packed v0.7.1 candidate against published 0.6.26 on identical fixtures and remove duplicated startup, repository, task-index, and context preparation work until every release-gated command has a non-regressing interleaved median without weakening correctness.
- Out of scope: unrelated refactors not required for "Remove the v0.7.1 matched CLI latency regression".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T15:37:35.696Z
- Branch: task/202608021231-SHYJGK/remove-the-v0-7-1-matched-cli-latency-regression
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202608021232-6BTB6D/README.md    |   7 +-
 .agentplane/tasks/202608021534-J5G235/README.md    | 100 ++++++++++++++++++++
 .agentplane/tasks/202608021534-YN84E1/README.md    | 101 +++++++++++++++++++++
 .agentplane/tasks/202608021535-9EWFAB/README.md    | 101 +++++++++++++++++++++
 .agentplane/tasks/202608021535-CNQKXP/README.md    | 101 +++++++++++++++++++++
 .../src/cli/run-cli.core.init.interactive.test.ts  |  12 ++-
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |  11 ++-
 7 files changed, 423 insertions(+), 10 deletions(-)
```

</details>
