---
id: "202603071710-31BQ6E"
title: "Add publish recovery tooling"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202603071710-WPX3DP"
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T19:56:07.766Z"
  updated_by: "ORCHESTRATOR"
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
    body: "Start: add a read-only release recovery report for partial local publish states and burned-version diagnosis."
events:
  -
    type: "status"
    at: "2026-03-07T19:56:14.101Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a read-only release recovery report for partial local publish states and burned-version diagnosis."
doc_version: 2
doc_updated_at: "2026-03-07T19:56:14.101Z"
doc_updated_by: "CODER"
description: "Provide explicit recovery tools for partial release states such as local tag created but push failed, burned npm version, and release-note drift."
id_source: "generated"
---
## Summary

Add publish recovery tooling

Provide explicit recovery tools for partial release states such as local tag created but push failed, burned npm version, and release-note drift.

## Scope

- In scope: Provide explicit recovery tools for partial release states such as local tag created but push failed, burned npm version, and release-note drift..
- Out of scope: unrelated refactors not required for "Add publish recovery tooling".

## Plan

1. Add a read-only release recovery tool that inspects the latest release plan plus current repo state and reports partial-release states such as local-tag-only apply, release-note drift, and optional burned npm version checks. 2. Expose it as a repository script entrypoint, cover the recovery states with targeted tests, and document the shortest recovery usage in the release docs. 3. Run the new recovery-script tests, lint touched release/script files, rebuild or site-build only where needed, and verify the tool output on a representative temp repo scenario.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `release`

### Checks
1. `bunx vitest run packages/agentplane/src/cli/release-recovery-script.test.ts`
2. `bun run lint:core -- scripts/check-release-recovery-state.mjs packages/agentplane/src/cli/release-recovery-script.test.ts`
3. `bun run --cwd website build`
4. `node scripts/check-release-recovery-state.mjs --help`

### Evidence / Commands
- Record whether the recovery tool reports local-tag-only state, release-note drift, and optional registry/burned-version checking in a deterministic way.

### Pass criteria
- Partial local release states are reported with explicit next actions.
- Burned npm version checks are available as an opt-in path.
- The tool remains read-only.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Keep the tool read-only; recovery actions should be suggested explicitly, not auto-executed.
- Make registry/burned-version inspection opt-in so the tool can stay usable without implicit network access.
- Prefer one latest-plan report over scattered manual git/npm checks.
