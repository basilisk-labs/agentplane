---
id: "202607280900-WHE7JS"
title: "Break authority-close lifecycle feedback loop"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "blocker"
  - "code"
  - "lifecycle"
  - "v0.7"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T09:01:44.246Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T10:28:47.525Z"
  updated_by: "TESTER"
  note: "After rebasing onto main with the runner cancellation-intent retry, focused authority and runner regressions pass, typecheck/task-state/routing pass, and critical CLI matrix passes 11/11. Hosted CI must still validate the rebased PR head."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-28T10:29:09.901Z"
  updated_by: "HUMAN"
  note: "The authority grant now commits only the current task packet after a changed grant, preventing the authority-to-dirty-worktree feedback loop without widening authority semantics."
  evaluated_sha: "b803b67e786127a849af228924ce35faff083247"
  blueprint_digest: "cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410"
  evidence_refs:
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-102909016-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-102909016-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-102909016-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-102909016-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607280900-WHE7JS/README.md"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-102909016-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-102909016-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607280900-WHE7JS/quality/20260728-102909016-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "packages/agentplane/src/commands/task/authority-grant.command.ts"
    - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
    - "focused authority-route and runner regressions passed; bun run typecheck, task-state:check, check-routing, and test:critical 11/11 passed"
  findings:
    - "Rebased scope preserves the narrow auto-commit behavior and route-level regression; it now includes the merged cancellation-intent retry that caused the prior hosted unit failure. Focused authority and runner regressions, typecheck, task-state, routing, and critical CLI 11/11 pass."
commit:
  hash: "2e04b906f9d327f180b0dc11f0a3d9dd4e6a3088"
  message: "🧩 WHE7JS task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: isolate authority and close-tail freshness from implementation verification without weakening protected merge gates."
  -
    author: "CODER"
    body: "Implementation: committed branch_pr authority records automatically; added the route regression that proves the authorized PR operation remains executable."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-28T09:02:22.510Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate authority and close-tail freshness from implementation verification without weakening protected merge gates."
  -
    type: "status"
    at: "2026-07-28T09:22:45.351Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: committed branch_pr authority records automatically; added the route regression that proves the authorized PR operation remains executable."
  -
    type: "verify"
    at: "2026-07-28T09:22:59.261Z"
    author: "TESTER"
    state: "ok"
    note: "Focused authority/lifecycle tests, task-state, typecheck, critical suite, policy routing, and full local fast CI passed; the live authority grant auto-committed its packet and advanced directly to pr.open."
  -
    type: "status"
    at: "2026-07-28T09:23:47.147Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T10:28:47.525Z"
    author: "TESTER"
    state: "ok"
    note: "After rebasing onto main with the runner cancellation-intent retry, focused authority and runner regressions pass, typecheck/task-state/routing pass, and critical CLI matrix passes 11/11. Hosted CI must still validate the rebased PR head."
  -
    type: "status"
    at: "2026-07-28T10:31:39.806Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T10:31:39.807Z"
