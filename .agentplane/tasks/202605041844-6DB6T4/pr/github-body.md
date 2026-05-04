Task: `202605041844-6DB6T4`
Title: Harden lifecycle text payload transport

## Summary

Harden lifecycle text payload transport

Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.

## Scope

- In scope: Reduce shell quoting failures by adding safe file/stdin transport and risky inline payload diagnostics for lifecycle text fields.
- Out of scope: unrelated refactors not required for "Harden lifecycle text payload transport".

## Verification

- State: ok
- Note: Verified: payload transport changes pass focused CLI lifecycle tests, typecheck, lint, diff check, policy routing, and doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T18:45:18.859Z
- Branch: task/202605041844-6DB6T4/text-payload-transport
- Head: 2d399599d7b2

```text
No changes detected.
```

</details>
