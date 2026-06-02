---
id: "202606011811-JSY2B9"
title: "Assimilate task history by version summaries"
result_summary: "Merged via PR #4368."
status: "DONE"
priority: "med"
owner: "CURATOR"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "assimilation"
  - "context"
  - "task-history"
task_kind: "context"
mutation_scope: "context"
blueprint_request: "context.maximum_assimilation"
verify:
  - "ap context reindex --include-raw"
  - "ap context wiki lint context/wiki"
  - "ap context wiki index context/wiki"
  - "ap context graph validate"
  - "ap context verify-task 202606011811-JSY2B9"
  - "ap context doctor"
  - "ap context search task-history-version --format json"
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T18:12:35.922Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T18:50:09.965Z"
  updated_by: "CURATOR"
  note: "Verified: addressed hosted verify-contract formatting failure by running Prettier on context wiki markdown. Re-ran bun run format:check, context wiki lint, context graph validate, context reindex, and context verify-task successfully."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-02T08:51:16.772Z"
  updated_by: "EVALUATOR"
  note: "Task-history version assimilation is complete after report source links were corrected and context projections were reindexed."
  evaluated_sha: "00c16fa611ee1cf098f1fba5e4f2ace51b67f235"
  blueprint_digest: "c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b"
  evidence_refs:
    - ".agentplane/tasks/202606011811-JSY2B9/README.md"
    - ".agentplane/tasks/202606011811-JSY2B9/quality/20260602-085116772-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606011811-JSY2B9/quality/20260602-085116772-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606011811-JSY2B9/quality/20260602-085116772-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606011811-JSY2B9/blueprint/resolved-snapshot.json"
    - "ap context reindex --include-raw"
    - "ap context wiki lint context/wiki"
    - "ap context check"
    - "ap context verify-task 202606011811-JSY2B9"
  findings:
    - "Verified source links now escape context/wiki/reports to the repository root before .agentplane, and context reindex/check/verify-task all pass on commit 00c16fa61."
commit:
  hash: "57a6a61f515a1b75a80d87930a3f7ef99643fca5"
  message: "Merge pull request #4368 from basilisk-labs/task/202606011811-JSY2B9/assimilate-task-history-by-version-summaries"
comments:
  -
    author: "CURATOR"
    body: "Start: build a context-window-aware task-history pre-extraction corpus grouped by versions, assimilate the summaries into context artifacts, and verify coverage, volume, and granularity evidence."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4368 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-01T18:15:00.998Z"
    author: "CURATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: build a context-window-aware task-history pre-extraction corpus grouped by versions, assimilate the summaries into context artifacts, and verify coverage, volume, and granularity evidence."
  -
    type: "verify"
    at: "2026-06-01T18:32:41.326Z"
    author: "CURATOR"
    state: "ok"
    note: "Verified: built version-level task-history pre-extraction packets, applied context extraction into derived facts/graph/coverage, and ran reindex, wiki lint/index, graph validate, context verify-task, context doctor, smoke search, policy routing, and agentplane doctor. Doctor reports pre-existing/mistaken no-op task archive warnings but no errors."
  -
    type: "verify"
    at: "2026-06-01T18:40:45.853Z"
    author: "CURATOR"
    state: "ok"
    note: "Verified: final commit 474e09715 contains version-level task-history pre-extraction packets, context wiki reports, derived facts/graph/coverage rows, and task artifacts. Re-ran context reindex, wiki lint/index, graph validate, context verify-task, context doctor, smoke search, and policy routing after PR artifact refresh."
  -
    type: "verify"
    at: "2026-06-01T18:50:09.965Z"
    author: "CURATOR"
    state: "ok"
    note: "Verified: addressed hosted verify-contract formatting failure by running Prettier on context wiki markdown. Re-ran bun run format:check, context wiki lint, context graph validate, context reindex, and context verify-task successfully."
  -
    type: "status"
    at: "2026-06-02T09:03:00.452Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4368 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-02T09:03:00.460Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare context-window-aware pre-extraction packets for historical AgentPlane task history, collapse older low-importance tasks into version-level summaries with coverage markers, assimilate the summaries into context wiki/report artifacts, and report original versus assimilated volume, assimilation degree, and granularity."
