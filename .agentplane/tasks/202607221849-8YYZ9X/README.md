---
id: "202607221849-8YYZ9X"
title: "Execute and calibrate EVALUATOR episodes"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 27
origin:
  system: "manual"
depends_on:
  - "202607221849-TBTX8X"
tags:
  - "evaluator"
  - "milestone-alpha2"
  - "milestone-alpha3"
  - "quality"
  - "refactor"
  - "rf-12"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T15:39:29.453Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-27T17:01:13.971Z"
  updated_by: "TESTER"
  note: "Reverification after the hosted critical-CI fix: critical-cli suite now accepts the reviewed 253commands/174args/813options surface; compatibility ratchet remains green. No production behavior changed beyond the tested expectation."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-27T17:14:40.331Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "e852fd816a6f8cecb09ee2b63cab395b4d5fde69"
  blueprint_digest: "4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f"
  evidence_refs:
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221849-8YYZ9X/README.md"
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221849-8YYZ9X/quality/20260727-171440079-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The rework updates only the critical test expectation to the generated candidate: source_tasks includes RF-12b, and the CLI/context surface digests match the approved candidate."
commit:
  hash: "6a7cc2dfc19bfe44e92fb7865694628849e9ffff"
  message: "📚 8YYZ9X task: record final closure authority"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: e17d1cc56. Read-only EVALUATOR execution, strict result application, calibration coverage, docs, and compatibility contract are ready for verification."
  -
    author: "CODER"
    body: "Rework committed: 8bb85d54f. Provider failures now attest workspace state first, return E_RUNTIME, and withhold raw diagnostics."
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
    at: "2026-07-27T15:40:35.719Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-27T16:23:44.418Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e17d1cc56. Read-only EVALUATOR execution, strict result application, calibration coverage, docs, and compatibility contract are ready for verification."
  -
    type: "verify"
    at: "2026-07-27T16:25:58.504Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Focused calibration, compatibility, type, lint, build, and critical CLI checks pass; the real read-only Codex episode failed before a typed response."
  -
    type: "status"
    at: "2026-07-27T16:34:21.693Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework committed: 8bb85d54f. Provider failures now attest workspace state first, return E_RUNTIME, and withhold raw diagnostics."
  -
    type: "verify"
    at: "2026-07-27T16:35:01.324Z"
    author: "TESTER"
    state: "ok"
    note: "All deterministic calibration scenarios pass: pass/rework/blocked/human_review provenance, stale revision rejection, success and failure-path no-write enforcement, and safe provider-failure classification. Typecheck, lint, compatibility ratchet, assets, docs, and policy routing pass."
  -
    type: "status"
    at: "2026-07-27T16:38:13.958Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-27T16:56:37.921Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-27T17:01:13.971Z"
    author: "TESTER"
    state: "ok"
    note: "Reverification after the hosted critical-CI fix: critical-cli suite now accepts the reviewed 253commands/174args/813options surface; compatibility ratchet remains green. No production behavior changed beyond the tested expectation."
  -
    type: "status"
    at: "2026-07-27T17:02:31.519Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-27T17:02:31.520Z"
