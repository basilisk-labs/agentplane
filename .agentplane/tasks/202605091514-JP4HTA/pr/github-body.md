Task: `202605091514-JP4HTA`
Title: Harden managed hook fallback policy
Canonical task record: `.agentplane/tasks/202605091514-JP4HTA/README.md`

## Summary

Harden managed hook fallback policy

Require explicit opt-in before managed hook shims fall back to a global agentplane runner, and make installed hook wrappers fail with actionable local-shim recovery guidance when the repository shim is missing.

## Scope

- In scope: Require explicit opt-in before managed hook shims fall back to a global agentplane runner, and make installed hook wrappers fail with actionable local-shim recovery guidance when the repository shim is missing.
- Out of scope: unrelated refactors not required for "Harden managed hook fallback policy".

## Verification

- State: ok
- Note: Managed hook fallback hardening verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T15:15:02.457Z
- Branch: task/202605091514-JP4HTA/hook-global-fallback
- Head: 172bcc8169f8

```text
No changes detected.
```

</details>