sections:
  Summary: |-
    Assimilate task history by version summaries

    Prepare context-window-aware pre-extraction packets for historical AgentPlane task history, collapse older low-importance tasks into version-level summaries with coverage markers, assimilate the summaries into context wiki/report artifacts, and report original versus assimilated volume, assimilation degree, and granularity.
  Scope: |-
    - In scope: Prepare context-window-aware pre-extraction packets for historical AgentPlane task history, collapse older low-importance tasks into version-level summaries with coverage markers, assimilate the summaries into context wiki/report artifacts, and report original versus assimilated volume, assimilation degree, and granularity.
    - Out of scope: unrelated refactors not required for "Assimilate task history by version summaries".
  Plan: |-
    1. Build a deterministic task-history pre-extraction dataset grouped by release/version ranges from local task READMEs, ACRs, PR artifacts, git tags, and git history, without copying secrets or non-publishable spans.
    2. Score task importance before LLM-style assimilation using tags, task kind, mutation scope, touched paths, release/policy/context/runner surfaces, incidents/findings, PR artifacts, and repeated workflow/failure signals.
    3. Write compact version packets under context/wiki/reports and durable report/coverage artifacts under .agentplane/context/derived/reports, preserving source refs and coverage states for every selected historical task.
    4. Assimilate the packets into source-backed context wiki pages/facts/graph rows at version/theme granularity rather than one page per task.
    5. Report original source volume, assimilated volume, compression ratio, coverage/assimilation degree, and resulting granularity; record residual gaps explicitly.
    6. Run context reindex, wiki lint/index, graph validate, context verify-task, doctor, and smoke search; record verification evidence.
  Verify Steps: |-
    1. Run ap context reindex --include-raw. Expected: context projection rebuilds successfully.
    2. Run ap context wiki lint context/wiki. Expected: wiki pages remain schema-valid.
    3. Run ap context wiki index context/wiki. Expected: index refresh succeeds.
    4. Run ap context graph validate. Expected: graph rows are structurally valid.
    5. Run ap context verify-task 202606011811-JSY2B9. Expected: context task source_set, coverage, graph, glossary, and maximum-assimilation gates pass.
    6. Run ap context doctor. Expected: no blocking context health issues.
    7. Run ap context search task-history-version --format json. Expected: assimilated version-level artifacts are discoverable.
    8. Inspect .agentplane/context/derived/reports/task-history-version-preextract.json. Expected: original volume, assimilated volume, coverage degree, and granularity metrics are present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T18:32:41.326Z — VERIFY — ok

    By: CURATOR

    Note: Verified: built version-level task-history pre-extraction packets, applied context extraction into derived facts/graph/coverage, and ran reindex, wiki lint/index, graph validate, context verify-task, context doctor, smoke search, policy routing, and agentplane doctor. Doctor reports pre-existing/mistaken no-op task archive warnings but no errors.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T18:23:06.061Z, excerpt_hash=sha256:1ee1a183c61d810de6974bb38945e5787e9e0963590b40d636506f5c8d3a9921

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011811-JSY2B9-assimilate-task-history-by-version-summaries/.agentplane/tasks/202606011811-JSY2B9/blueprint/resolved-snapshot.json
    - old_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
    - current_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606011811-JSY2B9

    ### 2026-06-01T18:40:45.853Z — VERIFY — ok

    By: CURATOR

    Note: Verified: final commit 474e09715 contains version-level task-history pre-extraction packets, context wiki reports, derived facts/graph/coverage rows, and task artifacts. Re-ran context reindex, wiki lint/index, graph validate, context verify-task, context doctor, smoke search, and policy routing after PR artifact refresh.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T18:32:41.436Z, excerpt_hash=sha256:1ee1a183c61d810de6974bb38945e5787e9e0963590b40d636506f5c8d3a9921

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011811-JSY2B9-assimilate-task-history-by-version-summaries/.agentplane/tasks/202606011811-JSY2B9/blueprint/resolved-snapshot.json
    - old_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
    - current_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606011811-JSY2B9

    ### 2026-06-01T18:50:09.965Z — VERIFY — ok

    By: CURATOR

    Note: Verified: addressed hosted verify-contract formatting failure by running Prettier on context wiki markdown. Re-ran bun run format:check, context wiki lint, context graph validate, context reindex, and context verify-task successfully.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T18:40:45.907Z, excerpt_hash=sha256:1ee1a183c61d810de6974bb38945e5787e9e0963590b40d636506f5c8d3a9921

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011811-JSY2B9-assimilate-task-history-by-version-summaries/.agentplane/tasks/202606011811-JSY2B9/blueprint/resolved-snapshot.json
    - old_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
    - current_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606011811-JSY2B9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Original counted source volume: 2945 task READMEs, 18,995,698 README bytes, 236 ACR files, 1,388,085 ACR bytes, and 5,377 PR artifact files. Assimilated output: 66 version buckets, 71,792-byte version packet, 81,848 bytes of wiki report artifacts, 2,959 coverage rows, 12 facts, 19 graph entities, and 21 graph edges.
      Impact: Coverage degree is 100% at task README level through version buckets and coverage rows; semantic granularity is version -> topic -> important task -> task coverage row. Current importance scorer marks 1,492 deep-extract candidates and collapses 152 low-importance tasks as boilerplate.
      Resolution: Future deep assimilation should focus on score 5 clusters for release, branch_pr, context, runner, and policy surfaces instead of loading the full raw task history.

    - Observation: Original counted source volume: 2,945 task READMEs / 18,995,698 bytes plus 236 ACR files / 1,388,085 bytes. Assimilated artifacts: 66 version buckets, 71,792 bytes of version packets, 81,848 bytes of assimilated wiki pages, 2 facts, 2 graph entities, 1 graph edge, 5 provenance rows, and 2,949 coverage rows. Coverage degree: 1.0; source-to-packet ratio: 283.93:1; source-to-wiki ratio: 249.04:1; granularity: version -> topic -> important task -> coverage row.
      Impact: The task history can now be loaded through compact version packets and graph-backed facts instead of repeatedly ingesting every historical task README into the model context.
      Resolution: Use context/wiki/reports/task-history-version-packets.md for context-window packets, task-history-version-assimilation.md for the method and metrics, task-history-version-coverage.md plus derived coverage JSONL for per-task traceability, and task-history-version-preextract.json for machine-readable volume metrics.

    - Observation: Hosted failure was format:check on 9 context/wiki markdown files. Local format:check now reports all matched files use Prettier code style.
      Impact: PR contract gate should no longer fail on markdown formatting for the generated assimilation wiki pages.
      Resolution: Formatted context/wiki generated reports and indexes with Prettier, then refreshed local context verification.
