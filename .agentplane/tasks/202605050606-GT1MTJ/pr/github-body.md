Task: `202605050606-GT1MTJ`
Title: Commit refreshed header assets

## Summary

Commit refreshed header assets

Commit the user-provided refreshed header assets for docs and website surfaces.

## Scope

- In scope: Commit the user-provided refreshed header assets for docs and website surfaces.
- Out of scope: unrelated refactors not required for "Commit refreshed header assets".

## Verification

- State: ok
- Note: Command: shasum -a 256 docs/assets/header.png website/static/img/header.png docs/assets/header.svg website/static/img/header.svg -> pass; docs and website copies match for PNG and SVG. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: agentplane doctor -> pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T06:06:39.196Z
- Branch: task/202605050606-GT1MTJ/refresh-header-assets
- Head: 5912f46bf1b0

```text
No changes detected.
```

</details>
