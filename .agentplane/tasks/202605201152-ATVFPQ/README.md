---
id: "202605201152-ATVFPQ"
title: "Define context wiki contract surface"
result_summary: "Merged via PR #3967."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
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
  state: "ok"
  updated_at: "2026-05-20T12:34:40.659Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: local pre-push fast CI completed through format, schema freshness, policy routing, release parity, build, bundle build, CLI cold baseline, docs freshness, recipe inventory, scripts README, onboarding, hotspot threshold, vitest projects, lint, unit tests 321 files/1925 passed/2 skipped, and critical CLI chunks 5/5 passed before push. Hosted PR #3967 checks on head 0b158ea3a all passed: CodeQL, Core CI plan, verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, PR verification, Release-ready manifest, Docs CI docs, and change detection."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T12:34:40.659Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed. Evidence: local pre-push fast CI completed through format, schema freshness, policy routing, release parity, build, bundle build, CLI cold baseline, docs freshness, recipe inventory, scripts README, onboarding, hotspot threshold, vitest projects, lint, unit tests 321 files/1925 passed/2 skipped, and critical CLI chunks 5/5 passed before push. Hosted PR #3967 checks on head 0b158ea3a all passed: CodeQL, Core CI plan, verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, PR verification, Release-ready manifest, Docs CI docs, and change detection."
  evaluated_sha: "0b158ea3a1600b42910b0e4f43f9e86746ce13db"
  blueprint_digest: "2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745"
  evidence_refs:
    - ".agentplane/tasks/202605201152-ATVFPQ/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201152-ATVFPQ-context-wiki-contract/.agentplane/tasks/202605201152-ATVFPQ/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "715bd2783198096cedbdc9e2246f6ac74004f8c8"
  message: "Merge pull request #3967 from basilisk-labs/task/202605201152-ATVFPQ/context-wiki-contract"
comments:
  -
    author: "DOCS"
    body: "Start: defining the context wiki contract surface in the existing context manifest and wiki policy files, then aligning the wiki agent notes to reference that control layer."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3967 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-20T11:53:03.295Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: defining the context wiki contract surface in the existing context manifest and wiki policy files, then aligning the wiki agent notes to reference that control layer."
  -
    type: "verify"
    at: "2026-05-20T11:57:31.156Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bunx prettier --check .agentplane/context/agentplane.context.yaml .agentplane/context/policies/wiki.rules.md context/wiki/AGENTS.md packages/agentplane/src/commands/context/init.ts -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap context wiki lint context/wiki/AGENTS.md -> pass. Command: ap context check -> pass. Command: bunx eslint packages/agentplane/src/commands/context/init.ts -> pass. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts -> pass, 33 tests. Command: ap doctor -> OK with pre-existing warning about DONE task archive README 202605200640-7AXZRX missing from git index. Skipped: ap context verify-task 202605201152-ATVFPQ, because this is a docs/policy task and the command rejected it as not a context task."
  -
    type: "verify"
    at: "2026-05-20T12:34:40.659Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed. Evidence: local pre-push fast CI completed through format, schema freshness, policy routing, release parity, build, bundle build, CLI cold baseline, docs freshness, recipe inventory, scripts README, onboarding, hotspot threshold, vitest projects, lint, unit tests 321 files/1925 passed/2 skipped, and critical CLI chunks 5/5 passed before push. Hosted PR #3967 checks on head 0b158ea3a all passed: CodeQL, Core CI plan, verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, PR verification, Release-ready manifest, Docs CI docs, and change detection."
  -
    type: "status"
    at: "2026-05-20T12:54:11.623Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3967 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-20T12:54:11.631Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-20T11:57:31.156Z — VERIFY — ok

    By: DOCS

    Note: Command: bunx prettier --check .agentplane/context/agentplane.context.yaml .agentplane/context/policies/wiki.rules.md context/wiki/AGENTS.md packages/agentplane/src/commands/context/init.ts -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap context wiki lint context/wiki/AGENTS.md -> pass. Command: ap context check -> pass. Command: bunx eslint packages/agentplane/src/commands/context/init.ts -> pass. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts -> pass, 33 tests. Command: ap doctor -> OK with pre-existing warning about DONE task archive README 202605200640-7AXZRX missing from git index. Skipped: ap context verify-task 202605201152-ATVFPQ, because this is a docs/policy task and the command rejected it as not a context task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T11:53:03.295Z, excerpt_hash=sha256:bcc38c34ef4931bd578d7f99ea818892646e5319d4422c20fae7a280de2ff7ac

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201152-ATVFPQ-context-wiki-contract/.agentplane/tasks/202605201152-ATVFPQ/blueprint/resolved-snapshot.json
    - old_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
    - current_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201152-ATVFPQ

    ### 2026-05-20T12:34:40.659Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed. Evidence: local pre-push fast CI completed through format, schema freshness, policy routing, release parity, build, bundle build, CLI cold baseline, docs freshness, recipe inventory, scripts README, onboarding, hotspot threshold, vitest projects, lint, unit tests 321 files/1925 passed/2 skipped, and critical CLI chunks 5/5 passed before push. Hosted PR #3967 checks on head 0b158ea3a all passed: CodeQL, Core CI plan, verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, PR verification, Release-ready manifest, Docs CI docs, and change detection.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T11:57:31.182Z, excerpt_hash=sha256:bcc38c34ef4931bd578d7f99ea818892646e5319d4422c20fae7a280de2ff7ac

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201152-ATVFPQ-context-wiki-contract/.agentplane/tasks/202605201152-ATVFPQ/blueprint/resolved-snapshot.json
    - old_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
    - current_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605201152-ATVFPQ

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
### 2026-05-20T11:57:31.156Z — VERIFY — ok

