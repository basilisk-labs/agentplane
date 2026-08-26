Task: `202608252330-9RCWZQ`
Title: Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch
Canonical task record: `.agentplane/tasks/202608252330-9RCWZQ/README.md`

## Summary

Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch

Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.

## Scope

- In scope: Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
- Out of scope: unrelated refactors not required for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch".

## Verification

- State: blocked_external
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T02:46:09.863Z
- Branch: task/202608252330-9RCWZQ/allow-exact-sha-release-tasks-to-open-hosted-prs
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-flow.pr-open.git.test.ts   | 165 ++++++++++++++++++---
 .../run-cli.core.pr-flow.pr-open.network.test.ts   |  52 ++++++-
 .../src/commands/pr/internal/provider-base.ts      |  78 ++++++++++
 .../src/commands/pr/internal/sync-github.test.ts   |  44 ++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  18 ++-
 5 files changed, 333 insertions(+), 24 deletions(-)
```

</details>