doc_updated_by: "CODER"
description: "v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration."
sections:
  Summary: |-
    Break authority-close lifecycle feedback loop

    v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.
  Scope: |-
    - In scope: v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.
    - Out of scope: unrelated refactors not required for "Break authority-close lifecycle feedback loop".
  Plan: |-
    1. Trace the route predicates that classify task README and PR-artifact changes as verification/pre-merge invalidators.
    2. Introduce an explicit freshness boundary: implementation, verification, quality, and close-tail evidence remain content-addressed; authority grants and provider-sync metadata preserve auditability but do not invalidate unchanged implementation evidence.
    3. Preserve all high-risk gates: a protected provider operation still requires a matching current authority record; code/verification/quality changes still require fresh verification and pre-merge closure; final PR head and hosted checks must remain live and stable.
    4. Add deterministic regression coverage for authority grant -> pre-merge closure -> final head publication -> integration queue, proving the route reaches an executable integration step without another verification cycle when implementation is unchanged.
    5. Run focused route tests, task-state check, typecheck, critical tests, policy routing, and the relevant local CI selector; record residual compatibility risk in task Findings.
  Verify Steps: |-
    1. Add a deterministic route-level regression: authority grant, verification, evaluator pass, pre-merge closure, final-head publication, hosted-green refresh, integration queue. Expected: unchanged implementation and quality evidence reaches an executable integration action without another verification/close/publish loop.
    2. Exercise the negative boundary. Expected: a changed implementation commit, invalid or stale authority, or changed hosted state still invalidates the appropriate evidence and blocks integration.
    3. Inspect persisted task and authority artifacts. Expected: every protected operation retains a matching scoped authority record; no authority record widens an operation.
    4. Run focused lifecycle-route tests, bun run task-state:check, bun run typecheck, bun run test:critical, and node .agentplane/policy/check-routing.mjs. Expected: all pass.
    5. Publish a PR and require stable hosted checks before integrating. Expected: the PR head, review state, and merge queue agree; no manual provider merge is used.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T09:22:59.261Z — VERIFY — ok

    By: TESTER

    Note: Focused authority/lifecycle tests, task-state, typecheck, critical suite, policy routing, and full local fast CI passed; the live authority grant auto-committed its packet and advanced directly to pr.open.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T09:22:45.351Z, excerpt_hash=sha256:52fcdb54a6ac5d2e275518998c6d5e8482aa9d20bac2e445e9a05838c2d4d074

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280900-WHE7JS-break-authority-close-lifecycle-feedback-loop/.agentplane/tasks/202607280900-WHE7JS/blueprint/resolved-snapshot.json
    - old_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
    - current_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607280900-WHE7JS

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607280900-WHE7JS
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T10:28:47.525Z — VERIFY — ok

    By: TESTER

    Note: After rebasing onto main with the runner cancellation-intent retry, focused authority and runner regressions pass, typecheck/task-state/routing pass, and critical CLI matrix passes 11/11. Hosted CI must still validate the rebased PR head.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T09:23:47.147Z, excerpt_hash=sha256:52fcdb54a6ac5d2e275518998c6d5e8482aa9d20bac2e445e9a05838c2d4d074

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280900-WHE7JS-break-authority-close-lifecycle-feedback-loop/.agentplane/tasks/202607280900-WHE7JS/blueprint/resolved-snapshot.json
    - old_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
    - current_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607280900-WHE7JS

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
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: authority grant emitted committed and next-action became cli_operation pr.open
      Impact: breaks the task-worktree dirty feedback loop without weakening authority scope or expiry
      Resolution: verified against commit 03a98aa601a69dd8c89e5dc424ca2e0ed214d025

    - Observation: The previous hosted unit failure was the cancellation-intent read race now fixed by merged N3.
      Impact: The WHE lifecycle change could not be integrated safely until its CI ran with the runner fix.
      Resolution: Rebase WHE onto current main and require a new green hosted check set before queueing integration.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T09:22:01.374Z"
        authorityDigest: "sha256:af103b4aba5b99e7777b4476bee1e3d007d4670e4221791080f9017a351656bb"
        digest: "sha256:0c5c5058efd15e95304d32c5866983b1161881f37a6bdede065502f552346ddc"
        operationDigest: "sha256:5d7d27338ec14622ef194572b85ea7254b8c069eb1f84879e3e4cc270d855492"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:af8f1a911e6dcc9a09a068f68ba9e71bf90280645b0aa8cbd0bae70078e59d12"
      -
        actor: "USER"
        at: "2026-07-28T09:23:30.889Z"
        authorityDigest: "sha256:da0fae580c156b0a5473fc67c35c299b3b7690df925f044b649611a90b3442c4"
        digest: "sha256:36ab904c0b4ca37df662222265b709d039be64188fd547db271fbcc2ec6de2c3"
        operationDigest: "sha256:64fd58d047fb90bdfbd444c255ae309e86e6ad57d37765e1678bc81744c92356"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:0c5c5058efd15e95304d32c5866983b1161881f37a6bdede065502f552346ddc"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:7afab48f7c7b2d93739a50b4f8140cb60b0c262dbbe6aa4c831670dd61221ab4"
      -
        actor: "USER"
        at: "2026-07-28T09:27:30.816Z"
        authorityDigest: "sha256:b2e3d978ec12031d9370f17d38159033b6a5054c421ae31feacf059e065cfc0c"
        digest: "sha256:6bbce1f1d8cf6a78360db03befd0283479e515f604bebdad15eb48af633e8722"
        operationDigest: "sha256:4f670682200a8d4c04293b8185dac01880f639301fc0ae43b1975183fb61a2da"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:36ab904c0b4ca37df662222265b709d039be64188fd547db271fbcc2ec6de2c3"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:334387b4666341f6de5bec88befbaac77702c581801af8202b3d2e1818d48017"
      -
        actor: "USER"
        at: "2026-07-28T09:28:25.405Z"
        authorityDigest: "sha256:adfaa46a96c43e21ee93c5d66656326c1df9ecdbb70747d8fc176e3bc1a21d47"
        digest: "sha256:ddeb6715440d7b9dc5951241cd80c80a168c1c18e972c7c345e84dd792fa7279"
        operationDigest: "sha256:26b8fe2a6f663a15c6d3cccc3c833f47ba59529501e4151044d9b448babf5010"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:6bbce1f1d8cf6a78360db03befd0283479e515f604bebdad15eb48af633e8722"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:64f71da3a0a0f16a7ce74dce4c3f6c7a1e6adae9e7aeccd83987f0889e03d08b"
      -
        actor: "USER"
        at: "2026-07-28T10:30:21.293Z"
        authorityDigest: "sha256:ea291914e45787cff26c8250c29b89978ffd658f38bbe7a3e47f0bd3ef3f5b98"
        digest: "sha256:ad868b1e3ceaf6c02910e2c420e4189e896f2aececb2e1fe842bd8746e9010ea"
        operationDigest: "sha256:293064e1133a1ebcd3edc530944f0e54d13dac4c974bf4c4ca6f5255e70e01a6"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:ddeb6715440d7b9dc5951241cd80c80a168c1c18e972c7c345e84dd792fa7279"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:2e9eed897fe94dd77483e1cb842a701b01897ffc156c4207f96d275f67be345c"
      -
        actor: "USER"
        at: "2026-07-28T10:31:00.026Z"
        authorityDigest: "sha256:55319780cde05794b86dbb6a9588e3bd081a385d956c1a2be9f2a342674dddbe"
        digest: "sha256:754521bc324fb4df717f4695365de6e22f91c91e8818727252a471458f0b76f0"
        operationDigest: "sha256:b817ab387b15c49397d36321443c51dedd241317f49597d253ebb3512fbd4746"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:ad868b1e3ceaf6c02910e2c420e4189e896f2aececb2e1fe842bd8746e9010ea"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:983d594bad0261e4af9af95e31b52b9a6ca004f94692466593da990cdb9eeeea"
      -
        actor: "USER"
        at: "2026-07-28T10:32:04.551Z"
        authorityDigest: "sha256:a5323037220c898d20bd66ac74505e2e8441b17e61995170e532d52ad358367a"
        digest: "sha256:283088e240295fc7cf7598fd6eb3f83107a5de3adbf2b7f4d7fa5bb2f2afe2e1"
        operationDigest: "sha256:293064e1133a1ebcd3edc530944f0e54d13dac4c974bf4c4ca6f5255e70e01a6"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:754521bc324fb4df717f4695365de6e22f91c91e8818727252a471458f0b76f0"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:9bb53f5a93cd5c3d9076939cab68d70d51e9d1a2543bed4820f8dc1e1d0104d6"
      -
        actor: "USER"
        at: "2026-07-28T10:32:47.345Z"
        authorityDigest: "sha256:03f53d8d8dd76bccd9463448e19b3cc9b9dd62ba8c75879aaeb99bb3b4825aae"
        digest: "sha256:cf8c68919b678a501405e038f3bd3e4c986549e5ccea2a114b4afd219110c72a"
        operationDigest: "sha256:4f670682200a8d4c04293b8185dac01880f639301fc0ae43b1975183fb61a2da"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:283088e240295fc7cf7598fd6eb3f83107a5de3adbf2b7f4d7fa5bb2f2afe2e1"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:1eb7dafff3284e46843face314e472a68cd563345bba99c202276902823f4ccd"
    grants:
      -
        actor: "USER"
        digest: "sha256:af103b4aba5b99e7777b4476bee1e3d007d4670e4221791080f9017a351656bb"
        expiresAt: "2026-07-28T09:37:01.374Z"
        id: "authority-83fccb78-1288-40cc-8eb9-5d3dff7173c2"
        issuedAt: "2026-07-28T09:22:01.374Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:5d7d27338ec14622ef194572b85ea7254b8c069eb1f84879e3e4cc270d855492"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:af8f1a911e6dcc9a09a068f68ba9e71bf90280645b0aa8cbd0bae70078e59d12"
        stateScopeDigest: "sha256:6d1086ee329f82a88d40342f8e577d3f6d8015efd1e821cb8c20c2d25a29b684"
      -
        actor: "USER"
        digest: "sha256:da0fae580c156b0a5473fc67c35c299b3b7690df925f044b649611a90b3442c4"
        expiresAt: "2026-07-28T09:38:30.889Z"
        id: "authority-9aa8c749-069b-4d42-b453-606c4f109a78"
        issuedAt: "2026-07-28T09:23:30.889Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:64fd58d047fb90bdfbd444c255ae309e86e6ad57d37765e1678bc81744c92356"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:7afab48f7c7b2d93739a50b4f8140cb60b0c262dbbe6aa4c831670dd61221ab4"
        stateScopeDigest: "sha256:9064b3f6cfd0821b09405717ece3ace8dee280f243c3be2224d1a6679a83630c"
      -
        actor: "USER"
        digest: "sha256:b2e3d978ec12031d9370f17d38159033b6a5054c421ae31feacf059e065cfc0c"
        expiresAt: "2026-07-28T09:42:30.816Z"
        id: "authority-9541c70f-b7a3-4eb9-8f7e-d0490af59e7a"
        issuedAt: "2026-07-28T09:27:30.816Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4f670682200a8d4c04293b8185dac01880f639301fc0ae43b1975183fb61a2da"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:334387b4666341f6de5bec88befbaac77702c581801af8202b3d2e1818d48017"
        stateScopeDigest: "sha256:2c73969f937695823fcdf58a641475df7ccbdaa36fd7dc6bb10ec8747c2ddadb"
      -
        actor: "USER"
        digest: "sha256:adfaa46a96c43e21ee93c5d66656326c1df9ecdbb70747d8fc176e3bc1a21d47"
        expiresAt: "2026-07-28T09:43:25.405Z"
        id: "authority-0a46092a-843f-4e82-9246-02f9f4ee57ea"
        issuedAt: "2026-07-28T09:28:25.405Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:26b8fe2a6f663a15c6d3cccc3c833f47ba59529501e4151044d9b448babf5010"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:64f71da3a0a0f16a7ce74dce4c3f6c7a1e6adae9e7aeccd83987f0889e03d08b"
        stateScopeDigest: "sha256:ef6786308e36c37e858a688101aef667439c17919b3126a0339cca1d8e9ba98d"
      -
        actor: "USER"
        digest: "sha256:ea291914e45787cff26c8250c29b89978ffd658f38bbe7a3e47f0bd3ef3f5b98"
        expiresAt: "2026-07-28T10:45:21.293Z"
        id: "authority-da694d4a-569c-44e9-a033-323d296ae579"
        issuedAt: "2026-07-28T10:30:21.293Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:293064e1133a1ebcd3edc530944f0e54d13dac4c974bf4c4ca6f5255e70e01a6"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:2e9eed897fe94dd77483e1cb842a701b01897ffc156c4207f96d275f67be345c"
        stateScopeDigest: "sha256:c724ecab5bba25b724185b640f29b86575f76c9f155d90c3007010064dd6f7b3"
      -
        actor: "USER"
        digest: "sha256:55319780cde05794b86dbb6a9588e3bd081a385d956c1a2be9f2a342674dddbe"
        expiresAt: "2026-07-28T10:46:00.026Z"
        id: "authority-99aab551-020a-4121-be4e-fe5b5f5ff2b2"
        issuedAt: "2026-07-28T10:31:00.026Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:b817ab387b15c49397d36321443c51dedd241317f49597d253ebb3512fbd4746"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:983d594bad0261e4af9af95e31b52b9a6ca004f94692466593da990cdb9eeeea"
        stateScopeDigest: "sha256:dda1fd7b75704e7c8e3e0d79fca0725cad7734b0387ca7e447ad6c2e274588c5"
      -
        actor: "USER"
        digest: "sha256:a5323037220c898d20bd66ac74505e2e8441b17e61995170e532d52ad358367a"
        expiresAt: "2026-07-28T10:47:04.551Z"
        id: "authority-05d43fbd-be8c-42eb-acdc-4c1ef3a0e725"
        issuedAt: "2026-07-28T10:32:04.551Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:293064e1133a1ebcd3edc530944f0e54d13dac4c974bf4c4ca6f5255e70e01a6"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:9bb53f5a93cd5c3d9076939cab68d70d51e9d1a2543bed4820f8dc1e1d0104d6"
        stateScopeDigest: "sha256:1cdbdfd56849a3c9545f38eae38fbda66d54274055f0b3b7aea8f62c0ade2ddf"
      -
        actor: "USER"
        digest: "sha256:03f53d8d8dd76bccd9463448e19b3cc9b9dd62ba8c75879aaeb99bb3b4825aae"
        expiresAt: "2026-07-28T10:47:47.345Z"
        id: "authority-7073543e-98bd-44a4-83ac-4ce39b6dfdd3"
        issuedAt: "2026-07-28T10:32:47.345Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4f670682200a8d4c04293b8185dac01880f639301fc0ae43b1975183fb61a2da"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:1eb7dafff3284e46843face314e472a68cd563345bba99c202276902823f4ccd"
        stateScopeDigest: "sha256:0a72277f07f7319a5270faafa7401cffd6a36602f6e78430e6de49a7d6a67ad6"
    schemaVersion: 1
  implementation_commit:
    hash: "b803b67e786127a849af228924ce35faff083247"
    message: "fix: commit branch-pr authority records"
  workflow_route_baseline:
    start_head_sha: "89a82f010479eb2583e414fb49c930d4819b5777"
    version: 1
