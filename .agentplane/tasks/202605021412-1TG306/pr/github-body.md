Task: `202605021412-1TG306`
Title: Document standalone release channel operations

## Summary

Document standalone release channel operations

Update release and publishing docs with the standalone artifact architecture, Homebrew/Scoop/setup-action install behavior, embedded Node maintenance policy, verification commands, recovery steps, and release DoD changes.

## Scope

- In scope: Update release and publishing docs with the standalone artifact architecture, Homebrew/Scoop/setup-action install behavior, embedded Node maintenance policy, verification commands, recovery steps, and release DoD changes.
- Out of scope: unrelated refactors not required for "Document standalone release channel operations".

## Verification

- State: ok
- Note: Passed: agentplane task verify-show 202605021412-1TG306; bun run docs:cli:check; bun run docs:scripts:check; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T17:52:30.602Z
- Branch: task/202605021412-1TG306/standalone-release-docs
- Head: 09042f30910d

```text
 docs/developer/release-and-publishing.mdx | 43 ++++++++++++++++++++-----------
 docs/releases/v0.4.1.md                   |  7 +++++
 2 files changed, 35 insertions(+), 15 deletions(-)
```

</details>
