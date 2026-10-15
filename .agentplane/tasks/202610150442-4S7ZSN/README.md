---
id: "202610150442-4S7ZSN"
title: "Bind canonical integration recovery to the resolved task checkout"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 37
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-15T08:17:56.550Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-15T08:38:51.738Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-15T08:17:56.550Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "70eeb3ff27a4b14bbd5bd28261f952b72b4ebaee"
  review_identity_digest: "sha256:03f4eb09839d1233706f69d37615dd38b1ef08aa366339a544d1176392f7c0c0"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610150442-4S7ZSN/eca11cc91d0d16c6d6af1a6338f97249ca0dd445643dd339b2e0257a67fbad6c/quality-report.json"
  findings:
    - "Full genuine EVALUATOR WorkOrder eca11cc9 and all13 required context blocks verified by canonical SHA and UTF-8 bytes. Plan3/corrective WI/attempt2/claim0bb99ae6/contract11cc2b0f and exact inspection binding retained. All3 pathful inputs and pathless frozen report361e045b match issued digests."
    - "Prior independent source review is explicitly reused and rebound to committed postimages0958ac43/d56c9e84. Exactly12 equivalent Zod4 wrappers (5strictObject/7looseObject) retain all fields, refinements, optionality and unknown-key policy. All trusted checkout, ownership, lease, ESRCH, lock, CAS, history and provider control flow remains unchanged. Formatter output596 physical lines meets600 limit with no waiver/new module/compressed statements."
    - "Fixture is byte-exact approved d56c9e84: sentinel after SIGTERM handler and readiness wait at existing before-recording-process-start boundary. Timeout120ms/grace0/all original assertions remain. Historical EPERM cause remains UNKNOWN; process12PASS is verification of this source, not causal proof."
    - "Native commit70eeb3ff parentecf2f8bb contains only source2 plus own Task evidence, including retained historical artifacts. Working source bytes/modes equal frozen and committed source2; index empty. Current tracked working differences are only own Task README, declared-checks and implementation-evidence metadata. Existing roadmap recovery test remains unchanged."
    - "Native validation94735d39/input9144c6 independently reran recovery39PASS, process-supervision12PASS and typecheck0. All3 raw observation manifest hashes and all9 native file hashes/bytes verified, complete child evidence/no IO error/no truncation. Direct input ENV56b718, executed manifest ENV1f061d and returned runtime ENVf494bc are distinct retained layers."
    - "SOURCE receipt20279aed has6closed0/reaped/reader-stopped stages with remaining_owned empty and breach null; all12 wrapper raw hashes/bytes verified. Inherited publication_started is explicitly a source ancestor-guard marker, not provider publication. Prior focused formatter/lint/hotspot proof is reused from accepted source review."
    - "All6 corrective source criteria supported. Completed original WorkItem and earlier SOURCE/EVAL/failedFINAL history retained. This review accepts source scope only; mandatory independent FINAL full regression, hosted checks, live recovery and provider delivery remain pending."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
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
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
          - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:ceb76cc4bc6f71812d3f53892034090d897755ae70643816b1748a7cd8413700"
      escalation_reasons:
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
          - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
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
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "70eeb3ff27a4b14bbd5bd28261f952b72b4ebaee"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-15T08:38:51.738Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-15T08:38:53.175Z"
doc_updated_by: "SUPERVISOR"
description: "Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects."
sections:
  Summary: |-
    Bind canonical integration recovery to the resolved task checkout

    Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.
  Scope: |-
    - In scope: Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.
    - Out of scope: unrelated refactors not required for "Bind canonical integration recovery to the resolved task checkout".
  Plan: |-
    1. Execute approved WorkItem bind-recovery-task-checkout.
    2. Execute approved WorkItem final-correction-6ba8508e2d0e.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-15T08:38:51.738Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:36a561f31dfe49651ed56c2e3c54c596489405f4bcdd5272d71f3213dd840934, input_digest=sha256:f15223ee856c40af699170d456d3eb8111613161be7b406490701f11cb43b8be

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/runner/process-supervision.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/runner/process-supervision.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/runner/process-supervision.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669
    - policy_digest: sha256:b0f3ed8717357e14968093aaf83e3059ba55a248477be0e758cb9ae571d6f7ac
    - capability_digest: sha256:17e87866a746b818d676b9969943ddf029d9f678c00cb060b36eb5a00a39625a
    - checks_digest: sha256:6e77c287fc601a725fb3ec5f7e4fe02076ef52beae84b5695d5977b913220428
    - identity_digest: sha256:fa069d6b232b4dc96c5026288ad086a7a98e7266acf08e91e57f44a09ec5d06f

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610150442-4S7ZSN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:45367166df01747a83b0e6b8b7288f748050f6343be4af64acb996befbc94786"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610150442-4S7ZSN/eca11cc91d0d16c6d6af1a6338f97249ca0dd445643dd339b2e0257a67fbad6c/quality-report.json"
    findings:
      - "Full genuine EVALUATOR WorkOrder eca11cc9 and all13 required context blocks verified by canonical SHA and UTF-8 bytes. Plan3/corrective WI/attempt2/claim0bb99ae6/contract11cc2b0f and exact inspection binding retained. All3 pathful inputs and pathless frozen report361e045b match issued digests."
      - "Prior independent source review is explicitly reused and rebound to committed postimages0958ac43/d56c9e84. Exactly12 equivalent Zod4 wrappers (5strictObject/7looseObject) retain all fields, refinements, optionality and unknown-key policy. All trusted checkout, ownership, lease, ESRCH, lock, CAS, history and provider control flow remains unchanged. Formatter output596 physical lines meets600 limit with no waiver/new module/compressed statements."
      - "Fixture is byte-exact approved d56c9e84: sentinel after SIGTERM handler and readiness wait at existing before-recording-process-start boundary. Timeout120ms/grace0/all original assertions remain. Historical EPERM cause remains UNKNOWN; process12PASS is verification of this source, not causal proof."
      - "Native commit70eeb3ff parentecf2f8bb contains only source2 plus own Task evidence, including retained historical artifacts. Working source bytes/modes equal frozen and committed source2; index empty. Current tracked working differences are only own Task README, declared-checks and implementation-evidence metadata. Existing roadmap recovery test remains unchanged."
      - "Native validation94735d39/input9144c6 independently reran recovery39PASS, process-supervision12PASS and typecheck0. All3 raw observation manifest hashes and all9 native file hashes/bytes verified, complete child evidence/no IO error/no truncation. Direct input ENV56b718, executed manifest ENV1f061d and returned runtime ENVf494bc are distinct retained layers."
      - "SOURCE receipt20279aed has6closed0/reaped/reader-stopped stages with remaining_owned empty and breach null; all12 wrapper raw hashes/bytes verified. Inherited publication_started is explicitly a source ancestor-guard marker, not provider publication. Prior focused formatter/lint/hotspot proof is reused from accepted source review."
      - "All6 corrective source criteria supported. Completed original WorkItem and earlier SOURCE/EVAL/failedFINAL history retained. This review accepts source scope only; mandatory independent FINAL full regression, hosted checks, live recovery and provider delivery remain pending."
    implementation_commit: "70eeb3ff27a4b14bbd5bd28261f952b72b4ebaee"
    implementation_tree: "7f031f46ff9bd1a0afc83cbc37c833b157b694a0"
    projected_at: "2026-10-15T08:17:56.550Z"
    review_identity_digest: "sha256:03f4eb09839d1233706f69d37615dd38b1ef08aa366339a544d1176392f7c0c0"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:0481847f7db732aeb8cd5cca31a18ad40e71003d6715af8fbe491cab00d85a9b"
    work_order_id: "sha256:d831f90b0700e35651643c1fe80b342042689ddc5bfe69d8b42b27079e291567"
  task_execution_context:
    base_ref: "task/202610142302-3PJHSP/recover-interrupted-integration-intent-for-compl"
    base_sha: "53d9a96ecc8f688e1c83de0336624f3338bc97a8"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:68dff98186fee278ab037d439dc24be178da18a28676cea282213b5d45468106"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b5f121b6b0ac89c8057986e1390e9e17e07a21cd70aeeafa71bc23b095c4e418"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a6dbd76557dc9a2503c09c43a216d64eda2ed122a18ac7d66af7d4a031df2329"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            task_id: "202610150442-4S7ZSN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:48006989b1f4226bceb3389f427dc1bce12f93e4bba29ee57b8e3490d521fb50"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b5f121b6b0ac89c8057986e1390e9e17e07a21cd70aeeafa71bc23b095c4e418"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a6dbd76557dc9a2503c09c43a216d64eda2ed122a18ac7d66af7d4a031df2329"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:68dff98186fee278ab037d439dc24be178da18a28676cea282213b5d45468106"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            task_id: "202610150442-4S7ZSN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            evidence_digest: "sha256:4e8db413cdf66dc44517cc3bc133e823f55dfd9f1fa09f3dc1861f162ece4e73"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2304f88d373b41f6ec7ea733d7429d926d0b6296ae88a87dc3c3f734e2dad4bc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a6dbd76557dc9a2503c09c43a216d64eda2ed122a18ac7d66af7d4a031df2329"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:48006989b1f4226bceb3389f427dc1bce12f93e4bba29ee57b8e3490d521fb50"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            task_id: "202610150442-4S7ZSN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:1b619f831758f646f5935f0fd72dd433c6041cefc1fa36077844c09751706615"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:fb3be6dd29351c741d933c048b00a09c976e9c1246036b6be315acc664bc0bcc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a6dbd76557dc9a2503c09c43a216d64eda2ed122a18ac7d66af7d4a031df2329"
              kind: "USER"
              parent_authority_digest: "sha256:2304f88d373b41f6ec7ea733d7429d926d0b6296ae88a87dc3c3f734e2dad4bc"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
            task_id: "202610150442-4S7ZSN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:86d0372794c4b3138e68d86dfb60efd5730d0142c194239dbf49f104d6f46259"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
            request_digest: "sha256:e9e69c869f0c93c7b3a8475926ad7487e1e875711beb7f94825a9f8c5c46d3b4"
            scope_request:
              attempt: 1
              claim_id: "sha256:d3d2dec134e19db97174ca3cb319316b64075a6c7a906f2e1ce5919e22933fcd"
              contract_digest: "sha256:0217a3b580cbc39e59fe06b35a7079e533558f0609d893e38db8014c2af00e1b"
              intake_after_digest: "sha256:d52a1e44932c6a95bf24d1189b11920b707edee8a15cda139527f13464b14f19"
              intake_before_digest: "sha256:bdc18b299e0fd7d7954c9312146846596ebf89ac16bdfb49c42bf0e35ad7efaa"
              parent_authority_digest: "sha256:2304f88d373b41f6ec7ea733d7429d926d0b6296ae88a87dc3c3f734e2dad4bc"
              plan_digest: "sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8"
              plan_revision: 2
              record_digest: "sha256:1925c1011a5d7d8d0d6ce5c29ac8ffd1d0be2172b4af969689f14d54a759dc50"
              repository_effects: []
              repository_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:6f7b4452f5d0e1561d65a2a3eb5804e635b74ecb5f45d25f5f15e06f2574dbc7"
              scope_roots:
                - "packages/agentplane/src/runner/process-supervision.test.ts"
              stop_receipt_digest: "sha256:9d48d9bf7d641d8a2f67488ea27d5b65b88fc65ac0168bb17d8c6e799e435fe2"
              task_id: "202610150442-4S7ZSN"
              task_revision: 18
              work_item_id: "final-correction-6ba8508e2d0e"
              work_order_id: "sha256:a2516c451583364a02e1ed5f8d197efea322a28c62ec26d459728c978759f865"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5e5f381c08e7f1d9dc6ddebb4d88e0b504b4110a5debcb5fe9381ce8d5d673be"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c8aae5d870b344fa751e485a659e35ff1df5d12189a21de903820b285af35ad5"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
            task_id: "202610150442-4S7ZSN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e5c05e2286b59f1527bddc74fb5d224d2ed0e910ac9b57d6c7a3e1e6473de805"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c8aae5d870b344fa751e485a659e35ff1df5d12189a21de903820b285af35ad5"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5e5f381c08e7f1d9dc6ddebb4d88e0b504b4110a5debcb5fe9381ce8d5d673be"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
            task_id: "202610150442-4S7ZSN"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
            evidence_digest: "sha256:beaa6ffbd1784d5c94f06cc8e110a8556e9b2f580aba891711342f4ea35331b3"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:c8aae5d870b344fa751e485a659e35ff1df5d12189a21de903820b285af35ad5"
        digest: "sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            expected_outputs:
              - "task-checkout-recovery-source-report"
            id: "bind-recovery-task-checkout"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:11cc2b0fcf9d4461cfb9c1ca7ec0ebdd3152eff01f9a2b204fad63abcfaf042e"
            depends_on:
              - "bind-recovery-task-checkout"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
            expected_outputs:
              - "final-correction-6ba8508e2d0e-evidence"
            id: "final-correction-6ba8508e2d0e"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:0481847f7db732aeb8cd5cca31a18ad40e71003d6715af8fbe491cab00d85a9b"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:bf90b267f1ace2c23ec6ac9722dd3b7d9547b5e9be6ebc1fb50c2a20e5bd4bf2"
          environment_digest: "sha256:98900aae9cea00b1c9b1e3cff9db3f9dd2e992704f384e9c14e24945f2a9e8e5"
          implementation_identity: "sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3"
          toolchain_digest: "sha256:be43de6bf1ca89561903cd3b8f7b5bc6fd6cdd9f589c9803ecb4fc80003d4b9d"
        observed_at: "2026-10-15T08:18:08.382Z"
        status: "PASSED"
      id: "202610150442-4S7ZSN"
      intent_digest: "sha256:268136e664984541275657a821402cf93770f8705b7c1b23d1727166449e8faa"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8:
          after_revision: 14
          aggregate_digest: "sha256:0b31d113a7962e3535333f8cf7f36f3752a5cb7fc743c4b1f413b3e93f28035b"
          before_revision: 13
          command_digest: "sha256:3d5c25639fd7e9bb3506e98f44aee46040bdb54f375242474e1390b160c575bd"
          effect_ids: []
          event_digests:
            - "sha256:c202defc504d256dbf6399cc766cc3431ecbf4ed10aa1eb5325bad6c77797560"
          mutation_id: "amend:sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8"
        capture:202610150442-4S7ZSN:
          after_revision: 1
          aggregate_digest: "sha256:f74a1fa1e467cd714e12a20616d4a781f4170b43828f9cfde3bd4860a9566808"
          before_revision: 0
          command_digest: "sha256:e7f5a638c060f75209e2b47d35751f902d47d78ba4b77bd2dcdfb33c89546296"
          effect_ids: []
          event_digests:
            - "sha256:89fa1b9c2ec2100ef3d1e1786e19db05dccd6e2551a9fca10a3f34ff71ce057e"
          mutation_id: "capture:202610150442-4S7ZSN"
        final-validation:sha256:0481847f7db732aeb8cd5cca31a18ad40e71003d6715af8fbe491cab00d85a9b:28:
          after_revision: 29
          aggregate_digest: "sha256:7a932590cbaff6c8bb35e2526f04f526d76f1926843e2d42ef7390488b4ea25f"
          before_revision: 28
          command_digest: "sha256:feb4010f7331384a67ab855577134ef906d84ccfbb3d7d50ee09ff8a1f5153fd"
          effect_ids: []
          event_digests:
            - "sha256:ab372ce7b49030cb17c3bd82adfc682f652789561de2c9bb7daf28daaed84f69"
          mutation_id: "final-validation:sha256:0481847f7db732aeb8cd5cca31a18ad40e71003d6715af8fbe491cab00d85a9b:28"
        final-validation:sha256:6ba8508e2d0eaed94fbca11dd24d790e576f812f25cbd4067f13aa97a86f371c:12:
          after_revision: 13
          aggregate_digest: "sha256:5792e97abbebd500465bc716f8a76f8bfe4e07a586f6ae64d041817780c84886"
          before_revision: 12
          command_digest: "sha256:ae1ba97783c8312f8667f73b879777abde3f156d10a1a866d32a3660eb54cc8e"
          effect_ids: []
          event_digests:
            - "sha256:6157ffd0b1d8d3793a8ce6b2414be76c80eda44371d2c25448f3fcce7cb51811"
          mutation_id: "final-validation:sha256:6ba8508e2d0eaed94fbca11dd24d790e576f812f25cbd4067f13aa97a86f371c:12"
        final-validation:sha256:74193222cc24dc7e33ae14ee8d8da4bf0fcf31206e65bc7f134a98a50ed5c059:11:
          after_revision: 12
          aggregate_digest: "sha256:18497fa9c2f8a8d89b8041e41e133696e9b5604e47c65085a022324f2ea8666c"
          before_revision: 11
          command_digest: "sha256:50ea1eff01d0afddc1fc770c49f915fc18d7a9ae2fc975b059c96c33544d972b"
          effect_ids: []
          event_digests:
            - "sha256:8a5ca48836868cc4de5574836c963e72c614c617694f2a761ed5e14a632ece1e"
          mutation_id: "final-validation:sha256:74193222cc24dc7e33ae14ee8d8da4bf0fcf31206e65bc7f134a98a50ed5c059:11"
        kernel_task_completion_required:sha256:8b787b2b8902f60bcbb9d12f4003a972554591be81286c2c44afe2dfe8c96a03:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3:
          after_revision: 30
          aggregate_digest: "sha256:b951dfcf674950bc9c4b30928b17ea9da6512de9760d80e884c99ca4407e53c2"
          before_revision: 29
          command_digest: "sha256:5945c87d5afbef7064cd7ad9b461b0e5f0f23f0fcf7742f094c268cc77a27b93"
          effect_ids: []
          event_digests:
            - "sha256:ae882caffb83f42e17aaf2e74dbc0b52def1efff72bc9a8ca061ac1929b11ebf"
          mutation_id: "kernel_task_completion_required:sha256:8b787b2b8902f60bcbb9d12f4003a972554591be81286c2c44afe2dfe8c96a03:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3"
        kernel_work_item_claim_required:sha256:3331affc39367fd264ad5d7ce07e3a7f2efc9d8d8ce4bf428d9b0bab2ebf6a24:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:
          after_revision: 16
          aggregate_digest: "sha256:a372292249e6137b5a770b02be6b31ce33fafe105afc42a7cea15bf8d5e7080a"
          before_revision: 15
          command_digest: "sha256:868fd6c3b49fbc070efa45968fefaf8f47685d82837a6a08c94a3508c9edf318"
          effect_ids: []
          event_digests:
            - "sha256:8cee2a910c4ccdd0c3bd4eed0518a47080dc877ef933d2d7348605adfdebe6e2"
          mutation_id: "kernel_work_item_claim_required:sha256:3331affc39367fd264ad5d7ce07e3a7f2efc9d8d8ce4bf428d9b0bab2ebf6a24:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        kernel_work_item_claim_required:sha256:5b67851d9fa528bca3746d995c06c0e44c351e7f30a1ebd04fde74e902a93522:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:
          after_revision: 22
          aggregate_digest: "sha256:a7676e877cbff590db8a5a9ba193d72a868aa8a17bcc1ea7841aeab53d8d1395"
          before_revision: 21
          command_digest: "sha256:3f26bafb0feb186a522e0b10ec40cb18c80983431a0f3042d828014bb2983185"
          effect_ids: []
          event_digests:
            - "sha256:84846136f8b4b4780bd3ea37917b56af7fe27f05d6e2cb17568311aded889523"
          mutation_id: "kernel_work_item_claim_required:sha256:5b67851d9fa528bca3746d995c06c0e44c351e7f30a1ebd04fde74e902a93522:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 5
          aggregate_digest: "sha256:4d1f8f18ef413df00e7f4ed3dd1cff4209777fac83aeb0269f708c0dff658d70"
          before_revision: 4
          command_digest: "sha256:c980f335794cd70c111af0148d2a4d36f6bbd9d1aeaeefbd142f8b8fedf3272e"
          effect_ids: []
          event_digests:
            - "sha256:22a79a9f0d06bd522c846d0defdce5e1682e64a8f795531559bc1f8c437fbf2b"
          mutation_id: "kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 6
          aggregate_digest: "sha256:4eb3098f9bc4f4d1b2def7893ef0720cab9e781f72b36cad1bfbfbb8b2c0328c"
          before_revision: 5
          command_digest: "sha256:48db0e9d0cbade0ed156c4362ded33022ee7fa4413c63f37fefed068b964a8c0"
          effect_ids: []
          event_digests:
            - "sha256:0f93c6a62d2d79810fe437e18acc9042c0cb5f13cdaf3793baf693d96a871dbe"
          mutation_id: "kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        kernel_work_item_execution_required:sha256:789db43af75bc8e8191a8e37cca7abaf0c931482ef57448a842bc7ddf8562192:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:
          after_revision: 17
          aggregate_digest: "sha256:7ee9639a2a57a3e0f7e5025c962f55d3069fa75f57c424b77b5df293cacaba5d"
          before_revision: 16
          command_digest: "sha256:27f7084198cfc4f1289a871dc16693f0d730cb2caf68c25eb7d5554cf5a308b5"
          effect_ids: []
          event_digests:
            - "sha256:45bcf346f72d123ebbdae80c9a02f71f93c7796bb1ec00d3bb30f5db41d4a568"
          mutation_id: "kernel_work_item_execution_required:sha256:789db43af75bc8e8191a8e37cca7abaf0c931482ef57448a842bc7ddf8562192:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        kernel_work_item_execution_required:sha256:d6ea9a70728406204cd453640c9c2e166cefa7145173245d8a0411b3f65dde5b:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:
          after_revision: 23
          aggregate_digest: "sha256:91390fac9f40d9a4725ddb54b9a88bf43e21d7cdf45c7214a2e6d0dd483472bd"
          before_revision: 22
          command_digest: "sha256:a4ef106a951202877931f61f0129c2e8b91eac33542aa77002b7bb3d7828c09f"
          effect_ids: []
          event_digests:
            - "sha256:3b0485514c34a8b86c31cea427e293edcaebc79e4d8ffe893d25109cae784ac4"
          mutation_id: "kernel_work_item_execution_required:sha256:d6ea9a70728406204cd453640c9c2e166cefa7145173245d8a0411b3f65dde5b:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        kernel_work_item_inspection_required:sha256:7fa665b5922108fb2eda955a201f4fbf90e5bdcda5a4a81cb648b2757451e253:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3:
          after_revision: 26
          aggregate_digest: "sha256:71a6346d36e42b8b696a2bf985af40d5829197dcda3ff6695b1e88a8dfffdfca"
          before_revision: 25
          command_digest: "sha256:036f95839f25c6cca46c7fd6105d7c8b46a1765936539875ace1c1cd09604471"
          effect_ids: []
          event_digests:
            - "sha256:ed4b708ea60c304ff3400ec04489cff8b14a45a4f91b0dc0362031a8c3daf03e"
          mutation_id: "kernel_work_item_inspection_required:sha256:7fa665b5922108fb2eda955a201f4fbf90e5bdcda5a4a81cb648b2757451e253:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3"
        kernel_work_item_inspection_required:sha256:c02821c5b6e955357bc248a7a324292c1c93cc941599c2d5f5ed9f9adba2346f:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:
          after_revision: 9
          aggregate_digest: "sha256:e5fce114d4b81c7ae51ff555171771821bca489412951a58bc68d6617cbf8fbf"
          before_revision: 8
          command_digest: "sha256:5f93f4222c39e44c73e9452250bb2bec0676b9cd97265ef1b2af10d2c7caee62"
          effect_ids: []
          event_digests:
            - "sha256:913531c6630eb95cfe79a7acc8efceca2dee73caca9e72b5b0b56d97f606a865"
          mutation_id: "kernel_work_item_inspection_required:sha256:c02821c5b6e955357bc248a7a324292c1c93cc941599c2d5f5ed9f9adba2346f:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:
          after_revision: 4
          aggregate_digest: "sha256:13319bebe3a58f9eb0972cca5240b794c2e8f9d64516da79ed442108fc7ed9e5"
          before_revision: 3
          command_digest: "sha256:abc7d899f6a9b3e0f7a0a1bd2a3ac7539001fbf3fe4ac950ace0855b57d418ca"
          effect_ids: []
          event_digests:
            - "sha256:1f05f7754c6c2b1bfe5fe3c7e04eb5beb86170ef03b9592012145eb05c6ce415"
          mutation_id: "kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        plan:sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669:
          after_revision: 20
          aggregate_digest: "sha256:b0a245315eb3805ee683ccd566153e4bdaecfa7d13c700df78952adafed660d2"
          before_revision: 19
          command_digest: "sha256:1c5d644614b7b8bdda45314ea35832171a2babbac8cfb894bcf3625abc73362d"
          effect_ids: []
          event_digests:
            - "sha256:5c393d9557808d6806e2081ffbcb787495b927f6d31c9d3dbb6df9a6a5d60488"
          mutation_id: "plan:sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669"
        result:sha256:2bed3566c0ba9d3da4b674d7b4705eb765b3daf459d79766f11e7ce6651b88b1:
          after_revision: 8
          aggregate_digest: "sha256:2e5a5d4cf1146a9cf9b7c781ee61a2b7d2c2173e78e3a3e3694fbd433f506b81"
          before_revision: 7
          command_digest: "sha256:2c1a038ec4ee1c2257490c83ba5325598ba3a9be9c98e8e358e1c88d50b56d94"
          effect_ids: []
          event_digests:
            - "sha256:6dfbc5fd658610500a250d41600fe98ab5351483434394e079dec369964b7526"
          mutation_id: "result:sha256:2bed3566c0ba9d3da4b674d7b4705eb765b3daf459d79766f11e7ce6651b88b1"
        result:sha256:d831f90b0700e35651643c1fe80b342042689ddc5bfe69d8b42b27079e291567:
          after_revision: 25
          aggregate_digest: "sha256:e396343035ab0558b5395384f918ce608bdc8ac7b159aba2bc41e6dd91ca0e66"
          before_revision: 24
          command_digest: "sha256:b2cdde8f3a14ad22efb07165e05bf9f78ce29e254d1b8f24879d546f0ba4ba2c"
          effect_ids: []
          event_digests:
            - "sha256:5d672d54a1b8752f2f26e1bc84577bb36e57179f936b31c915c65a368d31691a"
          mutation_id: "result:sha256:d831f90b0700e35651643c1fe80b342042689ddc5bfe69d8b42b27079e291567"
        result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015:
          after_revision: 2
          aggregate_digest: "sha256:e0a6b673ab260d6c4a652c16371a229c31e73d54ff55ae528ac1c0ad89379a4e"
          before_revision: 1
          command_digest: "sha256:f0c81a377e6da0029be61a28e83d4cfc489c8d54d2484054b72c8f6c207e2d1b"
          effect_ids: []
          event_digests:
            - "sha256:038ad9c2adc46a03a96ca3b6f96ad23841bd2363341d8699dc453eed9640a431"
          mutation_id: "result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015"
        scope-request:sha256:e9e69c869f0c93c7b3a8475926ad7487e1e875711beb7f94825a9f8c5c46d3b4:
          after_revision: 19
          aggregate_digest: "sha256:acb836c9c40e143b6f1b03b9e9331334ca966e936d84727fe5a88b511f00074d"
          before_revision: 18
          command_digest: "sha256:c0ba4becf4f30dfaed8e1935fa4261f40cacf39cb1dbdc596b0f5af18ebdd90d"
          effect_ids: []
          event_digests:
            - "sha256:5f5bfab512fe68aa659467a97d588430f1fe622dab09f92bf24d1be0ce956a9e"
          mutation_id: "scope-request:sha256:e9e69c869f0c93c7b3a8475926ad7487e1e875711beb7f94825a9f8c5c46d3b4"
        semantic-stop:sha256:a2516c451583364a02e1ed5f8d197efea322a28c62ec26d459728c978759f865:
          after_revision: 18
          aggregate_digest: "sha256:10acd1c6436556cf9e11b8c30441b04e659e3e7a0c0452c974db591d2ff59ca4"
          before_revision: 17
          command_digest: "sha256:2d5cd04a371c1e1fa506975be8bba3cd882d3999b8eaf67c80ad2e33ecf84a25"
          effect_ids: []
          event_digests:
            - "sha256:36e4b74a59775f2bd01bb34f1c4134dc598ef263503964416e1a7081490286e1"
          mutation_id: "semantic-stop:sha256:a2516c451583364a02e1ed5f8d197efea322a28c62ec26d459728c978759f865"
        sha256:1c9c6442e598ce2afc8442fed5ed7b2cbee1fa299ae5afb6494443f84b7ee54b:
          after_revision: 24
          aggregate_digest: "sha256:0b313f52cd52492777c3181392927a7e849baad77de14dc609c512d8eb6351d6"
          before_revision: 23
          command_digest: "sha256:a5a1684e9e4b81cad2b8470109c320672a9f1e8a616e4402fe3af9476b09dd61"
          effect_ids: []
          event_digests:
            - "sha256:f53b4c8152493fe7fa8017d7cda4b285fafa3daa2320f3d17613d25551cee9bd"
          mutation_id: "sha256:1c9c6442e598ce2afc8442fed5ed7b2cbee1fa299ae5afb6494443f84b7ee54b"
        sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4:
          after_revision: 3
          aggregate_digest: "sha256:4164471c4e2440981ad85966fd31ef52d56fbfda34c9829e7630e55d6cf249c3"
          before_revision: 2
          command_digest: "sha256:e135fcad6d643812de03215166b6b63ae239c0db5d66a7d1feed9672b33d6b63"
          effect_ids: []
          event_digests:
            - "sha256:92f9e27f66ede67fa96c1cf3bd7198a0daf4e20d5e558d01526094562023c89a"
          mutation_id: "sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4"
        sha256:a388cb62629dab4a072ec31dedae7acb06efea27105fc5036015d4ff76d177aa:
          after_revision: 15
          aggregate_digest: "sha256:4d8025c1eecbf946e4b3252c5b994b974aa2ce937d27afc4bf7452347da0c4a3"
          before_revision: 14
          command_digest: "sha256:c3d2ca52d8ed48b8066f680b192a10fecfbebb6a2824b2b741f01d328767d545"
          effect_ids: []
          event_digests:
            - "sha256:24f0b84346521470cf300f232e7072073c8ed78b85a89793850fd3dceb9bd893"
          mutation_id: "sha256:a388cb62629dab4a072ec31dedae7acb06efea27105fc5036015d4ff76d177aa"
        sha256:b3d9fa36921de9774ff6826e2b04d2cdd98d31dd08614208d9b33a17a5357d05:
          after_revision: 21
          aggregate_digest: "sha256:09b5035390c6e08f2117b5fa41679e5e3cfe392aa1293f9dfbe0d0caa3f06647"
          before_revision: 20
          command_digest: "sha256:2efc20b9de5303d45f052c42375c8226942015948a5fbb2e60a64f023f3c2ef7"
          effect_ids: []
          event_digests:
            - "sha256:bcb876115171b313711b5b161244f5968dd2c628ec229e0f8313493150b3c268"
          mutation_id: "sha256:b3d9fa36921de9774ff6826e2b04d2cdd98d31dd08614208d9b33a17a5357d05"
        sha256:def2a303abe46584a15f18aa715f57d9b689cac55f3a5c970d4d2bae26ca5bc2:
          after_revision: 7
          aggregate_digest: "sha256:b9c6cc4db643a21639539beb0e6d2a77098cf4a2397a080977bc6c516fb9b341"
          before_revision: 6
          command_digest: "sha256:f088bdf83d5f53a1469e3f345a8c0795e9074534ae2d95fe51eca9416c36c6da"
          effect_ids: []
          event_digests:
            - "sha256:c928260259c81d74eda0f3692f3772022b69751a812e255b45eb3c692d945cbe"
          mutation_id: "sha256:def2a303abe46584a15f18aa715f57d9b689cac55f3a5c970d4d2bae26ca5bc2"
        validation-resolution:sha256:1a9e8d29cee90bfbe9041a936f575ef0da6c7dfcb1c7426abfaa589ecf9c1603:
          after_revision: 11
          aggregate_digest: "sha256:556c76d1bea106ed52f7d01142b0fd4cc5436bb8b0a7df7b5a54dbc7813fe807"
          before_revision: 10
          command_digest: "sha256:6acfb6faf2756964d9100264ebcd32d15d6f6cbd59ffe9510702aada15c2eef4"
          effect_ids: []
          event_digests:
            - "sha256:6a902db634343a0d95cff98583340793b37796dad79b62b15f5cc98fb823d9d1"
          mutation_id: "validation-resolution:sha256:1a9e8d29cee90bfbe9041a936f575ef0da6c7dfcb1c7426abfaa589ecf9c1603"
        validation-resolution:sha256:7d68f93c0d1c81f329a4cb83495e7e090e92ba9c146da4b57f4ef43304acf74e:
          after_revision: 28
          aggregate_digest: "sha256:5e5b1109248b9ceaf79092eafd958f86085cc0754bb9ebe3cb1d23b2fb91c71e"
          before_revision: 27
          command_digest: "sha256:ceb00ff543434290013e440ea1808f7f51ab76aed5b84f60955bfc9aa1ca0548"
          effect_ids: []
          event_digests:
            - "sha256:066bbac4c06ed90a373c0eb7687713b50ad34dfc6702986cbaa2c1af6a4320e7"
          mutation_id: "validation-resolution:sha256:7d68f93c0d1c81f329a4cb83495e7e090e92ba9c146da4b57f4ef43304acf74e"
        validation:sha256:eca11cc91d0d16c6d6af1a6338f97249ca0dd445643dd339b2e0257a67fbad6c:
          after_revision: 27
          aggregate_digest: "sha256:9e133e012bd3cfc88685e6de9e01cf23f9c8c1aa910846ce8153a667b4c3a15a"
          before_revision: 26
          command_digest: "sha256:a2f9f3b405735b764e3ce79463f6eaedc800cd0849f5fec9ae46683276c812c1"
          effect_ids: []
          event_digests:
            - "sha256:b7444997ea89da93ccbdc5449c4a534beaddf9eba8bf616789f8ec51d0a62f75"
          mutation_id: "validation:sha256:eca11cc91d0d16c6d6af1a6338f97249ca0dd445643dd339b2e0257a67fbad6c"
        validation:sha256:eff99fd25eeb3cdd3311cf14f9006961f7b45945ba37b67dbf950bf0da6b61bf:
          after_revision: 10
          aggregate_digest: "sha256:35962defeb8fe0bf76322815fb28336bf6810508bc51afcc62a571d0239317a4"
          before_revision: 9
          command_digest: "sha256:2ac7056d8d5dde36088c8a8b38a6f0e7e3b01d75d5af92439ec8b93263ada58b"
          effect_ids: []
          event_digests:
            - "sha256:fe65f41fa1fa215ff3c825b7ea9adfc32f65f6de979ba07414e10d28cbaafae3"
          mutation_id: "validation:sha256:eff99fd25eeb3cdd3311cf14f9006961f7b45945ba37b67dbf950bf0da6b61bf"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:a6dbd76557dc9a2503c09c43a216d64eda2ed122a18ac7d66af7d4a031df2329"
          digest: "sha256:b5f121b6b0ac89c8057986e1390e9e17e07a21cd70aeeafa71bc23b095c4e418"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                  - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              expected_outputs:
                - "task-checkout-recovery-source-report"
              id: "bind-recovery-task-checkout"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:7aceccaf58fa436e0191a63b6f4e0a7ea14cb0b1030a8affc71c8f536e82f5ae"
          digest: "sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                  - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              expected_outputs:
                - "task-checkout-recovery-source-report"
              id: "bind-recovery-task-checkout"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:0217a3b580cbc39e59fe06b35a7079e533558f0609d893e38db8014c2af00e1b"
              depends_on:
                - "bind-recovery-task-checkout"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                  - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
              expected_outputs:
                - "final-correction-6ba8508e2d0e-evidence"
              id: "final-correction-6ba8508e2d0e"
              optional: false
              required_inputs: []
      revision: 30
      schema_version: 1
      state: "COMPLETED"
      work_items:
        bind-recovery-task-checkout:
          attempt: 1
          claim_id: "sha256:6766dc4aacc5274751a734c42d60988ce028f93613a6cebf4289bb4bda9f37b0"
          definition:
            contract_digest: "sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            expected_outputs:
              - "task-checkout-recovery-source-report"
            id: "bind-recovery-task-checkout"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:540d71b5f8b325ba8248b46d8dd3dada9ab008899e3fad0fcc5baa52e2a003dc"
              id: "task-checkout-recovery-source-report"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
              task_id: "202610150442-4S7ZSN"
              work_item_id: "bind-recovery-task-checkout"
          result_digest: "sha256:315e9b29e05068c94885f7cd79a4c50cca032cf93a57f2445dd70a3b7b49282c"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ad3f7dd3d51a043bcdb39564417f8c7cedfc28d5cf1d91a65bfadfecd9d6a325"
              - "sha256:56ed60a8acf091ba7e746bcf4b6109ae30ca1fba662b7c4f9db6ff10af2feb4c"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:44a965c8d34556090de725da5ed13f1c8621cc8d86db3dc9ee296973ef6d7b04"
              environment_digest: "sha256:9e57053e3da0feddf68d512caed1a91ed65503ec7482a123542cfd45d4d02c8b"
              implementation_identity: "sha256:315e9b29e05068c94885f7cd79a4c50cca032cf93a57f2445dd70a3b7b49282c"
              toolchain_digest: "sha256:2f712b2af6ddc91556f7a5c75a7a03b0c414ceecc1b75e2b5f792efe06112624"
            observed_at: "2026-10-15T06:22:59.428Z"
            status: "PASSED"
        final-correction-6ba8508e2d0e:
          attempt: 2
          claim_id: "sha256:0bb99ae62bfeea980663ab382300de9e7d67918d0cb69b086d214f989b95bf45"
          definition:
            contract_digest: "sha256:11cc2b0fcf9d4461cfb9c1ca7ec0ebdd3152eff01f9a2b204fad63abcfaf042e"
            depends_on:
              - "bind-recovery-task-checkout"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
            expected_outputs:
              - "final-correction-6ba8508e2d0e-evidence"
            id: "final-correction-6ba8508e2d0e"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:361e045b8a29f558bf64201d042367fb1c187010b4309e4687be803e16739767"
              id: "final-correction-6ba8508e2d0e-evidence"
              kind: "report"
              plan_revision: 3
              repository_fingerprint: "sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3"
              task_id: "202610150442-4S7ZSN"
              work_item_id: "final-correction-6ba8508e2d0e"
          result_digest: "sha256:e06b9a8e3ab330ff8c8a39e7df2e8a64084f68fae0212b721a0b6e1e5e8f4c2f"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:94735d395aeaf3e9f4661d071755a23326a4715827141aee64f2dc5d500dae3f"
              - "sha256:03f4eb09839d1233706f69d37615dd38b1ef08aa366339a544d1176392f7c0c0"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:11f9db9a3c2baadedc6971a4f0659dcac6b906ce7fb2109fd331a91eafa28d76"
              environment_digest: "sha256:3fc5b3fcb2b959e1f7eb347c43c75b40e02c5e8c9597435fbfbd05f5cea76e41"
              implementation_identity: "sha256:e06b9a8e3ab330ff8c8a39e7df2e8a64084f68fae0212b721a0b6e1e5e8f4c2f"
              toolchain_digest: "sha256:be6f0d15c7084a544d099f702c9df0723069b29539e4408f636bd9dacec11244"
            observed_at: "2026-10-15T08:17:56.550Z"
            status: "PASSED"
    digest: "sha256:c2769a959011d430ad249ebed39104baa04744382195703c1bbd84ab1fdddeab"
    documents:
      contracts:
        sha256:0217a3b580cbc39e59fe06b35a7079e533558f0609d893e38db8014c2af00e1b:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:6ba8508e2d0eaed94fbca11dd24d790e576f812f25cbd4067f13aa97a86f371c. Read /Users/densmirnov/Github/agentplane-issue6152-source-primary-20261015/.git/agentplane/kernel/exchanges/202610150442-4S7ZSN/a4e03423849a06a4a90210f057762a360f78bf5342d6bacc8ac9e2ca0ed6d978/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            - "bun run typecheck"
        sha256:11cc2b0fcf9d4461cfb9c1ca7ec0ebdd3152eff01f9a2b204fad63abcfaf042e:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
            - "Use the existing repository Zod4 strictObject/looseObject convention for only the twelve equivalent object-schema wrappers in external-agent-workflow-recovery.ts (five strict, seven passthrough). Keep all field validators, refinements, optionality, strict/passthrough behavior and every ownership/lease/ESRCH/lock/CAS/history/provider guard unchanged. No new module, line-limit exception, compressed statements or control-flow refactor. Measure formatter and the existing hotspot check; production module must be at most600 lines."
            - "Reuse only the already accepted eleven-line AP6154 process-supervision.test.ts readiness delta from commit29757addd936732c6deb10eea11a89c22147a214, file SHA d56c9e841308f1f951342252a4f489405f1a5d1c993dfc51e3fe9f5b324fba3b. The wall-clock fixture must write its readiness sentinel after installing its SIGTERM handler and await it via the existing artifact-boundary callback before recording process start. Retain the120ms timeout, zero grace and all timeout/force-kill assertions; do not modify production timeout behavior or duplicate another readiness fix."
            - "The only added scope path is packages/agentplane/src/runner/process-supervision.test.ts. Preserve both existing recovery-source paths and all original completed WorkItem definitions, runtime, outputs, source/EVAL and prior failed FINAL history. Run the registered nearest recovery test, process-supervision file and typecheck. Keep mandatory independent FINAL full regression; no waiver, live recovery, provider write or delivery claim."
          objective: "Repair only the two observed FINAL failures in evidence sha256:6ba8508e2d0eaed94fbca11dd24d790e576f812f25cbd4067f13aa97a86f371c: the recovery module hotspot size and the inherited process-supervision wall-clock fixture readiness gap. Preserve the accepted trusted Task-checkout implementation, completed WorkItem and all failed/source/EVAL evidence. Do not apply live integration recovery or provider effects."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            - "bun run test:project agentplane packages/agentplane/src/runner/process-supervision.test.ts"
            - "bun run typecheck"
        sha256:ba5c422f9f529a388384b19a64cdad12368697e42d265add0264ca01d1135021:
          acceptance_criteria:
            - "The original snapshot with repository_root equal to the genuine resolved Task checkout W passes identity validation when the exact integration queue is owned by base P, for supported invocation from either P or W. Resolve and revalidate W through existing trusted Task/workspace context; never derive trusted ownership solely from the untrusted receipt or original snapshot string."
            - "Reject a third unrelated root, mismatched or missing native task-worktree resolution, a snapshot naming another Task checkout, and Task/workspace ownership drift between initial and locked/final revalidation. Keep resolution.repository_root strictly equal to the authoritative queue/base P. Do not add broad root allowlists or arbitrary fallbacks."
            - "Preserve exact canonical COMPLETED Task identity/digest and accepted Plan/WorkItems/outputs/final validation, original operation snapshot/key/payload/authority/effect/preFP/start and full historical operations. Preserve current route and journal CAS, exact provider/project/PR/branch/head/base and full queue claim checks. Never downgrade a Task or manufacture implementation_rework."
            - "Preserve explicit operator-supplied receipt trust boundary and all existing receipt completeness, unique argv/time/root process/whole owned_history, same-host, expired lease and ESRCH-only liveness gates. Live, reused, EPERM, unknown or omitted worker identities remain rejected; expiry or a stopped assertion alone never proves an abandoned claim."
            - "Preserve both native locks, journal outcome CAS before exact queue release, post-CAS persistence failure behavior and idempotent bookkeeping-only continuation. No successor worker, merge, push, provider write, cleanup or automatic retry follows reconciliation. Legacy/applied recovery behavior and verification floors stay unchanged."
            - "Extend only the existing roadmap-common-recovery.test.ts with a real distinct P/W positive path for both supported invocations, unrelated-third-root and mismatched/missing resolved-checkout negatives. Preserve every existing assertion, failure injection and ordering test. Use existing test primitives, with no new module, wrapper, schema, dependency or test harness."
            - "Modify only the two authorized existing paths, preserving published parent53d9 and all source4/Task13/evidence, frozen C9/shared dependencies and Task35/PR6154/HANDOFF/claim artifacts. Do not change advance.command.ts unless a genuine supported scope expansion is approved first."
            - "Run the registered focused test command and typecheck, retain exact actual results/closure and stop at ROOT source review before native source intake. Required native SOURCE checks, distinct EVAL and mandatory independent FINAL full regression remain unchanged; FULL waits for the serialized ROOT heavy lane. No source-only delivery, verification waiver or live recovery claim."
          objective: "Fix only the repeated original snapshot root check in completed canonical integration recovery. Resolve the genuine Task worktree checkout W through existing native workspace ownership, while retaining resolution/queue ownership at base P. Support invocation from the genuine P or W through the existing authoritative controller route. Add the nearest existing regression cases and return the exact minimal source diff and focused evidence for ROOT review before source intake. Do not operate on the live queue or provider."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts"
            - "bun run typecheck"
      intent:
        context: "Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects."
        objective: "Bind canonical integration recovery to the resolved task checkout"
    events:
      -
        command_digest: "sha256:e7f5a638c060f75209e2b47d35751f902d47d78ba4b77bd2dcdfb33c89546296"
        id: "capture:202610150442-4S7ZSN:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610150442-4S7ZSN"
        occurred_at: "2026-10-15T04:42:08.565Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610150442-4S7ZSN"
        task_revision: 1
      -
        command_digest: "sha256:f0c81a377e6da0029be61a28e83d4cfc489c8d54d2484054b72c8f6c207e2d1b"
        id: "result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:e67dd09555dff7ec87f712f1eb2b56675f13f2d09d0365eedfeae5d73ae8b015"
        occurred_at: "2026-10-15T04:49:22.888Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610150442-4S7ZSN"
        task_revision: 2
      -
        command_digest: "sha256:e135fcad6d643812de03215166b6b63ae239c0db5d66a7d1feed9672b33d6b63"
        id: "sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8e11fc71fdcf3938a1de302eca6dd988583972b452acb2bc632323429467c8b4"
        occurred_at: "2026-10-15T04:49:25.287Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610150442-4S7ZSN"
        task_revision: 3
      -
        command_digest: "sha256:abc7d899f6a9b3e0f7a0a1bd2a3ac7539001fbf3fe4ac950ace0855b57d418ca"
        id: "kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ce225bfb1903d27fbcf299e70e38f0addd202a93281bdff4f64f048417c45342:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T04:49:28.404Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610150442-4S7ZSN"
        task_revision: 4
      -
        command_digest: "sha256:c980f335794cd70c111af0148d2a4d36f6bbd9d1aeaeefbd142f8b8fedf3272e"
        id: "kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6f2c7aa00d156fb78f26ccc4b71b7aedd4fe7fc729da3a7dc3259c0002889d6a:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T04:49:31.892Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610150442-4S7ZSN"
        task_revision: 5
      -
        command_digest: "sha256:48db0e9d0cbade0ed156c4362ded33022ee7fa4413c63f37fefed068b964a8c0"
        id: "kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:00633ade1fd46ace7db7a4c557e058d6d3d8d12fd7c8a007b6142b8b4fa9b9d8:sha256:cff17ae18a38683579d9260bfc400f0db44cb3d14083fbcf663e8262403dd432"
        occurred_at: "2026-10-15T05:19:24.938Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610150442-4S7ZSN"
        task_revision: 6
      -
        command_digest: "sha256:f088bdf83d5f53a1469e3f345a8c0795e9074534ae2d95fe51eca9416c36c6da"
        id: "sha256:def2a303abe46584a15f18aa715f57d9b689cac55f3a5c970d4d2bae26ca5bc2:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:def2a303abe46584a15f18aa715f57d9b689cac55f3a5c970d4d2bae26ca5bc2"
        occurred_at: "2026-10-15T06:03:46.004Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610150442-4S7ZSN"
        task_revision: 7
      -
        command_digest: "sha256:2c1a038ec4ee1c2257490c83ba5325598ba3a9be9c98e8e358e1c88d50b56d94"
        id: "result:sha256:2bed3566c0ba9d3da4b674d7b4705eb765b3daf459d79766f11e7ce6651b88b1:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:2bed3566c0ba9d3da4b674d7b4705eb765b3daf459d79766f11e7ce6651b88b1"
        occurred_at: "2026-10-15T06:03:57.924Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610150442-4S7ZSN"
        task_revision: 8
      -
        command_digest: "sha256:5f93f4222c39e44c73e9452250bb2bec0676b9cd97265ef1b2af10d2c7caee62"
        id: "kernel_work_item_inspection_required:sha256:c02821c5b6e955357bc248a7a324292c1c93cc941599c2d5f5ed9f9adba2346f:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c02821c5b6e955357bc248a7a324292c1c93cc941599c2d5f5ed9f9adba2346f:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        occurred_at: "2026-10-15T06:04:07.453Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610150442-4S7ZSN"
        task_revision: 9
      -
        command_digest: "sha256:2ac7056d8d5dde36088c8a8b38a6f0e7e3b01d75d5af92439ec8b93263ada58b"
        id: "validation:sha256:eff99fd25eeb3cdd3311cf14f9006961f7b45945ba37b67dbf950bf0da6b61bf:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:eff99fd25eeb3cdd3311cf14f9006961f7b45945ba37b67dbf950bf0da6b61bf"
        occurred_at: "2026-10-15T06:23:02.547Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610150442-4S7ZSN"
        task_revision: 10
      -
        command_digest: "sha256:6acfb6faf2756964d9100264ebcd32d15d6f6cbd59ffe9510702aada15c2eef4"
        id: "validation-resolution:sha256:1a9e8d29cee90bfbe9041a936f575ef0da6c7dfcb1c7426abfaa589ecf9c1603:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1a9e8d29cee90bfbe9041a936f575ef0da6c7dfcb1c7426abfaa589ecf9c1603"
        occurred_at: "2026-10-15T06:23:04.525Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610150442-4S7ZSN"
        task_revision: 11
      -
        command_digest: "sha256:50ea1eff01d0afddc1fc770c49f915fc18d7a9ae2fc975b059c96c33544d972b"
        id: "final-validation:sha256:74193222cc24dc7e33ae14ee8d8da4bf0fcf31206e65bc7f134a98a50ed5c059:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:74193222cc24dc7e33ae14ee8d8da4bf0fcf31206e65bc7f134a98a50ed5c059:11"
        occurred_at: "2026-10-15T06:23:28.600Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610150442-4S7ZSN"
        task_revision: 12
      -
        command_digest: "sha256:ae1ba97783c8312f8667f73b879777abde3f156d10a1a866d32a3660eb54cc8e"
        id: "final-validation:sha256:6ba8508e2d0eaed94fbca11dd24d790e576f812f25cbd4067f13aa97a86f371c:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:6ba8508e2d0eaed94fbca11dd24d790e576f812f25cbd4067f13aa97a86f371c:12"
        occurred_at: "2026-10-15T07:10:46.538Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610150442-4S7ZSN"
        task_revision: 13
      -
        command_digest: "sha256:3d5c25639fd7e9bb3506e98f44aee46040bdb54f375242474e1390b160c575bd"
        id: "amend:sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:6e95f94b56e22f7058feff12a61e3dc8344880fe56b830188724e2c341624fc8"
        occurred_at: "2026-10-15T07:28:33.254Z"
        payload_digest: "sha256:8259797ac66bbc7897af7c4e6e9f86676edc7bf205c24d23dfaa65c59ade7a4d"
        task_id: "202610150442-4S7ZSN"
        task_revision: 14
      -
        command_digest: "sha256:c3d2ca52d8ed48b8066f680b192a10fecfbebb6a2824b2b741f01d328767d545"
        id: "sha256:a388cb62629dab4a072ec31dedae7acb06efea27105fc5036015d4ff76d177aa:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a388cb62629dab4a072ec31dedae7acb06efea27105fc5036015d4ff76d177aa"
        occurred_at: "2026-10-15T07:28:37.588Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202610150442-4S7ZSN"
        task_revision: 15
      -
        command_digest: "sha256:868fd6c3b49fbc070efa45968fefaf8f47685d82837a6a08c94a3508c9edf318"
        id: "kernel_work_item_claim_required:sha256:3331affc39367fd264ad5d7ce07e3a7f2efc9d8d8ce4bf428d9b0bab2ebf6a24:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3331affc39367fd264ad5d7ce07e3a7f2efc9d8d8ce4bf428d9b0bab2ebf6a24:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        occurred_at: "2026-10-15T07:33:33.609Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610150442-4S7ZSN"
        task_revision: 16
      -
        command_digest: "sha256:27f7084198cfc4f1289a871dc16693f0d730cb2caf68c25eb7d5554cf5a308b5"
        id: "kernel_work_item_execution_required:sha256:789db43af75bc8e8191a8e37cca7abaf0c931482ef57448a842bc7ddf8562192:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:789db43af75bc8e8191a8e37cca7abaf0c931482ef57448a842bc7ddf8562192:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        occurred_at: "2026-10-15T07:33:40.961Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610150442-4S7ZSN"
        task_revision: 17
      -
        command_digest: "sha256:2d5cd04a371c1e1fa506975be8bba3cd882d3999b8eaf67c80ad2e33ecf84a25"
        id: "semantic-stop:sha256:a2516c451583364a02e1ed5f8d197efea322a28c62ec26d459728c978759f865:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:a2516c451583364a02e1ed5f8d197efea322a28c62ec26d459728c978759f865"
        occurred_at: "2026-10-15T07:38:30.575Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610150442-4S7ZSN"
        task_revision: 18
      -
        command_digest: "sha256:c0ba4becf4f30dfaed8e1935fa4261f40cacf39cb1dbdc596b0f5af18ebdd90d"
        id: "scope-request:sha256:e9e69c869f0c93c7b3a8475926ad7487e1e875711beb7f94825a9f8c5c46d3b4:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:e9e69c869f0c93c7b3a8475926ad7487e1e875711beb7f94825a9f8c5c46d3b4"
        occurred_at: "2026-10-15T07:48:34.251Z"
        payload_digest: "sha256:99a28d2777fe0b3adab975eaf34048db07db20f1e576c39c1652b9a4898300e0"
        task_id: "202610150442-4S7ZSN"
        task_revision: 19
      -
        command_digest: "sha256:1c5d644614b7b8bdda45314ea35832171a2babbac8cfb894bcf3625abc73362d"
        id: "plan:sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669"
        occurred_at: "2026-10-15T07:53:14.493Z"
        payload_digest: "sha256:63b6f48b6f555ba4319e12bace832471f083500c14fe23eb0a42ee2410a0f09c"
        task_id: "202610150442-4S7ZSN"
        task_revision: 20
      -
        command_digest: "sha256:2efc20b9de5303d45f052c42375c8226942015948a5fbb2e60a64f023f3c2ef7"
        id: "sha256:b3d9fa36921de9774ff6826e2b04d2cdd98d31dd08614208d9b33a17a5357d05:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b3d9fa36921de9774ff6826e2b04d2cdd98d31dd08614208d9b33a17a5357d05"
        occurred_at: "2026-10-15T07:53:26.294Z"
        payload_digest: "sha256:5821341be84df88cdcd95e976891f1d07d3dfcc47fd991fb9f0d45c118348e7e"
        task_id: "202610150442-4S7ZSN"
        task_revision: 21
      -
        command_digest: "sha256:3f26bafb0feb186a522e0b10ec40cb18c80983431a0f3042d828014bb2983185"
        id: "kernel_work_item_claim_required:sha256:5b67851d9fa528bca3746d995c06c0e44c351e7f30a1ebd04fde74e902a93522:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5b67851d9fa528bca3746d995c06c0e44c351e7f30a1ebd04fde74e902a93522:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        occurred_at: "2026-10-15T07:53:40.814Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610150442-4S7ZSN"
        task_revision: 22
      -
        command_digest: "sha256:a4ef106a951202877931f61f0129c2e8b91eac33542aa77002b7bb3d7828c09f"
        id: "kernel_work_item_execution_required:sha256:d6ea9a70728406204cd453640c9c2e166cefa7145173245d8a0411b3f65dde5b:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d6ea9a70728406204cd453640c9c2e166cefa7145173245d8a0411b3f65dde5b:sha256:4f1a885c24bf3f28a111b60d42fb9ee3e66c39301c9062041884b8d8958246b0"
        occurred_at: "2026-10-15T07:53:45.590Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610150442-4S7ZSN"
        task_revision: 23
      -
        command_digest: "sha256:a5a1684e9e4b81cad2b8470109c320672a9f1e8a616e4402fe3af9476b09dd61"
        id: "sha256:1c9c6442e598ce2afc8442fed5ed7b2cbee1fa299ae5afb6494443f84b7ee54b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1c9c6442e598ce2afc8442fed5ed7b2cbee1fa299ae5afb6494443f84b7ee54b"
        occurred_at: "2026-10-15T08:06:56.142Z"
        payload_digest: "sha256:dca1098603ce6f943770c1c0e5fb8c5d89e1d0e9fd4c1961e5bdce8dcece254d"
        task_id: "202610150442-4S7ZSN"
        task_revision: 24
      -
        command_digest: "sha256:b2cdde8f3a14ad22efb07165e05bf9f78ce29e254d1b8f24879d546f0ba4ba2c"
        id: "result:sha256:d831f90b0700e35651643c1fe80b342042689ddc5bfe69d8b42b27079e291567:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:d831f90b0700e35651643c1fe80b342042689ddc5bfe69d8b42b27079e291567"
        occurred_at: "2026-10-15T08:07:01.586Z"
        payload_digest: "sha256:1298c91fe9ff5eece3f1c7b6c378c60c1f090d34bd13611ed755d43deea0fd1c"
        task_id: "202610150442-4S7ZSN"
        task_revision: 25
      -
        command_digest: "sha256:036f95839f25c6cca46c7fd6105d7c8b46a1765936539875ace1c1cd09604471"
        id: "kernel_work_item_inspection_required:sha256:7fa665b5922108fb2eda955a201f4fbf90e5bdcda5a4a81cb648b2757451e253:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:7fa665b5922108fb2eda955a201f4fbf90e5bdcda5a4a81cb648b2757451e253:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3"
        occurred_at: "2026-10-15T08:07:06.350Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610150442-4S7ZSN"
        task_revision: 26
      -
        command_digest: "sha256:a2f9f3b405735b764e3ce79463f6eaedc800cd0849f5fec9ae46683276c812c1"
        id: "validation:sha256:eca11cc91d0d16c6d6af1a6338f97249ca0dd445643dd339b2e0257a67fbad6c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:eca11cc91d0d16c6d6af1a6338f97249ca0dd445643dd339b2e0257a67fbad6c"
        occurred_at: "2026-10-15T08:18:00.792Z"
        payload_digest: "sha256:666b11d7134363d8110da06d5a50eb65c044c01c2086a8c4529e987b20956149"
        task_id: "202610150442-4S7ZSN"
        task_revision: 27
      -
        command_digest: "sha256:ceb00ff543434290013e440ea1808f7f51ab76aed5b84f60955bfc9aa1ca0548"
        id: "validation-resolution:sha256:7d68f93c0d1c81f329a4cb83495e7e090e92ba9c146da4b57f4ef43304acf74e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7d68f93c0d1c81f329a4cb83495e7e090e92ba9c146da4b57f4ef43304acf74e"
        occurred_at: "2026-10-15T08:18:03.811Z"
        payload_digest: "sha256:23532dbce000d1f0f79e31749079afe2ef833ccc76bde8a0b5d96138f25c1d3e"
        task_id: "202610150442-4S7ZSN"
        task_revision: 28
      -
        command_digest: "sha256:feb4010f7331384a67ab855577134ef906d84ccfbb3d7d50ee09ff8a1f5153fd"
        id: "final-validation:sha256:0481847f7db732aeb8cd5cca31a18ad40e71003d6715af8fbe491cab00d85a9b:28:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:0481847f7db732aeb8cd5cca31a18ad40e71003d6715af8fbe491cab00d85a9b:28"
        occurred_at: "2026-10-15T08:38:49.614Z"
        payload_digest: "sha256:e0d821c69bbed42d7a9c5eda916a909864767cc217a8d0cb6c5e591bfd724218"
        task_id: "202610150442-4S7ZSN"
        task_revision: 29
      -
        command_digest: "sha256:5945c87d5afbef7064cd7ad9b461b0e5f0f23f0fcf7742f094c268cc77a27b93"
        id: "kernel_task_completion_required:sha256:8b787b2b8902f60bcbb9d12f4003a972554591be81286c2c44afe2dfe8c96a03:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:8b787b2b8902f60bcbb9d12f4003a972554591be81286c2c44afe2dfe8c96a03:sha256:221e57736c31268e46248c5010621e8a52f4e8473f8e778b824e7d19b065f4b3"
        occurred_at: "2026-10-15T08:47:33.115Z"
        payload_digest: "sha256:bd51aca2aaec35fbd354d916a181b5ab795281cb54c18cd991e63743a926a611"
        task_id: "202610150442-4S7ZSN"
        task_revision: 30
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind canonical integration recovery to the resolved task checkout

Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.