extensions:
  agentplane.context:
    allowed_outputs:
      - "context/wiki/**"
      - ".agentplane/context/derived/facts/**"
      - ".agentplane/context/derived/graph/**"
      - ".agentplane/context/derived/reports/**"
      - ".agentplane/tasks/${taskId}/README.md"
      - ".agentplane/tasks/${taskId}/acr.json"
    assimilation:
      allow_raw_mutation: false
      detect_contradictions: true
      detect_open_questions: true
      extract_entities: true
      extract_facts: true
      extract_relations: true
      update_wiki: true
    forbidden_outputs:
      - "context/raw/**"
      - ".agentplane/cache.sqlite"
      - ".agentplane/context/service/**"
    mode: "maximum_assimilation"
    schema_version: 1
    source_set:
      files:
        -
          content_type: "text/markdown"
          path: "context/wiki/reports/task-history-version-packets.md"
          sha256: "sha256:c98673a0a267b436cad75ed4e702c528b92913e2d69a28e907d101932a5cc605"
          size_bytes: 77848
        -
          content_type: "text/markdown"
          path: "context/wiki/reports/task-history-preextract-topology.md"
          sha256: "sha256:e61b6a0a8059529e69599a774ac5347714b8ea5d071646b6fe097519d65f0e61"
          size_bytes: 2167
        -
          content_type: "text/markdown"
          path: "context/wiki/reports/task-history-version-assimilation.md"
          sha256: "sha256:56ca9d787c327d41f6c15a3d2fdf6710a8d97308aeeb4879f51878b45ade0efa"
          size_bytes: 2527
        -
          content_type: "text/markdown"
          path: "context/wiki/reports/task-history-version-coverage.md"
          sha256: "sha256:ea14cc50486cc1b1013a72adca31033c586501fa8923bc5e7e88527428b0e929"
          size_bytes: 5382
      generated_at: "2026-06-01T18:22:11.857Z"
      selection: "task-history-version-preextract"
    task_type: "context_assimilation"
    workspace: "context"
