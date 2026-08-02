---
id: "202607221854-YMYYQ8"
title: "Publish the AgentPlane 0.7 architecture and migration guide"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 8
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-08-02T02:32:42.321Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert documentation and generated surfaces together.
- Restore the previous roadmap/changelog state without altering product code or migration fixtures.
- Re-run docs generation and link/IA checks.

## Findings