doc_updated_by: "CODER"
description: "RF-12b: launch a read-only EVALUATOR against the prepared work order, apply its typed result, turn rework into the next semantic episode, and calibrate human escalation on golden scenarios."
sections:
  Summary: |-
    Execute and calibrate EVALUATOR episodes

    RF-12b: launch a read-only EVALUATOR against the prepared work order, apply its typed result, turn rework into the next semantic episode, and calibrate human escalation on golden scenarios.
  Scope: |-
    - In scope: evaluator adapter invocation, result application, rework/blocked/human-review transitions, evidence-linked findings, stale-result rejection, no-write enforcement, calibration fixtures, and human escalation policy.
    - Out of scope: a general benchmarking product; full evaluation-platform work remains outside the 0.7 task-level safety primitive.
  Plan: |-
    1. Invoke EVALUATOR with the prepared read-only AgentWorkOrder and result schema.
    2. Validate/apply the result through the typed boundary.
    3. Convert rework into a bounded next semantic work order and blocked/human uncertainty into explicit steps.
    4. Build calibration fixtures covering false pass, false rework, missing evidence, context reconciliation, and ambiguous acceptance.
    5. Tune escalation policy without deterministic semantic heuristics.
  Verify Steps: |-
    1. Run pass, rework, blocked, and human-review fixtures. Expected: the verdict originates only in EvaluatorSgrResult and each transition preserves evidence provenance.
    2. Change evaluated SHA or task revision after invocation. Expected: apply rejects the stale result.
    3. Attempt an evaluator filesystem mutation. Expected: sandbox/receipt policy makes the episode unacceptable.
    4. Run calibration scenarios repeatedly. Expected: ambiguous or weak-evidence cases escalate; no router heuristic supplies a verdict.
    5. Run focused evaluator tests, workflow coverage, lifecycle invariants, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-27T16:25:58.504Z — VERIFY — needs_rework

    By: TESTER

    Note: Focused calibration, compatibility, type, lint, build, and critical CLI checks pass; the real read-only Codex episode failed before a typed response.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T16:23:44.418Z, excerpt_hash=sha256:520611ddb34ae6455bc539b221ce9f07a6ffba8eade3a225423af7361407c138

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-8YYZ9X-execute-and-calibrate-evaluator-episodes/.agentplane/tasks/202607221849-8YYZ9X/blueprint/resolved-snapshot.json
    - old_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
    - current_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221849-8YYZ9X

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221849-8YYZ9X
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-27T16:35:01.324Z — VERIFY — ok

    By: TESTER

    Note: All deterministic calibration scenarios pass: pass/rework/blocked/human_review provenance, stale revision rejection, success and failure-path no-write enforcement, and safe provider-failure classification. Typecheck, lint, compatibility ratchet, assets, docs, and policy routing pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T16:34:21.693Z, excerpt_hash=sha256:520611ddb34ae6455bc539b221ce9f07a6ffba8eade3a225423af7361407c138

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-8YYZ9X-execute-and-calibrate-evaluator-episodes/.agentplane/tasks/202607221849-8YYZ9X/blueprint/resolved-snapshot.json
    - old_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
    - current_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221849-8YYZ9X

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

    ### 2026-07-27T17:01:13.971Z — VERIFY — ok

    By: TESTER

    Note: Reverification after the hosted critical-CI fix: critical-cli suite now accepts the reviewed 253commands/174args/813options surface; compatibility ratchet remains green. No production behavior changed beyond the tested expectation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T16:56:37.930Z, excerpt_hash=sha256:520611ddb34ae6455bc539b221ce9f07a6ffba8eade3a225423af7361407c138

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-8YYZ9X-execute-and-calibrate-evaluator-episodes/.agentplane/tasks/202607221849-8YYZ9X/blueprint/resolved-snapshot.json
    - old_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
    - current_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221849-8YYZ9X

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
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: Codex provider exited while parsing its local model cache; AgentPlane surfaced provider stderr as E_INTERNAL.
      Impact: The episode correctly did not apply a result, but the caller cannot distinguish provider availability and receives provider internals.
      Resolution: Classify provider launch failures as E_RUNTIME, withhold raw stderr, add regression coverage, then rerun one fresh episode.

    - Observation: One real Codex provider attempt was made against the frozen commit. It terminated in the local Codex model-cache parser before any typed result; no quality state was applied.
      Impact: Live provider quality remains externally unavailable until the local Codex cache is repaired, but AgentPlane now returns E_RUNTIME without raw provider diagnostics and preserves workspace/result safety.
      Resolution: Do not retry while the provider environment is unchanged; rerun a fresh read-only episode after the Codex cache repair.

    - Observation: The earlier hosted failure was a stale expected count in the critical baseline, not a compatibility-ratchet regression.
      Impact: The hosted gate now evaluates the intended RF-12b public CLI surface.
      Resolution: Publish this exact head and require a fresh hosted run before integration.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T15:41:01.436Z"
        authorityDigest: "sha256:5e0af3b7002d7541010ab6fd5d314073627612e04c5537f7decc99a34eace50c"
        digest: "sha256:a77ead1fb848ed4f29fcad3ba6dfae657b9b6146ff3376bc0709001b5ba6d676"
        operationDigest: "sha256:1b1ad54abbd2f3dc6f1996c7f819dfa4d2a90a5a3a6d3ab372ad407e63009121"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:f895a0e405b3b1a8ff568566ab08bad61f1c57a3cffab8f4601541b48dff030d"
      -
        actor: "USER"
        at: "2026-07-27T16:37:23.771Z"
        authorityDigest: "sha256:202f096abe8e9099066c90438fbaba46a2135eabd52faaf260bb77d5dd18f523"
        digest: "sha256:354e2d2f1d9c021b7593a2b404fa8676c1b86e39ee9a5e54c06f1bd2955a4d52"
        operationDigest: "sha256:60a6267cd2ff73e57c8aa660b47d61ff6d7590c44c0935f028958599a2b0382b"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:a77ead1fb848ed4f29fcad3ba6dfae657b9b6146ff3376bc0709001b5ba6d676"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:1cbdbfe8a260da60f62db85dfc75e378da2a7043536e0f9717bfdb87f6804a3d"
      -
        actor: "USER"
        at: "2026-07-27T16:39:07.254Z"
        authorityDigest: "sha256:10a8a52a645dd6d415c4e190ef6874cc6b2c66b91339e78b6d426865fc5a7553"
        digest: "sha256:06700b369c93d91cc1c206fd2b164b28f09364a1c4581f8ae8cfad0760cadb09"
        operationDigest: "sha256:e0188f083b20332e6e352552c173a7edb74d2c29e3ca87dd2e410a72d657f429"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:354e2d2f1d9c021b7593a2b404fa8676c1b86e39ee9a5e54c06f1bd2955a4d52"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:549bd4ac0b3eaa7344be764bcb4491b14185bd6ddca11fada50c57fd8c9aa7b9"
      -
        actor: "USER"
        at: "2026-07-27T16:44:18.994Z"
        authorityDigest: "sha256:be7856b7f59921709b81f1d9327f441ae5940269eeb5ccc17f9ec552d433affb"
        digest: "sha256:87a84052a57ab450433caad00ae89b2a59be2dca85902fe94b2230cd2aacf564"
        operationDigest: "sha256:4e4f360d303429a9b6978558d75d0f89fac5ed92177c1f0a8684bc9df7664f6b"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:06700b369c93d91cc1c206fd2b164b28f09364a1c4581f8ae8cfad0760cadb09"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:e729edec3d861dd039b5cd9058b74e006a171004fe8c8b640ed74ba342426c66"
      -
        actor: "USER"
        at: "2026-07-27T16:54:15.023Z"
        authorityDigest: "sha256:08226e37f65958b672688058b76e84d43ab084aee10e77a84198b26189ca3781"
        digest: "sha256:b697ab3988c5c85cbf351e0fdfbd90c6f61c2f6836851e005f91a271d4993b3c"
        operationDigest: "sha256:e0188f083b20332e6e352552c173a7edb74d2c29e3ca87dd2e410a72d657f429"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:87a84052a57ab450433caad00ae89b2a59be2dca85902fe94b2230cd2aacf564"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:2b755186ddc34abc74a1fc8fb2dd2f6c1e27ded2758ffdd01e84a094fe475042"
      -
        actor: "USER"
        at: "2026-07-27T16:55:49.109Z"
        authorityDigest: "sha256:defebd713c2c993856d50ccc8aff8aeb6e220db023c290f8386df3854c830ce9"
        digest: "sha256:e6be0deb2bb243715b500c0a4a6de7a7c9440fa94e6154c9d8496a9257c99247"
        operationDigest: "sha256:531df2dc6e76e23a19a6aeda1c74ff55e46effbe7bd8a5e9012274ca88667537"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:b697ab3988c5c85cbf351e0fdfbd90c6f61c2f6836851e005f91a271d4993b3c"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:1504f0ee1df7520d86ad8a97316ccf6a24bad9a95368d84e2796d23804294b93"
      -
        actor: "USER"
        at: "2026-07-27T16:57:20.906Z"
        authorityDigest: "sha256:bae569c18ec2ce5cca7c80b5d270672f0c5ad7c9b72a36617c9e92df97ae1737"
        digest: "sha256:b4c0ad8f71a1c8a9f7d0576501b221f3332961382274b50e89b21b9f528ad875"
        operationDigest: "sha256:4e4f360d303429a9b6978558d75d0f89fac5ed92177c1f0a8684bc9df7664f6b"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:e6be0deb2bb243715b500c0a4a6de7a7c9440fa94e6154c9d8496a9257c99247"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:7c8e5460065fb229b4822805c8787b340bff6b62cf6c7d733a86304f6bf658ec"
      -
        actor: "USER"
        at: "2026-07-27T17:02:05.592Z"
        authorityDigest: "sha256:b5b213766e604abc2f8bbfbc413977d4233c2b186060665febb9875ffcd97095"
        digest: "sha256:02ce23901265c63049aacaa9c176316928726a99307a07d854dd63e023d55d6f"
        operationDigest: "sha256:531df2dc6e76e23a19a6aeda1c74ff55e46effbe7bd8a5e9012274ca88667537"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:b4c0ad8f71a1c8a9f7d0576501b221f3332961382274b50e89b21b9f528ad875"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:5ecae3ccf0c678d658a836abac01874f393a571ac99c4e7059616e902addd728"
      -
        actor: "USER"
        at: "2026-07-27T17:03:15.520Z"
        authorityDigest: "sha256:f14a4e7ea3013d2368f51117a4aaee19ebf9f97bf8c7223cea6a2deb93abd015"
        digest: "sha256:75f6517e7192efe4805f5925ef2f919afa6abb669bcb1b700b171606fc696fef"
        operationDigest: "sha256:4e4f360d303429a9b6978558d75d0f89fac5ed92177c1f0a8684bc9df7664f6b"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:02ce23901265c63049aacaa9c176316928726a99307a07d854dd63e023d55d6f"
        schemaVersion: 1
        sequence: 9
        stateFingerprintDigest: "sha256:9e97451cdc27686eefff5cc4e4a4e38ecbb098ed8515cce37c522c676d8b943c"
    grants:
      -
        actor: "USER"
        digest: "sha256:5e0af3b7002d7541010ab6fd5d314073627612e04c5537f7decc99a34eace50c"
        expiresAt: "2026-07-27T15:56:01.436Z"
        id: "authority-6a79b910-61ff-4d0c-8ade-44dc910205fa"
        issuedAt: "2026-07-27T15:41:01.436Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:1b1ad54abbd2f3dc6f1996c7f819dfa4d2a90a5a3a6d3ab372ad407e63009121"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f895a0e405b3b1a8ff568566ab08bad61f1c57a3cffab8f4601541b48dff030d"
        stateScopeDigest: "sha256:20a01e4c833c85b6d2cd63c6ca38a542039710cbc923772f5b3190f03d7e58f3"
      -
        actor: "USER"
        digest: "sha256:202f096abe8e9099066c90438fbaba46a2135eabd52faaf260bb77d5dd18f523"
        expiresAt: "2026-07-27T16:52:23.771Z"
        id: "authority-d2c66416-bc45-498e-9ac7-fc8a51ae8994"
        issuedAt: "2026-07-27T16:37:23.771Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:60a6267cd2ff73e57c8aa660b47d61ff6d7590c44c0935f028958599a2b0382b"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:1cbdbfe8a260da60f62db85dfc75e378da2a7043536e0f9717bfdb87f6804a3d"
        stateScopeDigest: "sha256:f560040e44adf0abed4040a6fc3518951777039e443a59dc09995fd2a86a8122"
      -
        actor: "USER"
        digest: "sha256:10a8a52a645dd6d415c4e190ef6874cc6b2c66b91339e78b6d426865fc5a7553"
        expiresAt: "2026-07-27T16:54:07.254Z"
        id: "authority-1402cb40-2487-4805-bfb2-e58b0374a3df"
        issuedAt: "2026-07-27T16:39:07.254Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:e0188f083b20332e6e352552c173a7edb74d2c29e3ca87dd2e410a72d657f429"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:549bd4ac0b3eaa7344be764bcb4491b14185bd6ddca11fada50c57fd8c9aa7b9"
        stateScopeDigest: "sha256:7a39401e32db7c9bcf42959d762c954374b7048dadb556cddbdb429886b974b5"
      -
        actor: "USER"
        digest: "sha256:be7856b7f59921709b81f1d9327f441ae5940269eeb5ccc17f9ec552d433affb"
        expiresAt: "2026-07-27T16:59:18.994Z"
        id: "authority-f0914704-7ea6-4fec-81d4-1c4729297a71"
        issuedAt: "2026-07-27T16:44:18.994Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4e4f360d303429a9b6978558d75d0f89fac5ed92177c1f0a8684bc9df7664f6b"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e729edec3d861dd039b5cd9058b74e006a171004fe8c8b640ed74ba342426c66"
        stateScopeDigest: "sha256:d07af9313446d3613e5b1795a7e8d1afe0a53d886b27f87e34f22b8c61d8b98d"
      -
        actor: "USER"
        digest: "sha256:08226e37f65958b672688058b76e84d43ab084aee10e77a84198b26189ca3781"
        expiresAt: "2026-07-27T17:09:15.023Z"
        id: "authority-6b71abd3-a578-4f0a-89ae-c3bdbbdc4ba3"
        issuedAt: "2026-07-27T16:54:15.023Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:e0188f083b20332e6e352552c173a7edb74d2c29e3ca87dd2e410a72d657f429"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:2b755186ddc34abc74a1fc8fb2dd2f6c1e27ded2758ffdd01e84a094fe475042"
        stateScopeDigest: "sha256:6ad56bb15f7d4fc8eb3266a58d03798e938f7d608ba608c2cd0df9b804beb54a"
      -
        actor: "USER"
        digest: "sha256:defebd713c2c993856d50ccc8aff8aeb6e220db023c290f8386df3854c830ce9"
        expiresAt: "2026-07-27T17:10:49.109Z"
        id: "authority-b77ff5cc-4df9-4e6c-952b-deebcfe519ce"
        issuedAt: "2026-07-27T16:55:49.109Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:531df2dc6e76e23a19a6aeda1c74ff55e46effbe7bd8a5e9012274ca88667537"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:1504f0ee1df7520d86ad8a97316ccf6a24bad9a95368d84e2796d23804294b93"
        stateScopeDigest: "sha256:1a13c30644a7e3d423c2c675ab47509cec2510abec5c701ef59f2557d6763596"
      -
        actor: "USER"
        digest: "sha256:bae569c18ec2ce5cca7c80b5d270672f0c5ad7c9b72a36617c9e92df97ae1737"
        expiresAt: "2026-07-27T17:12:20.906Z"
        id: "authority-b081c7d8-ee1b-4bc4-a0eb-03e97a2f0e00"
        issuedAt: "2026-07-27T16:57:20.906Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4e4f360d303429a9b6978558d75d0f89fac5ed92177c1f0a8684bc9df7664f6b"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:7c8e5460065fb229b4822805c8787b340bff6b62cf6c7d733a86304f6bf658ec"
        stateScopeDigest: "sha256:ac790b26f1c79252262c3aa1b3b3200f34df87e4772f146be1340afe73438091"
      -
        actor: "USER"
        digest: "sha256:b5b213766e604abc2f8bbfbc413977d4233c2b186060665febb9875ffcd97095"
        expiresAt: "2026-07-27T17:17:05.592Z"
        id: "authority-c2cefd7f-f4a1-41a8-a62d-4410fd29952f"
        issuedAt: "2026-07-27T17:02:05.592Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:531df2dc6e76e23a19a6aeda1c74ff55e46effbe7bd8a5e9012274ca88667537"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:5ecae3ccf0c678d658a836abac01874f393a571ac99c4e7059616e902addd728"
        stateScopeDigest: "sha256:b4a2a36e67a6873b3d243a08dd4835b3f9f3a73a21a5b58416f2e14e6f9ed598"
      -
        actor: "USER"
        digest: "sha256:f14a4e7ea3013d2368f51117a4aaee19ebf9f97bf8c7223cea6a2deb93abd015"
        expiresAt: "2026-07-27T17:18:15.520Z"
        id: "authority-a01a2024-14e4-4a57-87aa-81b5d0cbc806"
        issuedAt: "2026-07-27T17:03:15.520Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4e4f360d303429a9b6978558d75d0f89fac5ed92177c1f0a8684bc9df7664f6b"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:9e97451cdc27686eefff5cc4e4a4e38ecbb098ed8515cce37c522c676d8b943c"
        stateScopeDigest: "sha256:6aa0ca7e68c0d3ed48735ebeec5dd7e70dde7240e1d2d55298973acbc395b002"
    schemaVersion: 1
  implementation_commit:
    hash: "665d84dd02d38c4bb9b7f870288198d00fb1266a"
    message: "🐛 8YYZ9X task: refresh critical compatibility expectation"
  workflow_route_baseline:
    start_head_sha: "8c863087669ef21c562e8c230e851bc94a12e8a4"
    version: 1
