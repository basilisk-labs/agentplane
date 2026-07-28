---
id: "202607221850-R7WS01"
title: "Return typed runner lifecycle results"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 33
origin:
  system: "manual"
depends_on:
  - "202607221846-Y89CFB"
  - "202607221848-VC4VVS"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607242158-QV09NA"
tags:
  - "milestone-beta1"
  - "refactor"
  - "rf-25"
  - "runner"
  - "use-case"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T01:55:33.967Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T02:54:35.229Z"
  updated_by: "TESTER"
  note: "PASS (hosted rework): split execution contracts keeps task-run below the hotspot threshold and replaces unsafe Hermes matcher assignments with typed assertions."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T02:55:18.124Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "8cd703b66e4c14daae26b244f551e705068e178d"
  blueprint_digest: "97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328"
  evidence_refs:
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221850-R7WS01/README.md"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221850-R7WS01/quality/20260728-025517959-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No blocking finding: task-run execution contracts are isolated in a dedicated type module; Hermes checks concrete typed values rather than assigning matcher any values."
commit:
  hash: "fb7da2d8aac146ef830003f4b2ab20e220f5c2d2"
  message: "🛡️ R7WS01 task: authorize fresh format closure"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: 3f11077e5. Typed lifecycle result, renderers, Hermes in-process projection, and effect identity coverage are ready for TESTER verification."
  -
    author: "CODER"
    body: "Rework committed: e7465b737. Hermes now uses the shared typed lifecycle exit mapping when active-claim cleanup fails; regression coverage added."
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
    at: "2026-07-28T01:55:50.050Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-28T02:22:27.906Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 3f11077e5. Typed lifecycle result, renderers, Hermes in-process projection, and effect identity coverage are ready for TESTER verification."
  -
    type: "verify"
    at: "2026-07-28T02:26:16.727Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: typed runner lifecycle results stay in-process through task CLI and Hermes; human and JSON renderers preserve effect authority, observed evidence, claim generation, and operator-resolution provenance."
  -
    type: "status"
    at: "2026-07-28T02:29:32.508Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework committed: e7465b737. Hermes now uses the shared typed lifecycle exit mapping when active-claim cleanup fails; regression coverage added."
  -
    type: "status"
    at: "2026-07-28T02:30:28.612Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T02:36:22.966Z"
    author: "TESTER"
    state: "ok"
    note: "PASS (rework reverified): Hermes now uses the shared typed lifecycle exit mapping, including nonzero failure for incomplete active-claim cleanup."
  -
    type: "status"
    at: "2026-07-28T02:37:57.845Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T02:43:38.519Z"
    author: "TESTER"
    state: "ok"
    note: "PASS (format reverified): typed lifecycle paths now pass repository Prettier format check as well as runner, renderer, and Hermes regression checks."
  -
    type: "status"
    at: "2026-07-28T02:46:10.968Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T02:54:35.229Z"
    author: "TESTER"
    state: "ok"
    note: "PASS (hosted rework): split execution contracts keeps task-run below the hotspot threshold and replaces unsafe Hermes matcher assignments with typed assertions."
