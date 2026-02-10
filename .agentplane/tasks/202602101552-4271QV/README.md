---
id: "202602101552-4271QV"
title: "Release: apply version bump + tag from agent-written notes"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "release"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement agentplane release apply (bump versions + validate notes + tag)"
events:
  -
    type: "status"
    at: "2026-02-10T16:18:29.440Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement agentplane release apply (bump versions + validate notes + tag)"
doc_version: 2
doc_updated_at: "2026-02-10T16:36:13.142Z"
doc_updated_by: "CODER"
description: "Add agentplane release apply to bump versions, validate docs/releases/vX.Y.Z.md, commit, and create git tag for publish workflow."
id_source: "generated"
---
## Summary

Add `agentplane release apply` to apply a prepared release plan: validate agent-written release notes, bump package versions, commit, and create a git tag for the publish workflow.

## Scope

- In scope: `packages/agentplane/src/commands/release/apply.command.ts`, `packages/agentplane/src/commands/release/apply.test.ts`, `packages/agentplane/src/cli/run-cli/command-catalog.ts`, help snapshots.\n- Out of scope: publishing to npm/GitHub (handled by existing CI workflow), auto-authoring release notes.

## Plan

1. Implement `release apply` command to read `version.json` from a release plan directory and require `docs/releases/<tag>.md`.\n2. Validate release notes minimally (Release Notes heading, >=3 bullets, English-only) to match repo checks.\n3. Bump versions in `packages/core/package.json` and `packages/agentplane/package.json` (idempotent if already bumped).\n4. Stage + commit changes (if any) and create a git tag `vX.Y.Z` (refuse to overwrite).\n5. Register in command catalog and update help snapshots + add unit test.

## Risks

- Risk: tagging the wrong version or tagging twice. Mitigation: validate `nextTag` format, refuse overwriting existing tags, ensure package versions match the plan.\n- Risk: release notes format mismatch vs CI rules. Mitigation: local validation (heading, bullet count, no Cyrillic).\n- Risk: accidental remote push. Mitigation: require `--yes` for `--push`.

## Verification

- bun run ci (format:check, typecheck, lint, vitest --coverage): OK\n- bun run release:check (core/agentplane build + npm pack --dry-run): OK

## Rollback Plan

1. If a release commit was created: `git revert <commit>` (or `git reset --hard` only with explicit user intent).\n2. Delete the tag locally: `git tag -d vX.Y.Z`.\n3. If already pushed: delete remote tag: `git push <remote> :refs/tags/vX.Y.Z`, then push the revert commit.

## Verify Steps

### Scope
- CLI: new `agentplane release apply`
- Version bump: `packages/core/package.json`, `packages/agentplane/package.json`
- Release notes validation: `docs/releases/vX.Y.Z.md`

### Checks
- `bun run ci`
- `bun run release:check`

### Pass criteria
- `agentplane release apply` updates versions and creates a tag without breaking CI/publish workflow checks.
- `bun run ci` exits 0.
