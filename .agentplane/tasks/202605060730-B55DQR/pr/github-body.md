Task: `202605060730-B55DQR`
Title: Add project-local blueprint scaffold command

## Summary

Add project-local blueprint scaffold command

Add a safe blueprint scaffold command that writes a local JSON template for project authors without registering or executing the custom blueprint.

## Scope

- In scope: Add a safe blueprint scaffold command that writes a local JSON template for project authors without registering or executing the custom blueprint.
- Out of scope: unrelated refactors not required for "Add project-local blueprint scaffold command".

## Verification

- State: ok
- Note: Verified: scaffold command creates project-local blueprint JSON without enabling execution; focused tests and ci:local:fast passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T07:31:43.904Z
- Branch: task/202605060730-B55DQR/local-blueprint-authoring
- Head: 189d3d1be142

```text
No changes detected.
```

</details>
