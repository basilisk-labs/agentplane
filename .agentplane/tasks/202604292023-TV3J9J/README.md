---
id: "202604292023-TV3J9J"
title: "Document prompt fragment contract and naming"
result_summary: "Merged via PR #585."
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run docs:scripts:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:24:50.741Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T20:28:03.155Z"
  updated_by: "DOCS"
  note: "Prompt fragment naming and recipe patch contract documentation is complete; declared docs verification passed."
commit:
  hash: "429ba14c4b42dbd95363bd9421d4e09342be1410"
  message: "Merge pull request #585 from basilisk-labs/task/202604292023-TV3J9J/prompt-fragment-contract"
comments:
  -
    author: "DOCS"
    body: "Start: document the prompt fragment naming, marker, mutability, and recipe patch contract before code migrations begin."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #585 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-29T20:25:13.526Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the prompt fragment naming, marker, mutability, and recipe patch contract before code migrations begin."
  -
    type: "verify"
    at: "2026-04-29T20:28:03.155Z"
    author: "DOCS"
    state: "ok"
    note: "Prompt fragment naming and recipe patch contract documentation is complete; declared docs verification passed."
  -
    type: "status"
    at: "2026-04-29T20:31:38.516Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #585 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-29T20:31:38.522Z"
doc_updated_by: "INTEGRATOR"
description: "Define the canonical prompt fragment naming scheme, marker conventions, mutability rules, and recipe patch semantics for gateway, policy, runner, and agent profile prompts before implementation changes."
sections:
  Summary: |-
    Document prompt fragment contract and naming
    
    Define the canonical prompt fragment naming scheme, marker conventions, mutability rules, and recipe patch semantics for gateway, policy, runner, and agent profile prompts before implementation changes.
  Scope: |-
    - In scope: Define the canonical prompt fragment naming scheme, marker conventions, mutability rules, and recipe patch semantics for gateway, policy, runner, and agent profile prompts before implementation changes.
    - Out of scope: unrelated refactors not required for "Document prompt fragment contract and naming".
  Plan: |-
    1. Document the canonical fragment id scheme for gateway, policy, runner, and agent profile prompt surfaces.
    2. Define markdown marker syntax, JSON fragment object shape, mutability semantics, and recipe patch behavior.
    3. Update developer docs so future implementation tasks have a stable contract and naming vocabulary.
    4. Verify docs freshness/diff hygiene/doctor and record residual risks.
  Verify Steps: |-
    1. Review the requested outcome for "Document prompt fragment contract and naming". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T20:28:03.155Z — VERIFY — ok
    
    By: DOCS
    
    Note: Prompt fragment naming and recipe patch contract documentation is complete; declared docs verification passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:27:57.881Z, excerpt_hash=sha256:95579a0fe50ed86b2c3032cb48e45ec8bd4399c92ff76857ac456c015a33ef8d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    No residual findings.
    
    Verification evidence:
    - Command: bun run docs:scripts:check
      Result: pass
      Evidence: scripts/README.md is up to date.
      Scope: docs script inventory freshness.
    - Command: git diff --check
      Result: pass
      Evidence: no whitespace errors.
      Scope: final docs diff hygiene.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK with errors=0 warnings=0.
      Scope: repository workflow/runtime diagnostics.
    - Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: Framework dev runtime is ready.
      Scope: prepared website dependencies and refreshed repo-local runtime for extra docs-site check.
    - Command: bun run docs:site:typecheck
      Result: pass
      Evidence: website tsc completed with exit 0 after bootstrap installed worktree dependencies.
      Scope: docs-site TypeScript surface for changed developer docs.
id_source: "generated"
---
## Summary

Document prompt fragment contract and naming

Define the canonical prompt fragment naming scheme, marker conventions, mutability rules, and recipe patch semantics for gateway, policy, runner, and agent profile prompts before implementation changes.

## Scope

- In scope: Define the canonical prompt fragment naming scheme, marker conventions, mutability rules, and recipe patch semantics for gateway, policy, runner, and agent profile prompts before implementation changes.
- Out of scope: unrelated refactors not required for "Document prompt fragment contract and naming".

## Plan

1. Document the canonical fragment id scheme for gateway, policy, runner, and agent profile prompt surfaces.
2. Define markdown marker syntax, JSON fragment object shape, mutability semantics, and recipe patch behavior.
3. Update developer docs so future implementation tasks have a stable contract and naming vocabulary.
4. Verify docs freshness/diff hygiene/doctor and record residual risks.

## Verify Steps

1. Review the requested outcome for "Document prompt fragment contract and naming". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T20:28:03.155Z — VERIFY — ok

By: DOCS

Note: Prompt fragment naming and recipe patch contract documentation is complete; declared docs verification passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T20:27:57.881Z, excerpt_hash=sha256:95579a0fe50ed86b2c3032cb48e45ec8bd4399c92ff76857ac456c015a33ef8d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

No residual findings.

Verification evidence:
- Command: bun run docs:scripts:check
  Result: pass
  Evidence: scripts/README.md is up to date.
  Scope: docs script inventory freshness.
- Command: git diff --check
  Result: pass
  Evidence: no whitespace errors.
  Scope: final docs diff hygiene.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK with errors=0 warnings=0.
  Scope: repository workflow/runtime diagnostics.
- Command: bun run framework:dev:bootstrap
  Result: pass
  Evidence: Framework dev runtime is ready.
  Scope: prepared website dependencies and refreshed repo-local runtime for extra docs-site check.
- Command: bun run docs:site:typecheck
  Result: pass
  Evidence: website tsc completed with exit 0 after bootstrap installed worktree dependencies.
  Scope: docs-site TypeScript surface for changed developer docs.
