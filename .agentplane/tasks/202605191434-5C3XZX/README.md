---
id: "202605191434-5C3XZX"
title: "Leave context raw scaffold empty"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T14:34:41.762Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T14:48:25.783Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for focused context scaffold change."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T14:48:25.783Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for focused context scaffold change."
  evaluated_sha: "81a3ed59446b0e0fbdf663711e789c53ec915369"
  blueprint_digest: "7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca"
  evidence_refs:
    - ".agentplane/tasks/202605191434-5C3XZX/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191434-5C3XZX-empty-raw-context/.agentplane/tasks/202605191434-5C3XZX/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: updating the local context scaffold so context/raw stays an empty user-owned source tree while preserving ingestion of arbitrary user-created raw hierarchy and focused context verification."
events:
  -
    type: "status"
    at: "2026-05-19T14:35:28.815Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: updating the local context scaffold so context/raw stays an empty user-owned source tree while preserving ingestion of arbitrary user-created raw hierarchy and focused context verification."
  -
    type: "verify"
    at: "2026-05-19T14:47:56.924Z"
    author: "CODER"
    state: "ok"
    note: "Implemented empty context/raw scaffold and removed raw/private as a reserved private source path."
  -
    type: "verify"
    at: "2026-05-19T14:48:25.783Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for focused context scaffold change."
