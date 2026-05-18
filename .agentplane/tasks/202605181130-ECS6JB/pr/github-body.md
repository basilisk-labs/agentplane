Task: `202605181130-ECS6JB`
Title: Install context policy module during context init
Canonical task record: `.agentplane/tasks/202605181130-ECS6JB/README.md`

## Summary

Install context policy module during context init

Add a compact context policy module and wire context initialization/gateway loading so agents get mandatory CLI/provenance rules for local context work instead of relying on skills.

## Scope

- In scope: Add a compact context policy module and wire context initialization/gateway loading so agents get mandatory CLI/provenance rules for local context work instead of relying on skills.
- Out of scope: unrelated refactors not required for "Install context policy module during context init".

## Verification

- State: ok
- Note:

```text
Implemented context.must policy module and wired it into generated AGENTS load rules for context
work. Evidence: policy routing OK; builtin assets fresh; focused vitest 3 files/43 tests passed;
eslint target passed; prettier check passed; repo-local clean temp context init installs
context.must and context check passes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T11:30:53.872Z
- Branch: task/202605181130-ECS6JB/context-policy-module
- Head: 88585c94c356

```text
No changes detected.
```

</details>