id_source: "generated"
---
## Summary

Execute and calibrate EVALUATOR episodes

RF-12b: launch a read-only EVALUATOR against the prepared work order, apply its typed result, turn rework into the next semantic episode, and calibrate human escalation on golden scenarios.

## Scope

- In scope: evaluator adapter invocation, result application, rework/blocked/human-review transitions, evidence-linked findings, stale-result rejection, no-write enforcement, calibration fixtures, and human escalation policy.
- Out of scope: a general benchmarking product; full evaluation-platform work remains outside the 0.7 task-level safety primitive.

## Plan

1. Invoke EVALUATOR with the prepared read-only AgentWorkOrder and result schema.
2. Validate/apply the result through the typed boundary.
3. Convert rework into a bounded next semantic work order and blocked/human uncertainty into explicit steps.
4. Build calibration fixtures covering false pass, false rework, missing evidence, context reconciliation, and ambiguous acceptance.
5. Tune escalation policy without deterministic semantic heuristics.

## Verify Steps

1. Run pass, rework, blocked, and human-review fixtures. Expected: the verdict originates only in EvaluatorSgrResult and each transition preserves evidence provenance.
2. Change evaluated SHA or task revision after invocation. Expected: apply rejects the stale result.
3. Attempt an evaluator filesystem mutation. Expected: sandbox/receipt policy makes the episode unacceptable.
4. Run calibration scenarios repeatedly. Expected: ambiguous or weak-evidence cases escalate; no router heuristic supplies a verdict.
5. Run focused evaluator tests, workflow coverage, lifecycle invariants, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-27T16:25:58.504Z — VERIFY — needs_rework