doc_version: 3
doc_updated_at: "2026-07-28T02:54:35.937Z"
doc_updated_by: "CODER"
description: "RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing."
sections:
  Summary: |-
    Return typed runner lifecycle results

    RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.
  Scope: |-
    - In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
    - Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
    - An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
    - Out of scope: automating the complete direct route, delivered by the next task.
  Plan: |-
    1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
    2. Separate rendering/exit mapping from use-case logic.
    3. Call runner phases in-process from the supervisor.
    4. Map durable journal/resolution input to typed `effect_in_doubt`, `applied` and `not_applied` outcomes with resolution provenance, and reject any generic retry path for unresolved effects.
    5. Preserve documented human and JSON output through compatibility renderers without dropping resolution provenance.
    6. Add result/renderer parity, adapter error, cancellation, timeout, stale-work-order and effect-resolution transition tests.
  Verify Steps: |-
    1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
    2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
    3. Feed durable journal states for `effect_in_doubt`, operator-resolved `applied` and operator-resolved `not_applied` into each runner/supervisor entry point. Expected: typed results and both renderers preserve the state, operator-supplied resolution provenance, evidence/authority digests and claim generation without stdout parsing.
    4. Invoke generic retry, replay, resume and restart against unresolved `effect_in_doubt`. Expected: every path returns the typed blocked outcome, performs no adapter invocation and directs callers only to the explicit operator-resolution protocol; no generic retry can reinterpret the effect as `not_applied`.
    5. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
    6. Run runner/supervisor/lifecycle tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T02:26:16.727Z — VERIFY — ok

    By: TESTER

    Note: PASS: typed runner lifecycle results stay in-process through task CLI and Hermes; human and JSON renderers preserve effect authority, observed evidence, claim generation, and operator-resolution provenance.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:22:27.906Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
    - old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-R7WS01

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221850-R7WS01
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T02:36:22.966Z — VERIFY — ok

    By: TESTER

    Note: PASS (rework reverified): Hermes now uses the shared typed lifecycle exit mapping, including nonzero failure for incomplete active-claim cleanup.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:30:28.613Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
    - old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-R7WS01

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607221850-R7WS01 --remote --explain
    - diagnostic_command: agentplane task next-action 202607221850-R7WS01 --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T02:43:38.519Z — VERIFY — ok

    By: TESTER

    Note: PASS (format reverified): typed lifecycle paths now pass repository Prettier format check as well as runner, renderer, and Hermes regression checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:37:57.846Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
    - old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-R7WS01

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T02:54:35.229Z — VERIFY — ok

    By: TESTER

    Note: PASS (hosted rework): split execution contracts keeps task-run below the hotspot threshold and replaces unsafe Hermes matcher assignments with typed assertions.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:46:10.968Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
    - old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-R7WS01

    DecisionContextRef:
    - operator_action: provider_action
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
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Preserve `effect_in_doubt`, `applied` and `not_applied` states plus resolution provenance in any compatibility boundary; do not restore a generic retry path for unresolved effects.
    - Restore the previous compatibility path only when it cannot bypass the explicit operator-resolution protocol or invoke the adapter for unresolved `effect_in_doubt`.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: |-
    - Observation: Focused runner/supervisor/lifecycle suite passed; critical-cli passed 11/11 files (72 tests) in canonical Node mode; lifecycle invariants, typecheck, lint, and routing checks passed.
      Impact: No stdout parsing or generic replay path was reintroduced for effect_in_doubt.
      Resolution: Approve branch for PR update and hosted validation.

    - Observation: Hermes lifecycle, renderer, and effect-resolution tests passed; typecheck, lint, and lifecycle invariants passed on e7465b737.
      Impact: Hosted verify-contract evidence now covers the rework commit rather than the superseded implementation head.
      Resolution: Refresh PR head and rerun hosted validation.

    - Observation: format:check, targeted Hermes/renderer/effect-resolution tests, typecheck, lint, and lifecycle invariants passed on 96ff9bab8.
      Impact: Hosted verify-contract now records evidence for the formatted implementation head.
      Resolution: Refresh evaluator review and pre-merge closure.

    - Observation: format, typecheck, lint:core, hotspots:check, lifecycle invariants, and the runner/Hermes/CLI rework test set passed on 8cd703b66.
      Impact: The hosted contract and static-analysis failures are addressed without changing runner lifecycle behavior.
      Resolution: Refresh evaluator quality review and publish the verified rework head.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T01:56:04.216Z"
        authorityDigest: "sha256:1a9163585644b8044fd2623ebaae04eaa5ff72007319049788e911b2d0a8c050"
        digest: "sha256:bb166118ccb9d0ee8a50c75fcf8950df306b9378527648dc7a9c5e66e2c16206"
        operationDigest: "sha256:926afbf65c3bb7e5beecf6a240900f188305b43ba476802772444569bc54f1fd"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:62937b83576dd303313dfc83af04e7e3d0efff9106778d0bff0de00fcea2cf6f"
      -
        actor: "USER"
        at: "2026-07-28T02:30:15.445Z"
        authorityDigest: "sha256:159cf8da0a1adfd479ed1c9fe769214d27e092f038a4ebb0455db5994c8dfa05"
        digest: "sha256:72385c150011fff45819893bd41e87d865ca9439a9d4272dc184a55b0978d928"
        operationDigest: "sha256:7fd8c7ae1909c2269ce1bf5711b983199426325c913ac6c206ee455fc48e748f"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:bb166118ccb9d0ee8a50c75fcf8950df306b9378527648dc7a9c5e66e2c16206"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:3378a88965fa1fd31b000cfb7e1e4ee9d5264bfde20221f0605a8e190524a16d"
      -
        actor: "USER"
        at: "2026-07-28T02:30:41.699Z"
        authorityDigest: "sha256:f9e2e15cbe93e26bbe1e8de6816f3e2d7d78aaff7e8c81c87b7fb1c87ce62fa4"
        digest: "sha256:1ccdb12945a851cbd47607537b1b3728e8dba2184cc34404e7a8583d4e889681"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:72385c150011fff45819893bd41e87d865ca9439a9d4272dc184a55b0978d928"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:31b171b621f24bd5682574df9e0f0c8b7011bb6ae5a1df912487733c7db26abc"
      -
        actor: "USER"
        at: "2026-07-28T02:31:15.314Z"
        authorityDigest: "sha256:3e64206364bb916cc05dc02dfb01ccaaa8863a032ba864bf0d5342151304e6c3"
        digest: "sha256:88a0f5fcba9da843f5b38907f03a7634aa09524fe6e5409f329b5dc1489a77e9"
        operationDigest: "sha256:f2ca459bfd8a7bc3ceee075226c85474f5e4162624efe65ac900b59d3e4127d5"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:1ccdb12945a851cbd47607537b1b3728e8dba2184cc34404e7a8583d4e889681"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:08c8b5995be029db1b7589267debfdeb7586ca2cea7aaabdd2a3cb7378ba186f"
      -
        actor: "USER"
        at: "2026-07-28T02:32:12.127Z"
        authorityDigest: "sha256:44a86fab87de67f48c6ecbddc339d9aa2fb97bfc5fc935578154035e9658198e"
        digest: "sha256:ade0d5c4c0d0535f130b08ac036404a22d3cebf7dea5de1b833db746b1779e37"
        operationDigest: "sha256:092a8cec160474308bde6f0a7fc1b0baf84ea8497b53c42e267d6e73307dba55"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:88a0f5fcba9da843f5b38907f03a7634aa09524fe6e5409f329b5dc1489a77e9"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:f8ed7f6a1642f121b030666cf790bc2c5916dc36ffff86d5dac1331125870f2d"
      -
        actor: "USER"
        at: "2026-07-28T02:36:59.462Z"
        authorityDigest: "sha256:28a45e5cc9a5736da81c0a43b7b772e0e402ff1a68408b8c87956cf907ef6bda"
        digest: "sha256:3c2226dc25ce8a63c4201f931e383576964108667b7532288a1e04d1ad9e7660"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:ade0d5c4c0d0535f130b08ac036404a22d3cebf7dea5de1b833db746b1779e37"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:468574a137bee1db39c200c3e1a29461b1badc261a26eb0a01e0acbcd6505e08"
      -
        actor: "USER"
        at: "2026-07-28T02:37:22.167Z"
        authorityDigest: "sha256:3e082db9f215947aa7c4f7cd824922c883d200ee6dbdf28f4641280c84c60048"
        digest: "sha256:b58ca429ed6f8399cf88fc6a6ecd49fb00e3511e031870d38bd92ba2f15e01d2"
        operationDigest: "sha256:d16a60500f5a0f56136ac778c6081895f77d3d54576676f28949ed7aebedb9f3"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:3c2226dc25ce8a63c4201f931e383576964108667b7532288a1e04d1ad9e7660"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:23ca034da05724478f1f5e1ccecde49327120d00f0e1bde20df569fcbef022e8"
      -
        actor: "USER"
        at: "2026-07-28T02:38:19.544Z"
        authorityDigest: "sha256:f830d0f2ad0b1d871b6b53fe7b928b77d6b8f292130e28f7fb861b186b1dfd7b"
        digest: "sha256:95f84b541b9c41972c26d86ff8aab0f7d91071d4fde95971c95c1476bfce52aa"
        operationDigest: "sha256:f2ca459bfd8a7bc3ceee075226c85474f5e4162624efe65ac900b59d3e4127d5"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:b58ca429ed6f8399cf88fc6a6ecd49fb00e3511e031870d38bd92ba2f15e01d2"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:d8864fbc1d1bd9e8e8d164b21a4c193f3fd7b78a9309f857023b6f4b9f06bd3e"
      -
        actor: "USER"
        at: "2026-07-28T02:45:19.435Z"
        authorityDigest: "sha256:5f6b9be533402713e216037b102052cadfabfcc40bf2e8e14c05fa6e122144b9"
        digest: "sha256:8baa4d575d547b43208834eb1d62809b050907da24aa4421f3b0eef244d9eb16"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:95f84b541b9c41972c26d86ff8aab0f7d91071d4fde95971c95c1476bfce52aa"
        schemaVersion: 1
        sequence: 9
        stateFingerprintDigest: "sha256:405d4401b565e725e8ff7e29963dae10a487ccb827c2d92b5347b9bcf7687396"
      -
        actor: "USER"
        at: "2026-07-28T02:45:52.339Z"
        authorityDigest: "sha256:eb37c486e601fdfbf75a1c351e3e0227c47804787ff6f85f609b7b6ad96a5019"
        digest: "sha256:8521190e3af3a7e0cb9315554033812f07f7578d98e135897127c2263f768197"
        operationDigest: "sha256:d16a60500f5a0f56136ac778c6081895f77d3d54576676f28949ed7aebedb9f3"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:8baa4d575d547b43208834eb1d62809b050907da24aa4421f3b0eef244d9eb16"
        schemaVersion: 1
        sequence: 10
        stateFingerprintDigest: "sha256:5a045e4e58650e5cd374ee28c2432dc1828e7cefe2d871e75e6ba4f3a15b870a"
      -
        actor: "USER"
        at: "2026-07-28T02:46:31.404Z"
        authorityDigest: "sha256:5019f6bd86e18d36171ebc7a589b923d1f468dd4e7eb54bf533f663b76cd9348"
        digest: "sha256:0e0fbaa7f5ccfd09585f654a614d196deb815a3ba12d595beb559bfe8ab66d31"
        operationDigest: "sha256:f2ca459bfd8a7bc3ceee075226c85474f5e4162624efe65ac900b59d3e4127d5"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:8521190e3af3a7e0cb9315554033812f07f7578d98e135897127c2263f768197"
        schemaVersion: 1
        sequence: 11
        stateFingerprintDigest: "sha256:58147e8ed38a5d410942971af03b18e6a2ee48bdf010bec6f155b54fbe825d60"
      -
        actor: "USER"
        at: "2026-07-28T02:55:39.703Z"
        authorityDigest: "sha256:676fd0b240c635274a584b9ab48c4d2572f710bcd5ab179e6e6d03855fb87957"
        digest: "sha256:a06ca23aa80ad90da3b5d9c0c38096643b700ffed39796e0bc08aa6ecee2a5a9"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:0e0fbaa7f5ccfd09585f654a614d196deb815a3ba12d595beb559bfe8ab66d31"
        schemaVersion: 1
        sequence: 12
        stateFingerprintDigest: "sha256:6ae5c51e164c5341487c8a0df1451358d905395d39aa927a5834456ccc24831a"
    grants:
      -
        actor: "USER"
        digest: "sha256:1a9163585644b8044fd2623ebaae04eaa5ff72007319049788e911b2d0a8c050"
        expiresAt: "2026-07-28T02:11:04.216Z"
        id: "authority-c43fa0c7-9d23-4abf-9b92-7214c7b1d03e"
        issuedAt: "2026-07-28T01:56:04.216Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:926afbf65c3bb7e5beecf6a240900f188305b43ba476802772444569bc54f1fd"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:62937b83576dd303313dfc83af04e7e3d0efff9106778d0bff0de00fcea2cf6f"
        stateScopeDigest: "sha256:193bc7d44785382c8251ed54e1158f5778d84d491257d68adc3646854e5b28bc"
      -
        actor: "USER"
        digest: "sha256:159cf8da0a1adfd479ed1c9fe769214d27e092f038a4ebb0455db5994c8dfa05"
        expiresAt: "2026-07-28T02:45:15.445Z"
        id: "authority-ecf0791d-21a5-42f0-a207-0a74e5cf92f1"
        issuedAt: "2026-07-28T02:30:15.445Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:7fd8c7ae1909c2269ce1bf5711b983199426325c913ac6c206ee455fc48e748f"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:3378a88965fa1fd31b000cfb7e1e4ee9d5264bfde20221f0605a8e190524a16d"
        stateScopeDigest: "sha256:d7289a717eae5c0660324db1e6a877d0b3b043e9cd1f584fb0155f138e9e1254"
      -
        actor: "USER"
        digest: "sha256:f9e2e15cbe93e26bbe1e8de6816f3e2d7d78aaff7e8c81c87b7fb1c87ce62fa4"
        expiresAt: "2026-07-28T02:45:41.699Z"
        id: "authority-e75ce4ca-102f-4b31-bd51-c1803fd16863"
        issuedAt: "2026-07-28T02:30:41.699Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:31b171b621f24bd5682574df9e0f0c8b7011bb6ae5a1df912487733c7db26abc"
        stateScopeDigest: "sha256:7540cacf8efeeca3214999fedb2524b3f1bc96bd4c1b0f23c00b177b720a89aa"
      -
        actor: "USER"
        digest: "sha256:3e64206364bb916cc05dc02dfb01ccaaa8863a032ba864bf0d5342151304e6c3"
        expiresAt: "2026-07-28T02:46:15.314Z"
        id: "authority-05c08bc7-0a37-4cd8-8ce6-859927ab2a2f"
        issuedAt: "2026-07-28T02:31:15.314Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:f2ca459bfd8a7bc3ceee075226c85474f5e4162624efe65ac900b59d3e4127d5"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:08c8b5995be029db1b7589267debfdeb7586ca2cea7aaabdd2a3cb7378ba186f"
        stateScopeDigest: "sha256:5f03b3cfba42be2576dede28ac1532149930472227b86eb09cb2f82d55ec40ec"
      -
        actor: "USER"
        digest: "sha256:44a86fab87de67f48c6ecbddc339d9aa2fb97bfc5fc935578154035e9658198e"
        expiresAt: "2026-07-28T02:47:12.127Z"
        id: "authority-0a312059-d254-44c0-84d2-0bc320ca9fe7"
        issuedAt: "2026-07-28T02:32:12.127Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:092a8cec160474308bde6f0a7fc1b0baf84ea8497b53c42e267d6e73307dba55"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f8ed7f6a1642f121b030666cf790bc2c5916dc36ffff86d5dac1331125870f2d"
        stateScopeDigest: "sha256:3ba21a8ded336b327105940ead18f67f1d70e16095fcad93a8a7310490cae1ee"
      -
        actor: "USER"
        digest: "sha256:28a45e5cc9a5736da81c0a43b7b772e0e402ff1a68408b8c87956cf907ef6bda"
        expiresAt: "2026-07-28T02:51:59.462Z"
        id: "authority-a0db5a50-241c-4bcf-ab00-d1d45e4bc39a"
        issuedAt: "2026-07-28T02:36:59.462Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:468574a137bee1db39c200c3e1a29461b1badc261a26eb0a01e0acbcd6505e08"
        stateScopeDigest: "sha256:ec4b0b391c8099a28632a8db47702745506b2bee3a05c91315c729df028f3a20"
      -
        actor: "USER"
        digest: "sha256:3e082db9f215947aa7c4f7cd824922c883d200ee6dbdf28f4641280c84c60048"
        expiresAt: "2026-07-28T02:52:22.167Z"
        id: "authority-d6020ce4-7456-4fd9-8473-c9135cf71231"
        issuedAt: "2026-07-28T02:37:22.167Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:d16a60500f5a0f56136ac778c6081895f77d3d54576676f28949ed7aebedb9f3"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:23ca034da05724478f1f5e1ccecde49327120d00f0e1bde20df569fcbef022e8"
        stateScopeDigest: "sha256:87e029cd9f844739d0647f8380a221ff13ab79f9cc66ba0c2b2faa15f5a60797"
      -
        actor: "USER"
        digest: "sha256:f830d0f2ad0b1d871b6b53fe7b928b77d6b8f292130e28f7fb861b186b1dfd7b"
        expiresAt: "2026-07-28T02:53:19.544Z"
        id: "authority-7402f01f-62c7-4207-829e-afb4c0fa1691"
        issuedAt: "2026-07-28T02:38:19.544Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:f2ca459bfd8a7bc3ceee075226c85474f5e4162624efe65ac900b59d3e4127d5"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:d8864fbc1d1bd9e8e8d164b21a4c193f3fd7b78a9309f857023b6f4b9f06bd3e"
        stateScopeDigest: "sha256:c9a851cbdc91ea92b01415b1f6ed63d958d52d3b2ffa8eb36a058a332fb62549"
      -
        actor: "USER"
        digest: "sha256:5f6b9be533402713e216037b102052cadfabfcc40bf2e8e14c05fa6e122144b9"
        expiresAt: "2026-07-28T03:00:19.435Z"
        id: "authority-61afe1e5-5530-4054-8b9c-4c7614b97ce4"
        issuedAt: "2026-07-28T02:45:19.435Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:405d4401b565e725e8ff7e29963dae10a487ccb827c2d92b5347b9bcf7687396"
        stateScopeDigest: "sha256:26a6e5053cac03b7433bdc7efd2a7b0819e01df40b27c8ad286e50a2bd8fe4c4"
      -
        actor: "USER"
        digest: "sha256:eb37c486e601fdfbf75a1c351e3e0227c47804787ff6f85f609b7b6ad96a5019"
        expiresAt: "2026-07-28T03:00:52.339Z"
        id: "authority-7fd08415-6cbc-43e0-aa0c-7ccd2c9291c0"
        issuedAt: "2026-07-28T02:45:52.339Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:d16a60500f5a0f56136ac778c6081895f77d3d54576676f28949ed7aebedb9f3"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:5a045e4e58650e5cd374ee28c2432dc1828e7cefe2d871e75e6ba4f3a15b870a"
        stateScopeDigest: "sha256:d982377aa1e9b923101daf24fe57602f59d8bb6c08066c469b9bbe96403a9354"
      -
        actor: "USER"
        digest: "sha256:5019f6bd86e18d36171ebc7a589b923d1f468dd4e7eb54bf533f663b76cd9348"
        expiresAt: "2026-07-28T03:01:31.404Z"
        id: "authority-5d607444-2962-4578-85cb-f62759434161"
        issuedAt: "2026-07-28T02:46:31.404Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:f2ca459bfd8a7bc3ceee075226c85474f5e4162624efe65ac900b59d3e4127d5"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:58147e8ed38a5d410942971af03b18e6a2ee48bdf010bec6f155b54fbe825d60"
        stateScopeDigest: "sha256:89b3476e1ee44f950665b99756e3ed9d8d1eba1da28bd7e3219dadfb5fe3e6a8"
      -
        actor: "USER"
        digest: "sha256:676fd0b240c635274a584b9ab48c4d2572f710bcd5ab179e6e6d03855fb87957"
        expiresAt: "2026-07-28T03:10:39.703Z"
        id: "authority-4ad879d4-287d-4119-a6c9-c76cb88e1e16"
        issuedAt: "2026-07-28T02:55:39.703Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:039e56089b32d9e6ac23685f7be4a4ddb2d49ac92f981c6b09d05a20b5018d0f"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:6ae5c51e164c5341487c8a0df1451358d905395d39aa927a5834456ccc24831a"
        stateScopeDigest: "sha256:c298e302a5ff4bc26d2ad18bfa8e43cbcc7f1ddcecf0830935f25d2636b50af0"
    schemaVersion: 1
  implementation_commit:
    hash: "96ff9bab8db6e431077c9a7f60b357735e011f80"
    message: "🎨 R7WS01 runner: format typed lifecycle paths"
  workflow_route_baseline:
    start_head_sha: "a27841b280b516dfb52d900db5559ba87adc4224"
    version: 1