id_source: "generated"
---
## Summary

Assimilate task history by version summaries

Prepare context-window-aware pre-extraction packets for historical AgentPlane task history, collapse older low-importance tasks into version-level summaries with coverage markers, assimilate the summaries into context wiki/report artifacts, and report original versus assimilated volume, assimilation degree, and granularity.

## Scope

- In scope: Prepare context-window-aware pre-extraction packets for historical AgentPlane task history, collapse older low-importance tasks into version-level summaries with coverage markers, assimilate the summaries into context wiki/report artifacts, and report original versus assimilated volume, assimilation degree, and granularity.
- Out of scope: unrelated refactors not required for "Assimilate task history by version summaries".

## Plan

1. Build a deterministic task-history pre-extraction dataset grouped by release/version ranges from local task READMEs, ACRs, PR artifacts, git tags, and git history, without copying secrets or non-publishable spans.
2. Score task importance before LLM-style assimilation using tags, task kind, mutation scope, touched paths, release/policy/context/runner surfaces, incidents/findings, PR artifacts, and repeated workflow/failure signals.
3. Write compact version packets under context/wiki/reports and durable report/coverage artifacts under .agentplane/context/derived/reports, preserving source refs and coverage states for every selected historical task.
4. Assimilate the packets into source-backed context wiki pages/facts/graph rows at version/theme granularity rather than one page per task.
5. Report original source volume, assimilated volume, compression ratio, coverage/assimilation degree, and resulting granularity; record residual gaps explicitly.
6. Run context reindex, wiki lint/index, graph validate, context verify-task, doctor, and smoke search; record verification evidence.

## Verify Steps

1. Run ap context reindex --include-raw. Expected: context projection rebuilds successfully.
2. Run ap context wiki lint context/wiki. Expected: wiki pages remain schema-valid.
3. Run ap context wiki index context/wiki. Expected: index refresh succeeds.
4. Run ap context graph validate. Expected: graph rows are structurally valid.
5. Run ap context verify-task 202606011811-JSY2B9. Expected: context task source_set, coverage, graph, glossary, and maximum-assimilation gates pass.
6. Run ap context doctor. Expected: no blocking context health issues.
7. Run ap context search task-history-version --format json. Expected: assimilated version-level artifacts are discoverable.
8. Inspect .agentplane/context/derived/reports/task-history-version-preextract.json. Expected: original volume, assimilated volume, coverage degree, and granularity metrics are present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T18:32:41.326Z — VERIFY — ok

By: CURATOR

