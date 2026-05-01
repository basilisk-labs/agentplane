Task: `202605012143-NEK3E8`
Title: Fix Homebrew formula npm install

## Summary

Fix Homebrew formula npm install

Update the Homebrew formula renderer and tap formula so fresh AgentPlane releases install without Homebrew npm min-release-age blocking fresh package dependencies.

## Scope

- In scope: Update the Homebrew formula renderer and tap formula so fresh AgentPlane releases install without Homebrew npm min-release-age blocking fresh package dependencies.
- Out of scope: unrelated refactors not required for "Fix Homebrew formula npm install".

## Verification

- State: ok
- Note: Homebrew formula install hotfix verified.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T21:47:58.392Z
- Branch: task/202605012143-NEK3E8/homebrew-formula-install
- Head: bb5048218199

```text
 .../release/render-homebrew-formula-script.test.ts | 74 ++++++++++++++++++++++
 scripts/render-homebrew-formula.mjs                | 15 +++--
 2 files changed, 85 insertions(+), 4 deletions(-)
```

</details>
