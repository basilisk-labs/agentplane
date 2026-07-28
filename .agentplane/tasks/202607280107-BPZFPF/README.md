---
id: "202607280107-BPZFPF"
title: "Archive incident INC-20260727-01 task-context evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "incident"
  - "context"
  - "rf-21"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T01:07:23.446Z"
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
    body: "Start: dedicated release-incident reconciliation in the assigned task worktree; scope is archive evidence and active-registry cleanup only after checks."
events:
  -
    type: "status"
    at: "2026-07-28T01:07:40.040Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: dedicated release-incident reconciliation in the assigned task worktree; scope is archive evidence and active-registry cleanup only after checks."
doc_version: 3
doc_updated_at: "2026-07-28T01:09:45.640Z"
doc_updated_by: "CODER"
description: "Dedicated incident reconciliation for TaskEpisodeView section authority. Confirm the shipped RF-21 contract: task_document_schema is explicit, required-section omission or validation failure is enforced, and localized structural-heading coverage is present. Preserve final evidence in the historical archive and remove the active entry only after deterministic checks pass. Do not author a new semantic role or heading policy."
sections:
  Summary: |-
    Reconcile release incident INC-20260727-01

    Dedicated incident review/fix for the release-blocking TaskEpisodeView section-authority entry. Verify the shipped RF-21 contract: task_document_schema is explicit, required-section omission or validation failure is enforced, and tests cover localized structural headings. Preserve final evidence in the incident archive and remove the active entry only after deterministic checks pass. Do not author a new semantic role/heading policy.
  Scope: |-
    - In scope: Dedicated incident review/fix for the release-blocking TaskEpisodeView section-authority entry. Verify the shipped RF-21 contract: task_document_schema is explicit, required-section omission or validation failure is enforced, and tests cover localized structural headings. Preserve final evidence in the incident archive and remove the active entry only after deterministic checks pass. Do not author a new semantic role/heading policy.
    - Out of scope: unrelated refactors not required for "Reconcile release incident INC-20260727-01".
  Plan: "1. Re-read INC-20260727-01 and RF-21 evidence against the current main implementation; confirm TaskEpisodeView declares task_document_schema as its section authority and preserves explicit omission or validation failure. 2. Re-run the focused TaskEpisodeView regression suite plus the release-incident check; do not change semantic role or heading policy. 3. If the evidence is current and checks pass, move the complete incident record to docs/developer/incident-archive.mdx with task and command evidence, then remove it from the active registry. 4. Verify policy routing, doctor, and the release-incident gate; record residual risk that semantic role-policy remains intentionally deferred."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner/context/task-context.test.ts`. Expected: TaskEpisodeView keeps `task_document_schema` as the stated authority; missing, oversized, and localized required sections retain explicit loss prevention.
    2. Run `node scripts/release/check-release-incidents.mjs` before archival. Expected: it fails only for `INC-20260727-01`, proving the active release blocker is precise.
    3. Archive the complete incident entry with current implementation, regression, and reconciliation evidence; remove it from `.agentplane/policy/incidents.md` only after step 1 passes.
    4. Run `node .agentplane/policy/check-routing.mjs`, `node scripts/release/check-release-incidents.mjs`, and `node packages/agentplane/bin/agentplane.js doctor`. Expected: policy routing, active-registry release gate, and repository diagnostics pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T01:09:03.841Z"
        authorityDigest: "sha256:2257628494af79d321d493f6c24d686788be20fa97693a6102498f36c5f69f3a"
        digest: "sha256:0384b450f69d748303e3021bebdbc75ac41704c7908234b8f0cfb37473e13a33"
        operationDigest: "sha256:a899e6376c0237facc0819e87866e52bfaa96666ef463ebf4aa8146b64f37846"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:e80591fbb8deb3b79e4ed346a146c363d72192478589105b5d3313203f0c4516"
    grants:
      -
        actor: "USER"
        digest: "sha256:2257628494af79d321d493f6c24d686788be20fa97693a6102498f36c5f69f3a"
        expiresAt: "2026-07-28T01:24:03.841Z"
        id: "authority-78b68455-fa85-44f8-822d-b6647c224b03"
        issuedAt: "2026-07-28T01:09:03.841Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:a899e6376c0237facc0819e87866e52bfaa96666ef463ebf4aa8146b64f37846"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e80591fbb8deb3b79e4ed346a146c363d72192478589105b5d3313203f0c4516"
        stateScopeDigest: "sha256:0ca1b0540ad5e5e0e1ad58f60f668bab4baf203f226366e539b4072a7bc72edc"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "78b62230dda3ff6aec52db27e74c49e9a5926683"
    version: 1
id_source: "generated"
---
## Summary

Reconcile release incident INC-20260727-01

Dedicated incident review/fix for the release-blocking TaskEpisodeView section-authority entry. Verify the shipped RF-21 contract: task_document_schema is explicit, required-section omission or validation failure is enforced, and tests cover localized structural headings. Preserve final evidence in the incident archive and remove the active entry only after deterministic checks pass. Do not author a new semantic role/heading policy.

## Scope

- In scope: Dedicated incident review/fix for the release-blocking TaskEpisodeView section-authority entry. Verify the shipped RF-21 contract: task_document_schema is explicit, required-section omission or validation failure is enforced, and tests cover localized structural headings. Preserve final evidence in the incident archive and remove the active entry only after deterministic checks pass. Do not author a new semantic role/heading policy.
- Out of scope: unrelated refactors not required for "Reconcile release incident INC-20260727-01".

## Plan

1. Re-read INC-20260727-01 and RF-21 evidence against the current main implementation; confirm TaskEpisodeView declares task_document_schema as its section authority and preserves explicit omission or validation failure. 2. Re-run the focused TaskEpisodeView regression suite plus the release-incident check; do not change semantic role or heading policy. 3. If the evidence is current and checks pass, move the complete incident record to docs/developer/incident-archive.mdx with task and command evidence, then remove it from the active registry. 4. Verify policy routing, doctor, and the release-incident gate; record residual risk that semantic role-policy remains intentionally deferred.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner/context/task-context.test.ts`. Expected: TaskEpisodeView keeps `task_document_schema` as the stated authority; missing, oversized, and localized required sections retain explicit loss prevention.
2. Run `node scripts/release/check-release-incidents.mjs` before archival. Expected: it fails only for `INC-20260727-01`, proving the active release blocker is precise.
3. Archive the complete incident entry with current implementation, regression, and reconciliation evidence; remove it from `.agentplane/policy/incidents.md` only after step 1 passes.
4. Run `node .agentplane/policy/check-routing.mjs`, `node scripts/release/check-release-incidents.mjs`, and `node packages/agentplane/bin/agentplane.js doctor`. Expected: policy routing, active-registry release gate, and repository diagnostics pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
