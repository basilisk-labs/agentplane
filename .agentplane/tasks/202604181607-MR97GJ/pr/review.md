# PR Review

Created: 2026-04-18T16:07:49.005Z
Branch: task/202604181607-MR97GJ/release-recovery-and-gating-fix

## Summary

Recover v0.3.14 publish and fix release-ready gating

Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.

## Scope

- In scope: Recover the exact v0.3.14 release publication from merged SHA 2568c8cffc5363f691985c954f3850e6949696ce, then fix Core CI/publish workflow routing so release merges that include release notes and task artifacts still produce a release-ready artifact and auto-publish without manual recovery.
- Out of scope: unrelated refactors not required for "Recover v0.3.14 publish and fix release-ready gating".

## Verification

### Plan

1. Review the requested outcome for "Recover v0.3.14 publish and fix release-ready gating". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: pending
- Note: Not recorded yet.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
