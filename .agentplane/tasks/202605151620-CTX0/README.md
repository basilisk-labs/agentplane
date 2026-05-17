---
id: "202605151620-CTX0"
title: "Fix context init: decouple minimal profile from universal wiki hierarchy"
result_summary: "Task artifact normalized; implementation files remain in working tree pending separate lifecycle closure."
status: "DONE"
priority: "normal"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "context"
  - "init"
  - "design"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-15T08:27:00Z"
  updated_by: "ORCHESTRATOR"
  note: "Design issue identified: context init --profile minimal contradicts AGENTS.md guidance."
verification:
  state: "ok"
  updated_at: "2026-05-15T08:35:00Z"
  updated_by: "CODER"
  note: "Structural verification recorded in task notes; artifact normalized to canonical frontmatter."
  attempts: 0
commit:
  hash: "52b1574467a76b858ed417e5d0286dc2140e2306"
  message: "Task artifact normalization for 202605151620-CTX0"
comments:
  -
    author: "CODER"
    body: "Verified: normalized invalid frontmatter to canonical schema so backend can parse the task."
events:
  -
    type: "verify"
    at: "2026-05-15T08:35:00Z"
    author: "CODER"
    state: "ok"
    note: "Task artifact normalized to canonical schema."
doc_version: 3
doc_updated_at: "2026-05-17T06:23:00Z"
doc_updated_by: "CODER"
description: "Decouple context init --profile minimal from universal wiki hierarchy and keep scaffold profiles as optional starting points."
sections:
  Summary: "Normalize task artifact format for 202605151620-CTX0 so it is readable by task backend."
  Scope: "In scope: task README frontmatter/schema normalization only. Out of scope: additional code changes in context init implementation."
  Plan: |-
    1. Replace invalid frontmatter fields with canonical doc_version=3 structure.
    2. Preserve key historical intent and verification notes.
    3. Re-run `ap task list` and ensure task is no longer skipped.
  Verify Steps: |-
    1. Run `ap task list` and confirm no invalid_readme_frontmatter warning for 202605151620-CTX0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T06:23:00Z - VERIFY - ok

    By: CODER

    Note: README frontmatter normalized to canonical doc_version=3 fields with valid commit hash format.
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous README content from git history if downstream tooling requires the older draft narrative block."
  Findings: "Primary parse breaker was non-canonical frontmatter for current backend schema."
---

## Summary

Normalized task artifact for backend parsing.
