---
id: "202605201152-ATVFPQ"
title: "Define context wiki contract surface"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "context"
  - "docs"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T11:52:52.595Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: defining the context wiki contract surface in the existing context manifest and wiki policy files, then aligning the wiki agent notes to reference that control layer."
events:
  -
    type: "status"
    at: "2026-05-20T11:53:03.295Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: defining the context wiki contract surface in the existing context manifest and wiki policy files, then aligning the wiki agent notes to reference that control layer."
doc_version: 3
doc_updated_at: "2026-05-20T11:53:03.295Z"
doc_updated_by: "DOCS"
description: "Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement."
sections:
  Summary: |-
    Define context wiki contract surface

    Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.
  Scope: |-
    - In scope: Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.
    - Out of scope: unrelated refactors not required for "Define context wiki contract surface".
  Plan: "1. Treat .agentplane/context/agentplane.context.yaml as the machine-readable context contract surface and extend it only with declarative wiki contract fields. 2. Expand .agentplane/context/policies/wiki.rules.md into the human-readable wiki policy: language, frontmatter, source refs, cross-links, topology, glossary, and boundaries. 3. Align context/wiki/AGENTS.md to point agents at those control-layer files without duplicating the full rules. 4. Verify policy routing, context wiki lint, and agentplane doctor; record results in task verification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Define context wiki contract surface". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Define context wiki contract surface". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Define context wiki contract surface

Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.

## Scope

- In scope: Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.
- Out of scope: unrelated refactors not required for "Define context wiki contract surface".

## Plan

1. Treat .agentplane/context/agentplane.context.yaml as the machine-readable context contract surface and extend it only with declarative wiki contract fields. 2. Expand .agentplane/context/policies/wiki.rules.md into the human-readable wiki policy: language, frontmatter, source refs, cross-links, topology, glossary, and boundaries. 3. Align context/wiki/AGENTS.md to point agents at those control-layer files without duplicating the full rules. 4. Verify policy routing, context wiki lint, and agentplane doctor; record results in task verification.

## Verify Steps

PLANNER fallback scaffold for "Define context wiki contract surface". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Define context wiki contract surface". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
