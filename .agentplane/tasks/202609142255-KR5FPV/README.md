---
id: "202609142255-KR5FPV"
title: "Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "merge"
  - "publish"
  - "external_system"
blueprint_request: "release.strict"
verify:
  - "bun run ci:local:full"
  - "bun run test:platform-critical"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T22:58:30.973Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:093098e9e417da97bf378aec398625aed46300adeec16d4f272bf5890fb2f1a6"
verification:
  state: "ok"
  updated_at: "2026-09-14T23:18:36.554Z"
  updated_by: "TESTER"
  note: "Verified after current release.strict blueprint snapshot on PR head 99521b9e10fcd063120660304cd64821a2495ad7."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-09-14T23:18:05.536Z"
  updated_by: "EVALUATOR"
  note: "The 0.6 backport is narrowly scoped, preserves the existing unlink safety defense, and adds the proven source-ownership and dependency-completeness guard with direct tests."
  evaluated_sha: "f030f679ddd67bb024665ebf9717c05cd4373f48"
  blueprint_digest: "92249eea6ce21268022d6e2dac1f9668d509cb27c63635f4529b8148e1969827"
  evidence_refs:
    - ".agentplane/tasks/202609142255-KR5FPV/README.md"
    - ".agentplane/tasks/202609142255-KR5FPV/quality/20260914-231805536-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609142255-KR5FPV/quality/20260914-231805536-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202609142255-KR5FPV/quality/20260914-231805536-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609142255-KR5FPV/blueprint/resolved-snapshot.json"
    - ".agentplane/tasks/202609142255-KR5FPV/supervision/declared-checks.json"
    - "https://github.com/basilisk-labs/agentplane/actions/runs/34907626254"
    - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
  findings:
    - "No unresolved correctness, scope, or regression findings in the implementation diff."
commit:
  hash: "99521b9e10fcd063120660304cd64821a2495ad7"
  message: "🚧 KR5FPV task: record external implementation evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f030f679ddd6. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-09-14T22:58:33.303Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-14T23:07:12.483Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f030f679ddd6. CLI accepted one state-bound external-agent semantic result."
  -
    type: "verify"
    at: "2026-09-14T23:17:56.104Z"
    author: "TESTER"
    state: "ok"
    note: "Local and hosted verification passed on PR head 99521b9e10fcd063120660304cd64821a2495ad7."
  -
    type: "verify"
    at: "2026-09-14T23:18:36.554Z"
    author: "TESTER"
    state: "ok"
    note: "Verified after current release.strict blueprint snapshot on PR head 99521b9e10fcd063120660304cd64821a2495ad7."
  -
    type: "status"
    at: "2026-09-14T23:18:46.620Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-09-14T23:18:46.621Z"
