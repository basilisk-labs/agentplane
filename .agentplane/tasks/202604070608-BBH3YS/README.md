---
id: "202604070608-BBH3YS"
title: "Add first-class command to append structured Findings incident candidates"
result_summary: "integrate: squash task/202604070608-BBH3YS/findings-append-command"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T06:15:46.205Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T06:28:45.125Z"
  updated_by: "CODER"
  note: "Focused findings command tests and eslint passed; task findings add now appends structured incident-ready blocks and incidents collect reads them directly."
commit:
  hash: "3b78be75fe42c268bcd405a41eb42060d75e2a3a"
  message: "📝 BBH3YS task: refresh PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: add a first-class task command for appending structured Findings incident candidates without manual full-doc editing."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604070608-BBH3YS/pr."
events:
  -
    type: "status"
    at: "2026-04-07T06:16:40.242Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a first-class task command for appending structured Findings incident candidates without manual full-doc editing."
  -
    type: "verify"
    at: "2026-04-07T06:28:45.125Z"
    author: "CODER"
    state: "ok"
    note: "Focused findings command tests and eslint passed; task findings add now appends structured incident-ready blocks and incidents collect reads them directly."
  -
    type: "status"
    at: "2026-04-07T07:36:29.993Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604070608-BBH3YS/pr."
doc_version: 3
doc_updated_at: "2026-04-07T07:36:30.002Z"
doc_updated_by: "INTEGRATOR"
description: "Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing."
sections:
  Summary: |-
    Add first-class command to append structured Findings incident candidates
    
    Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.
  Scope: |-
    - In scope: Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.
    - Out of scope: unrelated refactors not required for "Add first-class command to append structured Findings incident candidates".
  Plan: "1. Trace the current task doc editing path and pick the minimal command surface for appending a structured Findings block without raw full-doc edits. 2. Implement a task-scoped append command that writes canonical Observation/Impact/Resolution fields plus optional Promotion/Fixability/Incident* metadata into the active Findings section. 3. Add focused CLI tests for v3 task docs, verify the appended block shape, and run lint/tests for touched command/doc helpers."
  Verify Steps: |-
    1. Run a focused CLI test that appends a structured Findings block to a v3 task. Expected: the task README gains a canonical Observation/Impact/Resolution block in ## Findings without manual full-doc replacement.
    2. Run a focused CLI test with optional external incident metadata. Expected: Promotion/Fixability/Incident* fields serialize in a shape that incidents collect can parse directly.
    3. Run eslint and the touched task/incident CLI test files. Expected: touched checks pass with no regressions in task doc mutation behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T06:28:45.125Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused findings command tests and eslint passed; task findings add now appends structured incident-ready blocks and incidents collect reads them directly.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T06:28:21.872Z, excerpt_hash=sha256:8b56f2c24d62594117761f21d0fc858a6e9cc0f37be5029a2484124d8b4ba6c9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Structured incident promotion depended on manual Findings replacement.
      Impact: Operators skipped reusable incident entries, so incidents.md stayed stale.
      Resolution: Add an append-only task findings command with incident metadata flags.
id_source: "generated"
---
## Summary

Add first-class command to append structured Findings incident candidates

Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.

## Scope

- In scope: Provide an ergonomic task CLI path to append structured Findings blocks, including external incident metadata, so incident promotion does not depend on manual full-doc editing.
- Out of scope: unrelated refactors not required for "Add first-class command to append structured Findings incident candidates".

## Plan

1. Trace the current task doc editing path and pick the minimal command surface for appending a structured Findings block without raw full-doc edits. 2. Implement a task-scoped append command that writes canonical Observation/Impact/Resolution fields plus optional Promotion/Fixability/Incident* metadata into the active Findings section. 3. Add focused CLI tests for v3 task docs, verify the appended block shape, and run lint/tests for touched command/doc helpers.

## Verify Steps

1. Run a focused CLI test that appends a structured Findings block to a v3 task. Expected: the task README gains a canonical Observation/Impact/Resolution block in ## Findings without manual full-doc replacement.
2. Run a focused CLI test with optional external incident metadata. Expected: Promotion/Fixability/Incident* fields serialize in a shape that incidents collect can parse directly.
3. Run eslint and the touched task/incident CLI test files. Expected: touched checks pass with no regressions in task doc mutation behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T06:28:45.125Z — VERIFY — ok

By: CODER

Note: Focused findings command tests and eslint passed; task findings add now appends structured incident-ready blocks and incidents collect reads them directly.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T06:28:21.872Z, excerpt_hash=sha256:8b56f2c24d62594117761f21d0fc858a6e9cc0f37be5029a2484124d8b4ba6c9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Structured incident promotion depended on manual Findings replacement.
  Impact: Operators skipped reusable incident entries, so incidents.md stayed stale.
  Resolution: Add an append-only task findings command with incident metadata flags.
