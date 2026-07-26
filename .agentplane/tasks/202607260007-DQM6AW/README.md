---
id: "202607260007-DQM6AW"
title: "Prepare semantic conflict rework routes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "conflict"
  - "correctness"
  - "integration-queue"
  - "provider"
  - "rework"
  - "v0.7"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "A real queued protected-PR conflict yields a bounded semantic-rework preparation packet and route."
  - "CLI does not auto-rebase, force-push, choose conflict semantics, or rewrite the branch."
  - "Changed, unknown, or unavailable provider/base truth invalidates the packet and fails closed."
  - "Normal verified publication resumes only after explicit CODER resolution and refreshed provider checks."
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T00:08:37.745Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-26T01:35:03.710Z"
  updated_by: "TESTER"
  note: "Rework: full lint is not clean, and stale queue or handoff identity can still unlock the semantic conflict route."
  attempts: 2
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement only the approved conflict-rework preparation contract; no worktree, code, or PR is created by this planning checkpoint."
events:
  -
    type: "status"
    at: "2026-07-26T00:08:44.667Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement only the approved conflict-rework preparation contract; no worktree, code, or PR is created by this planning checkpoint."
  -
    type: "verify"
    at: "2026-07-26T01:05:46.183Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: c343fb09 fails declared lint and misses bounded queued-protected conflict-route guarantees."
  -
    type: "verify"
    at: "2026-07-26T01:35:03.710Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: full lint is not clean, and stale queue or handoff identity can still unlock the semantic conflict route."