By: TESTER

Note: Focused calibration, compatibility, type, lint, build, and critical CLI checks pass; the real read-only Codex episode failed before a typed response.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T16:23:44.418Z, excerpt_hash=sha256:520611ddb34ae6455bc539b221ce9f07a6ffba8eade3a225423af7361407c138

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-8YYZ9X-execute-and-calibrate-evaluator-episodes/.agentplane/tasks/202607221849-8YYZ9X/blueprint/resolved-snapshot.json
- old_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
- current_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221849-8YYZ9X

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221849-8YYZ9X
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-27T16:35:01.324Z — VERIFY — ok

By: TESTER

Note: All deterministic calibration scenarios pass: pass/rework/blocked/human_review provenance, stale revision rejection, success and failure-path no-write enforcement, and safe provider-failure classification. Typecheck, lint, compatibility ratchet, assets, docs, and policy routing pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T16:34:21.693Z, excerpt_hash=sha256:520611ddb34ae6455bc539b221ce9f07a6ffba8eade3a225423af7361407c138

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-8YYZ9X-execute-and-calibrate-evaluator-episodes/.agentplane/tasks/202607221849-8YYZ9X/blueprint/resolved-snapshot.json
- old_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
- current_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221849-8YYZ9X

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

### 2026-07-27T17:01:13.971Z — VERIFY — ok

