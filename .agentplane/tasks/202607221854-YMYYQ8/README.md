---
id: "202607221854-YMYYQ8"
title: "Publish the AgentPlane 0.7 architecture and migration guide"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607221854-4FNZPG"
tags:
  - "architecture"
  - "docs"
  - "migration"
  - "milestone-rc2"
  - "release"
  - "v0.7"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "bun run docs:cli:check"
  - "bun run docs:site:check"
  - "bun run docs:site:generate:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T23:22:10.769Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T02:33:08.425Z"
  updated_by: "TESTER"
  note: "Command: bun run docs:cli:check && bun run schemas:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs && bun run typescript:toolchain:check. Result: pass. Evidence: generated CLI and schemas fresh, IA/sidebar aligned, routing OK, TypeScript 7.0.2 typecheck and 6.0.3 compiler-API split confirmed. Scope: generated contracts and documentation structure. Command: bunx vitest run [9 SGR/work-order/receipt/supervisor test files]. Result: pass. Evidence: 9 files, 90 tests. Scope: documented direct, context, branch_pr, WorkOrder, SemanticResult, and ExecutionReceipt behavior. Command: bun run docs:site:check && bun run docs:social:check. Result: pass. Evidence: production Docusaurus build, navigation check, design check, and 221/221 social images. Scope: published site surfaces. Command: bun run package:install-smoke. Result: pass. Evidence: installed migration matrix 8/8 and local tarball smoke 202608020230-5EPM2Z. Scope: fresh, 0.6.24, 0.6.26, direct, branch_pr, workflow/task migration and rollback. Command: bun run format:check && git diff --check && git diff --cached --check. Result: pass. Evidence: Prettier and whitespace clean. Scope: final docs diff. Real workflow proof: merge main into YMYYQ8 committed as de63e018d without bypass after the base-sync hook fix."
  attempts: 0
commit:
  hash: "2d8cb2ce0a3672a54530278d4b1d50ad3241bbe7"
  message: "📚 YMYYQ8 docs: publish 0.7 architecture and migration guide"
comments:
  -
    author: "DOCS"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "DOCS"
    body: "Implementation: publish the 0.7 architecture, responsibility boundary, migration and rollback guide, generated site surfaces, navigation, social artifact, and roadmap updates; real base-sync merge completed without hook bypass."
events:
  -
    type: "status"
    at: "2026-08-01T23:22:30.774Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T02:32:42.321Z"
    author: "DOCS"
    from: "DOING"
    to: "DOING"
    note: "Implementation: publish the 0.7 architecture, responsibility boundary, migration and rollback guide, generated site surfaces, navigation, social artifact, and roadmap updates; real base-sync merge completed without hook bypass."
  -
    type: "verify"
    at: "2026-08-02T02:33:08.425Z"
    author: "TESTER"
    state: "ok"
    note: "Command: bun run docs:cli:check && bun run schemas:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs && bun run typescript:toolchain:check. Result: pass. Evidence: generated CLI and schemas fresh, IA/sidebar aligned, routing OK, TypeScript 7.0.2 typecheck and 6.0.3 compiler-API split confirmed. Scope: generated contracts and documentation structure. Command: bunx vitest run [9 SGR/work-order/receipt/supervisor test files]. Result: pass. Evidence: 9 files, 90 tests. Scope: documented direct, context, branch_pr, WorkOrder, SemanticResult, and ExecutionReceipt behavior. Command: bun run docs:site:check && bun run docs:social:check. Result: pass. Evidence: production Docusaurus build, navigation check, design check, and 221/221 social images. Scope: published site surfaces. Command: bun run package:install-smoke. Result: pass. Evidence: installed migration matrix 8/8 and local tarball smoke 202608020230-5EPM2Z. Scope: fresh, 0.6.24, 0.6.26, direct, branch_pr, workflow/task migration and rollback. Command: bun run format:check && git diff --check && git diff --cached --check. Result: pass. Evidence: Prettier and whitespace clean. Scope: final docs diff. Real workflow proof: merge main into YMYYQ8 committed as de63e018d without bypass after the base-sync hook fix."