Note: Verified: built version-level task-history pre-extraction packets, applied context extraction into derived facts/graph/coverage, and ran reindex, wiki lint/index, graph validate, context verify-task, context doctor, smoke search, policy routing, and agentplane doctor. Doctor reports pre-existing/mistaken no-op task archive warnings but no errors.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T18:23:06.061Z, excerpt_hash=sha256:1ee1a183c61d810de6974bb38945e5787e9e0963590b40d636506f5c8d3a9921

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011811-JSY2B9-assimilate-task-history-by-version-summaries/.agentplane/tasks/202606011811-JSY2B9/blueprint/resolved-snapshot.json
- old_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
- current_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606011811-JSY2B9

### 2026-06-01T18:40:45.853Z — VERIFY — ok

By: CURATOR

Note: Verified: final commit 474e09715 contains version-level task-history pre-extraction packets, context wiki reports, derived facts/graph/coverage rows, and task artifacts. Re-ran context reindex, wiki lint/index, graph validate, context verify-task, context doctor, smoke search, and policy routing after PR artifact refresh.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T18:32:41.436Z, excerpt_hash=sha256:1ee1a183c61d810de6974bb38945e5787e9e0963590b40d636506f5c8d3a9921

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011811-JSY2B9-assimilate-task-history-by-version-summaries/.agentplane/tasks/202606011811-JSY2B9/blueprint/resolved-snapshot.json
- old_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
- current_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606011811-JSY2B9

### 2026-06-01T18:50:09.965Z — VERIFY — ok

By: CURATOR

Note: Verified: addressed hosted verify-contract formatting failure by running Prettier on context wiki markdown. Re-ran bun run format:check, context wiki lint, context graph validate, context reindex, and context verify-task successfully.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T18:40:45.907Z, excerpt_hash=sha256:1ee1a183c61d810de6974bb38945e5787e9e0963590b40d636506f5c8d3a9921

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011811-JSY2B9-assimilate-task-history-by-version-summaries/.agentplane/tasks/202606011811-JSY2B9/blueprint/resolved-snapshot.json
- old_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
- current_digest: c1a287c192fc5edaac90b9ed4f38510fa39f6777571f6382bf32127dc6f1878b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606011811-JSY2B9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Original counted source volume: 2945 task READMEs, 18,995,698 README bytes, 236 ACR files, 1,388,085 ACR bytes, and 5,377 PR artifact files. Assimilated output: 66 version buckets, 71,792-byte version packet, 81,848 bytes of wiki report artifacts, 2,959 coverage rows, 12 facts, 19 graph entities, and 21 graph edges.
  Impact: Coverage degree is 100% at task README level through version buckets and coverage rows; semantic granularity is version -> topic -> important task -> task coverage row. Current importance scorer marks 1,492 deep-extract candidates and collapses 152 low-importance tasks as boilerplate.
  Resolution: Future deep assimilation should focus on score 5 clusters for release, branch_pr, context, runner, and policy surfaces instead of loading the full raw task history.

- Observation: Original counted source volume: 2,945 task READMEs / 18,995,698 bytes plus 236 ACR files / 1,388,085 bytes. Assimilated artifacts: 66 version buckets, 71,792 bytes of version packets, 81,848 bytes of assimilated wiki pages, 2 facts, 2 graph entities, 1 graph edge, 5 provenance rows, and 2,949 coverage rows. Coverage degree: 1.0; source-to-packet ratio: 283.93:1; source-to-wiki ratio: 249.04:1; granularity: version -> topic -> important task -> coverage row.
  Impact: The task history can now be loaded through compact version packets and graph-backed facts instead of repeatedly ingesting every historical task README into the model context.
  Resolution: Use context/wiki/reports/task-history-version-packets.md for context-window packets, task-history-version-assimilation.md for the method and metrics, task-history-version-coverage.md plus derived coverage JSONL for per-task traceability, and task-history-version-preextract.json for machine-readable volume metrics.

- Observation: Hosted failure was format:check on 9 context/wiki markdown files. Local format:check now reports all matched files use Prettier code style.
  Impact: PR contract gate should no longer fail on markdown formatting for the generated assimilation wiki pages.
  Resolution: Formatted context/wiki generated reports and indexes with Prettier, then refreshed local context verification.
