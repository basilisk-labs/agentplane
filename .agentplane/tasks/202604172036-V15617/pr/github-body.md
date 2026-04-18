## Summary

Decompose release apply command into explicit phases

Split the release apply command into deterministic planning, validation, mutation, and reporting phases so the release workflow stops relying on one oversized orchestration file.

## Scope

- In scope: Split the release apply command into deterministic planning, validation, mutation, and reporting phases so the release workflow stops relying on one oversized orchestration file.
- Out of scope: unrelated refactors not required for "Decompose release apply command into explicit phases".

## Verification

- State: ok
- Note: Release apply/release candidate now run through a shared pipeline module; lint:core and test:fast are green, and release apply acceptance tests stayed green after the extraction.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T05:42:08.678Z
- Branch: task/202604172036-V15617/release-apply-phases
- Head: b97ef27e08d8

```text
 .../src/commands/release/apply.command.ts          | 500 +--------------------
 .../src/commands/release/apply.pipeline.ts         | 490 ++++++++++++++++++++
 .../agentplane/src/commands/release/apply.types.ts |  26 ++
 3 files changed, 531 insertions(+), 485 deletions(-)
```

</details>
