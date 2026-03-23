---
id: "202603231310-KAGMDW"
title: "R4: Build base prompt source collector"
result_summary: "Added base prompt source collector with explicit precedence and fallback behavior."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-NT5V5C"
tags:
  - "code"
  - "runner"
  - "prompting"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:42.490Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T13:59:01.382Z"
  updated_by: "CODER"
  note: "Collector precedence and fallback behavior verified."
commit:
  hash: "d8e8b85eff3ed72b105089a2984e20d77a158d20"
  message: "✅ KAGMDW code: done"
comments:
  -
    author: "CODER"
    body: "Start: collect framework, repo policy, and agent profile prompt sources with explicit precedence and fallback behavior."
  -
    author: "CODER"
    body: "Verified: added a runner base prompt collector that resolves policy gateway and owner profile blocks with repo-local precedence, bundled fallback, and config-aware agents_dir support."
events:
  -
    type: "status"
    at: "2026-03-23T13:49:32.914Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: collect framework, repo policy, and agent profile prompt sources with explicit precedence and fallback behavior."
  -
    type: "verify"
    at: "2026-03-23T13:59:01.382Z"
    author: "CODER"
    state: "ok"
    note: "Collector precedence and fallback behavior verified."
  -
    type: "status"
    at: "2026-03-23T13:59:09.221Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added a runner base prompt collector that resolves policy gateway and owner profile blocks with repo-local precedence, bundled fallback, and config-aware agents_dir support."
doc_version: 3
doc_updated_at: "2026-03-23T13:59:14.888Z"
doc_updated_by: "CODER"
description: "Collect framework, repo, and owner prompt sources with explicit precedence and fallback behavior."
sections:
  Summary: |-
    R4: Build base prompt source collector
    
    Collect framework, repo, and owner prompt sources with explicit precedence and fallback behavior.
  Scope: |-
    - In scope: Collect framework, repo, and owner prompt sources with explicit precedence and fallback behavior.
    - Out of scope: unrelated refactors not required for "R4: Build base prompt source collector".
  Plan: |-
    1. Implement a collector for framework prompt text, repo gateway prompt, and owner role profile.
    2. Define explicit precedence so repo-local policy beats bundled defaults without bypassing framework constraints.
    3. Add fallback tests for missing repo-local assets.
  Verify Steps: |-
    1. Run collector tests with repo-local prompt files present. Expected: repo-local sources override bundled fallbacks in the resolved prompt set.
    2. Run collector tests without repo-local prompt files. Expected: bundled defaults are used cleanly.
    3. Inspect the resolved prompt order in a snapshot. Expected: precedence is stable and explicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T13:59:01.382Z — VERIFY — ok
    
    By: CODER
    
    Note: Collector precedence and fallback behavior verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:49:32.915Z, excerpt_hash=sha256:f2bfba15086fa1321e452041210e676de0b87817d399a34a2bc5160c88a21d52
    
    Details:
    
    - Command: bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts
      Result: pass
      Evidence: 1 file, 2 tests passed; repo-local precedence and bundled fallback covered.
      Scope: runner base prompt collector behavior and prompt order snapshot.
    - Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/base-prompts.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: no lint findings after collector path/config fix.
      Scope: new runner collector module and export surface.
    - Command: ./node_modules/.bin/prettier --write packages/agentplane/src/runner/context/base-prompts.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: test file reformatted; no remaining style drift.
      Scope: modified runner files formatting.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R4: Build base prompt source collector

Collect framework, repo, and owner prompt sources with explicit precedence and fallback behavior.

## Scope

- In scope: Collect framework, repo, and owner prompt sources with explicit precedence and fallback behavior.
- Out of scope: unrelated refactors not required for "R4: Build base prompt source collector".

## Plan

1. Implement a collector for framework prompt text, repo gateway prompt, and owner role profile.
2. Define explicit precedence so repo-local policy beats bundled defaults without bypassing framework constraints.
3. Add fallback tests for missing repo-local assets.

## Verify Steps

1. Run collector tests with repo-local prompt files present. Expected: repo-local sources override bundled fallbacks in the resolved prompt set.
2. Run collector tests without repo-local prompt files. Expected: bundled defaults are used cleanly.
3. Inspect the resolved prompt order in a snapshot. Expected: precedence is stable and explicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T13:59:01.382Z — VERIFY — ok

By: CODER

Note: Collector precedence and fallback behavior verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:49:32.915Z, excerpt_hash=sha256:f2bfba15086fa1321e452041210e676de0b87817d399a34a2bc5160c88a21d52

Details:

- Command: bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts
  Result: pass
  Evidence: 1 file, 2 tests passed; repo-local precedence and bundled fallback covered.
  Scope: runner base prompt collector behavior and prompt order snapshot.
- Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/context/base-prompts.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/index.ts
  Result: pass
  Evidence: no lint findings after collector path/config fix.
  Scope: new runner collector module and export surface.
- Command: ./node_modules/.bin/prettier --write packages/agentplane/src/runner/context/base-prompts.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/index.ts
  Result: pass
  Evidence: test file reformatted; no remaining style drift.
  Scope: modified runner files formatting.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
