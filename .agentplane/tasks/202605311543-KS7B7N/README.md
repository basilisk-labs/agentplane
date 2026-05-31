---
id: "202605311543-KS7B7N"
title: "Detect landed included tasks in route oracle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:44.616Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:19:52.034Z"
  updated_by: "CODER"
  note: "Verified: regression fix prevents primary batch tasks from being classified as included-task closure. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; bun run format:changed; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:07:18.713Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f"
  evidence_refs:
    - ".agentplane/tasks/202605311543-KS7B7N/README.md"
    - ".agentplane/tasks/202605311543-KS7B7N/quality/20260531-160718713-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-KS7B7N/quality/20260531-160718713-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-KS7B7N/quality/20260531-160718713-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
    - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation commit c7c33342a addresses the approved task scope; targeted typecheck, formatting, policy, agents, route decision, cleanup, evaluator, PR open/lifecycle, and help snapshot checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:25.729Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:11.546Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  -
    type: "verify"
    at: "2026-05-31T16:09:33.617Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  -
    type: "verify"
    at: "2026-05-31T16:10:42.975Z"
    author: "CODER"
    state: "ok"
    note: "Verified: PR artifacts refreshed at branch head 5280b759fe8fcc87b8239f6ae1f3a78377be205f; targeted checks and batch evidence remain valid."
  -
    type: "verify"
    at: "2026-05-31T16:19:52.034Z"
    author: "CODER"
    state: "ok"
    note: "Verified: regression fix prevents primary batch tasks from being classified as included-task closure. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; bun run format:changed; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs."
doc_version: 3
doc_updated_at: "2026-05-31T16:19:52.061Z"
doc_updated_by: "CODER"
description: "Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed."
sections:
  Summary: |-
    Detect landed included tasks in route oracle

    Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
  Scope: |-
    - In scope: Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
    - Out of scope: unrelated refactors not required for "Detect landed included tasks in route oracle".
  Plan: |-
    1. Add tests that reproduce a verified included batch task returning generic worktree_needed.
    2. Update route classification to emit an included-task closure phase with landed evidence requirements.
    3. Make next-action output include the exact safe recovery command and checkout.
    4. Verify release:tasks:check and routing checks still pass.
  Verify Steps: |-
    PLANNER fallback scaffold for "Detect landed included tasks in route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Detect landed included tasks in route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:11.546Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:25.729Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
    - old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

    ### 2026-05-31T16:09:33.617Z — VERIFY — ok

    By: CODER

    Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:11.574Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
    - old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

    ### 2026-05-31T16:10:42.975Z — VERIFY — ok

    By: CODER

    Note: Verified: PR artifacts refreshed at branch head 5280b759fe8fcc87b8239f6ae1f3a78377be205f; targeted checks and batch evidence remain valid.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:09:33.644Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
    - old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

    ### 2026-05-31T16:19:52.034Z — VERIFY — ok

    By: CODER

    Note: Verified: regression fix prevents primary batch tasks from being classified as included-task closure. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; bun run format:changed; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:10:43.002Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
    - old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202605311543-KS7B7N/release-recovery-cli-improvements"
    included_task_ids:
      - "202605311543-0VPDRD"
      - "202605311543-3H1G55"
      - "202605311543-6N3TMM"
      - "202605311543-NWXTSG"
      - "202605311543-QH9XXK"
      - "202605311543-R282E5"
      - "202605311543-SCWWPR"
      - "202605311543-SEMKC7"
    primary_task_id: "202605311543-KS7B7N"
    role: "primary"
    updated_at: "2026-05-31T16:24:35.209Z"
id_source: "generated"
---
## Summary

Detect landed included tasks in route oracle

Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.

## Scope

- In scope: Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
- Out of scope: unrelated refactors not required for "Detect landed included tasks in route oracle".

## Plan

1. Add tests that reproduce a verified included batch task returning generic worktree_needed.
2. Update route classification to emit an included-task closure phase with landed evidence requirements.
3. Make next-action output include the exact safe recovery command and checkout.
4. Verify release:tasks:check and routing checks still pass.

## Verify Steps

PLANNER fallback scaffold for "Detect landed included tasks in route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Detect landed included tasks in route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:11.546Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:25.729Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
- old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

### 2026-05-31T16:09:33.617Z — VERIFY — ok

By: CODER

Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:11.574Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
- old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

### 2026-05-31T16:10:42.975Z — VERIFY — ok

By: CODER

Note: Verified: PR artifacts refreshed at branch head 5280b759fe8fcc87b8239f6ae1f3a78377be205f; targeted checks and batch evidence remain valid.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:09:33.644Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
- old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

### 2026-05-31T16:19:52.034Z — VERIFY — ok

By: CODER

Note: Verified: regression fix prevents primary batch tasks from being classified as included-task closure. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; bun run format:changed; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:10:43.002Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
- old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