id_source: "generated"
---
## Summary

Break authority-close lifecycle feedback loop

v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.

## Scope

- In scope: v0.7 blocker discovered while integrating RF-18 (#4654): a persisted authority record for pr.head.publish or integration.enqueue dirties the task worktree after pre-merge closure, which forces re-verification and a new closure, which in turn requires another publish authority. Make authority and closure evidence remain auditable without creating an infinite verification/publication loop. Preserve protected merge and hosted-check gates. Add a deterministic regression route covering authority grant -> close -> publish -> queue integration.
- Out of scope: unrelated refactors not required for "Break authority-close lifecycle feedback loop".

## Plan

1. Trace the route predicates that classify task README and PR-artifact changes as verification/pre-merge invalidators.
2. Introduce an explicit freshness boundary: implementation, verification, quality, and close-tail evidence remain content-addressed; authority grants and provider-sync metadata preserve auditability but do not invalidate unchanged implementation evidence.
3. Preserve all high-risk gates: a protected provider operation still requires a matching current authority record; code/verification/quality changes still require fresh verification and pre-merge closure; final PR head and hosted checks must remain live and stable.
4. Add deterministic regression coverage for authority grant -> pre-merge closure -> final head publication -> integration queue, proving the route reaches an executable integration step without another verification cycle when implementation is unchanged.
5. Run focused route tests, task-state check, typecheck, critical tests, policy routing, and the relevant local CI selector; record residual compatibility risk in task Findings.

## Verify Steps

1. Add a deterministic route-level regression: authority grant, verification, evaluator pass, pre-merge closure, final-head publication, hosted-green refresh, integration queue. Expected: unchanged implementation and quality evidence reaches an executable integration action without another verification/close/publish loop.
2. Exercise the negative boundary. Expected: a changed implementation commit, invalid or stale authority, or changed hosted state still invalidates the appropriate evidence and blocks integration.
3. Inspect persisted task and authority artifacts. Expected: every protected operation retains a matching scoped authority record; no authority record widens an operation.
4. Run focused lifecycle-route tests, bun run task-state:check, bun run typecheck, bun run test:critical, and node .agentplane/policy/check-routing.mjs. Expected: all pass.
5. Publish a PR and require stable hosted checks before integrating. Expected: the PR head, review state, and merge queue agree; no manual provider merge is used.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T09:22:59.261Z — VERIFY — ok

By: TESTER

Note: Focused authority/lifecycle tests, task-state, typecheck, critical suite, policy routing, and full local fast CI passed; the live authority grant auto-committed its packet and advanced directly to pr.open.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T09:22:45.351Z, excerpt_hash=sha256:52fcdb54a6ac5d2e275518998c6d5e8482aa9d20bac2e445e9a05838c2d4d074

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280900-WHE7JS-break-authority-close-lifecycle-feedback-loop/.agentplane/tasks/202607280900-WHE7JS/blueprint/resolved-snapshot.json
- old_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
- current_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607280900-WHE7JS

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607280900-WHE7JS
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T10:28:47.525Z — VERIFY — ok

By: TESTER

Note: After rebasing onto main with the runner cancellation-intent retry, focused authority and runner regressions pass, typecheck/task-state/routing pass, and critical CLI matrix passes 11/11. Hosted CI must still validate the rebased PR head.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T09:23:47.147Z, excerpt_hash=sha256:52fcdb54a6ac5d2e275518998c6d5e8482aa9d20bac2e445e9a05838c2d4d074

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280900-WHE7JS-break-authority-close-lifecycle-feedback-loop/.agentplane/tasks/202607280900-WHE7JS/blueprint/resolved-snapshot.json
- old_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
- current_digest: cf78dccf3ca7848d369ebafa8399f797778df6099809e148df6eba5dea7c2410
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607280900-WHE7JS

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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: authority grant emitted committed and next-action became cli_operation pr.open
  Impact: breaks the task-worktree dirty feedback loop without weakening authority scope or expiry
  Resolution: verified against commit 03a98aa601a69dd8c89e5dc424ca2e0ed214d025

- Observation: The previous hosted unit failure was the cancellation-intent read race now fixed by merged N3.
  Impact: The WHE lifecycle change could not be integrated safely until its CI ran with the runner fix.
  Resolution: Rebase WHE onto current main and require a new green hosted check set before queueing integration.
