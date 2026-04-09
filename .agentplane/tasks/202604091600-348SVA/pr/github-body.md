## Summary

Recover hosted-close-pr merge metadata from remote close branches

Allow task hosted-close-pr to open a closure PR even when base-side pr/meta.json is stale by deriving merge metadata from the remote task-close branch and merged task PR context.

## Scope

- In scope: Allow task hosted-close-pr to open a closure PR even when base-side pr/meta.json is stale by deriving merge metadata from the remote task-close branch and merged task PR context.
- Out of scope: unrelated refactors not required for "Recover hosted-close-pr merge metadata from remote close branches".

## Verification

### Plan

1. Reproduce task hosted-close-pr against a task whose remote task-close branch exists but whose base-side pr/meta.json lacks merge metadata. Expected: the command still resolves merge_sha/source branch and opens or links the closure PR.
2. Run targeted hosted-close-pr/unit tests. Expected: existing explicit-meta behavior stays intact while the remote-branch fallback passes.
3. Verify the closure PR body/title remain deterministic. Expected: no regression in already-supported hosted-close-pr flows.

### Current Status

- State: ok
- Note: Verified: target vitest and eslint passed; hosted-close-pr now recovers merged PR metadata from GitHub when base-side pr meta is stale.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T16:23:56.418Z
- Branch: task/202604091600-348SVA/hosted-close-pr-fallback
- Head: f6f2660e13d4

```text
No changes detected.
```

</details>
