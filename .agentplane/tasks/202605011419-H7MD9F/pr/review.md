# PR Review

Created: 2026-05-01T14:20:47.251Z
Branch: task/202605011419-H7MD9F/v0-4-1-release-candidate

## Summary

Prepare v0.4.1 patch release

Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.

## Scope

- In scope: Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.4.1 patch release".

## Verification

### Plan

1. Run `agentplane release plan --patch`. Expected: target is `0.4.1` / `v0.4.1` from current `v0.4.0` baseline.
2. Write and validate `docs/releases/v0.4.1.md` from `v0.4.0..HEAD`. Expected: release notes cover the release range and `node scripts/check-release-notes.mjs --version 0.4.1` passes.
3. Run registry/version gates. Expected: `node scripts/check-npm-version-availability.mjs --version 0.4.1`, `bun run release:parity`, and release candidate preflight pass.
4. Run `agentplane release candidate --push --yes` from the task worktree. Expected: versions and release artifacts are committed on the candidate branch, pushed, and no release tag is created locally before merge.
5. Open/merge the release PR after required hosted checks. Expected: `main` contains the release candidate and the task is closed through the branch_pr finish route.
6. Verify publication evidence. Expected: `v0.4.1` tag, GitHub Release or publish workflow outcome, and npm visibility for `agentplane`, `@agentplaneorg/core`, and `@agentplaneorg/recipes`; if hosted publish is still pending, record the exact workflow/blocker in Findings.

### Current Status

- State: pending
- Note: Not recorded yet.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T17:12:54.724Z
- Branch: task/202605011419-H7MD9F/v0-4-1-release-candidate
- Head: 323b1109a1fb

```text
 .agentplane/config.json                            |   2 +-
 .agentplane/policy/incidents.md                    |   1 +
 README.md                                          |  21 +-
 .../documentation-information-architecture.mdx     |  14 +-
 docs/index.mdx                                     |  23 ++-
 docs/recipes/code-map.mdx                          |  89 +++++++++
 docs/recipes/index.mdx                             | 101 ++++++----
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.4.1.md                            | 220 +++++++++++++++++++++
 docs/user/commands.mdx                             |   9 +-
 docs/user/overview.mdx                             |   5 +-
 docs/user/setup.mdx                                |   7 +-
 docs/user/website-ia.mdx                           |  39 ++--
 docs/{recipes => workflow-guides}/aider.mdx        |   0
 docs/{recipes => workflow-guides}/branch-pr.mdx    |   0
 docs/{recipes => workflow-guides}/claude-code.mdx  |   0
 docs/{recipes => workflow-guides}/codex.mdx        |   0
 docs/{recipes => workflow-guides}/cursor.mdx       |   0
 .../github-actions.mdx                             |   0
 docs/workflow-guides/index.mdx                     |  29 +++
 packages/agentplane/README.md                      |  19 +-
 packages/agentplane/assets/policy/incidents.md     |   1 +
 packages/agentplane/package.json                   |   6 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 scripts/baselines/knip-baseline.json               | 150 ++++++++------
 scripts/check-docs-ia.mjs                          |  14 +-
 website/sidebars.ts                                |  21 +-
 website/src/data/homepage-content.ts               |   9 +-
 31 files changed, 622 insertions(+), 172 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
