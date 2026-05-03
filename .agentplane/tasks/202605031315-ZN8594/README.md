---
id: "202605031315-ZN8594"
title: "Align public positioning in repo README surfaces"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
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
  state: "ok"
  updated_at: "2026-05-03T13:30:31.487Z"
  updated_by: "DOCS"
  note: "README/package README surfaces use the audit-layer positioning; targeted text check and diff whitespace check passed. docs:site:typecheck was attempted and failed because this nested worktree resolves node_modules to a parent install without Docusaurus/React packages; no README-specific TypeScript errors were produced."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: align the repository README surfaces with the approved CMO audit positioning before code and website changes."
events:
  -
    type: "status"
    at: "2026-05-03T13:26:42.881Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: align the repository README surfaces with the approved CMO audit positioning before code and website changes."
  -
    type: "verify"
    at: "2026-05-03T13:30:31.487Z"
    author: "DOCS"
    state: "ok"
    note: "README/package README surfaces use the audit-layer positioning; targeted text check and diff whitespace check passed. docs:site:typecheck was attempted and failed because this nested worktree resolves node_modules to a parent install without Docusaurus/React packages; no README-specific TypeScript errors were produced."
doc_version: 3
doc_updated_at: "2026-05-03T13:30:31.490Z"
doc_updated_by: "DOCS"
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
    ### 2026-05-03T13:30:31.487Z — VERIFY — ok
    
    By: DOCS
    
    Note: README/package README surfaces use the audit-layer positioning; targeted text check and diff whitespace check passed. docs:site:typecheck was attempted and failed because this nested worktree resolves node_modules to a parent install without Docusaurus/React packages; no README-specific TypeScript errors were produced.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:26:42.881Z, excerpt_hash=sha256:fe398532fb68f82ac8fbd535b8ec6d6b3dba22fb3005052ab9919252f845a517
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: rg -n 'audit layer|reviewable, reversible|Claude Code|Codex|Cursor|Aider' README.md packages/*/README.md; Result: pass; Evidence: matched root and CLI README audit-layer positioning plus agent compatibility lines; Scope: README.md and packages/*/README.md. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: touched README files. Command: bun run docs:site:typecheck; Result: fail; Evidence: TypeScript cannot resolve @docusaurus/*, react, and @docusaurus/tsconfig from the nested worktree dependency layout; Scope: environment-level website dependency resolution, not README prose.
      Impact: The docs wording atom is complete, but full website verification remains required after website dependencies are available or after the later website/docs atoms run in a properly prepared worktree.
      Resolution: Continue dependent repo-surface work; rerun docs:site:typecheck and docs:site:build before final batch verification.
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
### 2026-05-03T13:30:31.487Z — VERIFY — ok

By: DOCS

Note: README/package README surfaces use the audit-layer positioning; targeted text check and diff whitespace check passed. docs:site:typecheck was attempted and failed because this nested worktree resolves node_modules to a parent install without Docusaurus/React packages; no README-specific TypeScript errors were produced.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:26:42.881Z, excerpt_hash=sha256:fe398532fb68f82ac8fbd535b8ec6d6b3dba22fb3005052ab9919252f845a517

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: rg -n 'audit layer|reviewable, reversible|Claude Code|Codex|Cursor|Aider' README.md packages/*/README.md; Result: pass; Evidence: matched root and CLI README audit-layer positioning plus agent compatibility lines; Scope: README.md and packages/*/README.md. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: touched README files. Command: bun run docs:site:typecheck; Result: fail; Evidence: TypeScript cannot resolve @docusaurus/*, react, and @docusaurus/tsconfig from the nested worktree dependency layout; Scope: environment-level website dependency resolution, not README prose.
  Impact: The docs wording atom is complete, but full website verification remains required after website dependencies are available or after the later website/docs atoms run in a properly prepared worktree.
  Resolution: Continue dependent repo-surface work; rerun docs:site:typecheck and docs:site:build before final batch verification.
