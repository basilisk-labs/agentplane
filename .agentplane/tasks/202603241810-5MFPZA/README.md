---
id: "202603241810-5MFPZA"
title: "Probe custom wrapper sandbox support matrix"
result_summary: "Custom wrapper sandbox support matrix codified; read-only now fails with a precise write-contract explanation."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "custom"
  - "sandbox"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:11:11.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T18:13:33.437Z"
  updated_by: "CODER"
  note: "Verified the custom wrapper support-matrix hardening with bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts, and bunx prettier --check packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts docs/user/configuration.mdx docs/developer/recipes-spec.mdx; the refusal path for read-only now explains the shared runner write-contract incompatibility explicitly, and the docs keep the wrapper support matrix narrow and honest."
commit:
  hash: "df3959e2a5087e00702dab8fdc3ab6c23a58cb2e"
  message: "✅ 5MFPZA code: codify custom wrapper sandbox support matrix"
comments:
  -
    author: "CODER"
    body: "Start: probe the codex sandbox wrapper against the custom-runner write contract, then harden the unsupported-sandbox refusal path and the documented support matrix so the wrapper mode stays fail-closed and honest."
  -
    author: "CODER"
    body: "Verified: the custom wrapper sandbox support matrix is now explicit and fail-closed, the adapter explains why read-only is incompatible with the shared runner write contract, and the user/developer docs document that only workspace-write is currently valid for codex sandbox full-auto wrapper mode."
events:
  -
    type: "status"
    at: "2026-03-24T18:11:13.191Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: probe the codex sandbox wrapper against the custom-runner write contract, then harden the unsupported-sandbox refusal path and the documented support matrix so the wrapper mode stays fail-closed and honest."
  -
    type: "verify"
    at: "2026-03-24T18:13:33.437Z"
    author: "CODER"
    state: "ok"
    note: "Verified the custom wrapper support-matrix hardening with bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts, and bunx prettier --check packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts docs/user/configuration.mdx docs/developer/recipes-spec.mdx; the refusal path for read-only now explains the shared runner write-contract incompatibility explicitly, and the docs keep the wrapper support matrix narrow and honest."
  -
    type: "status"
    at: "2026-03-24T18:13:49.118Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the custom wrapper sandbox support matrix is now explicit and fail-closed, the adapter explains why read-only is incompatible with the shared runner write contract, and the user/developer docs document that only workspace-write is currently valid for codex sandbox full-auto wrapper mode."
doc_version: 3
doc_updated_at: "2026-03-24T18:13:49.118Z"
doc_updated_by: "CODER"
description: "Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics."
sections:
  Summary: |-
    Probe custom wrapper sandbox support matrix
    
    Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.
  Scope: |-
    - In scope: Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.
    - Out of scope: unrelated refactors not required for "Probe custom wrapper sandbox support matrix".
  Plan: |-
    1. Probe the current codex sandbox wrapper modes against the custom-runner write requirements to determine whether read-only support is technically compatible with the shared runner contract.
    2. Update the custom wrapper enforcement path so unsupported sandbox values fail closed with a precise reason tied to required runner write artifacts rather than a generic unsupported-values message.
    3. Add focused tests and docs that codify the resulting support matrix and keep the contract honest for future wrapper extensions.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts. Expected: the custom adapter support matrix and refusal reasons stay deterministic.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the support-matrix changes.
    3. Inspect the updated adapter/docs contract for custom wrapper sandbox support. Expected: unsupported modes explain the write-contract incompatibility explicitly and supported modes remain narrow and honest.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T18:13:33.437Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified the custom wrapper support-matrix hardening with bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts, and bunx prettier --check packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts docs/user/configuration.mdx docs/developer/recipes-spec.mdx; the refusal path for read-only now explains the shared runner write-contract incompatibility explicitly, and the docs keep the wrapper support matrix narrow and honest.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:13:01.123Z, excerpt_hash=sha256:09e3b2e97a1e5246af1b15182f4390f381feb864a5315c68f25e66604ed5277c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Manual probe evidence: codex sandbox macos without --full-auto blocked writes to both cwd and TMPDIR, while codex sandbox macos --full-auto allowed both. Because the shared custom-runner contract must write result and trace artifacts under run_dir, read-only wrapper semantics remain incompatible and must stay fail-closed."
id_source: "generated"
---
## Summary

Probe custom wrapper sandbox support matrix

Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.

## Scope

- In scope: Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.
- Out of scope: unrelated refactors not required for "Probe custom wrapper sandbox support matrix".

## Plan

1. Probe the current codex sandbox wrapper modes against the custom-runner write requirements to determine whether read-only support is technically compatible with the shared runner contract.
2. Update the custom wrapper enforcement path so unsupported sandbox values fail closed with a precise reason tied to required runner write artifacts rather than a generic unsupported-values message.
3. Add focused tests and docs that codify the resulting support matrix and keep the contract honest for future wrapper extensions.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts. Expected: the custom adapter support matrix and refusal reasons stay deterministic.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the support-matrix changes.
3. Inspect the updated adapter/docs contract for custom wrapper sandbox support. Expected: unsupported modes explain the write-contract incompatibility explicitly and supported modes remain narrow and honest.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T18:13:33.437Z — VERIFY — ok

By: CODER

Note: Verified the custom wrapper support-matrix hardening with bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts, bun run --filter=agentplane build, bunx eslint packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts, and bunx prettier --check packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts docs/user/configuration.mdx docs/developer/recipes-spec.mdx; the refusal path for read-only now explains the shared runner write-contract incompatibility explicitly, and the docs keep the wrapper support matrix narrow and honest.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:13:01.123Z, excerpt_hash=sha256:09e3b2e97a1e5246af1b15182f4390f381feb864a5315c68f25e66604ed5277c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Manual probe evidence: codex sandbox macos without --full-auto blocked writes to both cwd and TMPDIR, while codex sandbox macos --full-auto allowed both. Because the shared custom-runner contract must write result and trace artifacts under run_dir, read-only wrapper semantics remain incompatible and must stay fail-closed.
