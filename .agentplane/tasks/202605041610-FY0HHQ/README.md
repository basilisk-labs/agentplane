---
id: "202605041610-FY0HHQ"
title: "Prune legacy v0.3 archive navigation"
result_summary: "Merged via PR #863."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T16:16:46.874Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T16:25:25.265Z"
  updated_by: "DOCS"
  note: "Command: rg -n archive/v0-3|framework-refactor-program|cli-bug-ledger-v0-3 docs/index.mdx website/sidebars.ts docs/developer/architecture.mdx. Result: pass. Evidence: no active navigation references remain. Command: node scripts/check-docs-ia.mjs. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run docs:site:typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Note: extra docs:site:build compiled client/server but failed during SSG on existing duplicate / route default-export issue; not introduced by archive navigation cleanup."
commit:
  hash: "c9d936ca997544bc04dfae3edb1aeef2fdcedf97"
  message: "Merge pull request #863 from basilisk-labs/task/202605041610-FY0HHQ/docs-legacy-prune"
comments:
  -
    author: "DOCS"
    body: "Start: prune legacy v0.3 archive navigation in the primary batch worktree while preserving release notes and ADR history."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #863 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T16:17:33.965Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: prune legacy v0.3 archive navigation in the primary batch worktree while preserving release notes and ADR history."
  -
    type: "verify"
    at: "2026-05-04T16:25:25.265Z"
    author: "DOCS"
    state: "ok"
    note: "Command: rg -n archive/v0-3|framework-refactor-program|cli-bug-ledger-v0-3 docs/index.mdx website/sidebars.ts docs/developer/architecture.mdx. Result: pass. Evidence: no active navigation references remain. Command: node scripts/check-docs-ia.mjs. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run docs:site:typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Note: extra docs:site:build compiled client/server but failed during SSG on existing duplicate / route default-export issue; not introduced by archive navigation cleanup."
  -
    type: "status"
    at: "2026-05-04T16:33:35.055Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #863 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T16:33:35.059Z"
doc_updated_by: "INTEGRATOR"
description: "Remove v0.3 archive planning ledgers from active docs navigation while preserving release notes and ADR history."
sections:
  Summary: |-
    Prune legacy v0.3 archive navigation
    
    Remove v0.3 archive planning ledgers from active docs navigation while preserving release notes and ADR history.
  Scope: |-
    - In scope: Remove v0.3 archive planning ledgers from active docs navigation while preserving release notes and ADR history.
    - Out of scope: unrelated refactors not required for "Prune legacy v0.3 archive navigation".
  Plan: "Batch primary task. Included tasks: 202605041610-FY0HHQ, 202605041610-RPW8E0, 202605041611-7TM53Y. 1. Remove v0.3 archive planning ledgers from active docs index/sidebar navigation without deleting release notes, ADRs, or historical blog posts. 2. Update related architecture links so current developer docs do not route readers into the old refactor backlog as active guidance. 3. Apply the included v0.4 active-doc refresh and WORKFLOW.md-first public-surface cleanup in the same branch. 4. Verify docs navigation/build inputs and policy/doctor checks for all included tasks."
  Verify Steps: |-
    1. Review the requested outcome for "Prune legacy v0.3 archive navigation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T16:25:25.265Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: rg -n archive/v0-3|framework-refactor-program|cli-bug-ledger-v0-3 docs/index.mdx website/sidebars.ts docs/developer/architecture.mdx. Result: pass. Evidence: no active navigation references remain. Command: node scripts/check-docs-ia.mjs. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run docs:site:typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Note: extra docs:site:build compiled client/server but failed during SSG on existing duplicate / route default-export issue; not introduced by archive navigation cleanup.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:17:33.965Z, excerpt_hash=sha256:91e682297092416acf35ee93668daa87e692fcf6e57ddb2cf1a841cf669d0f31
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prune legacy v0.3 archive navigation

Remove v0.3 archive planning ledgers from active docs navigation while preserving release notes and ADR history.

## Scope

- In scope: Remove v0.3 archive planning ledgers from active docs navigation while preserving release notes and ADR history.
- Out of scope: unrelated refactors not required for "Prune legacy v0.3 archive navigation".

## Plan

Batch primary task. Included tasks: 202605041610-FY0HHQ, 202605041610-RPW8E0, 202605041611-7TM53Y. 1. Remove v0.3 archive planning ledgers from active docs index/sidebar navigation without deleting release notes, ADRs, or historical blog posts. 2. Update related architecture links so current developer docs do not route readers into the old refactor backlog as active guidance. 3. Apply the included v0.4 active-doc refresh and WORKFLOW.md-first public-surface cleanup in the same branch. 4. Verify docs navigation/build inputs and policy/doctor checks for all included tasks.

## Verify Steps

1. Review the requested outcome for "Prune legacy v0.3 archive navigation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T16:25:25.265Z — VERIFY — ok

By: DOCS

Note: Command: rg -n archive/v0-3|framework-refactor-program|cli-bug-ledger-v0-3 docs/index.mdx website/sidebars.ts docs/developer/architecture.mdx. Result: pass. Evidence: no active navigation references remain. Command: node scripts/check-docs-ia.mjs. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run docs:site:typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Note: extra docs:site:build compiled client/server but failed during SSG on existing duplicate / route default-export issue; not introduced by archive navigation cleanup.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:17:33.965Z, excerpt_hash=sha256:91e682297092416acf35ee93668daa87e692fcf6e57ddb2cf1a841cf669d0f31

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