doc_updated_by: "CODER"
description: "On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main."
sections:
  Summary: |-
    Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30

    On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
  Scope: |-
    - In scope: On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
    - Out of scope: unrelated refactors not required for "Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30".
  Plan: "Backport the proven install-layout guard, verify it, and publish v0.6.30 from the maintenance branch."
  Verify Steps: |-
    1. Run `bun run test:platform-critical`. Expected: the install-layout guard rejects external and task-worktree-owned sources, accepts a valid repository-local layout, and the platform-critical suite passes.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: repository policy routing passes.
    3. Run `bun run ci:local:full`. Expected: the full local regression suite passes on the exact task head.
    4. Inspect the final diff. Expected: the v0.6.29 pre-removal unlink defense remains and no file on `main` changes.
    5. Verify hosted CI and the maintenance PR target. Expected: all required checks pass and the PR targets only `codex/release-v0.6.27-reclaim-fix`.
    6. Verify the v0.6.30 publication against the exact merged SHA. Expected: npm packages, CLI install smoke, tag, GitHub Release, distribution assets, and GHCR are confirmed or any credential-gated channel is explicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-14T23:17:56.104Z — VERIFY — ok

    By: TESTER

    Note: Local and hosted verification passed on PR head 99521b9e10fcd063120660304cd64821a2495ad7.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T23:07:12.483Z, excerpt_hash=sha256:1c9fecee6653a59f8c9649025bf2e906a23dda35ce890ea931792d4e9361099e

    Details:

    Local declared checks passed: bun run test:platform-critical (6 files, 92 tests), node .agentplane/policy/check-routing.mjs, and bun run ci:local:full (372 fast files, 2194 tests plus critical suites). GitHub Core CI run 34907626254 passed verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, and aggregate PR verification. PR #5958 targets codex/release-v0.6.27-reclaim-fix. The existing pre-removal unlink defense remains unchanged.

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609142255-KR5FPV-backport-install-layout-guard/.agentplane/tasks/202609142255-KR5FPV/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 92249eea6ce21268022d6e2dac1f9668d509cb27c63635f4529b8148e1969827
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202609142255-KR5FPV

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202609142255-KR5FPV --branch task/202609142255-KR5FPV/backport-install-layout-guard
    - diagnostic_command: agentplane pr check 202609142255-KR5FPV
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-09-14T23:18:36.554Z — VERIFY — ok

    By: TESTER

    Note: Verified after current release.strict blueprint snapshot on PR head 99521b9e10fcd063120660304cd64821a2495ad7.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T23:17:56.207Z, excerpt_hash=sha256:1c9fecee6653a59f8c9649025bf2e906a23dda35ce890ea931792d4e9361099e

    Details:

    Local declared checks passed: platform-critical 6/92, routing policy, and full local CI including 372 fast files and 2194 tests. Hosted Core CI run 34907626254 passed every required Linux and Windows job plus aggregate PR verification. PR #5958 targets codex/release-v0.6.27-reclaim-fix only.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609142255-KR5FPV-backport-install-layout-guard/.agentplane/tasks/202609142255-KR5FPV/blueprint/resolved-snapshot.json
    - old_digest: 92249eea6ce21268022d6e2dac1f9668d509cb27c63635f4529b8148e1969827
    - current_digest: 92249eea6ce21268022d6e2dac1f9668d509cb27c63635f4529b8148e1969827
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609142255-KR5FPV

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202609142255-KR5FPV --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit 99521b9e10fcd063120660304cd64821a2495ad7 --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:093098e9e417da97bf378aec398625aed46300adeec16d4f272bf5890fb2f1a6"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:f1f6e94eaecd0be2b4c4294a149545adedf207442b33c4447176d177ef6e4ace"
    digest: "sha256:eff499b84b0e72a1c8fe77eb5438c5f2c9b45c13527ecd5e5ee0b54365b6d04b"
    grant_id: "69799c7e-e468-41b5-bf13-10c74193f88f"
    issued_at: "2026-09-14T22:58:30.973Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:cb534e806d9f9bf1320652df8a02b16ce0ee3872617109d1f0779ad74b5502ef"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:d4cb8691d9d51d1f8d5f6ac82dc1b103fa8f89092a25b1a426a9bb66cf9f8265"
    status: "active"
    task_id: "202609142255-KR5FPV"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-14T22:58:30.973Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-14T22:56:58.707Z"
      digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
      proposal:
        assumptions:
          - "The current user approval covers the corrected v0.6-only plan, merge, and v0.6.30 publication."
          - "The authoritative integration base remains codex/release-v0.6.27-reclaim-fix."
          - "main remains unchanged."
        planning_baseline:
          captured_at: "2026-09-14T22:55:39.777Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
            - ".agentplane/tasks/202609130319-MHRRRF/README.md"
            - ".agentplane/tasks/202609130319-X96Z3Q/README.md"
            - ".agentplane/tasks/202609130320-EFMSMR/README.md"
            - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130320-EFMSMR/supervision/declared-checks.json"
            - ".agentplane/tasks/202609130352-Q99M4K/README.md"
            - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130402-QWV6VX/README.md"
            - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130402-QWV6VX/supervision/declared-checks.json"
            - ".agentplane/tasks/202609130414-G8VK36/README.md"
            - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130420-X9CKTH/README.md"
            - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130420-X9CKTH/supervision/declared-checks.json"
            - ".agentplane/tasks/202609130428-9GY63X/README.md"
            - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130428-9GY63X/supervision/declared-checks.json"
            - ".agentplane/tasks/202609141102-6MNB16/README.md"
            - ".agentplane/tasks/202609141102-6MNB16/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609141710-V4WQXD/README.md"
            - ".agentplane/tasks/202609142255-KR5FPV/README.md"
            - "agentplane-roadmap-r2/AGENT-START.md"
            - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
            - "agentplane-roadmap-r2/README.md"
            - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
            - "agentplane-roadmap-r2/checksums.json"
            - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
            - "agentplane-roadmap-r2/coverage-map.json"
            - "agentplane-roadmap-r2/dependency-graph.json"
            - "agentplane-roadmap-r2/experiment-requirements.json"
            - "agentplane-roadmap-r2/releases/0.7.10.md"
            - "agentplane-roadmap-r2/releases/0.7.11.md"
            - "agentplane-roadmap-r2/releases/0.7.12.md"
            - "agentplane-roadmap-r2/releases/0.7.13.md"
            - "agentplane-roadmap-r2/releases/0.7.14.md"
            - "agentplane-roadmap-r2/releases/0.7.9.md"
            - "agentplane-roadmap-r2/source-evidence.json"
            - "agentplane-roadmap-r2/tasks.json"
            - "agentplane-roadmap-r2/tasks/BP-01.md"
            - "agentplane-roadmap-r2/tasks/BP-02.md"
            - "agentplane-roadmap-r2/tasks/BP-03.md"
            - "agentplane-roadmap-r2/tasks/BP-04.md"
            - "agentplane-roadmap-r2/tasks/BP-05.md"
            - "agentplane-roadmap-r2/tasks/BP-06.md"
            - "agentplane-roadmap-r2/tasks/BP-07.md"
            - "agentplane-roadmap-r2/tasks/BP-08.md"
            - "agentplane-roadmap-r2/tasks/BP-09.md"
            - "agentplane-roadmap-r2/tasks/BP-10.md"
            - "agentplane-roadmap-r2/tasks/BP-11.md"
            - "agentplane-roadmap-r2/tasks/BP-12.md"
            - "agentplane-roadmap-r2/tasks/BP-13.md"
            - "agentplane-roadmap-r2/tasks/BP-14.md"
            - "agentplane-roadmap-r2/tasks/BP-15.md"
            - "agentplane-roadmap-r2/tasks/BP-16.md"
            - "agentplane-roadmap-r2/tasks/BP-17.md"
            - "agentplane-roadmap-r2/tasks/BP-18.md"
            - "agentplane-roadmap-r2/tasks/BP-19.md"
            - "agentplane-roadmap-r2/tasks/BP-20.md"
            - "agentplane-roadmap-r2/tasks/BP-21.md"
            - "agentplane-roadmap-r2/tasks/BP-22.md"
            - "agentplane-roadmap-r2/tasks/BP-23.md"
            - "agentplane-roadmap-r2/tasks/BP-24.md"
            - "agentplane-roadmap-r2/tasks/BP-25.md"
            - "agentplane-roadmap-r2/tasks/BP-26.md"
            - "agentplane-roadmap-r2/tasks/BP-27.md"
            - "agentplane-roadmap-r2/tasks/BP-28.md"
            - "agentplane-roadmap-r2/tasks/BP-29.md"
            - "agentplane-roadmap-r2/tasks/BP-30.md"
            - "agentplane-roadmap-r2/tasks/BP-31.md"
            - "agentplane-roadmap-r2/tasks/EV-01.md"
            - "agentplane-roadmap-r2/tasks/EV-02.md"
            - "agentplane-roadmap-r2/tasks/EV-03.md"
            - "agentplane-roadmap-r2/tasks/EV-04.md"
            - "agentplane-roadmap-r2/tasks/EV-05.md"
            - "agentplane-roadmap-r2/tasks/EV-06.md"
            - "agentplane-roadmap-r2/tasks/EV-07.md"
            - "agentplane-roadmap-r2/tasks/EV-08.md"
            - "agentplane-roadmap-r2/tasks/EV-09.md"
            - "agentplane-roadmap-r2/tasks/EV-10.md"
            - "agentplane-roadmap-r2/tasks/EV-11.md"
            - "agentplane-roadmap-r2/tasks/EV-12.md"
            - "agentplane-roadmap-r2/tasks/EV-13.md"
            - "agentplane-roadmap-r2/tasks/LC-01.md"
            - "agentplane-roadmap-r2/tasks/LC-02.md"
            - "agentplane-roadmap-r2/tasks/LC-03.md"
            - "agentplane-roadmap-r2/tasks/LC-04.md"
            - "agentplane-roadmap-r2/tasks/LC-05.md"
            - "agentplane-roadmap-r2/tasks/LC-06.md"
            - "agentplane-roadmap-r2/tasks/LC-07.md"
            - "agentplane-roadmap-r2/tasks/LC-08.md"
            - "agentplane-roadmap-r2/tasks/LC-09.md"
            - "agentplane-roadmap-r2/tasks/LC-10.md"
            - "agentplane-roadmap-r2/tasks/LC-11.md"
            - "agentplane-roadmap-r2/tasks/LC-12.md"
            - "agentplane-roadmap-r2/tasks/LC-13.md"
            - "agentplane-roadmap-r2/tasks/LC-14.md"
            - "agentplane-roadmap-r2/tasks/LC-15.md"
            - "agentplane-roadmap-r2/tasks/LC-16.md"
            - "agentplane-roadmap-r2/tasks/LC-17.md"
            - "agentplane-roadmap-r2/tasks/LC-18.md"
            - "agentplane-roadmap-r2/tasks/LC-19.md"
            - "agentplane-roadmap-r2/tasks/LC-20.md"
            - "agentplane-roadmap-r2/tasks/LC-21.md"
            - "agentplane-roadmap-r2/tasks/LC-22.md"
            - "agentplane-roadmap-r2/tasks/LC-23.md"
            - "agentplane-roadmap-r2/tasks/LC-24.md"
            - "agentplane-roadmap-r2/tasks/PL-01.md"
            - "agentplane-roadmap-r2/tasks/PL-02.md"
            - "agentplane-roadmap-r2/tasks/PL-03.md"
            - "agentplane-roadmap-r2/tasks/PL-04.md"
            - "agentplane-roadmap-r2/tasks/PL-05.md"
            - "agentplane-roadmap-r2/tasks/PL-06.md"
            - "agentplane-roadmap-r2/tasks/PL-07.md"
            - "agentplane-roadmap-r2/tasks/PL-08.md"
            - "agentplane-roadmap-r2/tasks/PL-09.md"
            - "agentplane-roadmap-r2/tasks/PL-10.md"
            - "agentplane-roadmap-r2/tasks/PL-11.md"
            - "agentplane-roadmap-r2/tasks/PL-12.md"
            - "agentplane-roadmap-r2/tasks/RC-01.md"
            - "agentplane-roadmap-r2/tasks/RC-02.md"
            - "agentplane-roadmap-r2/tasks/RC-03.md"
            - "agentplane-roadmap-r2/tasks/RC-04.md"
            - "agentplane-roadmap-r2/tasks/RC-05.md"
            - "agentplane-roadmap-r2/tasks/RC-06.md"
            - "agentplane-roadmap-r2/tasks/RC-07.md"
            - "agentplane-roadmap-r2/tasks/RC-08.md"
            - "agentplane-roadmap-r2/tasks/RC-09.md"
            - "agentplane-roadmap-r2/tasks/RC-10.md"
            - "agentplane-roadmap-r2/tasks/RC-11.md"
            - "agentplane-roadmap-r2/tasks/RC-12.md"
            - "agentplane-roadmap-r2/tasks/RC-13.md"
            - "agentplane-roadmap-r2/tasks/RC-14.md"
            - "agentplane-roadmap-r2/tasks/RC-15.md"
            - "agentplane-roadmap-r2/tasks/RC-16.md"
            - "agentplane-roadmap-r2/tasks/RC-17.md"
            - "agentplane-roadmap-r2/tasks/RC-18.md"
            - "agentplane-roadmap-r2/tasks/ST-01.md"
            - "agentplane-roadmap-r2/tasks/ST-02.md"
            - "agentplane-roadmap-r2/tasks/ST-03.md"
            - "agentplane-roadmap-r2/tasks/ST-04.md"
            - "agentplane-roadmap-r2/tasks/ST-05.md"
            - "agentplane-roadmap-r2/tasks/ST-06.md"
            - "agentplane-roadmap-r2/tasks/ST-07.md"
            - "agentplane-roadmap-r2/tasks/ST-08.md"
            - "agentplane-roadmap-r2/tasks/ST-09.md"
            - "agentplane-roadmap-r2/tasks/ST-10.md"
            - "agentplane-roadmap-r2/tasks/ST-11.md"
            - "agentplane-roadmap-r2/tasks/ST-12.md"
            - "agentplane-roadmap-r2/tasks/ST-13.md"
            - "agentplane-roadmap-r2/tasks/ST-14.md"
            - "agentplane-roadmap-r2/tasks/ST-15.md"
            - "agentplane-roadmap-r2/tasks/ST-16.md"
            - "agentplane-roadmap-r2/tasks/ST-17.md"
            - "agentplane-roadmap-r2/tasks/ST-18.md"
            - "agentplane-roadmap-r2/tasks/ST-19.md"
            - "agentplane-roadmap-r2/tasks/ST-20.md"
            - "agentplane-roadmap-r2/tasks/ST-21.md"
            - "agentplane-roadmap-r2/validate_roadmap.py"
            - "agentplane-roadmap-r2/validation-report.json"
            - "packages/agentplane/src/adapters/task-backend/kernel-plan-rejection-recovery.ts"
            - "packages/agentplane/src/cli/run-cli.roadmap-plan-recovery.test.ts"
          git:
            kind: "commit"
            ref: null
            sha: "a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609142255-KR5FPV"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:platform-critical"
              id: "check-platform"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "check-routing"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              id: "check-semantic-review"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "check-hosted"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "check-release-provider"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "check-platform"
                - "check-semantic-review"
              description: "The v0.6 worktree materializer reuses node_modules only when the resolved install layout is inside the repository, outside every task worktree, and each declared direct dependency resolves to a repository-owned package target with package.json."
              id: "criterion-source-guard"
              required: true
            -
              check_ids:
                - "check-platform"
                - "check-semantic-review"
              description: "The existing v0.6.29 pre-removal unlink defense remains active for AgentPlane-owned worktree removal paths."
              id: "criterion-defense-depth"
              required: true
            -
              check_ids:
                - "check-platform"
                - "check-routing"
                - "check-full"
              description: "Regression tests reject external and task-worktree-owned layouts and accept a valid repository-local layout."
              id: "criterion-regression"
              required: true
            -
              check_ids:
                - "check-hosted"
              description: "Hosted CI passes for the final task head and the task PR merges only into codex/release-v0.6.27-reclaim-fix."
              id: "criterion-hosted"
              required: true
            -
              check_ids:
                - "check-release-provider"
              description: "AgentPlane v0.6.30 is published from the exact merged maintenance SHA and every claimed channel is verified from provider state."
              id: "criterion-release"
              required: true
          evidence_fingerprint: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-platform"
                    - "check-semantic-review"
                  description: "The v0.6 worktree materializer reuses node_modules only when the resolved install layout is inside the repository, outside every task worktree, and each declared direct dependency resolves to a repository-owned package target with package.json."
                  id: "criterion-source-guard"
                  required: true
                -
                  check_ids:
                    - "check-platform"
                    - "check-semantic-review"
                  description: "The existing v0.6.29 pre-removal unlink defense remains active for AgentPlane-owned worktree removal paths."
                  id: "criterion-defense-depth"
                  required: true
                -
                  check_ids:
                    - "check-platform"
                    - "check-routing"
                    - "check-full"
                  description: "Regression tests reject external and task-worktree-owned layouts and accept a valid repository-local layout."
                  id: "criterion-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "v0.7.8 versions of the same implementation and tests"
                required_sources:
                  - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                  - "packages/agentplane/src/commands/shared/worktree-install-layout-links.ts"
                symbol_hints:
                  - "isReusableWorkspaceInstallLayout"
                  - "linkDirectoryIntoWorktree"
                  - "unlinkWorktreeInstallLayout"
              depends_on: []
              expected_outputs:
                - "guard-implementation"
                - "guard-regression-evidence"
              id: "backport-install-layout-guard"
              objective: "Backport the v0.7.8 reusable install-layout guard and focused tests without removing the v0.6.29 pre-removal unlink defense."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:platform-critical"
                    id: "check-platform"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "check-routing"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "check-semantic-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-platform"
                      - "check-semantic-review"
                    description: "The v0.6 worktree materializer reuses node_modules only when the resolved install layout is inside the repository, outside every task worktree, and each declared direct dependency resolves to a repository-owned package target with package.json."
                    id: "criterion-source-guard"
                    required: true
                  -
                    check_ids:
                      - "check-platform"
                      - "check-semantic-review"
                    description: "The existing v0.6.29 pre-removal unlink defense remains active for AgentPlane-owned worktree removal paths."
                    id: "criterion-defense-depth"
                    required: true
                  -
                    check_ids:
                      - "check-platform"
                      - "check-routing"
                      - "check-full"
                    description: "Regression tests reject external and task-worktree-owned layouts and accept a valid repository-local layout."
                    id: "criterion-regression"
                    required: true
                evidence_fingerprint: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-hosted"
                  description: "Hosted CI passes for the final task head and the task PR merges only into codex/release-v0.6.27-reclaim-fix."
                  id: "criterion-hosted"
                  required: true
                -
                  check_ids:
                    - "check-release-provider"
                  description: "AgentPlane v0.6.30 is published from the exact merged maintenance SHA and every claimed channel is verified from provider state."
                  id: "criterion-release"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 140000
                optional_sources:
                  - "GitHub Actions run metadata"
                  - "npm registry metadata"
                  - "GitHub Release metadata"
                  - "GHCR metadata"
                required_sources: []
                symbol_hints:
                  - "v0.6.30"
                  - "codex/release-v0.6.27-reclaim-fix"
              depends_on:
                - "backport-install-layout-guard"
              expected_outputs:
                - "hosted-integration-evidence"
                - "exact-sha-release-evidence"
              id: "qualify-and-verify-release"
              objective: "Qualify the merged maintenance result and verify supervisor-owned v0.6.30 publication from exact provider evidence."
              optional: false
              priority: 2
              required_inputs:
                - "guard-implementation"
                - "guard-regression-evidence"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "github-actions-release"
              risk: "high"
              scope_roots:
                - "package.json"
                - "packages/core/package.json"
                - "packages/recipes/package.json"
                - "packages/agentplane/package.json"
                - "bun.lock"
                - ".agentplane/tasks/202609142255-KR5FPV"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "check-hosted"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "check-release-provider"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-hosted"
                    description: "Hosted CI passes for the final task head and the task PR merges only into codex/release-v0.6.27-reclaim-fix."
                    id: "criterion-hosted"
                    required: true
                  -
                    check_ids:
                      - "check-release-provider"
                    description: "AgentPlane v0.6.30 is published from the exact merged maintenance SHA and every claimed channel is verified from provider state."
                    id: "criterion-release"
                    required: true
                evidence_fingerprint: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609142255-KR5FPV"
    event_cursor: 5
    final_validation: null
    id: "202609142255-KR5FPV"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:platform-critical"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-14T22:55:34.143Z"
      constraints: []
      request: |-
        Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30

        On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
      task_id: "202609142255-KR5FPV"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-09-14T23:09:52.996Z"
    work_items:
      backport-install-layout-guard:
        attempt: 1
        claim_id: null
        id: "backport-install-layout-guard"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:7d040748ada110c73055dee3ac0c2becd91435e5e97772998d6b9188984b89d4"
            id: "guard-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609142255-KR5FPV"
              work_item_id: "backport-install-layout-guard"
            provenance:
              - "sha256:90cede26ec8e4b45482411e5b4e3e932a1929fb8bfd632935a94eec6fd194cfd"
              - ".agentplane/tasks/202609142255-KR5FPV/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:384ce57c4d796bf1000d9a08d3cb37477dd9a455afe41f3fc85eddcef33f1a3f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:777ea45c16fae8ab94b27f63670d9579af09769b892977a29edf94985e5b6a25"
            id: "guard-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609142255-KR5FPV"
              work_item_id: "backport-install-layout-guard"
            provenance:
              - "sha256:90cede26ec8e4b45482411e5b4e3e932a1929fb8bfd632935a94eec6fd194cfd"
              - ".agentplane/tasks/202609142255-KR5FPV/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:384ce57c4d796bf1000d9a08d3cb37477dd9a455afe41f3fc85eddcef33f1a3f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609142255-KR5FPV/supervision/declared-checks.json"
              check_id: "check-platform"
              command_identity: "bun run test:platform-critical"
              detail: "Observed by bun run test:platform-critical."
              exit_code: 0
              observed_at: "2026-09-14T23:09:52.987Z"
              repository_snapshot_digest: "sha256:384ce57c4d796bf1000d9a08d3cb37477dd9a455afe41f3fc85eddcef33f1a3f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609142255-KR5FPV/supervision/declared-checks.json"
              check_id: "check-routing"
              command_identity: "node .agentplane/policy/check-routing.mjs"
              detail: "Observed by node .agentplane/policy/check-routing.mjs."
              exit_code: 0
              observed_at: "2026-09-14T23:09:52.987Z"
              repository_snapshot_digest: "sha256:384ce57c4d796bf1000d9a08d3cb37477dd9a455afe41f3fc85eddcef33f1a3f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609142255-KR5FPV/supervision/declared-checks.json"
              check_id: "check-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-14T23:09:52.987Z"
              repository_snapshot_digest: "sha256:384ce57c4d796bf1000d9a08d3cb37477dd9a455afe41f3fc85eddcef33f1a3f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609142255-KR5FPV/supervision/declared-checks.json"
              check_id: "check-semantic-review"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-14T23:09:52.987Z"
              repository_snapshot_digest: "sha256:384ce57c4d796bf1000d9a08d3cb37477dd9a455afe41f3fc85eddcef33f1a3f"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      qualify-and-verify-release:
        attempt: 0
        claim_id: null
        id: "qualify-and-verify-release"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-14T23:09:52.996Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:0798aa8d496ecff1294d7e1d5c1c7eb8df2d5eb283e16d94b02c305bbd641995"
        entity: "work_item"
        id: "event_53b3146077798d75f5f2ec82"
        mutation_id: "external-result:work-order-202609142255-KR5FPV-executor-f9b285d666e4ea80d75935d8"
        plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609142255-KR5FPV"
        task_revision: 7
        work_item_id: "backport-install-layout-guard"
    leases: []
    mutation_receipts:
      compatibility:sha256:2f2c22ddd17a9bc3d8afb2e208eaeba3e5fe897d37259e2bf30b554ea7e207ba:
        aggregate_digest: "sha256:36512a86eb39a59588cec86e8844448f0e228ac5b3379a2bae1964c2854b39a6"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:58:07.240Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_4910c0fd5e63946aa16f1b81"
          mutation_id: "compatibility:sha256:2f2c22ddd17a9bc3d8afb2e208eaeba3e5fe897d37259e2bf30b554ea7e207ba"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2f2c22ddd17a9bc3d8afb2e208eaeba3e5fe897d37259e2bf30b554ea7e207ba"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609142255-KR5FPV"
      compatibility:sha256:2fd8d6dc451e07d8136764b682616f8a0c6f4635d47a88151ed4456e024ca1e7:
        aggregate_digest: "sha256:c5f3ed6e367c5472154d14581a8c42d3e2c98edacea6abc3a3044c8f29a7b2c6"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:58:33.303Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_357cc649bc421b0cff44ca6c"
          mutation_id: "compatibility:sha256:2fd8d6dc451e07d8136764b682616f8a0c6f4635d47a88151ed4456e024ca1e7"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2fd8d6dc451e07d8136764b682616f8a0c6f4635d47a88151ed4456e024ca1e7"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609142255-KR5FPV"
      compatibility:sha256:8601cd2e0882a092ceed3588c47716c4b53e4ad46224898464e7aa6fe1b588fb:
        aggregate_digest: "sha256:8eae82303c727a2f59f522688414fa6b1ea15e7120c4cc284189d30bfe775ded"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:07:12.483Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_16f10b0a975a58f63458ef1c"
          mutation_id: "compatibility:sha256:8601cd2e0882a092ceed3588c47716c4b53e4ad46224898464e7aa6fe1b588fb"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8601cd2e0882a092ceed3588c47716c4b53e4ad46224898464e7aa6fe1b588fb"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609142255-KR5FPV"
      compatibility:sha256:970e0e0fd20abe5208a4952de63856e2d3a501cb4c2b686b4da661a040e90458:
        aggregate_digest: "sha256:11dd18899d11a0d49e71dab6966218450beb3cc30308d0118d4f54434c367281"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:07:12.483Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_efd4e3b98f6050b48746c9f8"
          mutation_id: "compatibility:sha256:970e0e0fd20abe5208a4952de63856e2d3a501cb4c2b686b4da661a040e90458"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:970e0e0fd20abe5208a4952de63856e2d3a501cb4c2b686b4da661a040e90458"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609142255-KR5FPV"
      compatibility:sha256:af6e3501a2fe5681f40092ac37dc387ec12b7b1748903dbc3d521f275e750f6e:
        aggregate_digest: "sha256:191571a3d48a194258718669ace7fcb476683e5f91f72dd13e895daae1f16399"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:58:07.237Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_995c3e600c77a7ac960693d5"
          mutation_id: "compatibility:sha256:af6e3501a2fe5681f40092ac37dc387ec12b7b1748903dbc3d521f275e750f6e"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:af6e3501a2fe5681f40092ac37dc387ec12b7b1748903dbc3d521f275e750f6e"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609142255-KR5FPV"
      external-result:work-order-202609142255-KR5FPV-executor-f9b285d666e4ea80d75935d8:
        aggregate_digest: "sha256:a875744818cc0296fd0a15b63aaae680ce2d21d373c3cbc1db8be035efe86d86"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:09:52.996Z"
          cause_refs:
            - "semantic-result:sha256:0798aa8d496ecff1294d7e1d5c1c7eb8df2d5eb283e16d94b02c305bbd641995"
          entity: "work_item"
          from: "READY"
          id: "event_53b3146077798d75f5f2ec82"
          mutation_id: "external-result:work-order-202609142255-KR5FPV-executor-f9b285d666e4ea80d75935d8"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "backport-install-layout-guard"
        mutation_id: "external-result:work-order-202609142255-KR5FPV-executor-f9b285d666e4ea80d75935d8"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609142255-KR5FPV"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "f030f679ddd67bb024665ebf9717c05cd4373f48"
    message: "🚧 KR5FPV task: apply external agent result"
  task_execution_context:
    base_ref: "refs/remotes/origin/codex/release-v0.6.27-reclaim-fix"
    base_sha: "69d023b1de5450a63244e8443662021fba484f81"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
    version: 1