doc_version: 3
doc_updated_at: "2026-07-26T01:42:34.041Z"
doc_updated_by: "CODER"
description: "When a queued protected branch_pr PR has a real merge conflict, prepare a bounded context packet and an explicit CODER rework route rather than prohibiting manual rebase without an alternative. The CLI must not select semantic resolution or silently rewrite a branch. Current incident: THDN 202607252223-THDN0G PR #4626 is CONFLICTING after main e27c938698668ce242243d166f8c7c1b64cce88f."
sections:
  Summary: "Make a queued protected-PR conflict actionable for a semantic CODER without turning the CLI into a semantic resolver. The CLI must prepare current bounded context and a task-scoped handoff, then fail closed whenever that context is stale or incomplete."
  Scope: "In scope: branch_pr queue conflict detection, provider-backed freshness and provenance, a bounded conflict-rework packet, next-action and worktree handoff routing, invalidation, and focused tests. Current concrete regression: THDN 202607252223-THDN0G PR #4626 has head 040d8df0eaf431e2292eb161efe80e1466ffbd8e and provider reports DIRTY or CONFLICTING after main e27c938698668ce242243d166f8c7c1b64cce88f. Out of scope: choosing semantic resolution, applying conflict hunks, automatic git rebase or merge, automatic force-push, silent branch rewrite, direct provider merge, or generic queue redesign."
  Plan: |-
    1. Map the protected branch_pr integration queue conflict boundary and distinguish a real provider merge conflict from pending checks, stale local metadata, deleted refs, unavailable provider lookup, and ordinary rework. Record the THDN regression exactly: task 202607252223-THDN0G, PR #4626, head 040d8df0eaf431e2292eb161efe80e1466ffbd8e, provider state CONFLICTING, after main e27c938698668ce242243d166f8c7c1b64cce88f.
    2. Define a typed, task-scoped conflict-rework preparation packet containing only current provenance and bounded context: task and PR identities, branch and base refs, remote heads, merge base or conflict detection identity, conflicting paths or safe summaries, current checks, and freshness tokens.
    3. Make next-action and queue routes return an explicit CODER semantic-rework handoff to the correct dedicated task worktree when the packet is current; the CLI prepares context but never selects a hunk, chooses semantics, auto-rebases, auto-merges, force-pushes, or silently rewrites the task branch.
    4. If any provider, base, or branch identity changes after preparation, invalidate the packet and require a fresh provider read; unknown or unavailable truth must fail closed without making a branch mutation route executable.
    5. Preserve normal integration for clean PRs and make the post-resolution path require an explicit new CODER commit, refreshed task or PR artifacts, fresh verification, and normal protected-PR publication with lease-safe provenance.
    6. Add focused regressions for the THDN topology, clean PRs, conflicting PRs, changed base or head after packet creation, provider lookup failure, missing worktree, and route non-mutation.
    7. Run focused queue and route tests, static checks, lifecycle and routing checks, record quality evidence, then use the normal branch_pr PR and integration route.
  Verify Steps: |-
    1. Model the THDN topology and prove that a current provider-reported protected-PR conflict returns a bounded semantic-rework preparation route, not enqueue, wait-for-checks, publish, cleanup, raw rebase, raw merge, or force-push.
    2. Prove the packet includes task and PR identities, current provider and base heads, branch identity, merge-base or conflict-detection identity, bounded conflict paths or summaries, check state, and a freshness token sufficient to invalidate it.
    3. Prove the route points to the correct task worktree and explicitly delegates semantic choice to CODER; preparation itself performs no branch, worktree, PR, or provider mutation.
    4. Prove a changed base/head, changed PR state, missing worktree, missing PR, unavailable provider, or incomplete packet invalidates the route and fails closed.
    5. Prove clean and merely pending-check PRs preserve their normal integration route.
    6. Prove after a CODER-resolved new commit the task must refresh provider truth and rerun normal verification before lease-safe publication and queue handoff.
    7. Run focused queue and route regressions; bun run typecheck; bun run lint:core; bun run guards:check; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; agentplane doctor; and git diff --check.
    8. Record independent TESTER and EVALUATOR evidence, wait for stable hosted checks, and use only normal branch_pr integration.
  Verification: |-
    Required evidence: fixture or provider-snapshot proof of the THDN conflict state; emitted preparation packet and exact route; proof that preparation contains no branch mutation command; invalidation evidence for base/head/provider drift; clean-PR non-regression evidence; focused test, static, lifecycle, and routing output; independent TESTER and EVALUATOR review; stable hosted checks. Refresh all evidence after every provider/base snapshot change.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T01:05:46.183Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: c343fb09 fails declared lint and misses bounded queued-protected conflict-route guarantees.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:53:05.897Z, excerpt_hash=sha256:fdcd9ba52c849ed7fef21f254416faca99218bb89f54851b9ddc269b848d053f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260007-DQM6AW-prepare-semantic-conflict-rework-routes/.agentplane/tasks/202607260007-DQM6AW/blueprint/resolved-snapshot.json
    - old_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
    - current_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607260007-DQM6AW

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202607260007-DQM6AW --author CODER
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-26T01:35:03.710Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: full lint is not clean, and stale queue or handoff identity can still unlock the semantic conflict route.
    Attempts: 2

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T01:26:56.904Z, excerpt_hash=sha256:fdcd9ba52c849ed7fef21f254416faca99218bb89f54851b9ddc269b848d053f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260007-DQM6AW-prepare-semantic-conflict-rework-routes/.agentplane/tasks/202607260007-DQM6AW/blueprint/resolved-snapshot.json
    - old_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
    - current_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607260007-DQM6AW

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the bounded preparation and route change in a new normal branch_pr task or follow-up. Preserve any existing fail-closed conflict block and task-local packet evidence. Never compensate by rebasing, merging, force-pushing, deleting, or recreating a branch. If current truth cannot be reconfirmed, stop with the diagnostic route and leave all refs/worktrees unchanged."
  Findings: |-
    Current incident rule: remote truth for THDN 202607252223-THDN0G PR #4626 reports mergeStateStatus DIRTY and mergeable CONFLICTING, with head 040d8df0eaf431e2292eb161efe80e1466ffbd8e, after main advanced to e27c938698668ce242243d166f8c7c1b64cce88f. A queue route must not relabel this as ordinary wait-for-checks work or offer unbounded manual rebase. It must package fresh nonsemantic context and hand the semantic decision to the assigned CODER.

    Implementation evidence: the CLI obtains exact PR detail after a branch lookup, emits a deterministic read-only packet with task, head/base, merge base, bounded overlapping paths, bounded hosted-check summaries, base-protection provenance, and a SHA-256 freshness token. Candidate paths are not selected hunks. No packet path performs rebase, merge, force-push, rewrite, publication, queue mutation, or provider mutation.

    Rework resolution: conflict rework requires a DONE task with verification=ok and a matching active queue reservation (queued, claimed, or handoff) or protected-base handoff. The reservation/handoff must match provider PR branch, head, base, base SHA, and PR number. GitHub must freshly confirm that the exact provider base requires the protected PR merge path; unprotected, unavailable, or wrong-base protection evidence fails closed. Provider head/base mismatches, missing provider truth, unresolved mergeability, and missing or dirty worktrees still fail closed.

    Second rework resolution: full lint is clean. Flow status now projects the queue lease expiry and protected-base handoff route PR number. A claimed queue entry is eligible only with a parseable, unexpired lease; missing, malformed, or expired lease data fails closed. A protected-base handoff must carry the current provider PR number in route.pr_number, in addition to matching branch, base, and head.

    Packet bounds: candidate paths are capped at 32; hosted-check rows at 64; unique missing required checks at 32. Each capped collection carries total and truncated metadata, and normalized order is deterministic for freshness hashing.

    Regression evidence: direct packet tests cover expired and current claimed leases, mismatched protected-base handoff PR numbers, oversized checks, missing requirements, nonqueued and DOING tasks, handoff eligibility, unprotected/unavailable/stale protection, stale local base, and provider head mismatch. The local CLI fixture proves an eligible protected queued conflict emits the CODER route without mutating the task worktree. Focused agentplane tests (77), focused cli-core route tests (19), typecheck, full core lint, guards, lifecycle invariants, Vitest project routing, CLI docs freshness, policy routing, doctor, and diff check pass locally.

    Residual risk: live THDN provider and protection state remain time-sensitive and must be refreshed before any later publication or integration decision. No PR, push, merge, rebase, force-push, or integration was performed during this rework.
