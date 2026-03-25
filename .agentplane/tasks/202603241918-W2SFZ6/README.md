---
id: "202603241918-W2SFZ6"
title: "Docs/policy: make branch_pr the default workflow contract"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603241918-762TM7"
tags:
  - "docs"
  - "workflow"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:57:19.572Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T20:07:56.564Z"
  updated_by: "DOCS"
  note: |-
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK after switching the repo-facing workflow text to branch_pr-first wording.
    Scope: packages/agentplane/assets/AGENTS.md, .agentplane/policy/workflow.branch_pr.md.
    Links: AGENTS.md, .agentplane/policy/workflow.branch_pr.md
    
    Command: bunx prettier --check packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts
    Result: pass
    Evidence: Prettier reported all matched files already formatted.
    Scope: repo policy/docs plus bootstrap/quickstart source surfaces.
    Links: docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx, docs/user/agent-bootstrap.generated.mdx
    
    Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts
    Result: pass
    Evidence: 1 file passed, 6 tests passed, covering quickstart and generated bootstrap rendering.
    Scope: packages/agentplane/src/cli/command-guide.ts, packages/agentplane/src/cli/bootstrap-guide.ts.
    Links: packages/agentplane/src/cli/command-guide.test.ts
    
    Command: rg -n 'Default direct route|Default direct happy path|normal `direct` route|stay on the direct happy path|direct happy path' packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts -S
    Result: pass
    Evidence: no matches; the touched surfaces no longer describe direct as the normal guarded default.
    Scope: repo policy/docs and bootstrap/quickstart wording.
    Links: packages/agentplane/assets/AGENTS.md, docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-03-24T20:07:56.564Z"
    author: "DOCS"
    state: "ok"
    note: |-
      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK after switching the repo-facing workflow text to branch_pr-first wording.
      Scope: packages/agentplane/assets/AGENTS.md, .agentplane/policy/workflow.branch_pr.md.
      Links: AGENTS.md, .agentplane/policy/workflow.branch_pr.md
      
      Command: bunx prettier --check packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts
      Result: pass
      Evidence: Prettier reported all matched files already formatted.
      Scope: repo policy/docs plus bootstrap/quickstart source surfaces.
      Links: docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx, docs/user/agent-bootstrap.generated.mdx
      
      Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts
      Result: pass
      Evidence: 1 file passed, 6 tests passed, covering quickstart and generated bootstrap rendering.
      Scope: packages/agentplane/src/cli/command-guide.ts, packages/agentplane/src/cli/bootstrap-guide.ts.
      Links: packages/agentplane/src/cli/command-guide.test.ts
      
      Command: rg -n 'Default direct route|Default direct happy path|normal `direct` route|stay on the direct happy path|direct happy path' packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts -S
      Result: pass
      Evidence: no matches; the touched surfaces no longer describe direct as the normal guarded default.
      Scope: repo policy/docs and bootstrap/quickstart wording.
      Links: packages/agentplane/assets/AGENTS.md, docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx
