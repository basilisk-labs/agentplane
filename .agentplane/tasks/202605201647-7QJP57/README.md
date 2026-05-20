---
id: "202605201647-7QJP57"
title: "Prepare v0.7 runner handoff release lane"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cloud"
  - "code"
  - "release"
  - "runner"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "security"
blueprint_request: "release.strict"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun test"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T17:03:07.515Z"
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
    author: "CODER"
    body: "Start: implement the approved public v0.7 runner handoff contract in this task worktree without hosted execution or connector-specific CLI logic."
events:
  -
    type: "status"
    at: "2026-05-20T16:50:30.929Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved public v0.7 runner handoff contract in this task worktree without hosted execution or connector-specific CLI logic."
doc_version: 3
doc_updated_at: "2026-05-20T17:04:44.919Z"
doc_updated_by: "CODER"
description: "Prepare the public AgentPlane side of the v0.7 runner handoff release lane. Scope: public runner handoff contract/RFC, typed fixtures, docs/tests, route mapping, worktree and approval boundaries, artifact/evidence expectations, trace/export/ACR visibility, and compatibility with the private cloud-sync P4.1 contract. Out of scope: mutating agentplane-cloud-sync, production hosted repository execution without accepted contract and kill switch, connector-specific CLI logic, and secret/provider/customer payload storage."
sections:
  Summary: |-
    Prepare v0.7 runner handoff release lane

    Prepare the public AgentPlane side of the v0.7 runner handoff release lane. Scope: public runner handoff contract/RFC, typed fixtures, docs/tests, route mapping, worktree and approval boundaries, artifact/evidence expectations, trace/export/ACR visibility, and compatibility with the private cloud-sync P4.1 contract. Out of scope: mutating agentplane-cloud-sync, production hosted repository execution without accepted contract and kill switch, connector-specific CLI logic, and secret/provider/customer payload storage.
  Scope: |-
    - In scope: Prepare the public AgentPlane side of the v0.7 runner handoff release lane. Scope: public runner handoff contract/RFC, typed fixtures, docs/tests, route mapping, worktree and approval boundaries, artifact/evidence expectations, trace/export/ACR visibility, and compatibility with the private cloud-sync P4.1 contract. Out of scope: mutating agentplane-cloud-sync, production hosted repository execution without accepted contract and kill switch, connector-specific CLI logic, and secret/provider/customer payload storage.
    - Out of scope: unrelated refactors not required for "Prepare v0.7 runner handoff release lane".
  Plan: "Release lane plan for v0.7 runner handoff preparation: 1. Add a public, connector-neutral AgentPlaneRunnerHandoff schema/type in @agentplaneorg/core with validators, sanitizer, fixture, and JSON schema export. 2. Align the contract with the private cloud-sync P4.1 boundary: task_id, optional agent_task_id, run_id, project/workspace ids, repo_ref, requested_by, mode, required_evidence, upload_targets, created/expires/status, and kill-switch checked state; reject unsafe repo refs and execute mode unless explicitly enabled. 3. Document the v0.7 public boundary in AgentPlane docs: public CLI owns contract, validation, local evidence expectations, and cloud backend handoff visibility; private cloud service owns hosted execution orchestration and connector/provider payloads. 4. Add focused tests for valid fixture, missing ids, unsafe refs, execute gating, kill switch, expiry, and sanitization; update generated schema exports. 5. Run focused core schema tests, then required repository checks: agentplane doctor, node .agentplane/policy/check-routing.mjs, bun run framework:dev:bootstrap, bun run typecheck, bun run test, bun run build, bun run format:check, bun run schemas:check, and bun run docs:ia:check. Out of scope: publishing v0.7, running hosted execution, mutating agentplane-cloud-sync, storing secrets/private URLs/provider payloads/customer identifiers, and adding connector-specific CLI logic. Note: raw bun test is not the repo test script and is expected to mis-run Vitest files; use bun run test for the accepted repo-wide test gate."
  Verify Steps: |-
    1. Run `bun run test:project core -- packages/core/src/tasks/task-artifact-schema.test.ts`. Expected: focused schema fixture, validation, gating, expiry, and sanitization tests pass.
    2. Run `bun run schemas:check`. Expected: generated root/spec/core JSON schemas are in sync.
    3. Run `bun run docs:ia:check`. Expected: reference docs and sidebar/path coverage remain aligned.
    4. Run `bun run typecheck`. Expected: TypeScript project references pass.
    5. Run `bun run test`. Expected: repo fast Vitest suite passes.
    6. Run `bun run build`. Expected: core, recipes, and agentplane bundles build.
    7. Run `bun run format:check`. Expected: Prettier reports all files formatted.
    8. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
    9. Run `agentplane doctor`. Expected: doctor OK with no errors or warnings.
    10. Confirm no hosted execution, repository mutation runner, connector-specific CLI logic, secrets, provider payloads, private repository URLs, or customer identifiers were added.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Command: `bun run test:project core -- packages/core/src/tasks/task-artifact-schema.test.ts`. Result: pass. Evidence: 21 files / 213 tests passed. Scope: focused schema, fixture, execute gating, kill switch, expiry, unsafe repo refs, and sanitization.
    - Command: `bun run schemas:check`. Result: pass. Evidence: schemas OK. Scope: generated root/spec/core JSON schemas.
    - Command: `bun run docs:ia:check`. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Scope: new runner handoff reference doc.
    - Command: `bun run typecheck`. Result: pass. Evidence: `tsc -b` completed with exit 0. Scope: TypeScript project references.
    - Command: `bun run test`. Result: pass. Evidence: 321 files passed; 1933 tests passed and 2 skipped. Scope: repo fast Vitest suite.
    - Command: `bun run build`. Result: pass. Evidence: core, recipes, and agentplane bundles built successfully. Scope: package build artifacts.
    - Command: `bun run format:check`. Result: pass. Evidence: all matched files use Prettier code style. Scope: repository formatting.
    - Command: `node .agentplane/policy/check-routing.mjs`. Result: pass. Evidence: policy routing OK. Scope: policy routing.
    - Command: `agentplane doctor`. Result: pass. Evidence: doctor OK, errors=0 warnings=0. Scope: workspace/runtime/workflow contract.
    - Command: `bun test`. Result: fail/not accepted as gate. Evidence: raw Bun runner mis-ran Vitest tests and hit Vitest-only API errors such as `vi.stubGlobal is not a function`; process was terminated after enough failures. Scope: diagnostic only; accepted repo test gate is `bun run test`.
    - Scope check: no hosted execution, repository-mutation runner, connector-specific CLI logic, secrets, provider payloads, private repository URLs, or customer identifiers were added.
