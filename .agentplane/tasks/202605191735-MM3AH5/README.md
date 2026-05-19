---
id: "202605191735-MM3AH5"
title: "Visualize built-in blueprint routes in docs"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprint"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T17:36:04.660Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T17:40:36.019Z"
  updated_by: "EVALUATOR"
  note: "Quality review pass on final commit b9c5c6edafb8: docs-only change matches current built-in blueprint definitions, adds visual route map plus matrix, and Docusaurus build validates the MDX/Mermaid page. No unintended tracked changes remain in the task worktree."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T17:40:36.019Z"
  updated_by: "EVALUATOR"
  note: "Quality review pass on final commit b9c5c6edafb8: docs-only change matches current built-in blueprint definitions, adds visual route map plus matrix, and Docusaurus build validates the MDX/Mermaid page. No unintended tracked changes remain in the task worktree."
  evaluated_sha: "b9c5c6edafb8b38043051eef89611330a937bfae"
  blueprint_digest: "a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d"
  evidence_refs:
    - ".agentplane/tasks/202605191735-MM3AH5/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Documenting the current built-in blueprint route map from the runtime definitions, scoped to docs/developer/blueprints.mdx and task artifacts only."
events:
  -
    type: "status"
    at: "2026-05-19T17:36:37.673Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Documenting the current built-in blueprint route map from the runtime definitions, scoped to docs/developer/blueprints.mdx and task artifacts only."
  -
    type: "verify"
    at: "2026-05-19T17:39:22.365Z"
    author: "DOCS"
    state: "ok"
    note: "Docs update verified: added built-in blueprint route map and matrix grounded in packages/agentplane/src/blueprints/builtins*.ts and model.ts. Checks passed: node .agentplane/policy/check-routing.mjs; ap doctor; bun run docs:ia:check; bun run docs:site:typecheck after bun install --frozen-lockfile --ignore-scripts; git diff --check; bun run --cwd website docusaurus build. Residual: bun run docs:site:build:check stops on pre-existing stale social image static/img/social/docs/reference/evidence.png, outside this task scope."
  -
    type: "verify"
    at: "2026-05-19T17:39:32.255Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality review pass: documentation change is scoped to docs/developer/blueprints.mdx, uses current built-in blueprint/model sources as evidence, and verified MDX/Mermaid through Docusaurus build. Residual docs:site:build:check social-image drift is outside the changed page and tracked diff."
  -
    type: "verify"
    at: "2026-05-19T17:40:28.615Z"
    author: "DOCS"
    state: "ok"
    note: "Verified final task-branch commit b9c5c6edafb8. Checks passed: node .agentplane/policy/check-routing.mjs; ap doctor; bun run docs:ia:check; bun run docs:site:typecheck after lockfile install; git diff --check; bun run --cwd website docusaurus build. docs:site:build:check still stops on unrelated stale social image static/img/social/docs/reference/evidence.png."
  -
    type: "verify"
    at: "2026-05-19T17:40:36.019Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality review pass on final commit b9c5c6edafb8: docs-only change matches current built-in blueprint definitions, adds visual route map plus matrix, and Docusaurus build validates the MDX/Mermaid page. No unintended tracked changes remain in the task worktree."
doc_version: 3
doc_updated_at: "2026-05-19T17:40:36.054Z"
doc_updated_by: "DOCS"
description: "Add a visual representation of existing built-in AgentPlane blueprints and the route modules/nodes they consist of to the developer blueprints documentation."
sections:
  Summary: |-
    Visualize built-in blueprint routes in docs

    Add a visual representation of existing built-in AgentPlane blueprints and the route modules/nodes they consist of to the developer blueprints documentation.
  Scope: |-
    - In scope: Add a visual representation of existing built-in AgentPlane blueprints and the route modules/nodes they consist of to the developer blueprints documentation.
    - Out of scope: unrelated refactors not required for "Visualize built-in blueprint routes in docs".
  Plan: "1. Use the current built-in blueprint definitions as the source of truth. 2. Update docs/developer/blueprints.mdx with a Mermaid visual map of built-in blueprints and their shared route modules/nodes. 3. Add a compact matrix that names each built-in blueprint, task kind, workflow mode, route spine, and distinctive evidence/module contract. 4. Run docs/policy verification checks: node .agentplane/policy/check-routing.mjs and agentplane doctor, plus a targeted docs content check if available."
  Verify Steps: |-
    PLANNER fallback scaffold for "Visualize built-in blueprint routes in docs". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Visualize built-in blueprint routes in docs". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T17:39:22.365Z — VERIFY — ok

    By: DOCS

    Note: Docs update verified: added built-in blueprint route map and matrix grounded in packages/agentplane/src/blueprints/builtins*.ts and model.ts. Checks passed: node .agentplane/policy/check-routing.mjs; ap doctor; bun run docs:ia:check; bun run docs:site:typecheck after bun install --frozen-lockfile --ignore-scripts; git diff --check; bun run --cwd website docusaurus build. Residual: bun run docs:site:build:check stops on pre-existing stale social image static/img/social/docs/reference/evidence.png, outside this task scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:36:37.673Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
    - old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

    ### 2026-05-19T17:39:32.255Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality review pass: documentation change is scoped to docs/developer/blueprints.mdx, uses current built-in blueprint/model sources as evidence, and verified MDX/Mermaid through Docusaurus build. Residual docs:site:build:check social-image drift is outside the changed page and tracked diff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:39:22.404Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
    - old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

    ### 2026-05-19T17:40:28.615Z — VERIFY — ok

    By: DOCS

    Note: Verified final task-branch commit b9c5c6edafb8. Checks passed: node .agentplane/policy/check-routing.mjs; ap doctor; bun run docs:ia:check; bun run docs:site:typecheck after lockfile install; git diff --check; bun run --cwd website docusaurus build. docs:site:build:check still stops on unrelated stale social image static/img/social/docs/reference/evidence.png.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:39:32.289Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
    - old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

    ### 2026-05-19T17:40:36.019Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality review pass on final commit b9c5c6edafb8: docs-only change matches current built-in blueprint definitions, adds visual route map plus matrix, and Docusaurus build validates the MDX/Mermaid page. No unintended tracked changes remain in the task worktree.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:40:28.644Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
    - old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Visualize built-in blueprint routes in docs

