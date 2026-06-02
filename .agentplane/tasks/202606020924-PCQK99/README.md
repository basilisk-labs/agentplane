---
id: "202606020924-PCQK99"
title: "Refactor release recovery state into focused modules"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "release"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run release:next-action"
  - "bun run release:parity"
  - "bun run release:recover"
  - "bun test packages/agentplane/src/cli/release-recovery-script.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-02T09:28:10.616Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-02T09:44:59.318Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/release-recovery-script.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts | Result: pass | Evidence: 14 pass, 0 fail. Command: bun run release:recover | Result: pass after copying the base .agentplane/.release/plan artifact into the task worktree as untracked runtime input; output reports v0.6.14 versions bumped without local tag. Command: bun run release:next-action | Result: pass; reports clean tracked working tree needed before release work on this branch. Command: bun run release:parity | Result: pass; core/agentplane/recipes parity 0.6.14. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write scripts/release/check-release-recovery-state.mjs scripts/lib/release-recovery-report.mjs | Result: pass; unchanged. Scope: release recovery script refactor and report helper extraction."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Refactor release recovery state script into focused helpers while preserving current release recovery output and release next-action behavior."
events:
  -
    type: "status"
    at: "2026-06-02T09:39:34.701Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor release recovery state script into focused helpers while preserving current release recovery output and release next-action behavior."
  -
    type: "verify"
    at: "2026-06-02T09:44:59.318Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/release-recovery-script.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts | Result: pass | Evidence: 14 pass, 0 fail. Command: bun run release:recover | Result: pass after copying the base .agentplane/.release/plan artifact into the task worktree as untracked runtime input; output reports v0.6.14 versions bumped without local tag. Command: bun run release:next-action | Result: pass; reports clean tracked working tree needed before release work on this branch. Command: bun run release:parity | Result: pass; core/agentplane/recipes parity 0.6.14. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write scripts/release/check-release-recovery-state.mjs scripts/lib/release-recovery-report.mjs | Result: pass; unchanged. Scope: release recovery script refactor and report helper extraction."
doc_version: 3
doc_updated_at: "2026-06-02T09:44:59.676Z"
doc_updated_by: "CODER"
description: "Split scripts/release/check-release-recovery-state.mjs into focused parser, provider-state, registry, and report helpers without changing CLI output or release recovery semantics. This reduces the largest release-risk script before the next patch publish."
sections:
  Summary: |-
    Refactor release recovery state into focused modules

    Split scripts/release/check-release-recovery-state.mjs into focused parser, provider-state, registry, and report helpers without changing CLI output or release recovery semantics. This reduces the largest release-risk script before the next patch publish.
  Scope: |-
    - In scope: Split scripts/release/check-release-recovery-state.mjs into focused parser, provider-state, registry, and report helpers without changing CLI output or release recovery semantics. This reduces the largest release-risk script before the next patch publish.
    - Out of scope: unrelated refactors not required for "Refactor release recovery state into focused modules".
  Plan: |-
    1. Keep the public release recovery command and JSON/text output stable.
    2. Extract pure helpers from scripts/release/check-release-recovery-state.mjs for release source resolution, registry checks, publication state, and report formatting.
    3. Add or preserve focused tests around release-ready missing artifact, unpublished release-ready SHA, and next-action output.
    4. Run the release recovery and parity checks before PR publication.
    Acceptance: behavior is unchanged, the main recovery script is materially smaller, and release:recover / release:next-action still report the current v0.6.14 state correctly.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/cli/release-recovery-script.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts; expected: existing release recovery and next-action behavior remains green.
    2. Run bun run release:recover; expected: it reports the current release recovery state without output regressions.
    3. Run bun run release:next-action; expected: it still identifies the correct next release action for v0.6.14/v0.6.15 state.
    4. Run bun run release:parity; expected: workspace version parity remains ok.
    5. Run node .agentplane/policy/check-routing.mjs; expected: routing policy remains valid.
    6. Review scripts/release/check-release-recovery-state.mjs line count and extracted helper boundaries; expected: the main script is materially smaller and behavior stays stable.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-02T09:44:59.318Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/release-recovery-script.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts | Result: pass | Evidence: 14 pass, 0 fail. Command: bun run release:recover | Result: pass after copying the base .agentplane/.release/plan artifact into the task worktree as untracked runtime input; output reports v0.6.14 versions bumped without local tag. Command: bun run release:next-action | Result: pass; reports clean tracked working tree needed before release work on this branch. Command: bun run release:parity | Result: pass; core/agentplane/recipes parity 0.6.14. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write scripts/release/check-release-recovery-state.mjs scripts/lib/release-recovery-report.mjs | Result: pass; unchanged. Scope: release recovery script refactor and report helper extraction.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T09:39:34.701Z, excerpt_hash=sha256:8556491b319940c82a7278fe42d9ab9a136f6cf6a6c6dadc2d27f9e0aef8c8db

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606020924-PCQK99-refactor-release-recovery-state-into-focused-mod/.agentplane/tasks/202606020924-PCQK99/blueprint/resolved-snapshot.json
    - old_digest: 07c75fbfc79cf612b6588f3273f55d63d84481863d92f40ab6a2224416ebc835
    - current_digest: 07c75fbfc79cf612b6588f3273f55d63d84481863d92f40ab6a2224416ebc835
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606020924-PCQK99

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor release recovery state into focused modules