id_source: "generated"
---
## Summary

Prepare v0.7 runner handoff release lane

Prepare the public AgentPlane side of the v0.7 runner handoff release lane. Scope: public runner handoff contract/RFC, typed fixtures, docs/tests, route mapping, worktree and approval boundaries, artifact/evidence expectations, trace/export/ACR visibility, and compatibility with the private cloud-sync P4.1 contract. Out of scope: mutating agentplane-cloud-sync, production hosted repository execution without accepted contract and kill switch, connector-specific CLI logic, and secret/provider/customer payload storage.

## Scope

- In scope: Prepare the public AgentPlane side of the v0.7 runner handoff release lane. Scope: public runner handoff contract/RFC, typed fixtures, docs/tests, route mapping, worktree and approval boundaries, artifact/evidence expectations, trace/export/ACR visibility, and compatibility with the private cloud-sync P4.1 contract. Out of scope: mutating agentplane-cloud-sync, production hosted repository execution without accepted contract and kill switch, connector-specific CLI logic, and secret/provider/customer payload storage.
- Out of scope: unrelated refactors not required for "Prepare v0.7 runner handoff release lane".

## Plan

Release lane plan for v0.7 runner handoff preparation: 1. Add a public, connector-neutral AgentPlaneRunnerHandoff schema/type in @agentplaneorg/core with validators, sanitizer, fixture, and JSON schema export. 2. Align the contract with the private cloud-sync P4.1 boundary: task_id, optional agent_task_id, run_id, project/workspace ids, repo_ref, requested_by, mode, required_evidence, upload_targets, created/expires/status, and kill-switch checked state; reject unsafe repo refs and execute mode unless explicitly enabled. 3. Document the v0.7 public boundary in AgentPlane docs: public CLI owns contract, validation, local evidence expectations, and cloud backend handoff visibility; private cloud service owns hosted execution orchestration and connector/provider payloads. 4. Add focused tests for valid fixture, missing ids, unsafe refs, execute gating, kill switch, expiry, and sanitization; update generated schema exports. 5. Run focused core schema tests, then required repository checks: agentplane doctor, node .agentplane/policy/check-routing.mjs, bun run framework:dev:bootstrap, bun run typecheck, bun run test, bun run build, bun run format:check, bun run schemas:check, and bun run docs:ia:check. Out of scope: publishing v0.7, running hosted execution, mutating agentplane-cloud-sync, storing secrets/private URLs/provider payloads/customer identifiers, and adding connector-specific CLI logic. Note: raw bun test is not the repo test script and is expected to mis-run Vitest files; use bun run test for the accepted repo-wide test gate.

