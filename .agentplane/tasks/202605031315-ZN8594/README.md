---
id: "202605031315-ZN8594"
title: "Align public positioning in repo README surfaces"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "positioning"
  - "readme"
verify:
  - "bun run docs:site:typecheck"
  - "rg -n 'audit layer|reviewable, reversible|Claude Code|Codex|Cursor|Aider' README.md packages/*/README.md"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T13:15:57.324Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T13:15:44.723Z"
doc_updated_by: "PLANNER"
description: "Rewrite the root README and package README surfaces around the CMO audit's audit-layer positioning, visceral problem framing, social-proof badges, comparison hook, recipes hook, and reduced introductory role taxonomy."
sections:
  Summary: |-
    Align public positioning in repo README surfaces
    
    Rewrite the root README and package README surfaces around the CMO audit's audit-layer positioning, visceral problem framing, social-proof badges, comparison hook, recipes hook, and reduced introductory role taxonomy.
  Scope: |-
    - In scope: Rewrite the root README and package README surfaces around the CMO audit's audit-layer positioning, visceral problem framing, social-proof badges, comparison hook, recipes hook, and reduced introductory role taxonomy.
    - Out of scope: unrelated refactors not required for "Align public positioning in repo README surfaces".
  Plan: "Rewrite only repository README surfaces: root README.md and package README files. Acceptance: intro uses the audit-layer framing, first screen removes maintainer-only badges from the conversion path, examples do not lead with role taxonomy, recipes/comparison hooks are visible, and package READMEs remain truthful to package purpose. Verify with targeted rg plus docs-site typecheck."
  Verify Steps: |-
    1. Review the requested outcome for "Align public positioning in repo README surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Align public positioning in repo README surfaces

Rewrite the root README and package README surfaces around the CMO audit's audit-layer positioning, visceral problem framing, social-proof badges, comparison hook, recipes hook, and reduced introductory role taxonomy.

## Scope

- In scope: Rewrite the root README and package README surfaces around the CMO audit's audit-layer positioning, visceral problem framing, social-proof badges, comparison hook, recipes hook, and reduced introductory role taxonomy.
- Out of scope: unrelated refactors not required for "Align public positioning in repo README surfaces".

## Plan

Rewrite only repository README surfaces: root README.md and package README files. Acceptance: intro uses the audit-layer framing, first screen removes maintainer-only badges from the conversion path, examples do not lead with role taxonomy, recipes/comparison hooks are visible, and package READMEs remain truthful to package purpose. Verify with targeted rg plus docs-site typecheck.

## Verify Steps

1. Review the requested outcome for "Align public positioning in repo README surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