id_source: "generated"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots:
      - ".agentplane/tasks/202609142255-KR5FPV"
      - "bun.lock"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Publication must use the exact merged maintenance SHA for v0.6.30."
      - "The branch_pr route isolates the maintenance change and supplies hosted evidence."
      - "The change backports an existing guard from v0.7.8 instead of inventing a new mechanism."
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/tasks/202609142255-KR5FPV"
      - "bun.lock"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".agentplane/tasks/202609142255-KR5FPV"
          - "bun.lock"
          - "package.json"
          - "packages/agentplane/package.json"
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:7597e60f2f18a145f6d504e282fbcc0d47f706ae514538c94a48b935d825f66d"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "central_component:packages/core/package.json"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
---
## Summary

Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30

On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.

## Scope

- In scope: On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
- Out of scope: unrelated refactors not required for "Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30".

## Plan

Backport the proven install-layout guard, verify it, and publish v0.6.30 from the maintenance branch.

## Verify Steps

1. Run `bun run test:platform-critical`. Expected: the install-layout guard rejects external and task-worktree-owned sources, accepts a valid repository-local layout, and the platform-critical suite passes.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: repository policy routing passes.
3. Run `bun run ci:local:full`. Expected: the full local regression suite passes on the exact task head.
4. Inspect the final diff. Expected: the v0.6.29 pre-removal unlink defense remains and no file on `main` changes.
5. Verify hosted CI and the maintenance PR target. Expected: all required checks pass and the PR targets only `codex/release-v0.6.27-reclaim-fix`.
6. Verify the v0.6.30 publication against the exact merged SHA. Expected: npm packages, CLI install smoke, tag, GitHub Release, distribution assets, and GHCR are confirmed or any credential-gated channel is explicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-14T23:17:56.104Z — VERIFY — ok

