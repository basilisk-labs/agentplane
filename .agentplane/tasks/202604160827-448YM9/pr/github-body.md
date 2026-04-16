## Summary

Make first pr open publish the final packet head

Ensure the first branch_pr pr open after branch publication does not leave a local packet-only commit ahead of origin that requires a second push before the remote PR can be created.

## Scope

- In scope: Ensure the first branch_pr pr open after branch publication does not leave a local packet-only commit ahead of origin that requires a second push before the remote PR can be created.
- Out of scope: unrelated refactors not required for "Make first pr open publish the final packet head".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T08:45:03.270Z
- Branch: task/202604160827-448YM9/first-pr-open-final-head
- Head: 0a222a3e38d9

```text
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 192 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/open.ts        |  66 +++++--
 2 files changed, 247 insertions(+), 11 deletions(-)
```

</details>
