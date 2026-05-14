---
id: "202605141954-8DZF9S"
title: "Polish OSS website trust surface"
result_summary: "Merged via PR #3762."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T19:54:27.192Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T20:06:18.546Z"
  updated_by: "CODER"
  note: "Website OSS polish verified: content guard, typecheck, production build, routing check, doctor, targeted script lint, and rendered HTML grep passed."
  attempts: 0
commit:
  hash: "ade0697b8275882816e1862a8b12bcc1496f5d3f"
  message: "Merge pull request #3762 from basilisk-labs/task/202605141954-8DZF9S/oss-website-polish"
comments:
  -
    author: "CODER"
    body: "Start: implement the approved OSS website polish in the dedicated branch_pr worktree, keeping scope to public website/docs surfaces and focused guards."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3762 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T19:54:35.790Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved OSS website polish in the dedicated branch_pr worktree, keeping scope to public website/docs surfaces and focused guards."
  -
    type: "verify"
    at: "2026-05-14T20:06:18.546Z"
    author: "CODER"
    state: "ok"
    note: "Website OSS polish verified: content guard, typecheck, production build, routing check, doctor, targeted script lint, and rendered HTML grep passed."
  -
    type: "status"
    at: "2026-05-14T20:22:00.879Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3762 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T20:22:00.885Z"
doc_updated_by: "INTEGRATOR"
description: "Fix the public website OSS trust surface: command snippets, install CTA whitespace, Docusaurus edit links, future-dated blog guard, hero trust strip, footer open-source links, and comparison wording without a broad redesign."
sections:
  Summary: |-
    Polish OSS website trust surface

    Fix the public website OSS trust surface: command snippets, install CTA whitespace, Docusaurus edit links, future-dated blog guard, hero trust strip, footer open-source links, and comparison wording without a broad redesign.
  Scope: |-
    - In scope: Fix the public website OSS trust surface: command snippets, install CTA whitespace, Docusaurus edit links, future-dated blog guard, hero trust strip, footer open-source links, and comparison wording without a broad redesign.
    - Out of scope: unrelated refactors not required for "Polish OSS website trust surface".
  Plan: "1. Create a branch_pr worktree for CODER-owned website/docs changes. 2. Inspect current Docusaurus website entrypoints, homepage data, footer/nav config, blog listing code, compare docs, and existing scripts/tests. 3. Fix obvious website bugs: command block rendering/copy text, install CTA whitespace, edit links, and future-dated blog exposure. 4. Add minimal OSS trust signals to the landing surface and footer without redesigning layout. 5. Clarify comparison/cloud wording and add a concise use/not-use section if it fits existing structure. 6. Add focused guard coverage for future dates and bad homepage command snippets where the repo has an appropriate script/test surface. 7. Run targeted docs-site checks plus required AgentPlane routing/doctor checks; record verification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Polish OSS website trust surface". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Polish OSS website trust surface". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T20:06:18.546Z — VERIFY — ok

    By: CODER

    Note: Website OSS polish verified: content guard, typecheck, production build, routing check, doctor, targeted script lint, and rendered HTML grep passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T19:54:35.790Z, excerpt_hash=sha256:c0ae904cdd7528942daa402e92e6fc7c017819bc5fbe097066aecaba1a5c3bd6

    Details:

    Passed: bun run --cwd website check-content; bun run docs:site:typecheck; bun run docs:site:build; node .agentplane/policy/check-routing.mjs; ap doctor; bunx eslint website/scripts/check-site-content.mjs; rendered/source grep for , trailing install whitespace, bad AgentPlane.org wording, future v0.6 blog filename, and malformed edit URLs. Residual: full lint:website remains blocked by pre-existing typed-eslint errors in Docusaurus theme/homepage files outside this task; targeted new guard lint passed. Build warning was limited to existing vscode-languageserver dynamic require; doctor warnings were pre-existing branch_pr state drift unrelated to this task.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141954-8DZF9S-oss-website-polish/.agentplane/tasks/202605141954-8DZF9S/blueprint/resolved-snapshot.json
    - old_digest: 37b5264211929e25363ca400422051edebf12fa46463a05c6115caceac8d04f4
    - current_digest: 37b5264211929e25363ca400422051edebf12fa46463a05c6115caceac8d04f4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141954-8DZF9S

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Polish OSS website trust surface

Fix the public website OSS trust surface: command snippets, install CTA whitespace, Docusaurus edit links, future-dated blog guard, hero trust strip, footer open-source links, and comparison wording without a broad redesign.

## Scope

- In scope: Fix the public website OSS trust surface: command snippets, install CTA whitespace, Docusaurus edit links, future-dated blog guard, hero trust strip, footer open-source links, and comparison wording without a broad redesign.
- Out of scope: unrelated refactors not required for "Polish OSS website trust surface".

## Plan

1. Create a branch_pr worktree for CODER-owned website/docs changes. 2. Inspect current Docusaurus website entrypoints, homepage data, footer/nav config, blog listing code, compare docs, and existing scripts/tests. 3. Fix obvious website bugs: command block rendering/copy text, install CTA whitespace, edit links, and future-dated blog exposure. 4. Add minimal OSS trust signals to the landing surface and footer without redesigning layout. 5. Clarify comparison/cloud wording and add a concise use/not-use section if it fits existing structure. 6. Add focused guard coverage for future dates and bad homepage command snippets where the repo has an appropriate script/test surface. 7. Run targeted docs-site checks plus required AgentPlane routing/doctor checks; record verification.

## Verify Steps

PLANNER fallback scaffold for "Polish OSS website trust surface". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Polish OSS website trust surface". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T20:06:18.546Z — VERIFY — ok

By: CODER

Note: Website OSS polish verified: content guard, typecheck, production build, routing check, doctor, targeted script lint, and rendered HTML grep passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T19:54:35.790Z, excerpt_hash=sha256:c0ae904cdd7528942daa402e92e6fc7c017819bc5fbe097066aecaba1a5c3bd6

Details:

Passed: bun run --cwd website check-content; bun run docs:site:typecheck; bun run docs:site:build; node .agentplane/policy/check-routing.mjs; ap doctor; bunx eslint website/scripts/check-site-content.mjs; rendered/source grep for , trailing install whitespace, bad AgentPlane.org wording, future v0.6 blog filename, and malformed edit URLs. Residual: full lint:website remains blocked by pre-existing typed-eslint errors in Docusaurus theme/homepage files outside this task; targeted new guard lint passed. Build warning was limited to existing vscode-languageserver dynamic require; doctor warnings were pre-existing branch_pr state drift unrelated to this task.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141954-8DZF9S-oss-website-polish/.agentplane/tasks/202605141954-8DZF9S/blueprint/resolved-snapshot.json
- old_digest: 37b5264211929e25363ca400422051edebf12fa46463a05c6115caceac8d04f4
- current_digest: 37b5264211929e25363ca400422051edebf12fa46463a05c6115caceac8d04f4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141954-8DZF9S

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
