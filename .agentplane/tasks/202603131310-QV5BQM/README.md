---
id: "202603131310-QV5BQM"
title: "Add doctor and normalize support for projection drift"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
depends_on:
  - "202603131309-JYPPQS"
  - "202603131310-0KHGZD"
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T17:34:24.270Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T17:40:46.495Z"
  updated_by: "CODER"
  note: "Doctor now reports task README projection drift when canonical frontmatter sections and rendered body diverge, local backend normalizeTasks repairs that drift deterministically, and doctor/local-backend/workflow-maintenance suites plus both builds are green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: teach doctor and local task normalization to detect and repair projection drift between canonical frontmatter sections and the generated one-file task body."
events:
  -
    type: "status"
    at: "2026-03-13T17:34:29.125Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: teach doctor and local task normalization to detect and repair projection drift between canonical frontmatter sections and the generated one-file task body."
  -
    type: "verify"
    at: "2026-03-13T17:40:46.495Z"
    author: "CODER"
    state: "ok"
    note: "Doctor now reports task README projection drift when canonical frontmatter sections and rendered body diverge, local backend normalizeTasks repairs that drift deterministically, and doctor/local-backend/workflow-maintenance suites plus both builds are green."
doc_version: 3
doc_updated_at: "2026-03-13T17:40:46.497Z"
doc_updated_by: "CODER"
description: "Detect and repair drift between canonical one-file task state and generated task body via doctor and normalize flows."
sections:
  Summary: |-
    Add doctor and normalize support for projection drift
    
    Detect and repair drift between canonical one-file task state and generated task body via doctor and normalize flows.
  Scope: |-
    - In scope: Detect and repair drift between canonical one-file task state and generated task body via doctor and normalize flows.
    - Out of scope: unrelated refactors not required for "Add doctor and normalize support for projection drift".
  Plan: |-
    1. Implement the change for "Add doctor and normalize support for projection drift".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: doctor reports projection drift when canonical sections/body diverge, and normalization/local backend repair paths are green.
    2. Run `./node_modules/.bin/eslint packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts`. Expected: touched runtime and regression files lint cleanly.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with the projection-drift detection and repair changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-13T17:40:46.495Z — VERIFY — ok
    
    By: CODER
    
    Note: Doctor now reports task README projection drift when canonical frontmatter sections and rendered body diverge, local backend normalizeTasks repairs that drift deterministically, and doctor/local-backend/workflow-maintenance suites plus both builds are green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T17:34:29.126Z, excerpt_hash=sha256:b308ea1ab5586920dafc8d261df3c078f7f2c5b258b455b3f4b229e7150d0e35
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add doctor and normalize support for projection drift

Detect and repair drift between canonical one-file task state and generated task body via doctor and normalize flows.

## Scope

- In scope: Detect and repair drift between canonical one-file task state and generated task body via doctor and normalize flows.
- Out of scope: unrelated refactors not required for "Add doctor and normalize support for projection drift".

## Plan

1. Implement the change for "Add doctor and normalize support for projection drift".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: doctor reports projection drift when canonical sections/body diverge, and normalization/local backend repair paths are green.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts`. Expected: touched runtime and regression files lint cleanly.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with the projection-drift detection and repair changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T17:40:46.495Z — VERIFY — ok

By: CODER

Note: Doctor now reports task README projection drift when canonical frontmatter sections and rendered body diverge, local backend normalizeTasks repairs that drift deterministically, and doctor/local-backend/workflow-maintenance suites plus both builds are green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T17:34:29.126Z, excerpt_hash=sha256:b308ea1ab5586920dafc8d261df3c078f7f2c5b258b455b3f4b229e7150d0e35

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
