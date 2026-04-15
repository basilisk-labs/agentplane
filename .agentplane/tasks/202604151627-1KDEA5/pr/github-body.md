## Summary

Make pr open/update idempotent for existing PR packets

Stop branch_pr PR sync from creating a new packet commit on every rerun of pr open/pr update after the PR already exists; keep release candidate/branch_pr loops stable.

## Scope

- In scope: Stop branch_pr PR sync from creating a new packet commit on every rerun of pr open/pr update after the PR already exists; keep release candidate/branch_pr loops stable.
- Out of scope: unrelated refactors not required for "Make pr open/update idempotent for existing PR packets".

## Verification

- State: ok
- Note: Verified: pr-flow 54/54 and pr-meta 12/12; existing OPEN PR linkage no longer mutates tracked packet artifacts or creates artifact-only rerun commits.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T17:03:47.499Z
- Branch: task/202604151627-1KDEA5/pr-packet-idempotent
- Head: 27682cab4f94

```text
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 147 +++++++++++++++++++--
 .../agentplane/src/commands/pr/internal/sync.ts    | 106 +++++++++++----
 2 files changed, 216 insertions(+), 37 deletions(-)
```

</details>
