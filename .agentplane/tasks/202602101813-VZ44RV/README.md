---
id: "202602101813-VZ44RV"
title: "Doctor: align checks with normal installed usage (no repo-src assumptions)"
result_summary: "doctor defaults to install-safe checks and no longer requires monorepo src tree"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101813-QGVNSN"
tags:
  - "cli"
  - "code"
  - "quality"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T04:36:48.464Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved for implementation"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "12d4033abaac580750fee55f56cacddb4377505f"
  message: "🛠 VZ44RV cli: make doctor default to installed-workspace checks"
comments:
  -
    author: "CODER"
    body: "Start: split doctor into default workspace checks and optional dev source-layer checks."
  -
    author: "CODER"
    body: "Verified: doctor now validates normal installed workspaces by default and runs source-layer checks only with --dev. Added unit tests for default/dev behavior and updated CLI help snapshot."
events:
  -
    type: "status"
    at: "2026-02-11T04:36:52.414Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split doctor into default workspace checks and optional dev source-layer checks."
  -
    type: "status"
    at: "2026-02-11T04:43:29.256Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor now validates normal installed workspaces by default and runs source-layer checks only with --dev. Added unit tests for default/dev behavior and updated CLI help snapshot."
doc_version: 2
doc_updated_at: "2026-02-11T04:43:29.256Z"
doc_updated_by: "CODER"
description: "Audit agentplane doctor behavior to ensure it validates a normal user installation/workspace (AGENTS.md, .agentplane/, backends config, managed paths) and does not assume the agentplane monorepo source tree exists. Remove/replace checks that require packages/agentplane/src/{cli,usecases,ports} in non-dev contexts."
id_source: "generated"
---
## Summary

Align `agentplane doctor` with real post-install usage. Default checks must validate an initialized workspace and CLI health without assuming monorepo source folders. Source-layer checks remain available behind an explicit dev-only flag.

## Scope

In scope:
- `packages/agentplane/src/commands/doctor.command.ts`
- New unit tests for doctor behavior
- Help/snapshots impacted by new doctor options

Out of scope:
- Upgrade artifact cleanup behavior (separate task)
- Finish/commit workflow changes (already covered by `QGVNSN`)

## Plan

1. Refactor doctor checks into two groups: workspace checks (default) and source-layer checks (dev mode).
2. Add `--dev` flag and update command spec/help text.
3. Implement workspace checks that do not require `packages/agentplane/src/*`.
4. Add command tests for default mode and `--dev` mode.
5. Run required builds + lint + targeted tests.

## Risks

- Risk: weakening doctor could hide regressions in repository architecture checks.
Mitigation: keep existing layering checks under explicit `--dev` flag.

- Risk: help snapshots can break from option changes.
Mitigation: run related CLI tests and update snapshots only when expected.

## Verify Steps

- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `bun run lint`
- `bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts`
Pass criteria:
- tests pass
- `agentplane doctor` no longer fails solely due to missing `packages/agentplane/src/{cli,usecases,ports}` in non-dev workspaces
- `agentplane doctor --dev` still executes source-layer checks when source tree exists

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit. This restores previous doctor behavior and removes the `--dev` mode split.
