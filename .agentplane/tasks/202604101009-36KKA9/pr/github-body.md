## Summary

Prepare patch release v0.3.11 and reconcile protected-main publish path

Generate the next patch release plan from v0.3.10, draft release notes, prepare a release candidate branch/PR, and reconcile the current mismatch between release apply --push and the protected-main publish route before any irreversible release action.

## Scope

- In scope: Generate the next patch release plan from v0.3.10, draft release notes, prepare a release candidate branch/PR, and reconcile the current mismatch between release apply --push and the protected-main publish route before any irreversible release action.
- Out of scope: unrelated refactors not required for "Prepare patch release v0.3.11 and reconcile protected-main publish path".

## Verification

- State: ok
- Note: Release checks: updated release parity to 0.3.11, regenerated generated-reference docs, and passed bun run release:check with successful build plus npm pack --dry-run for both published packages.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T10:34:56.796Z
- Branch: task/202604101009-36KKA9/patch-release-v0-3-11
- Head: 6eaf1ac6198f

```text
No changes detected.
```

</details>
