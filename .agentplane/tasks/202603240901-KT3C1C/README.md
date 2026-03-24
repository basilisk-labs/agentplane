---
id: "202603240901-KT3C1C"
title: "Add regression coverage for trace completeness and language isolation"
result_summary: "Regression coverage added for raw trace completeness and English-only task-facing runner logs under non-English assistant output."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603240901-EABAY5"
  - "202603240901-ANZV65"
  - "202603240901-H9TFC3"
tags:
  - "code"
  - "runner"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T10:01:46.340Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T10:05:13.829Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 2 files, 38 tests passed including Russian raw-trace and English-only task-facing assertions. Command: bunx eslint packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Scope: codex success-path regression coverage for raw trace preservation, side artifact preservation, and Cyrillic-free CLI/task projection."
commit:
  hash: "dc5760a40c6bb8d8f56350b361657213e975c517"
  message: "✅ KT3C1C code: done"
comments:
  -
    author: "CODER"
    body: "Start: add regression coverage proving raw trace preserves non-English assistant output while result summaries and task-facing runner projection stay English-only."
  -
    author: "CODER"
    body: "Verified: regression coverage now proves that raw trace and codex-last-message preserve original Russian assistant output while run summaries, CLI output, and task-facing runner projection remain English-only and free of Cyrillic text."
events:
  -
    type: "status"
    at: "2026-03-24T10:01:47.481Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add regression coverage proving raw trace preserves non-English assistant output while result summaries and task-facing runner projection stay English-only."
  -
    type: "verify"
    at: "2026-03-24T10:05:13.829Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 2 files, 38 tests passed including Russian raw-trace and English-only task-facing assertions. Command: bunx eslint packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Scope: codex success-path regression coverage for raw trace preservation, side artifact preservation, and Cyrillic-free CLI/task projection."
  -
    type: "status"
    at: "2026-03-24T10:05:30.594Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: regression coverage now proves that raw trace and codex-last-message preserve original Russian assistant output while run summaries, CLI output, and task-facing runner projection remain English-only and free of Cyrillic text."
doc_version: 3
doc_updated_at: "2026-03-24T10:05:30.594Z"
doc_updated_by: "CODER"
description: "Add regression tests proving that raw trace capture preserves original adapter output while task-facing runner logs remain English-only even when the assistant emits Russian or other non-English prose."
sections:
  Summary: |-
    Add regression coverage for trace completeness and language isolation.
    
    Add regression tests proving that raw trace capture preserves original adapter output while task-facing runner logs remain English-only even when the assistant emits Russian or other non-English prose.
  Scope: |-
    - In scope: add a regression fixture with non-English assistant output, assert raw trace preservation, and assert English-only task-facing runner summaries.
    - Out of scope: production runner behavior changes outside the test harness and unrelated trace refactors.
  Plan: |-
    1. Extend the runner test harness with a fixture that emits Russian assistant text into raw trace and any side artifact.
    2. Assert that agent-trace.jsonl preserves the original text while result.json, CLI output, and task-facing README stay machine-English.
    3. Run focused runner and CLI tests, then record verification evidence.
  Verify Steps: |-
    1. Inspect the new regression fixture. Expected: raw trace or side artifact contains the original Russian assistant text without normalization.
    2. Run focused runner and CLI tests. Expected: assertions prove that task-facing summaries and README runner blocks contain no Cyrillic text.
    3. Review the final task-facing projection expectations. Expected: only artifact paths and fixed English summary strings are exposed outside raw trace artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T10:05:13.829Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 2 files, 38 tests passed including Russian raw-trace and English-only task-facing assertions. Command: bunx eslint packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Scope: codex success-path regression coverage for raw trace preservation, side artifact preservation, and Cyrillic-free CLI/task projection.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:01:47.482Z, excerpt_hash=sha256:86b9d668f699256d2ae1b18c5f0deea8b37dc897e5308d084786ca9e6d21c824
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the touched test suites to confirm the previous trace contract is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Add regression coverage for trace completeness and language isolation.

Add regression tests proving that raw trace capture preserves original adapter output while task-facing runner logs remain English-only even when the assistant emits Russian or other non-English prose.

## Scope

- In scope: add a regression fixture with non-English assistant output, assert raw trace preservation, and assert English-only task-facing runner summaries.
- Out of scope: production runner behavior changes outside the test harness and unrelated trace refactors.

## Plan

1. Extend the runner test harness with a fixture that emits Russian assistant text into raw trace and any side artifact.
2. Assert that agent-trace.jsonl preserves the original text while result.json, CLI output, and task-facing README stay machine-English.
3. Run focused runner and CLI tests, then record verification evidence.

## Verify Steps

1. Inspect the new regression fixture. Expected: raw trace or side artifact contains the original Russian assistant text without normalization.
2. Run focused runner and CLI tests. Expected: assertions prove that task-facing summaries and README runner blocks contain no Cyrillic text.
3. Review the final task-facing projection expectations. Expected: only artifact paths and fixed English summary strings are exposed outside raw trace artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T10:05:13.829Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 2 files, 38 tests passed including Russian raw-trace and English-only task-facing assertions. Command: bunx eslint packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Scope: codex success-path regression coverage for raw trace preservation, side artifact preservation, and Cyrillic-free CLI/task projection.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:01:47.482Z, excerpt_hash=sha256:86b9d668f699256d2ae1b18c5f0deea8b37dc897e5308d084786ca9e6d21c824

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the touched test suites to confirm the previous trace contract is restored.

## Findings
