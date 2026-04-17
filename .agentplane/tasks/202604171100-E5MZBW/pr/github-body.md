## Summary

Release patch v0.3.13

Prepare and publish patch release v0.3.13 from current main via branch_pr release-candidate flow, covering post-v0.3.12 changes while preserving patch semantics during the current refactor phase.

## Scope

- In scope: Prepare and publish patch release v0.3.13 from current main via branch_pr release-candidate flow, covering post-v0.3.12 changes while preserving patch semantics during the current refactor phase.
- Out of scope: unrelated refactors not required for "Release patch v0.3.13".

## Verification

- State: ok
- Note: Release candidate prepared locally for v0.3.13: release notes validated, version bump committed on the candidate branch, and the branch_pr route intentionally deferred tag creation and publication until merge to main.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T11:03:50.503Z
- Branch: task/202604171100-E5MZBW/release-v0-3-13
- Head: 327ddbc499db

```text
 .agentplane/config.json                |  2 +-
 bun.lock                               |  6 +--
 docs/reference/generated-reference.mdx | 14 +++----
 docs/releases/v0.3.13.md               | 70 ++++++++++++++++++++++++++++++++++
 packages/agentplane/package.json       |  4 +-
 packages/core/package.json             |  2 +-
 6 files changed, 84 insertions(+), 14 deletions(-)
```

</details>
