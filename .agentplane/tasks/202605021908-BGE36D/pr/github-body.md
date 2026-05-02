Task: `202605021908-BGE36D`
Title: Define managed recipe materialization contract

## Summary

Define managed recipe materialization contract

Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.

## Scope

- In scope: Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.
- Out of scope: unrelated refactors not required for "Define managed recipe materialization contract".

## Verification

- State: ok
- Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors, 0 warnings, informational runtime/archive findings only. Scope: managed recipe materialization docs contract in developer docs.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