## Verify Steps

1. Run `bun run test:project core -- packages/core/src/tasks/task-artifact-schema.test.ts`. Expected: focused schema fixture, validation, gating, expiry, and sanitization tests pass.
2. Run `bun run schemas:check`. Expected: generated root/spec/core JSON schemas are in sync.
3. Run `bun run docs:ia:check`. Expected: reference docs and sidebar/path coverage remain aligned.
4. Run `bun run typecheck`. Expected: TypeScript project references pass.
5. Run `bun run test`. Expected: repo fast Vitest suite passes.
6. Run `bun run build`. Expected: core, recipes, and agentplane bundles build.
7. Run `bun run format:check`. Expected: Prettier reports all files formatted.
8. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
9. Run `agentplane doctor`. Expected: doctor OK with no errors or warnings.
10. Confirm no hosted execution, repository mutation runner, connector-specific CLI logic, secrets, provider payloads, private repository URLs, or customer identifiers were added.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Command: `bun run test:project core -- packages/core/src/tasks/task-artifact-schema.test.ts`. Result: pass. Evidence: 21 files / 213 tests passed. Scope: focused schema, fixture, execute gating, kill switch, expiry, unsafe repo refs, and sanitization.
- Command: `bun run schemas:check`. Result: pass. Evidence: schemas OK. Scope: generated root/spec/core JSON schemas.
- Command: `bun run docs:ia:check`. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Scope: new runner handoff reference doc.
- Command: `bun run typecheck`. Result: pass. Evidence: `tsc -b` completed with exit 0. Scope: TypeScript project references.
- Command: `bun run test`. Result: pass. Evidence: 321 files passed; 1933 tests passed and 2 skipped. Scope: repo fast Vitest suite.
- Command: `bun run build`. Result: pass. Evidence: core, recipes, and agentplane bundles built successfully. Scope: package build artifacts.
- Command: `bun run format:check`. Result: pass. Evidence: all matched files use Prettier code style. Scope: repository formatting.
- Command: `node .agentplane/policy/check-routing.mjs`. Result: pass. Evidence: policy routing OK. Scope: policy routing.
- Command: `agentplane doctor`. Result: pass. Evidence: doctor OK, errors=0 warnings=0. Scope: workspace/runtime/workflow contract.
- Command: `bun test`. Result: fail/not accepted as gate. Evidence: raw Bun runner mis-ran Vitest tests and hit Vitest-only API errors such as `vi.stubGlobal is not a function`; process was terminated after enough failures. Scope: diagnostic only; accepted repo test gate is `bun run test`.
- Scope check: no hosted execution, repository-mutation runner, connector-specific CLI logic, secrets, provider payloads, private repository URLs, or customer identifiers were added.
