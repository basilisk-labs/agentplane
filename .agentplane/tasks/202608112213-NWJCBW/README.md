---
id: "202608112213-NWJCBW"
title: "Replace mutable setup and execution profiles with one canonical policy"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "config"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T22:14:03.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-11T23:46:13.834Z"
  updated_by: "TESTER"
  note: "Hotspot remediation verified at 6d74e0fe8: moved the unchanged config-policy assertion out of the oversized core test without raising the baseline or changing runtime code."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-11T23:46:34.863Z"
  updated_by: "HUMAN"
  note: "The hotspot remediation is a behavior-preserving test split: the exact execution-policy rejection assertion moved from the 1046-line aggregate file to a dedicated cli-core test, the oversized baseline was not raised, and runtime code and compatibility surfaces are unchanged."
  evaluated_sha: "6d74e0fe8fd606da181097bc7badf55007970055"
  blueprint_digest: "8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61"
  evidence_refs:
    - ".agentplane/tasks/202608112213-NWJCBW/quality/20260811-234634330-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608112213-NWJCBW/quality/20260811-234634330-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608112213-NWJCBW/quality/objects/sha256/d6690e7e0a7659d5db1aa1b95445dfd180a2844ddd2606e331810f2f63a68448.md"
    - ".agentplane/tasks/202608112213-NWJCBW/quality/20260811-234634330-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608112213-NWJCBW/quality/20260811-234634330-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608112213-NWJCBW/README.md"
    - ".agentplane/tasks/202608112213-NWJCBW/quality/objects/sha256/be41f95a182f331aeab8d3cb1157a40ceea17bf16ca22900b3e91fa228b6d25c.patch"
    - ".agentplane/tasks/202608112213-NWJCBW/quality/objects/sha256/fc7a1c1ef696f77a0bdf31d9ff6ae6c1963fd498cc2c3687cb4f83cad9f6bcd2.json"
    - ".agentplane/tasks/202608112213-NWJCBW/verification/20260811234613834-c6ecaf89660b868c.json"
    - ".agentplane/tasks/202608112213-NWJCBW/quality/objects/sha256/39161dc5db0288e890dd4aad39fa7ee11c43b7fa801ca1b21153c50fac06b56e.json"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - "bun test run-cli.core.test.ts run-cli.core.config-policy.test.ts => 44/44 pass; bun run hotspots:check => pass at 1046-line baseline; compatibility current=324aabe0 approved"
  findings:
    - "No blocking issue found. The original aggregate suite and new focused test pass together; test inventory discovers the new file; hotspot and compatibility ratchets pass."
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-11T23:47:26.627Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "d2848f6ea024075f7c86f2fa73387795545d5975"
  message: "✅ NWJCBW task: review hotspot remediation"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: one canonical standard policy now governs profile-derived runtime behavior; legacy aliases migrate with explicit warnings and cannot weaken or strengthen the process."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-11T22:15:13.616Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-11T23:15:29.858Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: one canonical standard policy now governs profile-derived runtime behavior; legacy aliases migrate with explicit warnings and cannot weaken or strengthen the process."
    commit: "2b5503e9435e355bd282f7f98dff6a61baa2e69e"
  -
    type: "verify"
    at: "2026-08-11T23:19:46.526Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation 2b5503e94. Focused behavior, CLI lifecycle, build, generated artifacts, formatting, type and lint contracts passed; overloaded-suite concurrency failures passed in isolated reruns."
  -
    type: "verify"
    at: "2026-08-11T23:23:27.039Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for current implementation dca3d280c: 340 focused tests passed after preserving explicit project approvals; typecheck, build, full lint, formatting, schema, and generated CLI docs contracts pass. Prior overloaded-suite concurrency failures remain independently green."
  -
    type: "status"
    at: "2026-08-11T23:25:16.929Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "90cd93c7eee01dbbe9c8b9f4ab9d0a8caccf6bc7"
  -
    type: "verify"
    at: "2026-08-11T23:37:36.442Z"
    author: "TESTER"
    state: "ok"
    note: "Compatibility review remediation verified at 017d3d3a8. Prior full product verification remains applicable because only compatibility review artifacts and their regression test changed."
  -
    type: "verify"
    at: "2026-08-11T23:38:04.982Z"
    author: "TESTER"
    state: "ok"
    note: "Compatibility review remediation verified at 017d3d3a8. Prior full product verification remains applicable: excluding generated task lifecycle artifacts, the only post-verification changes are the compatibility candidate, checker, and its regression test."
  -
    type: "status"
    at: "2026-08-11T23:40:00.746Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "3711cb03b8474b2e78d4f7dc27e3dcecb665a378"
  -
    type: "verify"
    at: "2026-08-11T23:46:13.834Z"
    author: "TESTER"
    state: "ok"
    note: "Hotspot remediation verified at 6d74e0fe8: moved the unchanged config-policy assertion out of the oversized core test without raising the baseline or changing runtime code."
  -
    type: "status"
    at: "2026-08-11T23:47:26.627Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "d2848f6ea024075f7c86f2fa73387795545d5975"
