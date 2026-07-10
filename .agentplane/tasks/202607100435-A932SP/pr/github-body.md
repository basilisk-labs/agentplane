Task: `202607100435-A932SP`
Title: Release integration lane after pre-merge Hosted Close
Canonical task record: `.agentplane/tasks/202607100435-A932SP/README.md`

## Summary

Release integration lane after pre-merge Hosted Close

For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.

## Scope

- In scope: For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.
- Out of scope: unrelated refactors not required for "Release integration lane after pre-merge Hosted Close".

## Verification

- State: ok
- Note:

```text
Verified after rebase onto main 0f96e043: focused flow-status and integration-queue tests (12),
typecheck, lint:core, ci:contract, test:fast (364 files/2150 tests), policy routing, and doctor
passed. Release incident gate is cleared on the rebased base.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T09:06:02.845Z
- Branch: task/202607100435-A932SP/release-lane-after-premerge-hosted-close
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/flow-status.pre-merge.test.ts  | 117 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/flow-status.ts |  51 +++++++++
 2 files changed, 168 insertions(+)
```

</details>
