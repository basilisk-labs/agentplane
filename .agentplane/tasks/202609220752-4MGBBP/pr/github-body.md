Task: `202609220752-4MGBBP`
Title: Fix issue #5991 by cleaning owned Vitest temporary roots
Canonical task record: `.agentplane/tasks/202609220752-4MGBBP/README.md`

## Summary

Fix issue #5991 by cleaning owned Vitest temporary roots

Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check.

## Scope

- In scope: Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check.
- Out of scope: unrelated refactors not required for "Fix issue #5991 by cleaning owned Vitest temporary roots".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T08:00:58.998Z
- Branch: task/202609220752-4MGBBP/fix-issue-5991-by-cleaning-owned-vitest-temporar
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/guard/impl/close-message.test.ts  |  15 +-
 .../src/cli-harness/temp-root-cleanup.test.ts      | 129 ++++++++++++++++-
 .../testkit/src/cli-harness/temp-root-cleanup.ts   | 161 ++++++++++++++++++++-
 packages/testkit/src/vitest-temp-root.setup.ts     |   7 +
 vitest.config.ts                                   |   1 +
 5 files changed, 301 insertions(+), 12 deletions(-)
```

</details>
