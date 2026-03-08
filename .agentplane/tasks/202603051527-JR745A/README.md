---
id: "202603051527-JR745A"
title: "Harden incident policy routing and immutability rules"
result_summary: "Policy routing is explicit and incident handling is centralized in one enforced file."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T15:33:22.748Z"
  updated_by: "CODER"
  note: "Verified: policy routing, template sync, and targeted init/upgrade/template tests passed."
commit:
  hash: "d1a826a7afd4f19bb0807dd000110499b6cf34a6"
  message: "✨ JR745A policy: enforce single incidents log and explicit routing"
comments:
  -
    author: "CODER"
    body: "Start: implement single incidents policy file and strict explicit policy routing without wildcard module references."
  -
    author: "CODER"
    body: "Verified: policy gateway now enforces explicit canonical routing, a single incidents file, and immutability-by-default governance with passing checks/tests."
events:
  -
    type: "status"
    at: "2026-03-05T15:33:16.155Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement single incidents policy file and strict explicit policy routing without wildcard module references."
  -
    type: "verify"
    at: "2026-03-05T15:33:22.748Z"
    author: "CODER"
    state: "ok"
    note: "Verified: policy routing, template sync, and targeted init/upgrade/template tests passed."
  -
    type: "status"
    at: "2026-03-05T15:34:14.580Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: policy gateway now enforces explicit canonical routing, a single incidents file, and immutability-by-default governance with passing checks/tests."
doc_version: 3
doc_updated_at: "2026-03-05T15:34:14.580Z"
doc_updated_by: "CODER"
description: "Introduce a single incidents policy file, remove wildcard policy path guidance, and enforce immutable canonical policy modules with explicit governance rules and routing checks."
id_source: "generated"
---
## Summary

Harden policy routing around incidents: use explicit module paths (no wildcard module references), introduce a single incidents registry file, and define immutability-by-default governance for canonical policy modules.

## Scope

In scope: packages/agentplane/assets/AGENTS.md, packages/agentplane/assets/policy/governance.md, packages/agentplane/assets/policy/incidents.md, packages/agentplane/assets/policy/examples/migration-note.md, packages/agentplane/assets/framework.manifest.json, scripts/check-policy-routing.mjs, and synced .agentplane/policy mirrors. Out of scope: runtime policy engine behavior changes beyond routing checks.

## Plan

1) Replace wildcard policy module references in AGENTS with explicit routing and docs links. 2) Add single incidents policy file and route it explicitly. 3) Rewrite governance with incident source-of-truth, stabilization criteria, and canonical-module immutability rules. 4) Extend policy routing check to enforce no wildcard module paths and single incidents file. 5) Sync policy templates and run routing/template/tests verification.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T15:33:22.748Z — VERIFY — ok

By: CODER

Note: Verified: policy routing, template sync, and targeted init/upgrade/template tests passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T15:33:16.155Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

Details:

Commands:\n- bun run policy:routing:check\n- bun run agents:check\n- bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/agents/policy-routing-check.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts\n\nOutcome:\n- All commands passed.\n- Enforced single incidents file and explicit module routing with no wildcard module references.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commits from this task. Then rerun: bun run agents:sync, bun run policy:routing:check, bun run agents:check, and targeted tests to confirm gateway/policy parity is restored.

## Findings


## Risks

Risk: stricter wildcard rejection could block legitimate future notation. Mitigation: keep checks scoped to inline wildcard paths in AGENTS and require explicit module references. Risk: governance wording could drift from implementation. Mitigation: enforce via policy:routing:check and template sync checks.