Add a visual representation of existing built-in AgentPlane blueprints and the route modules/nodes they consist of to the developer blueprints documentation.

## Scope

- In scope: Add a visual representation of existing built-in AgentPlane blueprints and the route modules/nodes they consist of to the developer blueprints documentation.
- Out of scope: unrelated refactors not required for "Visualize built-in blueprint routes in docs".

## Plan

1. Use the current built-in blueprint definitions as the source of truth. 2. Update docs/developer/blueprints.mdx with a Mermaid visual map of built-in blueprints and their shared route modules/nodes. 3. Add a compact matrix that names each built-in blueprint, task kind, workflow mode, route spine, and distinctive evidence/module contract. 4. Run docs/policy verification checks: node .agentplane/policy/check-routing.mjs and agentplane doctor, plus a targeted docs content check if available.

## Verify Steps

PLANNER fallback scaffold for "Visualize built-in blueprint routes in docs". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Visualize built-in blueprint routes in docs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T17:39:22.365Z — VERIFY — ok

By: DOCS

Note: Docs update verified: added built-in blueprint route map and matrix grounded in packages/agentplane/src/blueprints/builtins*.ts and model.ts. Checks passed: node .agentplane/policy/check-routing.mjs; ap doctor; bun run docs:ia:check; bun run docs:site:typecheck after bun install --frozen-lockfile --ignore-scripts; git diff --check; bun run --cwd website docusaurus build. Residual: bun run docs:site:build:check stops on pre-existing stale social image static/img/social/docs/reference/evidence.png, outside this task scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:36:37.673Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
- old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

### 2026-05-19T17:39:32.255Z — VERIFY — ok

By: EVALUATOR

Note: Quality review pass: documentation change is scoped to docs/developer/blueprints.mdx, uses current built-in blueprint/model sources as evidence, and verified MDX/Mermaid through Docusaurus build. Residual docs:site:build:check social-image drift is outside the changed page and tracked diff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:39:22.404Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
- old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

### 2026-05-19T17:40:28.615Z — VERIFY — ok

By: DOCS

Note: Verified final task-branch commit b9c5c6edafb8. Checks passed: node .agentplane/policy/check-routing.mjs; ap doctor; bun run docs:ia:check; bun run docs:site:typecheck after lockfile install; git diff --check; bun run --cwd website docusaurus build. docs:site:build:check still stops on unrelated stale social image static/img/social/docs/reference/evidence.png.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:39:32.289Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
- old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

### 2026-05-19T17:40:36.019Z — VERIFY — ok

By: EVALUATOR

Note: Quality review pass on final commit b9c5c6edafb8: docs-only change matches current built-in blueprint definitions, adds visual route map plus matrix, and Docusaurus build validates the MDX/Mermaid page. No unintended tracked changes remain in the task worktree.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:40:28.644Z, excerpt_hash=sha256:74198295066a2a742d58cf8f8c5ef0e9f33981a550d515f4dd43af990ef74a83

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191735-MM3AH5-blueprint-visual-map/.agentplane/tasks/202605191735-MM3AH5/blueprint/resolved-snapshot.json
- old_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- current_digest: a80d0aee7217fbd82293d1ea70a6f0020773294b2e70cfca2a27fdac04e5883d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191735-MM3AH5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
