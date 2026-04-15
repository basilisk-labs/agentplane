## Summary

Require exact artifact identity for workflow_dispatch release-ready resolution

workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.

## Scope

- In scope: workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.
- Out of scope: unrelated refactors not required for "Require exact artifact identity for workflow_dispatch release-ready resolution".

## Verification

- State: ok
- Note: Verified exact artifact identity tightening locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T17:37:15.102Z
- Branch: task/202604151732-WWEAS8/exact-artifact-identity
- Head: 0ecf40b3aecb

```text
 .agentplane/tasks/202604151732-WWEAS8/README.md    | 150 +++++++++++++++++++++
 .../resolve-release-ready-source-script.test.ts    | 103 ++++++++++++++
 scripts/lib/release-ready-source.mjs               |   9 +-
 3 files changed, 260 insertions(+), 2 deletions(-)
```

</details>
