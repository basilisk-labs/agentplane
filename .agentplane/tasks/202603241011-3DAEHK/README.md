---
id: "202603241011-3DAEHK"
title: "Restrict custom runner result manifest prose projection"
result_summary: "Custom runner result projection narrowed to structural fields; original manifest preserved as a side artifact for debugging."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "custom"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T10:12:12.793Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T10:15:59.469Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 3 files, 49 tests passed including source-result-manifest preservation and normalized custom result summaries. Command: bunx eslint packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: custom runner manifest source preservation, normalized result projection, and CLI regression coverage."
commit:
  hash: "bd48de9e0de87391df256d61e69efe9958e609d5"
  message: "✅ 3DAEHK code: done"
comments:
  -
    author: "CODER"
    body: "Start: restrict custom runner result projection to structural fields and preserve the original custom manifest as a side artifact for debugging."
  -
    author: "CODER"
    body: "Verified: custom runner now preserves the original external manifest as result.source.json, but normalized result.json keeps machine-English summaries and ignores external prose fields such as summary, findings, and verification hints."
events:
  -
    type: "status"
    at: "2026-03-24T10:12:13.988Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restrict custom runner result projection to structural fields and preserve the original custom manifest as a side artifact for debugging."
  -
    type: "verify"
    at: "2026-03-24T10:15:59.469Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 3 files, 49 tests passed including source-result-manifest preservation and normalized custom result summaries. Command: bunx eslint packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: custom runner manifest source preservation, normalized result projection, and CLI regression coverage."
  -
    type: "status"
    at: "2026-03-24T10:16:20.811Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: custom runner now preserves the original external manifest as result.source.json, but normalized result.json keeps machine-English summaries and ignores external prose fields such as summary, findings, and verification hints."
doc_version: 3
doc_updated_at: "2026-03-24T10:16:20.811Z"
doc_updated_by: "CODER"
description: "Keep custom runner result.json machine-English by preventing external manifest prose from overriding normalized summaries and task-facing semantics, while preserving the original custom manifest as a side artifact for debugging."
sections:
  Summary: |-
    Restrict custom runner result manifest prose projection.
    
    Keep custom runner result.json machine-English by preventing external manifest prose from overriding normalized summaries and task-facing semantics, while preserving the original custom manifest as a side artifact for debugging.
  Scope: |-
    - In scope: narrow which custom-manifest fields can affect normalized runner results, preserve the original custom manifest as a side artifact, and update tests for the new contract.
    - Out of scope: changes to codex adapter projection rules or broader result schema redesign.
  Plan: "1. Narrow custom-manifest merge semantics so prose fields do not override normalized result summaries. 2. Preserve the original custom manifest as a side artifact before writing normalized result.json. 3. Update focused adapter and CLI tests, run build, and record evidence."
  Verify Steps: |-
    1. Inspect the custom runner merge path. Expected: manifest summary, findings, and verification hints no longer override machine-English normalized results.
    2. Run focused custom-adapter and CLI tests. Expected: result.json stays normalized while the original custom manifest is preserved as a side artifact.
    3. Run a source build. Expected: touched packages build cleanly after the contract change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T10:15:59.469Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 3 files, 49 tests passed including source-result-manifest preservation and normalized custom result summaries. Command: bunx eslint packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: custom runner manifest source preservation, normalized result projection, and CLI regression coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:12:13.990Z, excerpt_hash=sha256:bcbf2fe08cdccdc4c71ba01aefa926614a8d12d3ac9c75b7977df93b80918693
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the touched tests and build to confirm the previous custom-runner projection contract is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Restrict custom runner result manifest prose projection.

Keep custom runner result.json machine-English by preventing external manifest prose from overriding normalized summaries and task-facing semantics, while preserving the original custom manifest as a side artifact for debugging.

## Scope

- In scope: narrow which custom-manifest fields can affect normalized runner results, preserve the original custom manifest as a side artifact, and update tests for the new contract.
- Out of scope: changes to codex adapter projection rules or broader result schema redesign.

## Plan

1. Narrow custom-manifest merge semantics so prose fields do not override normalized result summaries. 2. Preserve the original custom manifest as a side artifact before writing normalized result.json. 3. Update focused adapter and CLI tests, run build, and record evidence.

## Verify Steps

1. Inspect the custom runner merge path. Expected: manifest summary, findings, and verification hints no longer override machine-English normalized results.
2. Run focused custom-adapter and CLI tests. Expected: result.json stays normalized while the original custom manifest is preserved as a side artifact.
3. Run a source build. Expected: touched packages build cleanly after the contract change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T10:15:59.469Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 3 files, 49 tests passed including source-result-manifest preservation and normalized custom result summaries. Command: bunx eslint packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: custom runner manifest source preservation, normalized result projection, and CLI regression coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:12:13.990Z, excerpt_hash=sha256:bcbf2fe08cdccdc4c71ba01aefa926614a8d12d3ac9c75b7977df93b80918693

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the touched tests and build to confirm the previous custom-runner projection contract is restored.

## Findings
