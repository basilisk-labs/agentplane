# PR Review

Created: 2026-04-18T15:25:35.357Z
Branch: task/202604181525-E9FXF3/publish-recipes-release-workflow

## Summary

Publish recipes package in npm release workflow

Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.

## Scope

- In scope: Update the release workflow, smoke checks, and publish-result accounting so every published agentplane release also publishes and confirms @agentplaneorg/recipes before the CLI package is considered complete.
- Out of scope: unrelated refactors not required for "Publish recipes package in npm release workflow".

## Verification

### Plan

1. Review the requested outcome for "Publish recipes package in npm release workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: release workflow now treats @agentplaneorg/recipes as a required published package across detect, publish, smoke, and manifest surfaces; separate registry smoke reproduces that the currently published 0.3.13 release is still broken until recipes is actually published or superseded

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

- Updated: 2026-04-18T15:25:35.357Z
- Branch: task/202604181525-E9FXF3/publish-recipes-release-workflow
- Head: b9273fbdc7ff

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