## Scope

- In scope: Correct the published PR6153 guard for a completed canonical Task whose original integration snapshot names its resolved task checkout W while the exact claimed queue belongs to base P. Resolve W from existing task/workspace ownership and reject any third root. Preserve exact Task, repository, claim/head/base/CAS, PID, expired lease and explicit operator evidence boundaries. Modify only the recovery module and nearest existing test. SOURCE runs focused recovery tests and typecheck; mandatory independent FINAL retains stock full regression. Dependency: completed Task202610142302-3PJHSP published commit53d9. No live recovery, no Task35/PR6154/HANDOFF effects.
- Out of scope: unrelated refactors not required for "Bind canonical integration recovery to the resolved task checkout".

## Plan

1. Execute approved WorkItem bind-recovery-task-checkout.
2. Execute approved WorkItem final-correction-6ba8508e2d0e.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-15T08:38:51.738Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:36a561f31dfe49651ed56c2e3c54c596489405f4bcdd5272d71f3213dd840934, input_digest=sha256:f15223ee856c40af699170d456d3eb8111613161be7b406490701f11cb43b8be

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/runner/process-supervision.test.ts
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/runner/process-supervision.test.ts
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/task/roadmap-common-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/runner/process-supervision.test.ts
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610150442-4S7ZSN/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610150442-4S7ZSN Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:7487bf2b6a968a70332788c3d01fb30e861f03fdad648b1917ae9bcbc4413669
- policy_digest: sha256:b0f3ed8717357e14968093aaf83e3059ba55a248477be0e758cb9ae571d6f7ac
- capability_digest: sha256:17e87866a746b818d676b9969943ddf029d9f678c00cb060b36eb5a00a39625a
- checks_digest: sha256:6e77c287fc601a725fb3ec5f7e4fe02076ef52beae84b5695d5977b913220428
- identity_digest: sha256:fa069d6b232b4dc96c5026288ad086a7a98e7266acf08e91e57f44a09ec5d06f

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610150442-4S7ZSN
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
