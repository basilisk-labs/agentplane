Task: `202605030959-GY9D2F`
Title: Fix release recovery checksum source

## Summary

Fix release recovery checksum source

Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.

## Scope

- In scope: Recovery workflow must publish external distribution modules from the immutable release payload, not from whatever runtime checkout is used to rerun the workflow. Prevent checksum drift when rerunning external module publication for an existing tag.
- Out of scope: unrelated refactors not required for "Fix release recovery checksum source".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T10:51:48.475Z
- Branch: task/202605030959-GY9D2F/release-recovery-checksum-source
- Head: 9239d1fc0602

```text
 .github/workflows/publish-distribution-module.yml  | 44 +++++++++++++++++++---
 .../release/publish-workflow-contract.test.ts      | 13 +++++++
 2 files changed, 51 insertions(+), 6 deletions(-)
```

</details>
