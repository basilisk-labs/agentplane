Task: `202608020639-X1DWST`
Title: Allow the v0.7 release version delta in compatibility evidence
Canonical task record: `.agentplane/tasks/202608020639-X1DWST/README.md`

## Summary

Allow the v0.7 release version delta in compatibility evidence

Freeze the exact 0.7.0 package-manifest version and internal dependency parity delta in the reviewed compatibility candidate without modifying the immutable 0.6.24 baseline, and add regression coverage that rejects every non-version manifest drift.

## Scope

- In scope: Freeze the exact 0.7.0 package-manifest version and internal dependency parity delta in the reviewed compatibility candidate without modifying the immutable 0.6.24 baseline, and add regression coverage that rejects every non-version manifest drift.
- Out of scope: unrelated refactors not required for "Allow the v0.7 release version delta in compatibility evidence".

## Verification

- State: ok
- Note:

```text
Verified: Deterministic command-level evidence is frozen for the exact implementation SHA; focused
positive and negative release-delta coverage, compatibility ratchet, TypeScript build, and the
complete contract gate all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T06:48:07.923Z
- Branch: task/202608020639-X1DWST/allow-the-v0-7-release-version-delta-in-compatib
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts | 72 +++++++++++++++++++-
 .../baselines/v0.7-compatibility-candidate.json    | 22 ++++++-
 .../check-compatibility-contract-baseline.mjs      | 76 +++++++++++++++++++---
 scripts/lib/compatibility-contract.mjs             | 37 +++++++++++
 4 files changed, 197 insertions(+), 10 deletions(-)
```

</details>