doc_version: 3
doc_updated_at: "2026-08-02T02:33:09.268Z"
doc_updated_by: "DOCS"
description: "Document the final CLI-versus-agent responsibility boundary, WorkOrder/SemanticResult/Receipt contracts, supervisor flows, knowledge lifecycle, authority model, compatibility window, migration, metrics, and operator recovery."
sections:
  Summary: |-
    Publish the AgentPlane 0.7 architecture and migration guide

    Document the final CLI-versus-agent responsibility boundary, WorkOrder/SemanticResult/Receipt contracts, supervisor flows, knowledge lifecycle, authority model, compatibility window, migration, metrics, and operator recovery.
  Scope: |-
    - In scope: user/developer reference, architecture diagrams, contract/version tables, direct and branch_pr supervised flows, context/retrieval behavior, approval/sandbox model, migration/rollback, deprecations, metrics interpretation, recovery, changelog/roadmap, and generated CLI/schema surfaces.
    - Out of scope: documenting unshipped behavior or using internal report claims without executable proof.
  Plan: |-
    1. Derive final behavior and compatibility claims from merged contracts, schemas, tests, and migration evidence.
    2. Update architecture and responsibility-boundary documentation.
    3. Publish migration/deprecation/rollback and operator recovery guides.
    4. Regenerate CLI/schema/site surfaces and update roadmap/changelog.
    5. Validate links, examples, diagrams, and installed-package commands.
  Verify Steps: |-
    1. Follow the migration guide on clean and 0.6.24 direct/branch_pr fixtures. Expected: commands and outcomes match the automated matrix.
    2. Compare every contract field/version/deprecation claim to generated schema/runtime metadata. Expected: no hand-authored drift.
    3. Validate direct/context/branch_pr diagrams against supervisor operation fixtures. Expected: CLI-owned mechanics and agent-owned semantics are explicit.
    4. Run generated site/CLI checks, full site check, link/IA checks, and policy routing.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T02:33:08.425Z — VERIFY — ok

    By: TESTER

    Note: Command: bun run docs:cli:check && bun run schemas:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs && bun run typescript:toolchain:check. Result: pass. Evidence: generated CLI and schemas fresh, IA/sidebar aligned, routing OK, TypeScript 7.0.2 typecheck and 6.0.3 compiler-API split confirmed. Scope: generated contracts and documentation structure. Command: bunx vitest run [9 SGR/work-order/receipt/supervisor test files]. Result: pass. Evidence: 9 files, 90 tests. Scope: documented direct, context, branch_pr, WorkOrder, SemanticResult, and ExecutionReceipt behavior. Command: bun run docs:site:check && bun run docs:social:check. Result: pass. Evidence: production Docusaurus build, navigation check, design check, and 221/221 social images. Scope: published site surfaces. Command: bun run package:install-smoke. Result: pass. Evidence: installed migration matrix 8/8 and local tarball smoke 202608020230-5EPM2Z. Scope: fresh, 0.6.24, 0.6.26, direct, branch_pr, workflow/task migration and rollback. Command: bun run format:check && git diff --check && git diff --cached --check. Result: pass. Evidence: Prettier and whitespace clean. Scope: final docs diff. Real workflow proof: merge main into YMYYQ8 committed as de63e018d without bypass after the base-sync hook fix.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T02:32:42.321Z, excerpt_hash=sha256:60405b8a0ca51b616614fb64ce1c6ff9f6290d31c75fbf503925769beeaaea59

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-YMYYQ8-publish-the-agentplane-0-7-architecture-and-migr/.agentplane/tasks/202607221854-YMYYQ8/blueprint/resolved-snapshot.json
    - old_digest: 3220ad81f8d25482b359ffb23b97448d1ec41bb3027d02d51b005f3485dabe86
    - current_digest: 3220ad81f8d25482b359ffb23b97448d1ec41bb3027d02d51b005f3485dabe86
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-YMYYQ8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-YMYYQ8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert documentation and generated surfaces together.
    - Restore the previous roadmap/changelog state without altering product code or migration fixtures.
    - Re-run docs generation and link/IA checks.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5319bbdeecb05adc2c436e4039f5046a5bfeb89a"
    version: 1
