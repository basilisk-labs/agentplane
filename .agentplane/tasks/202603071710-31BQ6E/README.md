---
id: "202603071710-31BQ6E"
title: "Add publish recovery tooling"
result_summary: "Added read-only release recovery tooling for partial publish states."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-07T20:02:03.674Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/release-recovery-script.test.ts; Result: pass; Evidence: 4 tests passed, covering local-tag-not-pushed, release-note drift, opt-in burned-version detection, and help output. Scope: release recovery tooling. Command: bun run lint:core -- scripts/check-release-recovery-state.mjs packages/agentplane/src/cli/release-recovery-script.test.ts; Result: pass; Evidence: eslint clean on the new recovery script and its targeted tests. Scope: recovery script implementation. Command: bun run --cwd website build; Result: pass; Evidence: docs site still builds after release recovery docs sync. Scope: touched release docs surfaces. Command: node scripts/check-release-recovery-state.mjs --help; Result: pass; Evidence: help text renders the recovery options including --check-registry and --json. Scope: public recovery tool entrypoint."
commit:
  hash: "f6865b69bd1fb515f7830008320714bcb5f772df"
  message: "🚑 31BQ6E release: add recovery report tooling"
comments:
  -
    author: "CODER"
    body: "Start: add a read-only release recovery report for partial local publish states and burned-version diagnosis."
  -
    author: "CODER"
    body: "Verified: the new recovery report detects partial local release states and offers explicit next actions without mutating tags, versions, or notes."
events:
  -
    type: "status"
    at: "2026-03-07T19:56:14.101Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a read-only release recovery report for partial local publish states and burned-version diagnosis."
  -
    type: "verify"
    at: "2026-03-07T20:02:03.674Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/release-recovery-script.test.ts; Result: pass; Evidence: 4 tests passed, covering local-tag-not-pushed, release-note drift, opt-in burned-version detection, and help output. Scope: release recovery tooling. Command: bun run lint:core -- scripts/check-release-recovery-state.mjs packages/agentplane/src/cli/release-recovery-script.test.ts; Result: pass; Evidence: eslint clean on the new recovery script and its targeted tests. Scope: recovery script implementation. Command: bun run --cwd website build; Result: pass; Evidence: docs site still builds after release recovery docs sync. Scope: touched release docs surfaces. Command: node scripts/check-release-recovery-state.mjs --help; Result: pass; Evidence: help text renders the recovery options including --check-registry and --json. Scope: public recovery tool entrypoint."
  -
    type: "status"
    at: "2026-03-07T20:02:12.664Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the new recovery report detects partial local release states and offers explicit next actions without mutating tags, versions, or notes."
doc_version: 3
doc_updated_at: "2026-03-07T20:02:12.664Z"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T20:02:03.674Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/release-recovery-script.test.ts; Result: pass; Evidence: 4 tests passed, covering local-tag-not-pushed, release-note drift, opt-in burned-version detection, and help output. Scope: release recovery tooling. Command: bun run lint:core -- scripts/check-release-recovery-state.mjs packages/agentplane/src/cli/release-recovery-script.test.ts; Result: pass; Evidence: eslint clean on the new recovery script and its targeted tests. Scope: recovery script implementation. Command: bun run --cwd website build; Result: pass; Evidence: docs site still builds after release recovery docs sync. Scope: touched release docs surfaces. Command: node scripts/check-release-recovery-state.mjs --help; Result: pass; Evidence: help text renders the recovery options including --check-registry and --json. Scope: public recovery tool entrypoint.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T19:56:14.101Z, excerpt_hash=sha256:fb4bcda2a095d25a17fb50d20db1aeb0c199c7a06837029e6b99730d62a763f7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Keep the tool read-only; recovery actions should be suggested explicitly, not auto-executed.
- Make registry/burned-version inspection opt-in so the tool can stay usable without implicit network access.
- Prefer one latest-plan report over scattered manual git/npm checks.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
