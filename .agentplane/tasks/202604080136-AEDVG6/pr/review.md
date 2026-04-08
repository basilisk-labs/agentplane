# PR Review

Created: 2026-04-08T17:43:15.263Z
Branch: task/202604080136-AEDVG6/policy-canonical-guard

## Summary

Fail fast when editing policy mirrors instead of canonical assets

Policy mirror drift is currently caught late in agents:check and pre-push. Add an earlier deterministic guard so operators editing .agentplane/policy paths get immediate feedback about packages/agentplane/assets/policy as the canonical source.

## Scope

- In scope: Policy mirror drift is currently caught late in agents:check and pre-push. Add an earlier deterministic guard so operators editing .agentplane/policy paths get immediate feedback about packages/agentplane/assets/policy as the canonical source.
- Out of scope: unrelated refactors not required for "Fail fast when editing policy mirrors instead of canonical assets".

## Verification

### Plan

1. Editing only .agentplane/policy mirrors should fail fast with a canonical-assets diagnostic before expensive pre-push checks.
2. Add regression coverage for the early guard path.
3. Run the targeted guard test suite.

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

- Updated: 2026-04-08T17:43:30.684Z
- Branch: task/202604080136-AEDVG6/policy-canonical-guard
- Head: aab1b2e3957d

```text
 .agentplane/tasks/202604080136-AEDVG6/README.md    | 91 ++++++++++++++++++++++
 .../src/cli/pre-commit-hook-script.test.ts         | 29 +++++++
 .../src/cli/pre-commit-staged-files.test.ts        | 18 ++++-
 scripts/lib/pre-commit-staged-files.mjs            | 12 +++
 scripts/run-pre-commit-hook.mjs                    | 27 ++++++-
 5 files changed, 175 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