id_source: "generated"
---
## Summary

Return typed runner lifecycle results

RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.

## Scope

- In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
- Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
- An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
- Out of scope: automating the complete direct route, delivered by the next task.

## Plan

1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
2. Separate rendering/exit mapping from use-case logic.
3. Call runner phases in-process from the supervisor.
4. Map durable journal/resolution input to typed `effect_in_doubt`, `applied` and `not_applied` outcomes with resolution provenance, and reject any generic retry path for unresolved effects.
5. Preserve documented human and JSON output through compatibility renderers without dropping resolution provenance.
6. Add result/renderer parity, adapter error, cancellation, timeout, stale-work-order and effect-resolution transition tests.

## Verify Steps

1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
3. Feed durable journal states for `effect_in_doubt`, operator-resolved `applied` and operator-resolved `not_applied` into each runner/supervisor entry point. Expected: typed results and both renderers preserve the state, operator-supplied resolution provenance, evidence/authority digests and claim generation without stdout parsing.
4. Invoke generic retry, replay, resume and restart against unresolved `effect_in_doubt`. Expected: every path returns the typed blocked outcome, performs no adapter invocation and directs callers only to the explicit operator-resolution protocol; no generic retry can reinterpret the effect as `not_applied`.
5. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
6. Run runner/supervisor/lifecycle tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T02:26:16.727Z — VERIFY — ok