doc_version: 3
doc_updated_at: "2026-03-24T20:07:56.571Z"
doc_updated_by: "DOCS"
description: "Update AGENTS and workflow policy/docs so they consistently describe branch_pr as the default execution path and no longer imply that direct pushes to main are the normal guarded route."
sections:
  Summary: |-
    Docs/policy: make branch_pr the default workflow contract
    
    Update AGENTS and workflow policy/docs so they consistently describe branch_pr as the default execution path and no longer imply that direct pushes to main are the normal guarded route.
  Scope: |-
    - In scope: Update AGENTS and workflow policy/docs so they consistently describe branch_pr as the default execution path and no longer imply that direct pushes to main are the normal guarded route.
    - Out of scope: unrelated refactors not required for "Docs/policy: make branch_pr the default workflow contract".
  Plan: |-
    1. Update AGENTS.md and the canonical workflow docs so branch_pr is the default operating mode and direct main pushes are no longer described as the normal guarded path.
    2. Keep direct-mode guidance only as an explicit alternative, not as the repository default.
    3. Verify policy routing and the changed docs/policy surfaces remain internally consistent.
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing still passes after AGENTS/policy edits.
    2. Review AGENTS.md and the touched workflow docs. Expected: branch_pr is described as the default route and direct main pushes are no longer presented as the normal guarded workflow.
    3. Run bunx prettier --check AGENTS.md .agentplane/policy/*.md docs/user/*.md docs/developer/*.md. Expected: touched docs/policy files stay formatted.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T20:07:56.564Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK after switching the repo-facing workflow text to branch_pr-first wording.
    Scope: packages/agentplane/assets/AGENTS.md, .agentplane/policy/workflow.branch_pr.md.
    Links: AGENTS.md, .agentplane/policy/workflow.branch_pr.md
    
    Command: bunx prettier --check packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts
    Result: pass
    Evidence: Prettier reported all matched files already formatted.
    Scope: repo policy/docs plus bootstrap/quickstart source surfaces.
    Links: docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx, docs/user/agent-bootstrap.generated.mdx
    
    Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts
    Result: pass
    Evidence: 1 file passed, 6 tests passed, covering quickstart and generated bootstrap rendering.
    Scope: packages/agentplane/src/cli/command-guide.ts, packages/agentplane/src/cli/bootstrap-guide.ts.
    Links: packages/agentplane/src/cli/command-guide.test.ts
    
    Command: rg -n 'Default direct route|Default direct happy path|normal `direct` route|stay on the direct happy path|direct happy path' packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts -S\nResult: pass\nEvidence: no matches; the touched surfaces no longer describe direct as the normal guarded default.\nScope: repo policy/docs and bootstrap/quickstart wording.\nLinks: packages/agentplane/assets/AGENTS.md, docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T20:07:54.534Z, excerpt_hash=sha256:7762dcd03b0a2d0fb11b2aaee76e89cb64d8b560a148cc2956ab1d3c65ac9efd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    1. Worktree bootstrap currently requires copying the untracked task README from the base checkout into the new worktree before owner-scoped lifecycle commands can see it.
    2. `node scripts/check-agent-bootstrap-fresh.mjs` was not used as a required gate in this task because the worktree does not have a built CLI dist; the generated bootstrap page was refreshed directly from `packages/agentplane/src/cli/bootstrap-guide.ts`, and `packages/agentplane/src/cli/command-guide.test.ts` plus formatting checks covered the touched source surfaces.
id_source: "generated"
---
## Summary

Docs/policy: make branch_pr the default workflow contract

Update AGENTS and workflow policy/docs so they consistently describe branch_pr as the default execution path and no longer imply that direct pushes to main are the normal guarded route.

## Scope

- In scope: Update AGENTS and workflow policy/docs so they consistently describe branch_pr as the default execution path and no longer imply that direct pushes to main are the normal guarded route.
- Out of scope: unrelated refactors not required for "Docs/policy: make branch_pr the default workflow contract".

## Plan

1. Update AGENTS.md and the canonical workflow docs so branch_pr is the default operating mode and direct main pushes are no longer described as the normal guarded path.
2. Keep direct-mode guidance only as an explicit alternative, not as the repository default.
3. Verify policy routing and the changed docs/policy surfaces remain internally consistent.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing still passes after AGENTS/policy edits.
2. Review AGENTS.md and the touched workflow docs. Expected: branch_pr is described as the default route and direct main pushes are no longer presented as the normal guarded workflow.
3. Run bunx prettier --check AGENTS.md .agentplane/policy/*.md docs/user/*.md docs/developer/*.md. Expected: touched docs/policy files stay formatted.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T20:07:56.564Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK after switching the repo-facing workflow text to branch_pr-first wording.
Scope: packages/agentplane/assets/AGENTS.md, .agentplane/policy/workflow.branch_pr.md.
Links: AGENTS.md, .agentplane/policy/workflow.branch_pr.md

Command: bunx prettier --check packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts
Result: pass
Evidence: Prettier reported all matched files already formatted.
Scope: repo policy/docs plus bootstrap/quickstart source surfaces.
Links: docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx, docs/user/agent-bootstrap.generated.mdx

Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts
Result: pass
Evidence: 1 file passed, 6 tests passed, covering quickstart and generated bootstrap rendering.
Scope: packages/agentplane/src/cli/command-guide.ts, packages/agentplane/src/cli/bootstrap-guide.ts.
Links: packages/agentplane/src/cli/command-guide.test.ts

Command: rg -n 'Default direct route|Default direct happy path|normal `direct` route|stay on the direct happy path|direct happy path' packages/agentplane/assets/AGENTS.md .agentplane/policy/workflow.branch_pr.md docs/user/workflow.mdx docs/user/task-lifecycle.mdx docs/user/commands.mdx docs/user/agent-bootstrap.generated.mdx packages/agentplane/src/cli/bootstrap-guide.ts packages/agentplane/src/cli/command-guide.ts -S\nResult: pass\nEvidence: no matches; the touched surfaces no longer describe direct as the normal guarded default.\nScope: repo policy/docs and bootstrap/quickstart wording.\nLinks: packages/agentplane/assets/AGENTS.md, docs/user/workflow.mdx, docs/user/task-lifecycle.mdx, docs/user/commands.mdx

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T20:07:54.534Z, excerpt_hash=sha256:7762dcd03b0a2d0fb11b2aaee76e89cb64d8b560a148cc2956ab1d3c65ac9efd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Worktree bootstrap currently requires copying the untracked task README from the base checkout into the new worktree before owner-scoped lifecycle commands can see it.
2. `node scripts/check-agent-bootstrap-fresh.mjs` was not used as a required gate in this task because the worktree does not have a built CLI dist; the generated bootstrap page was refreshed directly from `packages/agentplane/src/cli/bootstrap-guide.ts`, and `packages/agentplane/src/cli/command-guide.test.ts` plus formatting checks covered the touched source surfaces.
