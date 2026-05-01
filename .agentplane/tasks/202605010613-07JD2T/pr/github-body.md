## Summary

Fix recipes catalog compatibility

Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.

## Scope

- In scope: Update the agentplane-recipes submodule catalog so bundled recipes validate and install against the current AgentPlane recipe runtime.
- Out of scope: unrelated refactors not required for "Fix recipes catalog compatibility".

## Verification

- State: ok
- Note: Recipe catalog compatibility verified: runtime manifest/assets/scenario validation passed for viewer and dokploy; signed list-remote worked with the committed dev public key override; path and archive installs passed for both recipes; HTTP index install-by-name smoke passed; init --recipes viewer vendored the active recipe and generated prompt graph; docs:recipes:check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T06:13:31.223Z
- Branch: task/202605010613-07JD2T/recipes-catalog-compat
- Head: cc1ae624556b

```text
No changes detected.
```

</details>