By: DOCS

Note: Command: bunx prettier --check .agentplane/context/agentplane.context.yaml .agentplane/context/policies/wiki.rules.md context/wiki/AGENTS.md packages/agentplane/src/commands/context/init.ts -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap context wiki lint context/wiki/AGENTS.md -> pass. Command: ap context check -> pass. Command: bunx eslint packages/agentplane/src/commands/context/init.ts -> pass. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts -> pass, 33 tests. Command: ap doctor -> OK with pre-existing warning about DONE task archive README 202605200640-7AXZRX missing from git index. Skipped: ap context verify-task 202605201152-ATVFPQ, because this is a docs/policy task and the command rejected it as not a context task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T11:53:03.295Z, excerpt_hash=sha256:bcc38c34ef4931bd578d7f99ea818892646e5319d4422c20fae7a280de2ff7ac

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201152-ATVFPQ-context-wiki-contract/.agentplane/tasks/202605201152-ATVFPQ/blueprint/resolved-snapshot.json
- old_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
- current_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201152-ATVFPQ

### 2026-05-20T12:34:40.659Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed. Evidence: local pre-push fast CI completed through format, schema freshness, policy routing, release parity, build, bundle build, CLI cold baseline, docs freshness, recipe inventory, scripts README, onboarding, hotspot threshold, vitest projects, lint, unit tests 321 files/1925 passed/2 skipped, and critical CLI chunks 5/5 passed before push. Hosted PR #3967 checks on head 0b158ea3a all passed: CodeQL, Core CI plan, verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, PR verification, Release-ready manifest, Docs CI docs, and change detection.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T11:57:31.182Z, excerpt_hash=sha256:bcc38c34ef4931bd578d7f99ea818892646e5319d4422c20fae7a280de2ff7ac

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605201152-ATVFPQ-context-wiki-contract/.agentplane/tasks/202605201152-ATVFPQ/blueprint/resolved-snapshot.json
- old_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
- current_digest: 2b00d837ef349d9bb4f691c50e1570ccfcd683e6fece96dbb41449a2ae77c745
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605201152-ATVFPQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
