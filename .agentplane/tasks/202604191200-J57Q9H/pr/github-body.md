## Summary

Split release prepublish into fast and heavy phases

Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.

## Scope

- In scope: Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.
- Out of scope: unrelated refactors not required for "Split release prepublish into fast and heavy phases".

## Verification

- State: ok
- Note: Split release prepublish into explicit fast and heavy phases, reordered the gate to run the fast payload validation before the expensive CI route, and added a regression that proves the heavy phase is skipped when the fast phase fails.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T13:23:47.497Z
- Branch: task/202604191200-J57Q9H/split-release-prepublish
- Head: 57161a18c611

```text
 package.json                                       |  4 +-
 .../src/commands/release/apply.preflight.ts        | 88 ++++++++++++----------
 .../agentplane/src/commands/release/apply.test.ts  | 82 +++++++++++++++++++-
 3 files changed, 130 insertions(+), 44 deletions(-)
```

</details>
