---
id: "202604291532-BV5NQT"
title: "Document and harden modular prompt migration"
result_summary: "Merged modular prompt migration documentation and regression hardening via PR #579; added developer docs for prompt assembly contracts, diagnostics, recipe mutation extension points, safe-change rules, and focused verification; updated recipe docs and sidebar; added regression assertions for runner provenance, init baselines, and prompt graph transaction safety."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202604291531-864BKX"
tags:
  - "code"
  - "prompt-assembly"
  - "testing"
verify:
  - "agentplane doctor"
  - "bun run docs:scripts:check"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:32:45.720Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T19:41:02.530Z"
  updated_by: "CODER"
  note: "Modular prompt migration docs and regression hardening are complete; declared verification passed."
commit:
  hash: "3b84434879a046b1da412292ef450a5564bfabac"
  message: "prompt-assembly/testing: Document and harden modular prompt migration (BV5NQT) (#579)"
comments:
  -
    author: "CODER"
    body: "Start: document modular prompt migration and add regression hardening for migrated prompt assembly surfaces."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #579 merged after required GitHub checks passed; local task verification recorded by CODER."
events:
  -
    type: "status"
    at: "2026-04-29T19:34:44.106Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: document modular prompt migration and add regression hardening for migrated prompt assembly surfaces."
  -
    type: "verify"
    at: "2026-04-29T19:41:02.530Z"
    author: "CODER"
    state: "ok"
    note: "Modular prompt migration docs and regression hardening are complete; declared verification passed."
  -
    type: "status"
    at: "2026-04-29T19:44:51.247Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #579 merged after required GitHub checks passed; local task verification recorded by CODER."
doc_version: 3
doc_updated_at: "2026-04-29T19:44:51.248Z"
doc_updated_by: "INTEGRATOR"
description: "Add migration documentation, fixtures, and regression coverage for modular prompt assembly across init, upgrade, runner prompts, policy modules, agent profiles, and recipe-owned mutations."
sections:
  Summary: |-
    Document and harden modular prompt migration
    
    Add migration documentation, fixtures, and regression coverage for modular prompt assembly across init, upgrade, runner prompts, policy modules, agent profiles, and recipe-owned mutations.
  Scope: |-
    - In scope: developer/operator documentation for modular prompt assembly, recipe mutation extension points, verification commands, and safe-change boundaries.
    - In scope: fixtures/regression tests that lock the migration path and prevent silent drift back to ad hoc prompt assembly.
    - In scope: docs changes are part of this `code` task because the acceptance boundary includes regression fixtures and checks.
    - Out of scope: release publication and remote recipe catalog updates.
  Plan: |-
    1. Document the runtime surfaces: contracts, compiler, registry, init emission, recipe mutation layer, diagnostics, and verification.
    2. Add or refresh fixtures that future agents can use to validate prompt graph behavior.
    3. Add regression coverage for the migrated init/runner/recipe/doctor surfaces.
    4. Run docs checks, focused tests, typecheck, bootstrap, and doctor.
    5. Record verification evidence and leave remaining rollout risks explicit in Findings.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T19:41:02.530Z — VERIFY — ok
    By: CODER
    Note: Modular prompt migration docs and regression hardening are complete; declared verification passed.
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T19:34:44.106Z, excerpt_hash=sha256:a1c55a35cc102849fc24f7a3161b53a50e2318117b818dcd9655e8f6ca83025a
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert docs and test fixture additions.
    - Keep implementation tasks intact if code checks still pass.
  Findings: |-
    No residual findings.
    Verification evidence:
    - Command: bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
      Result: pass
      Evidence: 37 pass, 0 fail.
      Scope: runner/init/recipe/doctor modular prompt migration regressions.
    - Command: bun run docs:scripts:check
      Result: pass
      Evidence: scripts/README.md is up to date.
      Scope: docs script inventory freshness.
    - Command: bun run typecheck
      Result: pass
      Evidence: tsc -b completed with exit 0.
      Scope: repository TypeScript project references.
    - Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: Framework dev runtime is ready.
      Scope: repo-local runtime rebuild before doctor.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK with errors=0 warnings=0.
      Scope: repository workflow/runtime diagnostics.
    - Command: git diff --check
      Result: pass
      Evidence: no whitespace errors.
      Scope: final diff hygiene.
    - Command: bun run docs:site:typecheck
      Result: pass
      Evidence: tsc completed with exit 0 after framework bootstrap installed website dependencies.
      Scope: website sidebar TypeScript and docs-site type surface.
id_source: "generated"
---
## Summary

Document and harden modular prompt migration

Add migration documentation, fixtures, and regression coverage for modular prompt assembly across init, upgrade, runner prompts, policy modules, agent profiles, and recipe-owned mutations.

## Scope

- In scope: developer/operator documentation for modular prompt assembly, recipe mutation extension points, verification commands, and safe-change boundaries.
- In scope: fixtures/regression tests that lock the migration path and prevent silent drift back to ad hoc prompt assembly.
- In scope: docs changes are part of this `code` task because the acceptance boundary includes regression fixtures and checks.
- Out of scope: release publication and remote recipe catalog updates.

## Plan

1. Document the runtime surfaces: contracts, compiler, registry, init emission, recipe mutation layer, diagnostics, and verification.
2. Add or refresh fixtures that future agents can use to validate prompt graph behavior.
3. Add regression coverage for the migrated init/runner/recipe/doctor surfaces.
4. Run docs checks, focused tests, typecheck, bootstrap, and doctor.
5. Record verification evidence and leave remaining rollout risks explicit in Findings.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T19:41:02.530Z — VERIFY — ok
By: CODER
Note: Modular prompt migration docs and regression hardening are complete; declared verification passed.
VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T19:34:44.106Z, excerpt_hash=sha256:a1c55a35cc102849fc24f7a3161b53a50e2318117b818dcd9655e8f6ca83025a
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert docs and test fixture additions.
- Keep implementation tasks intact if code checks still pass.

## Findings

No residual findings.
Verification evidence:
- Command: bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
  Result: pass
  Evidence: 37 pass, 0 fail.
  Scope: runner/init/recipe/doctor modular prompt migration regressions.
- Command: bun run docs:scripts:check
  Result: pass
  Evidence: scripts/README.md is up to date.
  Scope: docs script inventory freshness.
- Command: bun run typecheck
  Result: pass
  Evidence: tsc -b completed with exit 0.
  Scope: repository TypeScript project references.
- Command: bun run framework:dev:bootstrap
  Result: pass
  Evidence: Framework dev runtime is ready.
  Scope: repo-local runtime rebuild before doctor.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK with errors=0 warnings=0.
  Scope: repository workflow/runtime diagnostics.
- Command: git diff --check
  Result: pass
  Evidence: no whitespace errors.
  Scope: final diff hygiene.
- Command: bun run docs:site:typecheck
  Result: pass
  Evidence: tsc completed with exit 0 after framework bootstrap installed website dependencies.
  Scope: website sidebar TypeScript and docs-site type surface.
