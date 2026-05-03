Task: `202605031827-9F0RW9`
Title: Preserve DCO no-identity fallback

## Summary

Preserve DCO no-identity fallback

Keep commit-msg DCO enforcement aligned with AgentPlane-managed commit behavior when commit.dco.enabled=true but no default sign-off identity is configured.

## Scope

- In scope: Keep commit-msg DCO enforcement aligned with AgentPlane-managed commit behavior when commit.dco.enabled=true but no default sign-off identity is configured.
- Out of scope: unrelated refactors not required for "Preserve DCO no-identity fallback".

## Verification

- State: ok
- Note: Preserved AgentPlane-managed commit behavior when DCO has no configured identity.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T18:27:56.576Z
- Branch: task/202605031827-9F0RW9/dco-identity-fallback
- Head: eda55d00831b

```text
No changes detected.
```

</details>
