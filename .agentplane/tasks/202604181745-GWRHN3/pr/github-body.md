## Summary

Fix lint blocker in release apply mutation regex

Replace escaped regex string usage in packages/agentplane/src/commands/release/apply.mutation.ts with a String.raw-safe pattern so lint:core and pre-push pass again without changing behavior.

## Scope

- In scope: Replace escaped regex string usage in packages/agentplane/src/commands/release/apply.mutation.ts with a String.raw-safe pattern so lint:core and pre-push pass again without changing behavior.
- Out of scope: unrelated refactors not required for "Fix lint blocker in release apply mutation regex".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T17:56:15.100Z
- Branch: task/202604181745-GWRHN3/lint-unblock-release-regex
- Head: b036e265349c

```text
 packages/agentplane/src/commands/release/apply.mutation.ts    |  5 ++++-
 .../src/commands/release/release-check-script.test.ts         | 11 ++++++++---
 2 files changed, 12 insertions(+), 4 deletions(-)
```

</details>
