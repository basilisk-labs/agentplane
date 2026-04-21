---
id: "202604201827-7Y2QS2"
title: "Expose project-local skills in runner prompts"
result_summary: "Runner base prompt assembly now emits metadata-only project skill discovery blocks from skills/*/SKILL.md before recipe prompt blocks."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "skills"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T18:27:53.992Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T03:45:10.052Z"
  updated_by: "CODER"
  note: "Verified runner prompt discovery with focused tests, lint, typecheck, format, policy routing, doctor, and package builds."
commit:
  hash: "a49495728059f6890988785f20b3eba41a18fbbf"
  message: "📝 7Y2QS2 task: refresh PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: implementing project-local skill prompt discovery."
  -
    author: "CODER"
    body: "Verified: project-local skill discovery added to runner prompt assembly and tested."
events:
  -
    type: "status"
    at: "2026-04-20T18:28:08.400Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing project-local skill prompt discovery."
  -
    type: "verify"
    at: "2026-04-21T03:45:10.052Z"
    author: "CODER"
    state: "ok"
    note: "Verified runner prompt discovery with focused tests, lint, typecheck, format, policy routing, doctor, and package builds."
  -
    type: "status"
    at: "2026-04-21T03:49:05.563Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: project-local skill discovery added to runner prompt assembly and tested."
doc_version: 3
doc_updated_at: "2026-04-21T03:49:05.564Z"
doc_updated_by: "CODER"
description: "Add runner prompt assembly support that discovers repo-local skills from skills/*/SKILL.md and injects metadata so agents can discover applicable skills during system prompt construction."
sections:
  Summary: |-
    Expose project-local skills in runner prompts
    
    Add runner prompt assembly support that discovers repo-local skills from skills/*/SKILL.md and injects metadata so agents can discover applicable skills during system prompt construction.
  Scope: |-
    - In scope: Add runner prompt assembly support that discovers repo-local skills from skills/*/SKILL.md and injects metadata so agents can discover applicable skills during system prompt construction.
    - Out of scope: unrelated refactors not required for "Expose project-local skills in runner prompts".
  Plan: |-
    Plan:
    1. Add runner prompt assembly support that scans skills/*/SKILL.md, parses frontmatter metadata, and emits a metadata-only prompt block.
    2. Wire the prompt block into collectRunnerBasePrompts in a stable order before recipe prompt blocks.
    3. Add focused tests for skill metadata discovery and ordering with recipe prompt blocks.
    4. Verify with focused Vitest, ESLint, typecheck, formatting, policy routing, doctor, and package builds.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T03:45:10.052Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified runner prompt discovery with focused tests, lint, typecheck, format, policy routing, doctor, and package builds.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:08.425Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added project skill metadata prompt block and wired it into collectRunnerBasePrompts before recipe prompt blocks.
      Impact: Agents can discover repo-local skills during system prompt assembly without inlining full skill bodies.
      Resolution: Checks passed: bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts; bun x eslint packages/agentplane/src/runner/context/base-prompts.ts packages/agentplane/src/runner/context/project-skill-prompt-blocks.ts packages/agentplane/src/runner/context/base-prompts.test.ts; bun run --filter=agentplane typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Expose project-local skills in runner prompts

Add runner prompt assembly support that discovers repo-local skills from skills/*/SKILL.md and injects metadata so agents can discover applicable skills during system prompt construction.

## Scope

- In scope: Add runner prompt assembly support that discovers repo-local skills from skills/*/SKILL.md and injects metadata so agents can discover applicable skills during system prompt construction.
- Out of scope: unrelated refactors not required for "Expose project-local skills in runner prompts".

## Plan

Plan:
1. Add runner prompt assembly support that scans skills/*/SKILL.md, parses frontmatter metadata, and emits a metadata-only prompt block.
2. Wire the prompt block into collectRunnerBasePrompts in a stable order before recipe prompt blocks.
3. Add focused tests for skill metadata discovery and ordering with recipe prompt blocks.
4. Verify with focused Vitest, ESLint, typecheck, formatting, policy routing, doctor, and package builds.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T03:45:10.052Z — VERIFY — ok

By: CODER

Note: Verified runner prompt discovery with focused tests, lint, typecheck, format, policy routing, doctor, and package builds.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T18:28:08.425Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added project skill metadata prompt block and wired it into collectRunnerBasePrompts before recipe prompt blocks.
  Impact: Agents can discover repo-local skills during system prompt assembly without inlining full skill bodies.
  Resolution: Checks passed: bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts; bun x eslint packages/agentplane/src/runner/context/base-prompts.ts packages/agentplane/src/runner/context/project-skill-prompt-blocks.ts packages/agentplane/src/runner/context/base-prompts.test.ts; bun run --filter=agentplane typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build.
  Promotion: incident-candidate
  Fixability: external
