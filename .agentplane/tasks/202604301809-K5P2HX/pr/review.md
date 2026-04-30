# PR Review

Created: 2026-04-30T18:28:39.392Z
Branch: task/202604301809-K5P2HX/gpt55-shared-contract

## Summary

Introduce shared GPT-5.5 prompt contract fragments

Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.

## Scope

- In scope: Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.
- Out of scope: unrelated refactors not required for "Introduce shared GPT-5.5 prompt contract fragments".

## Verification

### Plan

1. Review the requested outcome for "Introduce shared GPT-5.5 prompt contract fragments". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Verified: shared GPT-5.5 prompt contract added as gateway fragment; AGENTS budget 248 lines; agents templates OK; prompt registry/agents-template/GPT-5.5 diagnostics tests pass; policy routing OK; git diff check OK.

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

- Updated: 2026-04-30T18:32:09.527Z
- Branch: task/202604301809-K5P2HX/gpt55-shared-contract
- Head: 721b8d4c336f

```text
 packages/agentplane/assets/AGENTS.md | 7 +++++--
 1 file changed, 5 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