Split scripts/release/check-release-recovery-state.mjs into focused parser, provider-state, registry, and report helpers without changing CLI output or release recovery semantics. This reduces the largest release-risk script before the next patch publish.

## Scope

- In scope: Split scripts/release/check-release-recovery-state.mjs into focused parser, provider-state, registry, and report helpers without changing CLI output or release recovery semantics. This reduces the largest release-risk script before the next patch publish.
- Out of scope: unrelated refactors not required for "Refactor release recovery state into focused modules".

## Plan

1. Keep the public release recovery command and JSON/text output stable.
2. Extract pure helpers from scripts/release/check-release-recovery-state.mjs for release source resolution, registry checks, publication state, and report formatting.
3. Add or preserve focused tests around release-ready missing artifact, unpublished release-ready SHA, and next-action output.
4. Run the release recovery and parity checks before PR publication.
Acceptance: behavior is unchanged, the main recovery script is materially smaller, and release:recover / release:next-action still report the current v0.6.14 state correctly.

## Verify Steps

1. Run bun test packages/agentplane/src/cli/release-recovery-script.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts; expected: existing release recovery and next-action behavior remains green.
2. Run bun run release:recover; expected: it reports the current release recovery state without output regressions.
3. Run bun run release:next-action; expected: it still identifies the correct next release action for v0.6.14/v0.6.15 state.
4. Run bun run release:parity; expected: workspace version parity remains ok.
5. Run node .agentplane/policy/check-routing.mjs; expected: routing policy remains valid.
6. Review scripts/release/check-release-recovery-state.mjs line count and extracted helper boundaries; expected: the main script is materially smaller and behavior stays stable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-02T09:44:59.318Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/release-recovery-script.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts | Result: pass | Evidence: 14 pass, 0 fail. Command: bun run release:recover | Result: pass after copying the base .agentplane/.release/plan artifact into the task worktree as untracked runtime input; output reports v0.6.14 versions bumped without local tag. Command: bun run release:next-action | Result: pass; reports clean tracked working tree needed before release work on this branch. Command: bun run release:parity | Result: pass; core/agentplane/recipes parity 0.6.14. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write scripts/release/check-release-recovery-state.mjs scripts/lib/release-recovery-report.mjs | Result: pass; unchanged. Scope: release recovery script refactor and report helper extraction.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T09:39:34.701Z, excerpt_hash=sha256:8556491b319940c82a7278fe42d9ab9a136f6cf6a6c6dadc2d27f9e0aef8c8db

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606020924-PCQK99-refactor-release-recovery-state-into-focused-mod/.agentplane/tasks/202606020924-PCQK99/blueprint/resolved-snapshot.json
- old_digest: 07c75fbfc79cf612b6588f3273f55d63d84481863d92f40ab6a2224416ebc835
- current_digest: 07c75fbfc79cf612b6588f3273f55d63d84481863d92f40ab6a2224416ebc835
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606020924-PCQK99

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