By: TESTER

Note: Reverification after the hosted critical-CI fix: critical-cli suite now accepts the reviewed 253commands/174args/813options surface; compatibility ratchet remains green. No production behavior changed beyond the tested expectation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T16:56:37.930Z, excerpt_hash=sha256:520611ddb34ae6455bc539b221ce9f07a6ffba8eade3a225423af7361407c138

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-8YYZ9X-execute-and-calibrate-evaluator-episodes/.agentplane/tasks/202607221849-8YYZ9X/blueprint/resolved-snapshot.json
- old_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
- current_digest: 4a11775235c3ab0f2b415162964bf85f45ac4b86e2fe6f2771b669c5d0f8463f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221849-8YYZ9X

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

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: Codex provider exited while parsing its local model cache; AgentPlane surfaced provider stderr as E_INTERNAL.
  Impact: The episode correctly did not apply a result, but the caller cannot distinguish provider availability and receives provider internals.
  Resolution: Classify provider launch failures as E_RUNTIME, withhold raw stderr, add regression coverage, then rerun one fresh episode.

- Observation: One real Codex provider attempt was made against the frozen commit. It terminated in the local Codex model-cache parser before any typed result; no quality state was applied.
  Impact: Live provider quality remains externally unavailable until the local Codex cache is repaired, but AgentPlane now returns E_RUNTIME without raw provider diagnostics and preserves workspace/result safety.
  Resolution: Do not retry while the provider environment is unchanged; rerun a fresh read-only episode after the Codex cache repair.

- Observation: The earlier hosted failure was a stale expected count in the critical baseline, not a compatibility-ratchet regression.
  Impact: The hosted gate now evaluates the intended RF-12b public CLI surface.
  Resolution: Publish this exact head and require a fresh hosted run before integration.
