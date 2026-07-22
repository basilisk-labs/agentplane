---
id: "202607221854-YMYYQ8"
title: "Publish the AgentPlane 0.7 architecture and migration guide"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:54:37.465Z"
doc_updated_by: "PLANNER"
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