doc_version: 3
doc_updated_at: "2026-08-11T23:47:26.660Z"
doc_updated_by: "CODER"
description: "Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers."
sections:
  Summary: |-
    Replace mutable setup and execution profiles with one canonical policy

    Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.
  Scope: |-
    - In scope: Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.
    - Out of scope: unrelated refactors not required for "Replace mutable setup and execution profiles with one canonical policy".
  Plan: |-
    1. Define one canonical execution policy in core configuration. Preserve a legacy-input compatibility boundary for conservative, balanced, aggressive, light, normal, full-harness, and historical aliases, but normalize all of them to the same runtime behavior.
    2. Remove profile selection from interactive init and public command help. Keep workflow, runner, hooks, integrations, and explicit approvals as independent project settings; make deprecated profile flags deterministic compatibility aliases with a visible migration notice.
    3. Replace profile-dependent runtime branches with the canonical policy, keeping lifecycle and safety invariants fixed and removing arbitrary autonomy tier behavior.
    4. Make config readback and writes canonical so users cannot switch process behavior through profile values; retain lossless unrelated WORKFLOW fields.
    5. Update generated schemas, public documentation, fixtures, and tests. Cover fresh init, legacy config load, deprecated CLI input, config mutation rejection/no-op behavior, and runtime equivalence.
    6. Verify focused core/config, init/config CLI, runtime execution-context, prompt projection, schema generation, formatting, and type/lint checks. Record any intentionally retained compatibility surface and residual risk.
  Verify Steps: |-
    1. Run focused core configuration and runtime profile tests. Expected: fresh defaults and every legacy profile input resolve to the same canonical execution policy, with no profile-specific approvals, trace, timeout, or budget behavior.
    2. Run focused init and config CLI tests. Expected: interactive init exposes no setup or execution profile choice; deprecated profile flags are accepted only for compatibility and cannot select weaker or stricter process behavior; independent workflow, runner, hooks, integrations, and explicit approvals remain configurable.
    3. Regenerate and validate published config and CLI schema/docs artifacts. Expected: current public surfaces document one canonical policy, legacy inputs are marked compatibility-only, and generated artifacts match runtime sources.
    4. Run formatting, type checking, lint, and the relevant AgentPlane test shard. Expected: all pass with no unintended tracked or unreviewed untracked changes in the task checkout.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-11T23:19:46.526Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation 2b5503e94. Focused behavior, CLI lifecycle, build, generated artifacts, formatting, type and lint contracts passed; overloaded-suite concurrency failures passed in isolated reruns.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:0906bba12136376503ae52bf72d620d82db6d1c56416469731b7bba3bd3a4365

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project core <17 relevant files>
    Result: pass
    Evidence: 17 test files passed; 217 tests passed
    Scope: canonical core config, config IO, init prompts, approvals, harness, execution runtime, prompt/protocol projection, workflow force approval, and state fingerprints

    Command: bunx vitest --config vitest.workspace.ts run --project cli-core <7 relevant files>
    Result: pass
    Evidence: 7 test files passed; 123 tests passed
    Scope: fresh init, legacy setup/execution aliases and warnings, config mutation rejection, lifecycle start/finish, and profile command compatibility

    Command: bun run --filter=agentplane build && bun run typecheck && bun run lint:core && bun run format:changed && bun run schemas:check && bun run docs:cli:check
    Result: pass
    Evidence: AgentPlane bundle built; typecheck, full core lint, formatting, schemas, and generated CLI reference checks completed successfully
    Scope: compile-time contracts, repository lint policy, generated public schemas, and CLI documentation freshness

    Command: isolated reruns of evaluator-execute.command, task-run-active-claim-concurrency, task-run-effect-resolution, and task-run-lifecycle-replay-security
    Result: pass
    Evidence: 4 test files passed; 36 tests passed
    Scope: concurrent provider start, active-claim serialization, effect retirement, and replay security after monolithic-suite resource timeouts

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
    - old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608112213-NWJCBW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-11T23:23:27.039Z — VERIFY — ok

    By: TESTER

    Note: PASS for current implementation dca3d280c: 340 focused tests passed after preserving explicit project approvals; typecheck, build, full lint, formatting, schema, and generated CLI docs contracts pass. Prior overloaded-suite concurrency failures remain independently green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:1268b1e27d2213e32eb2ad48723127c28088ed13688565d5b61fe797f00287fc

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project core <17 relevant files>
    Result: pass
    Evidence: 17 test files passed; 217 tests passed on current branch head
    Scope: canonical core config, lossless config IO, init prompts, independent approvals, harness, execution runtime, prompt/protocol projection, workflow force approval, and state fingerprints

    Command: bunx vitest --config vitest.workspace.ts run --project cli-core <7 relevant files>
    Result: pass
    Evidence: 7 test files passed; 123 tests passed on current branch head
    Scope: fresh init, legacy setup/execution aliases and warnings, explicit approval preservation, config mutation rejection, lifecycle start/finish, and profile command compatibility

    Command: bun run --filter=agentplane build && bun run typecheck && bun run lint:core && bun run format:changed && bun run schemas:check && bun run docs:cli:check
    Result: pass
    Evidence: AgentPlane bundle built; typecheck, full core lint, formatting, schemas, and generated CLI reference checks completed successfully
    Scope: compile-time contracts, repository lint policy, generated public schemas, and CLI documentation freshness

    Command: isolated reruns of evaluator-execute.command, task-run-active-claim-concurrency, task-run-effect-resolution, and task-run-lifecycle-replay-security
    Result: pass
    Evidence: 4 test files passed; 36 tests passed
    Scope: concurrent provider start, active-claim serialization, effect retirement, and replay security after monolithic-suite resource timeouts

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
    - old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608112213-NWJCBW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-11T23:37:36.442Z — VERIFY — ok

    By: TESTER

    Note: Compatibility review remediation verified at 017d3d3a8. Prior full product verification remains applicable because only compatibility review artifacts and their regression test changed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:3c5f129f5f89f1acecfce10d542769f1df5b404a4b056cfd2550ff06a472971b

    Details:

    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: compatibility contract baseline OK current=324aabe0f0296740ae6c2b309ca94694997a13bc7210cf48f9ce4b221899f691 candidate=approved release_version
    Scope: exact reviewed compatibility surface and planned v0.7.5 version delta

    Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
    Result: pass
    Evidence: 9 passed, 0 failed, 107 assertions
    Scope: compatibility ratchet, release reconstruction, mutation rejection, and efficiency anchors

    Command: bun x eslint scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && bun x prettier --check scripts/baselines/v0.7-compatibility-candidate.json scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && git diff --check
    Result: pass
    Evidence: ESLint clean; all matched files use Prettier; no whitespace errors
    Scope: static quality of the compatibility remediation

    Command: git diff --name-only dca3d280c 017d3d3a8
    Result: pass
    Evidence: only the critical compatibility test, reviewed candidate, and compatibility checker changed after the previously verified product implementation
    Scope: reuse boundary for prior full profile, CLI, typecheck, lint, build, schema, docs, and focused test evidence

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
    - old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

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

    ### 2026-08-11T23:38:04.982Z — VERIFY — ok

    By: TESTER

    Note: Compatibility review remediation verified at 017d3d3a8. Prior full product verification remains applicable: excluding generated task lifecycle artifacts, the only post-verification changes are the compatibility candidate, checker, and its regression test.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:4048802e59ce8855b4e69ed8179413c7bda20d8feabb95eedd8b666e353ebc56

    Details:

    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: compatibility contract baseline OK current=324aabe0f0296740ae6c2b309ca94694997a13bc7210cf48f9ce4b221899f691 candidate=approved release_version
    Scope: exact reviewed compatibility surface and planned v0.7.5 version delta

    Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
    Result: pass
    Evidence: 9 passed, 0 failed, 107 assertions
    Scope: compatibility ratchet, release reconstruction, mutation rejection, and efficiency anchors

    Command: bun x eslint scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && bun x prettier --check scripts/baselines/v0.7-compatibility-candidate.json scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && git diff --check
    Result: pass
    Evidence: ESLint clean; all matched files use Prettier; no whitespace errors
    Scope: static quality of the compatibility remediation

    Command: git diff --name-only dca3d280c 017d3d3a8 -- . excluding .agentplane/tasks/202608112213-NWJCBW/**
    Result: pass
    Evidence: packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; scripts/baselines/v0.7-compatibility-candidate.json; scripts/checks/check-compatibility-contract-baseline.mjs
    Scope: reuse boundary for prior full profile, CLI, typecheck, lint, build, schema, docs, and focused test evidence; generated lifecycle artifacts are explicitly excluded

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
    - old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

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

    ### 2026-08-11T23:46:13.834Z — VERIFY — ok

    By: TESTER

    Note: Hotspot remediation verified at 6d74e0fe8: moved the unchanged config-policy assertion out of the oversized core test without raising the baseline or changing runtime code.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:f467db63ad4dbd8a8c528ff7104ca87f230179510feb81921e0661c903f9bc48

    Details:

    Command: bun test packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.config-policy.test.ts
    Result: pass
    Evidence: 44 passed, 0 failed, 171 assertions
    Scope: original CLI core coverage plus relocated immutable execution-policy rejection

    Command: bun run hotspots:check
    Result: pass
    Evidence: run-cli.core.test.ts returned to the accepted 1046-line baseline; oversized test baseline OK with 10 entries and 11363 total lines
    Scope: hotspot growth guard and oversized-test ratchet

    Command: bun test packages/agentplane/src/cli/run-cli.core.config-policy.test.ts packages/agentplane/src/cli/test-inventory.test.ts
    Result: pass
    Evidence: 5 passed, 0 failed, 181 assertions
    Scope: relocated test discovery, route classification, and config-policy behavior

    Command: bun x eslint packages/agentplane/src/cli/run-cli.core.config-policy.test.ts packages/agentplane/src/cli/run-cli.core.test.ts && bun run bench:compatibility:check && git diff --check
    Result: pass
    Evidence: ESLint clean; compatibility surface remains approved at 324aabe0; no whitespace errors
    Scope: static quality and absence of compatibility drift from test-only refactoring

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
    - old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

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
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Implementation finding: task creation omitted explicit structured intent and defaulted this code change to the ops.approval blueprint; task 202608112232-3NC7Y4 will replace that guessing boundary with an agent-declared, deterministically enforced execution contract. Verification finding: the monolithic test:fast run completed 4,027 passing tests but oversubscribed concurrent process tests, producing seven isolated timeout/race failures; all seven passed when rerun in their owning files (36/36). The five remaining failures were obsolete force/profile expectations and now pass with the fixed standard-policy contract (74/74). This is retained as input to the final check-efficiency task.

    - Observation: Hosted verify-contract failure identified an unreviewed compatibility surface update for canonical profile CLI and workflow schema changes.
      Impact: Without a reviewed candidate, CI correctly blocked the PR despite passing product tests.
      Resolution: Recorded exact CLI mutations, legacy aliases, canonical workflow schema values, provenance, and planned release surface digest; added checker assertions and regression expectations.

    - Observation: Hosted verify-contract failure identified an unreviewed compatibility surface update for canonical profile CLI and workflow schema changes.
      Impact: Without a reviewed candidate, CI correctly blocked the PR despite passing product tests.
      Resolution: Recorded exact CLI mutations, legacy aliases, canonical workflow schema values, provenance, and planned release surface digest; added checker assertions and regression expectations.
extensions:
  implementation_commit:
    hash: "6d74e0fe8fd606da181097bc7badf55007970055"
    message: "🧪 NWJCBW task: split config policy coverage"
  workflow_route_baseline:
    start_head_sha: "206b349e8dd08051f695d68f8558db94b2e23cb5"
    version: 1
id_source: "generated"
---
## Summary

Replace mutable setup and execution profiles with one canonical policy

Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.

## Scope

- In scope: Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.
- Out of scope: unrelated refactors not required for "Replace mutable setup and execution profiles with one canonical policy".

## Plan

1. Define one canonical execution policy in core configuration. Preserve a legacy-input compatibility boundary for conservative, balanced, aggressive, light, normal, full-harness, and historical aliases, but normalize all of them to the same runtime behavior.
2. Remove profile selection from interactive init and public command help. Keep workflow, runner, hooks, integrations, and explicit approvals as independent project settings; make deprecated profile flags deterministic compatibility aliases with a visible migration notice.
3. Replace profile-dependent runtime branches with the canonical policy, keeping lifecycle and safety invariants fixed and removing arbitrary autonomy tier behavior.
4. Make config readback and writes canonical so users cannot switch process behavior through profile values; retain lossless unrelated WORKFLOW fields.
5. Update generated schemas, public documentation, fixtures, and tests. Cover fresh init, legacy config load, deprecated CLI input, config mutation rejection/no-op behavior, and runtime equivalence.
6. Verify focused core/config, init/config CLI, runtime execution-context, prompt projection, schema generation, formatting, and type/lint checks. Record any intentionally retained compatibility surface and residual risk.

## Verify Steps

1. Run focused core configuration and runtime profile tests. Expected: fresh defaults and every legacy profile input resolve to the same canonical execution policy, with no profile-specific approvals, trace, timeout, or budget behavior.
2. Run focused init and config CLI tests. Expected: interactive init exposes no setup or execution profile choice; deprecated profile flags are accepted only for compatibility and cannot select weaker or stricter process behavior; independent workflow, runner, hooks, integrations, and explicit approvals remain configurable.
3. Regenerate and validate published config and CLI schema/docs artifacts. Expected: current public surfaces document one canonical policy, legacy inputs are marked compatibility-only, and generated artifacts match runtime sources.
4. Run formatting, type checking, lint, and the relevant AgentPlane test shard. Expected: all pass with no unintended tracked or unreviewed untracked changes in the task checkout.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-11T23:19:46.526Z — VERIFY — ok

By: TESTER

Note: PASS for implementation 2b5503e94. Focused behavior, CLI lifecycle, build, generated artifacts, formatting, type and lint contracts passed; overloaded-suite concurrency failures passed in isolated reruns.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:0906bba12136376503ae52bf72d620d82db6d1c56416469731b7bba3bd3a4365

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project core <17 relevant files>
Result: pass
Evidence: 17 test files passed; 217 tests passed
Scope: canonical core config, config IO, init prompts, approvals, harness, execution runtime, prompt/protocol projection, workflow force approval, and state fingerprints

Command: bunx vitest --config vitest.workspace.ts run --project cli-core <7 relevant files>
Result: pass
Evidence: 7 test files passed; 123 tests passed
Scope: fresh init, legacy setup/execution aliases and warnings, config mutation rejection, lifecycle start/finish, and profile command compatibility

Command: bun run --filter=agentplane build && bun run typecheck && bun run lint:core && bun run format:changed && bun run schemas:check && bun run docs:cli:check
Result: pass
Evidence: AgentPlane bundle built; typecheck, full core lint, formatting, schemas, and generated CLI reference checks completed successfully
Scope: compile-time contracts, repository lint policy, generated public schemas, and CLI documentation freshness

Command: isolated reruns of evaluator-execute.command, task-run-active-claim-concurrency, task-run-effect-resolution, and task-run-lifecycle-replay-security
Result: pass
Evidence: 4 test files passed; 36 tests passed
Scope: concurrent provider start, active-claim serialization, effect retirement, and replay security after monolithic-suite resource timeouts

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
- old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608112213-NWJCBW
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-11T23:23:27.039Z — VERIFY — ok

By: TESTER

Note: PASS for current implementation dca3d280c: 340 focused tests passed after preserving explicit project approvals; typecheck, build, full lint, formatting, schema, and generated CLI docs contracts pass. Prior overloaded-suite concurrency failures remain independently green.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:1268b1e27d2213e32eb2ad48723127c28088ed13688565d5b61fe797f00287fc

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project core <17 relevant files>
Result: pass
Evidence: 17 test files passed; 217 tests passed on current branch head
Scope: canonical core config, lossless config IO, init prompts, independent approvals, harness, execution runtime, prompt/protocol projection, workflow force approval, and state fingerprints

Command: bunx vitest --config vitest.workspace.ts run --project cli-core <7 relevant files>
Result: pass
Evidence: 7 test files passed; 123 tests passed on current branch head
Scope: fresh init, legacy setup/execution aliases and warnings, explicit approval preservation, config mutation rejection, lifecycle start/finish, and profile command compatibility

Command: bun run --filter=agentplane build && bun run typecheck && bun run lint:core && bun run format:changed && bun run schemas:check && bun run docs:cli:check
Result: pass
Evidence: AgentPlane bundle built; typecheck, full core lint, formatting, schemas, and generated CLI reference checks completed successfully
Scope: compile-time contracts, repository lint policy, generated public schemas, and CLI documentation freshness

Command: isolated reruns of evaluator-execute.command, task-run-active-claim-concurrency, task-run-effect-resolution, and task-run-lifecycle-replay-security
Result: pass
Evidence: 4 test files passed; 36 tests passed
Scope: concurrent provider start, active-claim serialization, effect retirement, and replay security after monolithic-suite resource timeouts

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
- old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608112213-NWJCBW
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-11T23:37:36.442Z — VERIFY — ok

By: TESTER

Note: Compatibility review remediation verified at 017d3d3a8. Prior full product verification remains applicable because only compatibility review artifacts and their regression test changed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:3c5f129f5f89f1acecfce10d542769f1df5b404a4b056cfd2550ff06a472971b

Details:

Command: bun run bench:compatibility:check
Result: pass
Evidence: compatibility contract baseline OK current=324aabe0f0296740ae6c2b309ca94694997a13bc7210cf48f9ce4b221899f691 candidate=approved release_version
Scope: exact reviewed compatibility surface and planned v0.7.5 version delta

Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
Result: pass
Evidence: 9 passed, 0 failed, 107 assertions
Scope: compatibility ratchet, release reconstruction, mutation rejection, and efficiency anchors

Command: bun x eslint scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && bun x prettier --check scripts/baselines/v0.7-compatibility-candidate.json scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && git diff --check
Result: pass
Evidence: ESLint clean; all matched files use Prettier; no whitespace errors
Scope: static quality of the compatibility remediation

Command: git diff --name-only dca3d280c 017d3d3a8
Result: pass
Evidence: only the critical compatibility test, reviewed candidate, and compatibility checker changed after the previously verified product implementation
Scope: reuse boundary for prior full profile, CLI, typecheck, lint, build, schema, docs, and focused test evidence

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
- old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

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

### 2026-08-11T23:38:04.982Z — VERIFY — ok

By: TESTER

Note: Compatibility review remediation verified at 017d3d3a8. Prior full product verification remains applicable: excluding generated task lifecycle artifacts, the only post-verification changes are the compatibility candidate, checker, and its regression test.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:4048802e59ce8855b4e69ed8179413c7bda20d8feabb95eedd8b666e353ebc56

Details:

Command: bun run bench:compatibility:check
Result: pass
Evidence: compatibility contract baseline OK current=324aabe0f0296740ae6c2b309ca94694997a13bc7210cf48f9ce4b221899f691 candidate=approved release_version
Scope: exact reviewed compatibility surface and planned v0.7.5 version delta

Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts
Result: pass
Evidence: 9 passed, 0 failed, 107 assertions
Scope: compatibility ratchet, release reconstruction, mutation rejection, and efficiency anchors

Command: bun x eslint scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && bun x prettier --check scripts/baselines/v0.7-compatibility-candidate.json scripts/checks/check-compatibility-contract-baseline.mjs packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts && git diff --check
Result: pass
Evidence: ESLint clean; all matched files use Prettier; no whitespace errors
Scope: static quality of the compatibility remediation

Command: git diff --name-only dca3d280c 017d3d3a8 -- . excluding .agentplane/tasks/202608112213-NWJCBW/**
Result: pass
Evidence: packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; scripts/baselines/v0.7-compatibility-candidate.json; scripts/checks/check-compatibility-contract-baseline.mjs
Scope: reuse boundary for prior full profile, CLI, typecheck, lint, build, schema, docs, and focused test evidence; generated lifecycle artifacts are explicitly excluded

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
- old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

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

### 2026-08-11T23:46:13.834Z — VERIFY — ok

By: TESTER

Note: Hotspot remediation verified at 6d74e0fe8: moved the unchanged config-policy assertion out of the oversized core test without raising the baseline or changing runtime code.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:f467db63ad4dbd8a8c528ff7104ca87f230179510feb81921e0661c903f9bc48

Details:

Command: bun test packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.config-policy.test.ts
Result: pass
Evidence: 44 passed, 0 failed, 171 assertions
Scope: original CLI core coverage plus relocated immutable execution-policy rejection

Command: bun run hotspots:check
Result: pass
Evidence: run-cli.core.test.ts returned to the accepted 1046-line baseline; oversized test baseline OK with 10 entries and 11363 total lines
Scope: hotspot growth guard and oversized-test ratchet

Command: bun test packages/agentplane/src/cli/run-cli.core.config-policy.test.ts packages/agentplane/src/cli/test-inventory.test.ts
Result: pass
Evidence: 5 passed, 0 failed, 181 assertions
Scope: relocated test discovery, route classification, and config-policy behavior

Command: bun x eslint packages/agentplane/src/cli/run-cli.core.config-policy.test.ts packages/agentplane/src/cli/run-cli.core.test.ts && bun run bench:compatibility:check && git diff --check
Result: pass
Evidence: ESLint clean; compatibility surface remains approved at 324aabe0; no whitespace errors
Scope: static quality and absence of compatibility drift from test-only refactoring

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
- old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Implementation finding: task creation omitted explicit structured intent and defaulted this code change to the ops.approval blueprint; task 202608112232-3NC7Y4 will replace that guessing boundary with an agent-declared, deterministically enforced execution contract. Verification finding: the monolithic test:fast run completed 4,027 passing tests but oversubscribed concurrent process tests, producing seven isolated timeout/race failures; all seven passed when rerun in their owning files (36/36). The five remaining failures were obsolete force/profile expectations and now pass with the fixed standard-policy contract (74/74). This is retained as input to the final check-efficiency task.

- Observation: Hosted verify-contract failure identified an unreviewed compatibility surface update for canonical profile CLI and workflow schema changes.
  Impact: Without a reviewed candidate, CI correctly blocked the PR despite passing product tests.
  Resolution: Recorded exact CLI mutations, legacy aliases, canonical workflow schema values, provenance, and planned release surface digest; added checker assertions and regression expectations.

- Observation: Hosted verify-contract failure identified an unreviewed compatibility surface update for canonical profile CLI and workflow schema changes.
  Impact: Without a reviewed candidate, CI correctly blocked the PR despite passing product tests.
  Resolution: Recorded exact CLI mutations, legacy aliases, canonical workflow schema values, provenance, and planned release surface digest; added checker assertions and regression expectations.

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-11T23:47:26.627Z`