extensions:
  workflow_route_baseline:
    start_head_sha: "e27c938698668ce242243d166f8c7c1b64cce88f"
    version: 1
id_source: "generated"
---
## Summary

Make a queued protected-PR conflict actionable for a semantic CODER without turning the CLI into a semantic resolver. The CLI must prepare current bounded context and a task-scoped handoff, then fail closed whenever that context is stale or incomplete.

## Scope

In scope: branch_pr queue conflict detection, provider-backed freshness and provenance, a bounded conflict-rework packet, next-action and worktree handoff routing, invalidation, and focused tests. Current concrete regression: THDN 202607252223-THDN0G PR #4626 has head 040d8df0eaf431e2292eb161efe80e1466ffbd8e and provider reports DIRTY or CONFLICTING after main e27c938698668ce242243d166f8c7c1b64cce88f. Out of scope: choosing semantic resolution, applying conflict hunks, automatic git rebase or merge, automatic force-push, silent branch rewrite, direct provider merge, or generic queue redesign.

## Plan

1. Map the protected branch_pr integration queue conflict boundary and distinguish a real provider merge conflict from pending checks, stale local metadata, deleted refs, unavailable provider lookup, and ordinary rework. Record the THDN regression exactly: task 202607252223-THDN0G, PR #4626, head 040d8df0eaf431e2292eb161efe80e1466ffbd8e, provider state CONFLICTING, after main e27c938698668ce242243d166f8c7c1b64cce88f.
2. Define a typed, task-scoped conflict-rework preparation packet containing only current provenance and bounded context: task and PR identities, branch and base refs, remote heads, merge base or conflict detection identity, conflicting paths or safe summaries, current checks, and freshness tokens.
3. Make next-action and queue routes return an explicit CODER semantic-rework handoff to the correct dedicated task worktree when the packet is current; the CLI prepares context but never selects a hunk, chooses semantics, auto-rebases, auto-merges, force-pushes, or silently rewrites the task branch.
4. If any provider, base, or branch identity changes after preparation, invalidate the packet and require a fresh provider read; unknown or unavailable truth must fail closed without making a branch mutation route executable.
5. Preserve normal integration for clean PRs and make the post-resolution path require an explicit new CODER commit, refreshed task or PR artifacts, fresh verification, and normal protected-PR publication with lease-safe provenance.
6. Add focused regressions for the THDN topology, clean PRs, conflicting PRs, changed base or head after packet creation, provider lookup failure, missing worktree, and route non-mutation.
7. Run focused queue and route tests, static checks, lifecycle and routing checks, record quality evidence, then use the normal branch_pr PR and integration route.

## Verify Steps

1. Model the THDN topology and prove that a current provider-reported protected-PR conflict returns a bounded semantic-rework preparation route, not enqueue, wait-for-checks, publish, cleanup, raw rebase, raw merge, or force-push.
2. Prove the packet includes task and PR identities, current provider and base heads, branch identity, merge-base or conflict-detection identity, bounded conflict paths or summaries, check state, and a freshness token sufficient to invalidate it.
3. Prove the route points to the correct task worktree and explicitly delegates semantic choice to CODER; preparation itself performs no branch, worktree, PR, or provider mutation.
4. Prove a changed base/head, changed PR state, missing worktree, missing PR, unavailable provider, or incomplete packet invalidates the route and fails closed.
5. Prove clean and merely pending-check PRs preserve their normal integration route.
6. Prove after a CODER-resolved new commit the task must refresh provider truth and rerun normal verification before lease-safe publication and queue handoff.
7. Run focused queue and route regressions; bun run typecheck; bun run lint:core; bun run guards:check; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; agentplane doctor; and git diff --check.
8. Record independent TESTER and EVALUATOR evidence, wait for stable hosted checks, and use only normal branch_pr integration.