doc_version: 3
doc_updated_at: "2026-05-19T14:48:26.102Z"
doc_updated_by: "CODER"
description: "Stop creating opinionated context/raw/private, research, and specs folders during context init. Keep context/raw as an empty user-owned source tree and preserve ingestion/reindex behavior for arbitrary user-created hierarchy under context/raw."
sections:
  Summary: |-
    Leave context raw scaffold empty

    Stop creating opinionated context/raw/private, research, and specs folders during context init. Keep context/raw as an empty user-owned source tree and preserve ingestion/reindex behavior for arbitrary user-created hierarchy under context/raw.
  Scope: |-
    - In scope: Stop creating opinionated context/raw/private, research, and specs folders during context init. Keep context/raw as an empty user-owned source tree and preserve ingestion/reindex behavior for arbitrary user-created hierarchy under context/raw.
    - Out of scope: unrelated refactors not required for "Leave context raw scaffold empty".
  Plan: "1. Inspect current context init scaffold, private/raw filtering, docs, and tests. 2. Change context init so it creates only an empty context/raw root, without raw/private, raw/research, or raw/specs .gitkeep files. 3. Update docs/help/tests to state that users own the hierarchy under context/raw and AgentPlane reads arbitrary nested text sources while preserving path hierarchy. 4. Keep privacy filtering only as an optional compatibility behavior for user-created context/raw/private paths if existing commands still expose it, unless implementation shows the private mode can be removed safely within scope. 5. Verify with focused context init/release-readiness tests, generated docs freshness if needed, routing, and doctor."
  Verify Steps: |-
    1. Run `bun run build`. Expected: TypeScript and package bundles build successfully after context command/spec changes.
    2. Run `bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts`. Expected: context init creates only minimal wiki pages plus `context/raw/.gitkeep`, reindex includes arbitrary user-created raw hierarchy, and blueprint gates remain valid.
    3. Run `bun run docs:cli:check`. Expected: generated CLI reference is fresh and no `--include-private` option remains.
    4. Run `node .agentplane/policy/check-routing.mjs`, `ap doctor`, `bun run format:check`, and `git diff --check`. Expected: routing, workspace diagnostics, formatting, and whitespace checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T14:47:56.924Z — VERIFY — ok

    By: CODER

    Note: Implemented empty context/raw scaffold and removed raw/private as a reserved private source path.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:35:28.815Z, excerpt_hash=sha256:9f3124b39e95ecbc15afe7365ffeaa269981720538ed194d6f4fef7fd7054b43

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191434-5C3XZX-empty-raw-context/.agentplane/tasks/202605191434-5C3XZX/blueprint/resolved-snapshot.json
    - old_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
    - current_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191434-5C3XZX

    ### 2026-05-19T14:48:25.783Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for focused context scaffold change.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:47:57.002Z, excerpt_hash=sha256:9f3124b39e95ecbc15afe7365ffeaa269981720538ed194d6f4fef7fd7054b43

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191434-5C3XZX-empty-raw-context/.agentplane/tasks/202605191434-5C3XZX/blueprint/resolved-snapshot.json
    - old_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
    - current_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191434-5C3XZX

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun run build. Result: pass. Evidence: tsc -b and package bundle builds completed successfully; task verify-show also refreshed framework dev bootstrap after ingest.ts changed. Scope: TypeScript and bundle build for changed context command/runtime surfaces. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts. Result: pass. Evidence: 39 pass, 0 fail; release-readiness confirms minimal raw scaffold and arbitrary user-created raw hierarchy indexing. Scope: context init, reindex, maximum assimilation blueprint gates. Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date after removing --include-private. Scope: generated CLI docs. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway/routing. Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings. Scope: workspace/runtime diagnostics. Command: bun run format:check and git diff --check. Result: pass. Evidence: Prettier reports all matched files use code style; git diff --check produced no output. Scope: formatting and whitespace.
      Impact: context init now creates only context/raw/.gitkeep plus minimal wiki artifacts; AgentPlane reads all user-created hierarchy under context/raw/**, including any folder named private as ordinary raw source content.
      Resolution: Removed --include-private option and private-path filtering, updated docs/generated CLI reference/assets/policy text, and adjusted tests to assert arbitrary raw hierarchy is indexed.

    - Observation: Reviewed changed scope and verification evidence: build, focused context/blueprint tests, generated CLI docs check, routing, doctor, format, and whitespace checks passed. The diff removes the reserved raw/private path and keeps context/raw as a user-owned hierarchy without widening raw mutation permissions.
      Impact: Residual risk is limited to users who relied on context/raw/private being automatically excluded; this is the intended contract change requested for user-owned raw hierarchy.
      Resolution: No rework required.
id_source: "generated"
---
## Summary

Leave context raw scaffold empty

Stop creating opinionated context/raw/private, research, and specs folders during context init. Keep context/raw as an empty user-owned source tree and preserve ingestion/reindex behavior for arbitrary user-created hierarchy under context/raw.

## Scope

- In scope: Stop creating opinionated context/raw/private, research, and specs folders during context init. Keep context/raw as an empty user-owned source tree and preserve ingestion/reindex behavior for arbitrary user-created hierarchy under context/raw.
- Out of scope: unrelated refactors not required for "Leave context raw scaffold empty".

## Plan

1. Inspect current context init scaffold, private/raw filtering, docs, and tests. 2. Change context init so it creates only an empty context/raw root, without raw/private, raw/research, or raw/specs .gitkeep files. 3. Update docs/help/tests to state that users own the hierarchy under context/raw and AgentPlane reads arbitrary nested text sources while preserving path hierarchy. 4. Keep privacy filtering only as an optional compatibility behavior for user-created context/raw/private paths if existing commands still expose it, unless implementation shows the private mode can be removed safely within scope. 5. Verify with focused context init/release-readiness tests, generated docs freshness if needed, routing, and doctor.

## Verify Steps

1. Run `bun run build`. Expected: TypeScript and package bundles build successfully after context command/spec changes.
2. Run `bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts`. Expected: context init creates only minimal wiki pages plus `context/raw/.gitkeep`, reindex includes arbitrary user-created raw hierarchy, and blueprint gates remain valid.
3. Run `bun run docs:cli:check`. Expected: generated CLI reference is fresh and no `--include-private` option remains.
4. Run `node .agentplane/policy/check-routing.mjs`, `ap doctor`, `bun run format:check`, and `git diff --check`. Expected: routing, workspace diagnostics, formatting, and whitespace checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T14:47:56.924Z — VERIFY — ok

By: CODER

Note: Implemented empty context/raw scaffold and removed raw/private as a reserved private source path.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:35:28.815Z, excerpt_hash=sha256:9f3124b39e95ecbc15afe7365ffeaa269981720538ed194d6f4fef7fd7054b43

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191434-5C3XZX-empty-raw-context/.agentplane/tasks/202605191434-5C3XZX/blueprint/resolved-snapshot.json
- old_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
- current_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191434-5C3XZX

### 2026-05-19T14:48:25.783Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for focused context scaffold change.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:47:57.002Z, excerpt_hash=sha256:9f3124b39e95ecbc15afe7365ffeaa269981720538ed194d6f4fef7fd7054b43

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191434-5C3XZX-empty-raw-context/.agentplane/tasks/202605191434-5C3XZX/blueprint/resolved-snapshot.json
- old_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
- current_digest: 7aa241233800b1c89a652e333b2aa914730ec9dee95b11f7e667a1ea920aaeca
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191434-5C3XZX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun run build. Result: pass. Evidence: tsc -b and package bundle builds completed successfully; task verify-show also refreshed framework dev bootstrap after ingest.ts changed. Scope: TypeScript and bundle build for changed context command/runtime surfaces. Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/validate.test.ts. Result: pass. Evidence: 39 pass, 0 fail; release-readiness confirms minimal raw scaffold and arbitrary user-created raw hierarchy indexing. Scope: context init, reindex, maximum assimilation blueprint gates. Command: bun run docs:cli:check. Result: pass. Evidence: cli-reference.generated.mdx is up to date after removing --include-private. Scope: generated CLI docs. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy gateway/routing. Command: ap doctor. Result: pass. Evidence: doctor OK with 0 errors and 0 warnings. Scope: workspace/runtime diagnostics. Command: bun run format:check and git diff --check. Result: pass. Evidence: Prettier reports all matched files use code style; git diff --check produced no output. Scope: formatting and whitespace.
  Impact: context init now creates only context/raw/.gitkeep plus minimal wiki artifacts; AgentPlane reads all user-created hierarchy under context/raw/**, including any folder named private as ordinary raw source content.
  Resolution: Removed --include-private option and private-path filtering, updated docs/generated CLI reference/assets/policy text, and adjusted tests to assert arbitrary raw hierarchy is indexed.

- Observation: Reviewed changed scope and verification evidence: build, focused context/blueprint tests, generated CLI docs check, routing, doctor, format, and whitespace checks passed. The diff removes the reserved raw/private path and keeps context/raw as a user-owned hierarchy without widening raw mutation permissions.
  Impact: Residual risk is limited to users who relied on context/raw/private being automatically excluded; this is the intended contract change requested for user-owned raw hierarchy.
  Resolution: No rework required.
