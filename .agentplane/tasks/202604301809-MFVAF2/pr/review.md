# PR Review

Created: 2026-04-30T18:19:06.286Z
Branch: task/202604301809-MFVAF2/gpt55-contract-diagnostics

## Summary

Add GPT-5.5 prompt contract diagnostics

Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.

## Scope

- In scope: Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.
- Out of scope: unrelated refactors not required for "Add GPT-5.5 prompt contract diagnostics".

## Verification

### Plan

1. Review the requested outcome for "Add GPT-5.5 prompt contract diagnostics". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Verified: focused prompt-module and fragment tests pass; agents templates OK; typecheck and framework bootstrap passed earlier in this task; git diff check OK at commit 27511d7.

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

- Updated: 2026-04-30T18:23:18.835Z
- Branch: task/202604301809-MFVAF2/gpt55-contract-diagnostics
- Head: 27511d74c16c

```text
 .../runtime/prompt-modules/gpt55-contract.test.ts  | 139 +++++++++++++++++++++
 .../src/runtime/prompt-modules/gpt55-contract.ts   | 137 ++++++++++++++++++++
 .../agentplane/src/runtime/prompt-modules/index.ts |   5 +
 3 files changed, 281 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