## Verification

Required evidence: fixture or provider-snapshot proof of the THDN conflict state; emitted preparation packet and exact route; proof that preparation contains no branch mutation command; invalidation evidence for base/head/provider drift; clean-PR non-regression evidence; focused test, static, lifecycle, and routing output; independent TESTER and EVALUATOR review; stable hosted checks. Refresh all evidence after every provider/base snapshot change.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T01:05:46.183Z — VERIFY — needs_rework

By: TESTER

Note: Rework: c343fb09 fails declared lint and misses bounded queued-protected conflict-route guarantees.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:53:05.897Z, excerpt_hash=sha256:fdcd9ba52c849ed7fef21f254416faca99218bb89f54851b9ddc269b848d053f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260007-DQM6AW-prepare-semantic-conflict-rework-routes/.agentplane/tasks/202607260007-DQM6AW/blueprint/resolved-snapshot.json
- old_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
- current_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607260007-DQM6AW

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202607260007-DQM6AW --author CODER
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-26T01:35:03.710Z — VERIFY — needs_rework

By: TESTER

Note: Rework: full lint is not clean, and stale queue or handoff identity can still unlock the semantic conflict route.
Attempts: 2

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T01:26:56.904Z, excerpt_hash=sha256:fdcd9ba52c849ed7fef21f254416faca99218bb89f54851b9ddc269b848d053f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607260007-DQM6AW-prepare-semantic-conflict-rework-routes/.agentplane/tasks/202607260007-DQM6AW/blueprint/resolved-snapshot.json
- old_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
- current_digest: ce5797093a8c2c90262f575322642ecedef3d2c3eaf280e889d68d20598f33a6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607260007-DQM6AW

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the bounded preparation and route change in a new normal branch_pr task or follow-up. Preserve any existing fail-closed conflict block and task-local packet evidence. Never compensate by rebasing, merging, force-pushing, deleting, or recreating a branch. If current truth cannot be reconfirmed, stop with the diagnostic route and leave all refs/worktrees unchanged.

## Findings

Current incident rule: remote truth for THDN 202607252223-THDN0G PR #4626 reports mergeStateStatus DIRTY and mergeable CONFLICTING, with head 040d8df0eaf431e2292eb161efe80e1466ffbd8e, after main advanced to e27c938698668ce242243d166f8c7c1b64cce88f. A queue route must not relabel this as ordinary wait-for-checks work or offer unbounded manual rebase. It must package fresh nonsemantic context and hand the semantic decision to the assigned CODER.

Implementation evidence: the CLI obtains exact PR detail after a branch lookup, emits a deterministic read-only packet with task, head/base, merge base, bounded overlapping paths, bounded hosted-check summaries, base-protection provenance, and a SHA-256 freshness token. Candidate paths are not selected hunks. No packet path performs rebase, merge, force-push, rewrite, publication, queue mutation, or provider mutation.

Rework resolution: conflict rework requires a DONE task with verification=ok and a matching active queue reservation (queued, claimed, or handoff) or protected-base handoff. The reservation/handoff must match provider PR branch, head, base, base SHA, and PR number. GitHub must freshly confirm that the exact provider base requires the protected PR merge path; unprotected, unavailable, or wrong-base protection evidence fails closed. Provider head/base mismatches, missing provider truth, unresolved mergeability, and missing or dirty worktrees still fail closed.

Second rework resolution: full lint is clean. Flow status now projects the queue lease expiry and protected-base handoff route PR number. A claimed queue entry is eligible only with a parseable, unexpired lease; missing, malformed, or expired lease data fails closed. A protected-base handoff must carry the current provider PR number in route.pr_number, in addition to matching branch, base, and head.

Packet bounds: candidate paths are capped at 32; hosted-check rows at 64; unique missing required checks at 32. Each capped collection carries total and truncated metadata, and normalized order is deterministic for freshness hashing.

Regression evidence: direct packet tests cover expired and current claimed leases, mismatched protected-base handoff PR numbers, oversized checks, missing requirements, nonqueued and DOING tasks, handoff eligibility, unprotected/unavailable/stale protection, stale local base, and provider head mismatch. The local CLI fixture proves an eligible protected queued conflict emits the CODER route without mutating the task worktree. Focused agentplane tests (77), focused cli-core route tests (19), typecheck, full core lint, guards, lifecycle invariants, Vitest project routing, CLI docs freshness, policy routing, doctor, and diff check pass locally.

Residual risk: live THDN provider and protection state remain time-sensitive and must be refreshed before any later publication or integration decision. No PR, push, merge, rebase, force-push, or integration was performed during this rework.
