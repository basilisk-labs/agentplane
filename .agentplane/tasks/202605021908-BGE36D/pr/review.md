# PR Review

Created: 2026-05-02T19:10:44.274Z
Branch: task/202605021908-BGE36D/managed-recipe-materialization

## Summary

Define managed recipe materialization contract

Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.

## Scope

- In scope: Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.
- Out of scope: unrelated refactors not required for "Define managed recipe materialization contract".

## Verification

### Plan

1. Review the requested outcome for "Define managed recipe materialization contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime/archive findings only. Scope: managed recipe materialization docs contract in developer docs.

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

- Updated: 2026-05-02T19:13:01.248Z
- Branch: task/202605021908-BGE36D/managed-recipe-materialization
- Head: d28a45f12fc6

```text
 docs/developer/modular-prompt-assembly.mdx | 17 +++++++++++++++++
 docs/developer/recipes-how-it-works.mdx    | 17 +++++++++++++++++
 docs/developer/recipes-spec.mdx            |  6 ++++++
 3 files changed, 40 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