By: TESTER

Note: PASS: typed runner lifecycle results stay in-process through task CLI and Hermes; human and JSON renderers preserve effect authority, observed evidence, claim generation, and operator-resolution provenance.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:22:27.906Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
- old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-R7WS01

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221850-R7WS01
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T02:36:22.966Z — VERIFY — ok

By: TESTER

Note: PASS (rework reverified): Hermes now uses the shared typed lifecycle exit mapping, including nonzero failure for incomplete active-claim cleanup.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:30:28.613Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
- old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-R7WS01

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607221850-R7WS01 --remote --explain
- diagnostic_command: agentplane task next-action 202607221850-R7WS01 --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T02:43:38.519Z — VERIFY — ok

By: TESTER

Note: PASS (format reverified): typed lifecycle paths now pass repository Prettier format check as well as runner, renderer, and Hermes regression checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:37:57.846Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
- old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-R7WS01

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T02:54:35.229Z — VERIFY — ok

By: TESTER

Note: PASS (hosted rework): split execution contracts keeps task-run below the hotspot threshold and replaces unsafe Hermes matcher assignments with typed assertions.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T02:46:10.968Z, excerpt_hash=sha256:02a389ca089e360cf76ff483bd84febcf2d5924eaa0f09fb89eb4a0ab64c794d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-R7WS01-return-typed-runner-lifecycle-results/.agentplane/tasks/202607221850-R7WS01/blueprint/resolved-snapshot.json
- old_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- current_digest: 97dbd5ae24a9308fca905710dccc07fa250b9db1f6435363f589cdbc72b6a328
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-R7WS01

