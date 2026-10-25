Task: `202610251040-KDBTXH`
Title: Keep historical compatibility package delta valid after later surface changes
Canonical task record: `.agentplane/tasks/202610251040-KDBTXH/README.md`

## Summary

Keep historical compatibility package delta valid after later surface changes

For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.

## Scope

- In scope: For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.
- Out of scope: unrelated refactors not required for "Keep historical compatibility package delta valid after later surface changes".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T10:47:34.062Z
- Branch: task/202610251040-KDBTXH/keep-historical-compatibility-package-delta-vali
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/bench/capture-compatibility-candidate.mjs  | 56 +--------------
 .../check-compatibility-contract-baseline.mjs      | 49 +++----------
 .../compatibility-incremental-package-delta.mjs    | 56 +++++++++++++++
 ...ompatibility-incremental-package-delta.test.mjs | 84 ++++++++++++++++++++++
 4 files changed, 150 insertions(+), 95 deletions(-)
```

</details>
