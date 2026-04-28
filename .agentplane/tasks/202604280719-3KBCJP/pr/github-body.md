## Summary

Release v0.3.29

Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.

## Scope

- In scope: Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.
- Out of scope: unrelated refactors not required for "Release v0.3.29".

## Verification

- State: ok
- Note: Command: release candidate --push --yes, PR #557 hosted checks, Publish to npm run 25045751901, npm view agentplane/@agentplaneorg/core/@agentplaneorg/recipes version, git ls-remote --tags origin v0.3.29, gh release view v0.3.29; Result: pass; Evidence: PR #557 merged into main at a4aa33ce12fedb462fdbb69d48a639101382ddd0, Publish to npm succeeded, npm versions are 0.3.29, tag v0.3.29 points at a4aa33ce12fedb462fdbb69d48a639101382ddd0, GitHub Release v0.3.29 is published; Scope: v0.3.29 release publication and task evidence.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T09:48:05.135Z
- Branch: task/202604280719-3KBCJP/release-v0-3-29
- Head: e72702c145b0

```text
No changes detected.
```

</details>