DecisionContextRef:
- operator_action: provider_action
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

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Preserve `effect_in_doubt`, `applied` and `not_applied` states plus resolution provenance in any compatibility boundary; do not restore a generic retry path for unresolved effects.
- Restore the previous compatibility path only when it cannot bypass the explicit operator-resolution protocol or invoke the adapter for unresolved `effect_in_doubt`.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings

- Observation: Focused runner/supervisor/lifecycle suite passed; critical-cli passed 11/11 files (72 tests) in canonical Node mode; lifecycle invariants, typecheck, lint, and routing checks passed.
  Impact: No stdout parsing or generic replay path was reintroduced for effect_in_doubt.
  Resolution: Approve branch for PR update and hosted validation.

- Observation: Hermes lifecycle, renderer, and effect-resolution tests passed; typecheck, lint, and lifecycle invariants passed on e7465b737.
  Impact: Hosted verify-contract evidence now covers the rework commit rather than the superseded implementation head.
  Resolution: Refresh PR head and rerun hosted validation.

- Observation: format:check, targeted Hermes/renderer/effect-resolution tests, typecheck, lint, and lifecycle invariants passed on 96ff9bab8.
  Impact: Hosted verify-contract now records evidence for the formatted implementation head.
  Resolution: Refresh evaluator review and pre-merge closure.

- Observation: format, typecheck, lint:core, hotspots:check, lifecycle invariants, and the runner/Hermes/CLI rework test set passed on 8cd703b66.
  Impact: The hosted contract and static-analysis failures are addressed without changing runner lifecycle behavior.
  Resolution: Refresh evaluator quality review and publish the verified rework head.
