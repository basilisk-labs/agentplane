---
id: "202605142118-GZ5WWK"
title: "Clarify wiki glossary and cross-link guidance"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T21:18:28.876Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T21:22:18.332Z"
  updated_by: "CODER"
  note: "Command: bunx prettier --check packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts packages/agentplane/assets/agents/CURATOR.json docs/user/local-context.mdx; bun test packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts; bunx eslint packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts; bun run docs:site:typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier passed, 39 focused tests passed, eslint and docs typecheck passed, policy routing OK, doctor OK with pre-existing branch_pr reconciliation warnings unrelated to this task. Scope: local context wiki prompt guidance, CURATOR extraction prompt, CURATOR asset, and user local-context docs."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: update local context prompt surfaces so generated wiki notes and CURATOR extraction guidance preserve adaptive wiki structure, prefer useful cross-links, and define glossary as a thin index over wiki and graph evidence."
events:
  -
    type: "status"
    at: "2026-05-14T21:18:55.759Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update local context prompt surfaces so generated wiki notes and CURATOR extraction guidance preserve adaptive wiki structure, prefer useful cross-links, and define glossary as a thin index over wiki and graph evidence."
  -
    type: "verify"
    at: "2026-05-14T21:22:18.332Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx prettier --check packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts packages/agentplane/assets/agents/CURATOR.json docs/user/local-context.mdx; bun test packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts; bunx eslint packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts; bun run docs:site:typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier passed, 39 focused tests passed, eslint and docs typecheck passed, policy routing OK, doctor OK with pre-existing branch_pr reconciliation warnings unrelated to this task. Scope: local context wiki prompt guidance, CURATOR extraction prompt, CURATOR asset, and user local-context docs."
doc_version: 3
doc_updated_at: "2026-05-14T21:22:18.350Z"
doc_updated_by: "CODER"
description: "Update AgentPlane local context prompts so CURATOR and generated wiki agent notes prefer useful Markdown cross-links, keep glossary as a thin index over wiki/graph, and preserve adaptive wiki structure after first analysis."
sections:
  Summary: |-
    Clarify wiki glossary and cross-link guidance
    
    Update AgentPlane local context prompts so CURATOR and generated wiki agent notes prefer useful Markdown cross-links, keep glossary as a thin index over wiki/graph, and preserve adaptive wiki structure after first analysis.
  Scope: |-
    - In scope: Update AgentPlane local context prompts so CURATOR and generated wiki agent notes prefer useful Markdown cross-links, keep glossary as a thin index over wiki/graph, and preserve adaptive wiki structure after first analysis.
    - Out of scope: unrelated refactors not required for "Clarify wiki glossary and cross-link guidance".
  Plan: "1. Inspect current local context prompt surfaces and docs around adaptive wiki structure, glossary, graph entities, and cross-link guidance. 2. Update generated wiki agent notes and CURATOR extraction prompt so agents prefer useful cross-links, keep glossary as a thin index over wiki/graph, and avoid forcing fixed concepts/entities/decisions structure after first analysis. 3. Update relevant local context docs only if needed to align user-facing behavior. 4. Run focused tests/checks for context prompt contracts, CLI docs generation if touched, policy routing, and doctor. 5. Publish the branch PR and integrate it into main."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T21:22:18.332Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx prettier --check packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts packages/agentplane/assets/agents/CURATOR.json docs/user/local-context.mdx; bun test packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts; bunx eslint packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts; bun run docs:site:typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier passed, 39 focused tests passed, eslint and docs typecheck passed, policy routing OK, doctor OK with pre-existing branch_pr reconciliation warnings unrelated to this task. Scope: local context wiki prompt guidance, CURATOR extraction prompt, CURATOR asset, and user local-context docs.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T21:18:55.759Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142118-GZ5WWK-wiki-glossary-cross-links/.agentplane/tasks/202605142118-GZ5WWK/blueprint/resolved-snapshot.json
    - old_digest: 508546e30aca216bb2c3b5ee46a673772a2ca5328a83876219d8e36c6f57c3ec
    - current_digest: 508546e30aca216bb2c3b5ee46a673772a2ca5328a83876219d8e36c6f57c3ec
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605142118-GZ5WWK
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clarify wiki glossary and cross-link guidance

Update AgentPlane local context prompts so CURATOR and generated wiki agent notes prefer useful Markdown cross-links, keep glossary as a thin index over wiki/graph, and preserve adaptive wiki structure after first analysis.

## Scope

- In scope: Update AgentPlane local context prompts so CURATOR and generated wiki agent notes prefer useful Markdown cross-links, keep glossary as a thin index over wiki/graph, and preserve adaptive wiki structure after first analysis.
- Out of scope: unrelated refactors not required for "Clarify wiki glossary and cross-link guidance".

## Plan

1. Inspect current local context prompt surfaces and docs around adaptive wiki structure, glossary, graph entities, and cross-link guidance. 2. Update generated wiki agent notes and CURATOR extraction prompt so agents prefer useful cross-links, keep glossary as a thin index over wiki/graph, and avoid forcing fixed concepts/entities/decisions structure after first analysis. 3. Update relevant local context docs only if needed to align user-facing behavior. 4. Run focused tests/checks for context prompt contracts, CLI docs generation if touched, policy routing, and doctor. 5. Publish the branch PR and integrate it into main.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T21:22:18.332Z — VERIFY — ok

By: CODER

Note: Command: bunx prettier --check packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts packages/agentplane/assets/agents/CURATOR.json docs/user/local-context.mdx; bun test packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts; bunx eslint packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/harvest-tasks-extraction.ts; bun run docs:site:typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: prettier passed, 39 focused tests passed, eslint and docs typecheck passed, policy routing OK, doctor OK with pre-existing branch_pr reconciliation warnings unrelated to this task. Scope: local context wiki prompt guidance, CURATOR extraction prompt, CURATOR asset, and user local-context docs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T21:18:55.759Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605142118-GZ5WWK-wiki-glossary-cross-links/.agentplane/tasks/202605142118-GZ5WWK/blueprint/resolved-snapshot.json
- old_digest: 508546e30aca216bb2c3b5ee46a673772a2ca5328a83876219d8e36c6f57c3ec
- current_digest: 508546e30aca216bb2c3b5ee46a673772a2ca5328a83876219d8e36c6f57c3ec
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605142118-GZ5WWK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
