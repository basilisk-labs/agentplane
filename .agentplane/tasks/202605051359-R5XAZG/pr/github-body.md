Task: `202605051359-R5XAZG`
Title: Require incident cleanup before release tasks

## Summary

Require incident cleanup before release tasks

Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.

## Scope

- In scope: Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.
- Out of scope: unrelated refactors not required for "Require incident cleanup before release tasks".

## Verification

- State: ok
- Note: Implemented release incident cleanup gate and verified focused release contracts, typecheck, policy routing, workflow command checks, agents check, diff whitespace, and repo-local doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T13:59:31.391Z
- Branch: task/202605051359-R5XAZG/release-incident-gate
- Head: 98212bb741b6

```text
No changes detected.
```

</details>
