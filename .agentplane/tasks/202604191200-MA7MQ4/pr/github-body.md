## Summary

Add fail-fast preflight for release candidate route

Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.

## Scope

- In scope: Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.
- Out of scope: unrelated refactors not required for "Add fail-fast preflight for release candidate route".

## Verification

- State: ok
- Note: Added a fail-fast release-candidate preflight layer by reusing the shared release preflight checks with command-aware diagnostics, then covered the new dirty-tracked-tree branch_pr route with release apply regressions kept green.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T12:33:22.911Z
- Branch: task/202604191200-MA7MQ4/release-candidate-preflight
- Head: 64d75a4e9cbd

```text
 .../src/commands/release/apply.pipeline.ts         | 28 +++++++---
 .../src/commands/release/apply.preflight.ts        | 65 +++++++++++++++-------
 .../agentplane/src/commands/release/apply.test.ts  | 51 +++++++++++++++++
 3 files changed, 118 insertions(+), 26 deletions(-)
```

</details>