By: TESTER

Note: Local and hosted verification passed on PR head 99521b9e10fcd063120660304cd64821a2495ad7.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T23:07:12.483Z, excerpt_hash=sha256:1c9fecee6653a59f8c9649025bf2e906a23dda35ce890ea931792d4e9361099e

Details:

Local declared checks passed: bun run test:platform-critical (6 files, 92 tests), node .agentplane/policy/check-routing.mjs, and bun run ci:local:full (372 fast files, 2194 tests plus critical suites). GitHub Core CI run 34907626254 passed verify-contract, verify-static, verify-unit, verify-cli-critical, verify-workflow, verify-coverage, test-windows, and aggregate PR verification. PR #5958 targets codex/release-v0.6.27-reclaim-fix. The existing pre-removal unlink defense remains unchanged.

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609142255-KR5FPV-backport-install-layout-guard/.agentplane/tasks/202609142255-KR5FPV/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 92249eea6ce21268022d6e2dac1f9668d509cb27c63635f4529b8148e1969827
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202609142255-KR5FPV

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202609142255-KR5FPV --branch task/202609142255-KR5FPV/backport-install-layout-guard
- diagnostic_command: agentplane pr check 202609142255-KR5FPV
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-09-14T23:18:36.554Z — VERIFY — ok

By: TESTER

Note: Verified after current release.strict blueprint snapshot on PR head 99521b9e10fcd063120660304cd64821a2495ad7.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T23:17:56.207Z, excerpt_hash=sha256:1c9fecee6653a59f8c9649025bf2e906a23dda35ce890ea931792d4e9361099e

Details:

Local declared checks passed: platform-critical 6/92, routing policy, and full local CI including 372 fast files and 2194 tests. Hosted Core CI run 34907626254 passed every required Linux and Windows job plus aggregate PR verification. PR #5958 targets codex/release-v0.6.27-reclaim-fix only.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609142255-KR5FPV-backport-install-layout-guard/.agentplane/tasks/202609142255-KR5FPV/blueprint/resolved-snapshot.json
- old_digest: 92249eea6ce21268022d6e2dac1f9668d509cb27c63635f4529b8148e1969827
- current_digest: 92249eea6ce21268022d6e2dac1f9668d509cb27c63635f4529b8148e1969827
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609142255-KR5FPV

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202609142255-KR5FPV --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit 99521b9e10fcd063120660304cd64821a2495ad7 --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