id_source: "generated"
---
## Summary

Publish the AgentPlane 0.7 architecture and migration guide

Document the final CLI-versus-agent responsibility boundary, WorkOrder/SemanticResult/Receipt contracts, supervisor flows, knowledge lifecycle, authority model, compatibility window, migration, metrics, and operator recovery.

## Scope

- In scope: user/developer reference, architecture diagrams, contract/version tables, direct and branch_pr supervised flows, context/retrieval behavior, approval/sandbox model, migration/rollback, deprecations, metrics interpretation, recovery, changelog/roadmap, and generated CLI/schema surfaces.
- Out of scope: documenting unshipped behavior or using internal report claims without executable proof.

## Plan

1. Derive final behavior and compatibility claims from merged contracts, schemas, tests, and migration evidence.
2. Update architecture and responsibility-boundary documentation.
3. Publish migration/deprecation/rollback and operator recovery guides.
4. Regenerate CLI/schema/site surfaces and update roadmap/changelog.
5. Validate links, examples, diagrams, and installed-package commands.

## Verify Steps

1. Follow the migration guide on clean and 0.6.24 direct/branch_pr fixtures. Expected: commands and outcomes match the automated matrix.
2. Compare every contract field/version/deprecation claim to generated schema/runtime metadata. Expected: no hand-authored drift.
3. Validate direct/context/branch_pr diagrams against supervisor operation fixtures. Expected: CLI-owned mechanics and agent-owned semantics are explicit.
4. Run generated site/CLI checks, full site check, link/IA checks, and policy routing.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T02:33:08.425Z — VERIFY — ok

By: TESTER

Note: Command: bun run docs:cli:check && bun run schemas:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs && bun run typescript:toolchain:check. Result: pass. Evidence: generated CLI and schemas fresh, IA/sidebar aligned, routing OK, TypeScript 7.0.2 typecheck and 6.0.3 compiler-API split confirmed. Scope: generated contracts and documentation structure. Command: bunx vitest run [9 SGR/work-order/receipt/supervisor test files]. Result: pass. Evidence: 9 files, 90 tests. Scope: documented direct, context, branch_pr, WorkOrder, SemanticResult, and ExecutionReceipt behavior. Command: bun run docs:site:check && bun run docs:social:check. Result: pass. Evidence: production Docusaurus build, navigation check, design check, and 221/221 social images. Scope: published site surfaces. Command: bun run package:install-smoke. Result: pass. Evidence: installed migration matrix 8/8 and local tarball smoke 202608020230-5EPM2Z. Scope: fresh, 0.6.24, 0.6.26, direct, branch_pr, workflow/task migration and rollback. Command: bun run format:check && git diff --check && git diff --cached --check. Result: pass. Evidence: Prettier and whitespace clean. Scope: final docs diff. Real workflow proof: merge main into YMYYQ8 committed as de63e018d without bypass after the base-sync hook fix.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T02:32:42.321Z, excerpt_hash=sha256:60405b8a0ca51b616614fb64ce1c6ff9f6290d31c75fbf503925769beeaaea59

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-YMYYQ8-publish-the-agentplane-0-7-architecture-and-migr/.agentplane/tasks/202607221854-YMYYQ8/blueprint/resolved-snapshot.json
- old_digest: 3220ad81f8d25482b359ffb23b97448d1ec41bb3027d02d51b005f3485dabe86
- current_digest: 3220ad81f8d25482b359ffb23b97448d1ec41bb3027d02d51b005f3485dabe86
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-YMYYQ8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-YMYYQ8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert documentation and generated surfaces together.
- Restore the previous roadmap/changelog state without altering product code or migration fixtures.
- Re-run docs generation and link/IA checks.

## Findings
