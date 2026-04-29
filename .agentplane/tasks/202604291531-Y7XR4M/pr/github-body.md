## Summary

Compile agent profiles and upgrade baselines from modules

Switch .agentplane/agents profile emission and related upgrade baseline handling to the prompt module compiler, preserving existing JSON profile output and role-specific behavior.

## Scope

- In scope: `.agentplane/agents/*.json` emission through PromptModules.
- In scope: profile provenance/baseline handling and compatibility with `agentplane role <ROLE>`.
- Out of scope: changing role semantics, adding new agents, or modifying workflow policy content.

## Verification

- State: ok
- Note: Verified agent profile module compilation: focused agents/init/upgrade tests passed (29 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings. Extra upgrade-policy checks passed: node .agentplane/policy/check-routing.mjs and agentplane agents after bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T18:25:50.887Z
- Branch: task/202604291531-Y7XR4M/agent-profile-modules
- Head: f95121f9a2b2

```text
No changes detected.
```

</details>
