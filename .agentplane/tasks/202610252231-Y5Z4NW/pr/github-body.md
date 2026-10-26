Task: `202610252231-Y5Z4NW`
Title: Ratchet compatibility candidate for release versions
Canonical task record: `.agentplane/tasks/202610252231-Y5Z4NW/README.md`

## Summary

Ratchet compatibility candidate for release versions

Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.

## Scope

- In scope: Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.
- Out of scope: unrelated refactors not required for "Ratchet compatibility candidate for release versions".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T10:14:30.346Z
- Branch: task/202610252231-Y5Z4NW/ratchet-compatibility-candidate-for-release-vers
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/release/apply.pipeline/mutation.ts    | 107 +++++++++++
 .../release/apply.version-mutation.test.ts         | 144 ++++++++++++++-
 scripts/bench/capture-compatibility-candidate.mjs  |  77 ++++----
 .../check-compatibility-contract-baseline.mjs      |  57 +++---
 scripts/lib/compatibility-candidate-path.mjs       | 118 ++++++++++++
 .../compatibility-incremental-package-delta.mjs    |  58 +++++-
 ...ompatibility-incremental-package-delta.test.mjs | 203 ++++++++++++++++++++-
 7 files changed, 675 insertions(+), 89 deletions(-)
```

</details>
