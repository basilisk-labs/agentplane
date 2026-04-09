# PR Review

Created: 2026-04-09T11:00:58.818Z
Branch: task/202604091052-NBKX5V/incident-locality-ux

## Summary

Explain branch_pr incident collection locality and promotion requirements

Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update `.agentplane/policy/incidents.md`.

## Scope

- In scope: improve CLI/operator guidance for `branch_pr` incident collection locality and promotion semantics.
- Out of scope: unrelated workflow refactors or changes to the incident registry data model.

## Verification

### Plan

1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.

### Current Status

- State: ok
- Note: Incident messaging now distinguishes task-local findings from shared incidents.md promotion.

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

- Updated: 2026-04-09T11:00:58.818Z
- Branch: task/202604091052-NBKX5V/incident-locality-ux
- Head: 1453eeb17631

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
