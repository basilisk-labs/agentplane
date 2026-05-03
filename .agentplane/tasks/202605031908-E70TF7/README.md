---
id: "202605031908-E70TF7"
title: "Launch public-surface ACR task graph"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "meta"
  - "planning"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:10:12.363Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T19:31:52.988Z"
  updated_by: "CODER"
  note: "Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Command: bun run spec:examples:check; Result: pass; Evidence: 6 examples validated. Command: bun run release:demo:check; Result: pass; Evidence: tape/cast/gif present and GIF under 3 MB. Command: bun run test:project core packages/core/src/tasks/task-artifact-schema.test.ts; Result: pass; Evidence: 11 tests passed. Command: bun run test:project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 4 tests passed. Command: bun run docs:cli:check; Result: pass; Evidence: CLI reference up to date. Command: bun run docs:site:build; Result: pass; Evidence: static files generated. Command: agentplane doctor; Result: pass; Evidence: doctor OK. Residual: npm publish, GitHub social preview upload, and pinned Discussions are external/manual follow-ups."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: coordinating the approved ACR launch backlog from the primary branch_pr batch worktree, with repository-local implementation first and external settings recorded separately when blocked."
events:
  -
    type: "status"
    at: "2026-05-03T19:12:01.987Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: coordinating the approved ACR launch backlog from the primary branch_pr batch worktree, with repository-local implementation first and external settings recorded separately when blocked."
  -
    type: "verify"
    at: "2026-05-03T19:31:52.988Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Command: bun run spec:examples:check; Result: pass; Evidence: 6 examples validated. Command: bun run release:demo:check; Result: pass; Evidence: tape/cast/gif present and GIF under 3 MB. Command: bun run test:project core packages/core/src/tasks/task-artifact-schema.test.ts; Result: pass; Evidence: 11 tests passed. Command: bun run test:project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 4 tests passed. Command: bun run docs:cli:check; Result: pass; Evidence: CLI reference up to date. Command: bun run docs:site:build; Result: pass; Evidence: static files generated. Command: agentplane doctor; Result: pass; Evidence: doctor OK. Residual: npm publish, GitHub social preview upload, and pinned Discussions are external/manual follow-ups."
doc_version: 3
doc_updated_at: "2026-05-03T19:31:52.996Z"
doc_updated_by: "CODER"
description: "Umbrella task for the 2026-05-04 AgentPlane ACR launch atomic backlog: correctness, public ACR promotion, trust signals, visual proof, copy polish, llms automation, CLI reference, demo freshness, star-history, and retro template."
sections:
  Summary: |-
    Launch public-surface ACR task graph

    Umbrella task for the 2026-05-04 AgentPlane ACR launch atomic backlog: correctness, public ACR promotion, trust signals, visual proof, copy polish, llms automation, CLI reference, demo freshness, star-history, and retro template.
  Scope: |-
    - In scope: Umbrella task for the 2026-05-04 AgentPlane ACR launch atomic backlog: correctness, public ACR promotion, trust signals, visual proof, copy polish, llms automation, CLI reference, demo freshness, star-history, and retro template.
    - Out of scope: unrelated refactors not required for "Launch public-surface ACR task graph".
  Plan: "Primary batch plan: coordinate and execute the AgentPlane launch backlog in branch_pr mode. Included approved task IDs: T01=202605031908-6V1G82 T02=202605031908-Z2FSSG T03=202605031908-TFYQJ0 T04=202605031908-85TGHC T05=202605031908-TE8H0C T06=202605031908-ZHHV9H T07=202605031908-1D4BT9 T08=202605031908-75KN06 T09=202605031908-N84X3P T10=202605031908-V9335S T11=202605031908-89DJCW T12=202605031908-N5J7HT T13=202605031908-6H68QN T14=202605031908-5MH36B T15=202605031908-5E28XJ T16=202605031909-Z9HW54 T17=202605031909-J0P0AF T18=202605031909-WZSSX0 T19=202605031909-XE0Z6D T20=202605031909-ANM372 T21=202605031909-7WXAF0 T22=202605031909-A0VV91 T23=202605031909-7K0J0W T24=202605031909-MTGHR1 T25=202605031909-1BB2W6 T26=202605031909-XH1NXW T27=202605031909-TNJ2F9 T28=202605031909-1ZYQQB T29=202605031909-FK03GC T30=202605031909-WFVRQW T31=202605031909-ERW8W2 T32=202605031909-BQK467 T38=202605031909-H7RHY7 T39=202605031909-Y2C3XK T40=202605031910-ARP6NS T41=202605031910-83ZWBM T42=202605031910-K95AMB. T33-T37 are absent from the source request and are intentionally not fabricated. Use one primary batch worktree for coordination only where review coupling is high; preserve each task's own plan, start, verification, and finish evidence. Repository-local tasks are in scope; irreversible npm publish and GitHub settings/social-preview changes require live access and explicit evidence, otherwise record blocked-external."
  Verify Steps: |-
    1. Review the requested outcome for "Launch public-surface ACR task graph". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T19:31:52.988Z — VERIFY — ok

    By: CODER

    Note: Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Command: bun run spec:examples:check; Result: pass; Evidence: 6 examples validated. Command: bun run release:demo:check; Result: pass; Evidence: tape/cast/gif present and GIF under 3 MB. Command: bun run test:project core packages/core/src/tasks/task-artifact-schema.test.ts; Result: pass; Evidence: 11 tests passed. Command: bun run test:project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 4 tests passed. Command: bun run docs:cli:check; Result: pass; Evidence: CLI reference up to date. Command: bun run docs:site:build; Result: pass; Evidence: static files generated. Command: agentplane doctor; Result: pass; Evidence: doctor OK. Residual: npm publish, GitHub social preview upload, and pinned Discussions are external/manual follow-ups.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T19:12:01.987Z, excerpt_hash=sha256:610181169cd7bcd4040bd13a6c137ecd1260f6f3384eb75a115961e57a2310ef

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Launch public-surface ACR task graph

