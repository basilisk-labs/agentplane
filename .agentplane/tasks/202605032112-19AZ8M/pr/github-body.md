Task: `202605032112-19AZ8M`
Title: Fix v0.4.3 release notes heading

## Summary

Fix v0.4.3 release notes heading

Update docs/releases/v0.4.3.md to satisfy the publish release-notes gate, verify locally, merge through branch_pr, and rerun 0.4.3 publish.

## Scope

- In scope: Update docs/releases/v0.4.3.md to satisfy the publish release-notes gate, verify locally, merge through branch_pr, and rerun 0.4.3 publish.
- Out of scope: unrelated refactors not required for "Fix v0.4.3 release notes heading".

## Verification

- State: ok
- Note: Release notes gate fixed and checked: docs/releases/v0.4.3.md now uses the required Release Notes heading; node scripts/check-release-notes.mjs --tag v0.4.3 exits 0; git diff --check passes. docs:site:build could not run in this worktree because the local website docusaurus binary is not installed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T21:13:13.741Z
- Branch: task/202605032112-19AZ8M/fix-043-release-notes
- Head: 17db19835f0f

```text
 docs/releases/v0.4.3.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
