## Summary

Recover v0.3.14 publish and fix release-ready gating

Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.

## Scope

- In scope: Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.
- Out of scope: unrelated refactors not required for "Recover v0.3.14 publish and fix release-ready gating".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T16:13:58.997Z
- Branch: task/202604181607-MR97GJ/release-recovery-and-gating-fix
- Head: da42a6e04048

```text
 .github/workflows/ci.yml                             | 11 ++++++++---
 .github/workflows/publish.yml                        | 17 ++++++++++++++---
 docs/developer/release-and-publishing.mdx            | 20 +++++++++++++-------
 .../commands/release/ci-workflow-contract.test.ts    | 12 ++++++++++++
 .../release/publish-workflow-contract.test.ts        |  7 +++++++
 5 files changed, 54 insertions(+), 13 deletions(-)
```

</details>