Umbrella task for the 2026-05-04 AgentPlane ACR launch atomic backlog: correctness, public ACR promotion, trust signals, visual proof, copy polish, llms automation, CLI reference, demo freshness, star-history, and retro template.

## Scope

- In scope: Umbrella task for the 2026-05-04 AgentPlane ACR launch atomic backlog: correctness, public ACR promotion, trust signals, visual proof, copy polish, llms automation, CLI reference, demo freshness, star-history, and retro template.
- Out of scope: unrelated refactors not required for "Launch public-surface ACR task graph".

## Plan

Primary batch plan: coordinate and execute the AgentPlane launch backlog in branch_pr mode. Included approved task IDs: T01=202605031908-6V1G82 T02=202605031908-Z2FSSG T03=202605031908-TFYQJ0 T04=202605031908-85TGHC T05=202605031908-TE8H0C T06=202605031908-ZHHV9H T07=202605031908-1D4BT9 T08=202605031908-75KN06 T09=202605031908-N84X3P T10=202605031908-V9335S T11=202605031908-89DJCW T12=202605031908-N5J7HT T13=202605031908-6H68QN T14=202605031908-5MH36B T15=202605031908-5E28XJ T16=202605031909-Z9HW54 T17=202605031909-J0P0AF T18=202605031909-WZSSX0 T19=202605031909-XE0Z6D T20=202605031909-ANM372 T21=202605031909-7WXAF0 T22=202605031909-A0VV91 T23=202605031909-7K0J0W T24=202605031909-MTGHR1 T25=202605031909-1BB2W6 T26=202605031909-XH1NXW T27=202605031909-TNJ2F9 T28=202605031909-1ZYQQB T29=202605031909-FK03GC T30=202605031909-WFVRQW T31=202605031909-ERW8W2 T32=202605031909-BQK467 T38=202605031909-H7RHY7 T39=202605031909-Y2C3XK T40=202605031910-ARP6NS T41=202605031910-83ZWBM T42=202605031910-K95AMB. T33-T37 are absent from the source request and are intentionally not fabricated. Use one primary batch worktree for coordination only where review coupling is high; preserve each task's own plan, start, verification, and finish evidence. Repository-local tasks are in scope; irreversible npm publish and GitHub settings/social-preview changes require live access and explicit evidence, otherwise record blocked-external.

## Verify Steps

1. Review the requested outcome for "Launch public-surface ACR task graph". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T19:31:52.988Z — VERIFY — ok

By: CODER

Note: Command: bun run schemas:check; Result: pass; Evidence: schemas OK. Command: bun run spec:examples:check; Result: pass; Evidence: 6 examples validated. Command: bun run release:demo:check; Result: pass; Evidence: tape/cast/gif present and GIF under 3 MB. Command: bun run test:project core packages/core/src/tasks/task-artifact-schema.test.ts; Result: pass; Evidence: 11 tests passed. Command: bun run test:project agentplane packages/agentplane/src/commands/acr/acr.command.test.ts; Result: pass; Evidence: 4 tests passed. Command: bun run docs:cli:check; Result: pass; Evidence: CLI reference up to date. Command: bun run docs:site:build; Result: pass; Evidence: static files generated. Command: agentplane doctor; Result: pass; Evidence: doctor OK. Residual: npm publish, GitHub social preview upload, and pinned Discussions are external/manual follow-ups.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T19:12:01.987Z, excerpt_hash=sha256:610181169cd7bcd4040bd13a6c137ecd1260f6f3384eb75a115961e57a2310ef

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
