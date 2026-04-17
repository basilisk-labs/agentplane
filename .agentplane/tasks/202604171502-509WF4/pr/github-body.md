## Summary

Consolidate freshness and generator scripts under scripts/lib

Extract shared argv, generation, and freshness-comparison helpers for schema, CLI docs, recipes inventory, and related scripts so scripts stop reimplementing the same control flow.

## Scope

- In scope: Extract shared argv, generation, and freshness-comparison helpers for schema, CLI docs, recipes inventory, and related scripts so scripts stop reimplementing the same control flow.
- Out of scope: unrelated refactors not required for "Consolidate freshness and generator scripts under scripts/lib".

## Verification

- State: ok
- Note: Verified: shared script-runtime helpers now cover repeated bunx, out-path, and check-sync parsing across freshness and generator scripts; declared checks pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T15:30:37.920Z
- Branch: task/202604171502-509WF4/consolidate-script-libs
- Head: b8ae339afbf2

```text
 scripts/generate-agent-bootstrap-doc.mjs | 19 ++-------------
 scripts/generate-recipes-inventory.mjs   | 30 ++++-------------------
 scripts/lib/generated-artifacts.mjs      | 16 +------------
 scripts/lib/script-runtime.mjs           | 41 ++++++++++++++++++++++++++++++++
 scripts/sync-agent-templates.mjs         |  9 ++-----
 scripts/sync-schemas.mjs                 |  9 ++-----
 6 files changed, 53 insertions(+), 71 deletions(-)
```

</details>
