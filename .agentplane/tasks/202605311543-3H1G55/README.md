---
id: "202605311543-3H1G55"
title: "Use body files for PR publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "github"
  - "safety"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- pr"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:50.221Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:09:51.643Z"
  updated_by: "CODER"
  note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T16:07:53.562Z"
  updated_by: "EVALUATOR"
  note: "Release recovery CLI/policy improvement batch passes targeted verification."
  evaluated_sha: "c7c33342a9051d9f3c5e30b668b0b53e8137a5a7"
  blueprint_digest: "3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10"
  evidence_refs:
    - ".agentplane/tasks/202605311543-3H1G55/README.md"
    - ".agentplane/tasks/202605311543-3H1G55/quality/20260531-160753562-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311543-3H1G55/quality/20260531-160753562-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311543-3H1G55/quality/20260531-160753562-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311543-3H1G55/blueprint/resolved-snapshot.json"
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
    at: "2026-05-31T15:53:31.790Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:29.267Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  -
    type: "verify"
    at: "2026-05-31T16:09:51.643Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture."
doc_version: 3
doc_updated_at: "2026-05-31T16:09:51.674Z"
doc_updated_by: "CODER"
description: "Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards."
sections:
  Summary: |-
    Use body files for PR publication

    Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.
  Scope: |-
    - In scope: Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.
    - Out of scope: unrelated refactors not required for "Use body files for PR publication".
  Plan: |-
    1. Find PR publication paths that pass markdown bodies inline to shell commands.
    2. Route generated PR bodies through body files or structured API calls.
    3. Add tests covering markdown backticks and command-like text in PR bodies.
    4. Verify ap pr open/update behavior and GitHub publication safety.
  Verify Steps: |-
    PLANNER fallback scaffold for "Use body files for PR publication". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Use body files for PR publication". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:29.267Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:31.790Z, excerpt_hash=sha256:71bc1fc901c643773ea10c3fdc37dab94753b910f6a10d1e17cdd924181e1c02

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-3H1G55/blueprint/resolved-snapshot.json
    - old_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
    - current_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-3H1G55

    ### 2026-05-31T16:09:51.643Z — VERIFY — ok

    By: CODER

    Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:29.292Z, excerpt_hash=sha256:71bc1fc901c643773ea10c3fdc37dab94753b910f6a10d1e17cdd924181e1c02

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-3H1G55/blueprint/resolved-snapshot.json
    - old_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
    - current_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-3H1G55

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
    role: "included"
    updated_at: "2026-05-31T16:11:12.472Z"
id_source: "generated"
---
## Summary

Use body files for PR publication

Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.

## Scope

- In scope: Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.
- Out of scope: unrelated refactors not required for "Use body files for PR publication".

## Plan

1. Find PR publication paths that pass markdown bodies inline to shell commands.
2. Route generated PR bodies through body files or structured API calls.
3. Add tests covering markdown backticks and command-like text in PR bodies.
4. Verify ap pr open/update behavior and GitHub publication safety.

## Verify Steps

PLANNER fallback scaffold for "Use body files for PR publication". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Use body files for PR publication". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:29.267Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:31.790Z, excerpt_hash=sha256:71bc1fc901c643773ea10c3fdc37dab94753b910f6a10d1e17cdd924181e1c02

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-3H1G55/blueprint/resolved-snapshot.json
- old_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
- current_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-3H1G55

### 2026-05-31T16:09:51.643Z — VERIFY — ok

By: CODER

Note: Verified: final branch head includes implementation, batch metadata, and quality reviews. Checks passed: typecheck, format:changed, policy routing, agents:check, targeted Vitest suites, PR open/lifecycle tests, and manual included-task route fixture.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T16:06:29.292Z, excerpt_hash=sha256:71bc1fc901c643773ea10c3fdc37dab94753b910f6a10d1e17cdd924181e1c02

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-3H1G55/blueprint/resolved-snapshot.json
- old_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
- current_digest: 3d2af7048646a7252657927017bfa39782ee2404a385f524df3e3cdac7daba10
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-3H1G55

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
