---
id: "202602081552-V7N76M"
title: "Spike: review open GitHub PRs"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "spike"
  - "github"
  - "review"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T15:53:23.165Z"
  updated_by: "ORCHESTRATOR"
  note: "Spike Notes template present; plan approved to begin read-only GitHub PR review."
verification:
  state: "ok"
  updated_at: "2026-02-08T15:58:49.396Z"
  updated_by: "ORCHESTRATOR"
  note: "Reviewed open PRs #1 and #2; findings and decisions recorded in Notes."
commit:
  hash: "4855ed300d1589e4943a8982534949d30b737fd8"
  message: "✅ A43H23 close: Persist finish metadata fields in task README frontmatter (202602081548-A43H23) [cli,code,tasks]"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: reviewing open GitHub PRs (read-only) and producing include/skip/defer recommendations with risks and follow-ups."
  -
    author: "ORCHESTRATOR"
    body: "Verified: reviewed PRs #1 and #2 (both conflict + huge diff); recorded include/skip/defer recommendations and follow-ups in Notes."
events:
  -
    type: "status"
    at: "2026-02-08T15:53:37.385Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: reviewing open GitHub PRs (read-only) and producing include/skip/defer recommendations with risks and follow-ups."
  -
    type: "verify"
    at: "2026-02-08T15:58:49.396Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Reviewed open PRs #1 and #2; findings and decisions recorded in Notes."
  -
    type: "status"
    at: "2026-02-08T15:58:54.341Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: reviewed PRs #1 and #2 (both conflict + huge diff); recorded include/skip/defer recommendations and follow-ups in Notes."
doc_version: 2
doc_updated_at: "2026-02-08T15:58:54.341Z"
doc_updated_by: "ORCHESTRATOR"
description: "Review open GitHub PRs for this repo; summarize what each proposes; recommend include/skip/defer with risks and required follow-ups."
id_source: "generated"
---
## Summary

Read-only review of open GitHub pull requests for this repository; produce per-PR recommendation (include/skip/defer) with risks and required follow-ups.

## Scope


## Plan

Scope: review open GitHub PRs for this repository only; no code changes/merges. Steps: (1) list PRs with gh (number/title/draft/author/updated/CI); (2) for each PR, read description, diffstat, key files, and check results; (3) classify include/skip/defer; (4) record findings + decision + follow-ups in task doc Notes; (5) provide summary to user. Decomposition: single spike task. Approvals: network required (gh). Verification criteria: each open PR has a short proposal summary + recommendation + key risks; if no PRs, state that. Rollback: N/A (read-only).

## Risks

- gh not authenticated or lacks access -> cannot fetch PR details. - Large PR diffs may hide behavior changes; mitigated by focusing on public contract/touch points and CI results. - Repo working tree currently has tracked changes; ensure read-only operations.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T15:58:49.396Z — VERIFY — ok

By: ORCHESTRATOR

Note: Reviewed open PRs #1 and #2; findings and decisions recorded in Notes.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T15:58:17.704Z, excerpt_hash=sha256:df4ef9c3d737e66cffab6c566c0437e4a6b9d9ef4899729630b58d392f9fc37d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

No rollback needed: task is read-only and does not change repository code or GitHub state.

## Verify Steps

Pass criteria: Every open PR has (a) 1-2 sentence proposal summary, (b) recommendation include/skip/defer, (c) key risks and required follow-ups; or explicitly state that there are no open PRs.

## Notes

Findings:\n- Open PRs: #1 (chore: apply safer config defaults), #2 (feat: agent schema validation + tool restrictions + lint CLI).\n- Both PRs are from a fork (isCrossRepository=true) and are currently merge-conflicting (mergeable=CONFLICTING, mergeStateStatus=DIRTY).\n- Both touch >300 files (1080+), so GitHub diff endpoint returns HTTP 406 (diff too_large); signals the branches are based on an old repo state and include many unrelated historical changes (notably .agent-plane/* plus .agentplane/*).\n- PR #1 adds .agentplane/config.json with status_commit_policy=confirm and finish_auto_status_commit=false (already true on current main via config show).\n- PR #2 adds agent JSON Schema + core validation + CLI lint, but also adds .agentplane/config.json with status_commit_policy=warn and finish_auto_status_commit=true and base_branch=main (regresses current safer defaults).\n\nDecision:\n- Do not merge either PR as-is.\n- PR #1: redundant for current main; close or ask for rebase with a minimal diff if something is still missing.\n- PR #2: concept is useful, but must be rebased and split; current PR bundles massive unrelated changes and regresses config defaults.\n\nNext Steps:\n- If you want to accept PR #2 idea: request contributor to rebase onto current main and submit a focused PR containing only agent schema + lint (no repo history cleanup, no config default regressions).\n- Alternatively, implement agent schema + lint internally as a new task, reusing existing AJV config pattern in packages/core/src/config/config.ts.
