---
id: "202604210900-F2W4WF"
title: "Define recipes signing algorithm policy"
result_summary: "Defined recipes signing algorithm policy and verifier registry."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:27:35.698Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:35:59.206Z"
  updated_by: "CODER"
  note: "Verified recipes signing registry, unsupported-algorithm failure, ADR policy, scoped lint, and focused typecheck."
commit:
  hash: "e673c0f73eb008dbdb16d09133d1f03f12076326"
  message: "✅ F2W4WF code: done"
comments:
  -
    author: "CODER"
    body: "Start: formalize recipe signing algorithm policy and refactor verifier code into an explicit ed25519 registry with tests."
  -
    author: "CODER"
    body: "Verified: added recipes signing verifier registry, documented Ed25519-only policy and future dual-signature/PQC path, and passed focused recipes tests, scoped lint, and typecheck."
events:
  -
    type: "status"
    at: "2026-04-21T10:27:40.611Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: formalize recipe signing algorithm policy and refactor verifier code into an explicit ed25519 registry with tests."
  -
    type: "verify"
    at: "2026-04-21T10:31:15.842Z"
    author: "CODER"
    state: "ok"
    note: "Verified recipes signing registry, unsupported-algorithm failure, ADR policy, and focused typecheck."
  -
    type: "verify"
    at: "2026-04-21T10:35:59.206Z"
    author: "CODER"
    state: "ok"
    note: "Verified recipes signing registry, unsupported-algorithm failure, ADR policy, scoped lint, and focused typecheck."
  -
    type: "status"
    at: "2026-04-21T10:36:35.005Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added recipes signing verifier registry, documented Ed25519-only policy and future dual-signature/PQC path, and passed focused recipes tests, scoped lint, and typecheck."
doc_version: 3
doc_updated_at: "2026-04-21T10:36:35.006Z"
doc_updated_by: "CODER"
description: "Add an ADR and verifier-registry path for recipe index signatures so ed25519 remains supported while future algorithm rotation is possible."
sections:
  Summary: "Formalize recipe signing algorithm policy and replace hard-coded single-algorithm assumptions with an explicit verifier registry."
  Scope: "In scope: ADR, recipe signature verification code, algorithm/key_id handling, and tests. Out of scope: implementing a production PQC verifier dependency unless already available."
  Plan: |-
    1. Document current ed25519 behavior and rotation requirements.
    2. Add ADR describing allowed algorithms, key_id, created_at, and future dual-signature policy.
    3. Refactor verifier code into a registry that currently supports ed25519.
    4. Add tests for unknown algorithms and valid ed25519 signatures.
  Verify Steps: |-
    - ed25519 verification still passes.
    - Unknown algorithms fail clearly.
    - ADR records future PQC/dual-signature policy without pretending it is implemented.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-F2W4WF`
      - Result: pass
      - Evidence: contract requires ed25519 success, clear unknown-algorithm failure, and ADR policy for future PQC/dual-signature behavior.
      - Scope: task acceptance contract.
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/commands/recipes.list.test.ts`
      - Result: pass
      - Evidence: 1 file passed, 11 tests passed, including unsupported algorithm rejection.
      - Scope: recipes list/list-remote signature verification behavior.
    - Command: `bunx eslint packages/agentplane/src/commands/recipes/impl/index.ts packages/agentplane/src/commands/recipes.list.test.ts`
      - Result: pass
      - Evidence: scoped ESLint exited with code 0.
      - Scope: changed recipes verifier/test files.
    - Command: `bun run --filter=agentplane typecheck`
      - Result: pass
      - Evidence: agentplane typecheck exited with code 0.
      - Scope: agentplane TypeScript surface.
    - ADR check: `docs/adr/0009-recipes-index-signing-algorithm-policy.md`
      - Result: pass
      - Evidence: documents current Ed25519-only implementation, key_id as key selector, future created_at metadata, and dual-signature/PQC policy without claiming PQC support.
      - Scope: signing algorithm policy documentation.
    - Command: `git diff --check -- packages/agentplane/src/commands/recipes/impl/index.ts packages/agentplane/src/commands/recipes.list.test.ts docs/adr/README.md docs/adr/0009-recipes-index-signing-algorithm-policy.md .agentplane/tasks/202604210900-F2W4WF/README.md`
      - Result: pass
      - Evidence: no whitespace errors after trimming task README verification output.
      - Scope: changed files for this task.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:35:59.206Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified recipes signing registry, unsupported-algorithm failure, ADR policy, scoped lint, and focused typecheck.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:35:58.217Z, excerpt_hash=sha256:edaf6c23fcd62db5887e503a6814162445a038437d895a54069b49e4f0f37d05
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert ADR and verifier registry changes."
  Findings: "Source input: AUDIT H-5 and REFACTORING_PLAN E.3."
id_source: "generated"
---
## Summary

Formalize recipe signing algorithm policy and replace hard-coded single-algorithm assumptions with an explicit verifier registry.

## Scope

In scope: ADR, recipe signature verification code, algorithm/key_id handling, and tests. Out of scope: implementing a production PQC verifier dependency unless already available.

## Plan

1. Document current ed25519 behavior and rotation requirements.
2. Add ADR describing allowed algorithms, key_id, created_at, and future dual-signature policy.
3. Refactor verifier code into a registry that currently supports ed25519.
4. Add tests for unknown algorithms and valid ed25519 signatures.

## Verify Steps

- ed25519 verification still passes.
- Unknown algorithms fail clearly.
- ADR records future PQC/dual-signature policy without pretending it is implemented.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-F2W4WF`
  - Result: pass
  - Evidence: contract requires ed25519 success, clear unknown-algorithm failure, and ADR policy for future PQC/dual-signature behavior.
  - Scope: task acceptance contract.
- Command: `bun run test:project -- agentplane --run packages/agentplane/src/commands/recipes.list.test.ts`
  - Result: pass
  - Evidence: 1 file passed, 11 tests passed, including unsupported algorithm rejection.
  - Scope: recipes list/list-remote signature verification behavior.
- Command: `bunx eslint packages/agentplane/src/commands/recipes/impl/index.ts packages/agentplane/src/commands/recipes.list.test.ts`
  - Result: pass
  - Evidence: scoped ESLint exited with code 0.
  - Scope: changed recipes verifier/test files.
- Command: `bun run --filter=agentplane typecheck`
  - Result: pass
  - Evidence: agentplane typecheck exited with code 0.
  - Scope: agentplane TypeScript surface.
- ADR check: `docs/adr/0009-recipes-index-signing-algorithm-policy.md`
  - Result: pass
  - Evidence: documents current Ed25519-only implementation, key_id as key selector, future created_at metadata, and dual-signature/PQC policy without claiming PQC support.
  - Scope: signing algorithm policy documentation.
- Command: `git diff --check -- packages/agentplane/src/commands/recipes/impl/index.ts packages/agentplane/src/commands/recipes.list.test.ts docs/adr/README.md docs/adr/0009-recipes-index-signing-algorithm-policy.md .agentplane/tasks/202604210900-F2W4WF/README.md`
  - Result: pass
  - Evidence: no whitespace errors after trimming task README verification output.
  - Scope: changed files for this task.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:35:59.206Z — VERIFY — ok

By: CODER

Note: Verified recipes signing registry, unsupported-algorithm failure, ADR policy, scoped lint, and focused typecheck.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:35:58.217Z, excerpt_hash=sha256:edaf6c23fcd62db5887e503a6814162445a038437d895a54069b49e4f0f37d05

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert ADR and verifier registry changes.

## Findings

Source input: AUDIT H-5 and REFACTORING_PLAN E.3.
