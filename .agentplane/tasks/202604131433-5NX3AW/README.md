---
id: "202604131433-5NX3AW"
title: "Make Core CI task-artifact exclusions effective"
result_summary: "Merged via PR #279."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T14:34:28.145Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "c15891c14c257d262af016671cc3133891a4ee1f"
  message: "release: Make Core CI task-artifact exclusions effective (5NX3AW) (#279)"
comments:
  -
    author: "CODER"
    body: "Start: make GitHub path-filter exclusions effective so artifact-only hosted-close PRs stop triggering heavy Core CI and prepublish gates."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #279 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-13T14:34:48.646Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make GitHub path-filter exclusions effective so artifact-only hosted-close PRs stop triggering heavy Core CI and prepublish gates."
  -
    type: "status"
    at: "2026-04-13T14:45:08.197Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #279 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T14:45:08.205Z"
doc_updated_by: "INTEGRATOR"
description: "Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail."
sections:
  Summary: |-
    Make Core CI task-artifact exclusions effective
    
    Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.
  Scope: |-
    - In scope: Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.
    - Out of scope: unrelated refactors not required for "Make Core CI task-artifact exclusions effective".
  Plan: |-
    1. Implement the change for "Make Core CI task-artifact exclusions effective".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Inspect the artifact-only hosted-close diff pattern under .agentplane/tasks/** and confirm why Core CI still evaluates core=true without predicate-quantifier: every. Expected: the current workflow semantics reproduce the false-positive heavy-gate behavior seen on PR #278.
    2. Run focused workflow contract tests for .github/workflows/ci.yml, .github/workflows/prepublish.yml, and related release CI assertions. Expected: they pass and explicitly lock predicate-quantifier: every wherever .github/path-filters.yml is consumed.
    3. After this task's task PR merges, inspect its hosted closure PR and confirm the artifact-only tail does not require Core CI test/test-windows. Expected: only the lightweight required checks remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make Core CI task-artifact exclusions effective

Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.

## Scope

- In scope: Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.
- Out of scope: unrelated refactors not required for "Make Core CI task-artifact exclusions effective".

## Plan

1. Implement the change for "Make Core CI task-artifact exclusions effective".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Inspect the artifact-only hosted-close diff pattern under .agentplane/tasks/** and confirm why Core CI still evaluates core=true without predicate-quantifier: every. Expected: the current workflow semantics reproduce the false-positive heavy-gate behavior seen on PR #278.
2. Run focused workflow contract tests for .github/workflows/ci.yml, .github/workflows/prepublish.yml, and related release CI assertions. Expected: they pass and explicitly lock predicate-quantifier: every wherever .github/path-filters.yml is consumed.
3. After this task's task PR merges, inspect its hosted closure PR and confirm the artifact-only tail does not require Core CI test/test-windows. Expected: only the lightweight required checks remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
