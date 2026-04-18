## Summary

Standardize git identity and commit message contract

Ensure commits use one canonical git author identity sourced from the user's global git settings and enforce one repository commit subject format through documented policy and tooling.

## Scope

- In scope: Ensure commits use one canonical git author identity sourced from the user's global git settings and enforce one repository commit subject format through documented policy and tooling.
- Out of scope: unrelated refactors not required for "Standardize git identity and commit message contract".

## Verification

- State: ok
- Note: Repository-managed commit paths now resolve canonical git identity from global git config and document one commit subject contract; guard tests, typecheck, and lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:19:21.209Z
- Branch: task/202604180701-A83DS4/commit-contract-standardization
- Head: 28fb26e8e8a8

```text
 packages/agentplane/src/commands/commit.spec.ts    |  2 +
 .../agentplane/src/commands/guard/impl/commands.ts |  5 +-
 .../src/commands/guard/impl/commands.unit.test.ts  |  7 +-
 .../src/commands/guard/impl/comment-commit.ts      |  3 +-
 .../agentplane/src/commands/guard/impl/env.test.ts | 74 ++++++++++++++++++++++
 packages/agentplane/src/commands/guard/impl/env.ts | 48 ++++++++++++++
 .../src/commands/pr/internal/auto-commit.ts        |  3 +-
 7 files changed, 138 insertions(+), 4 deletions(-)
```

</details>
