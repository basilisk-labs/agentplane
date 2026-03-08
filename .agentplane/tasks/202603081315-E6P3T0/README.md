---
id: "202603081315-E6P3T0"
title: "Write CLI bug report from observed framework workflow failures"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603081315-NV76YZ"
  - "202603081315-H2E5Q5"
  - "202603081315-Y4D6AE"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:04:05.139Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: compiling a release-grade CLI defect ledger from observed framework workflow failures, with evidence, shipped fixes, and remaining gaps before the next patch release."
events:
  -
    type: "status"
    at: "2026-03-08T14:04:05.685Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: compiling a release-grade CLI defect ledger from observed framework workflow failures, with evidence, shipped fixes, and remaining gaps before the next patch release."
doc_version: 3
doc_updated_at: "2026-03-08T14:07:28.482Z"
doc_updated_by: "DOCS"
description: "Capture the concrete CLI bugs observed in this session, classify their causes, and propose fixes or safeguards so the next patch release has an explicit defect ledger."
id_source: "generated"
---
## Summary

- Problem: several concrete `agentplane` CLI failures were discovered while stabilizing the framework workflow, but the repository does not yet keep one explicit defect ledger that separates shipped fixes from still-open operational gaps.
- Target outcome: add a developer-facing bug report that lists observed CLI bugs from this session, classifies root causes, records shipped fixes, and highlights the weakest remaining gaps before the next patch release.
- Constraint: only include issues that are evidenced by this repository history and session work; do not pad the report with speculative defects.

## Scope

### In scope
- Gather concrete CLI bugs and process gaps encountered during this session and recent framework stabilization work.
- Classify them by failure class, root cause, shipped fix, and remaining weakness.
- Publish the ledger in developer docs and make it reachable from the docs navigation.

### Out of scope
- Implementing every remaining improvement described by the report.
- Non-CLI website/design issues unless they were caused by CLI or release tooling behavior.

## Plan

1. Review the observed CLI failures from this session and the corresponding task/readme history, then separate fixed defects from still-open gaps.
2. Write a developer-facing bug ledger that records symptom, hidden premise, root cause, shipped fix, and remaining improvement path for each bug class.
3. Link the ledger into docs navigation, run docs checks, and close the task with traceable verification evidence.

## Verify Steps

1. Open the new bug ledger document. Expected: every listed bug includes symptom, root cause, shipped fix status, and a remaining gap or next step.
2. Cross-check each entry against repository evidence from tasks, commits, or current code. Expected: the report does not rely on unsupported memory-only claims.
3. Run `bun run docs:site:check`. Expected: the new developer doc and navigation changes build cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the bug ledger doc and navigation updates.
2. Re-run docs checks to confirm the developer docs surface returns to the previous state.

## Findings

- Observation: the shipped fixes cluster into a few repeatable defect classes rather than isolated one-off bugs: observability gaps, state-model mismatches, and nondeterministic write paths.
  Impact: the right next improvements are structural, not cosmetic.
  Resolution: the ledger groups bugs by failure class and explicitly separates shipped fixes from remaining gaps.
  Promotion: tooling
- Observation: after adding `framework.cli.expected_version`, release apply still does not automatically advance that repository expectation on version bump.
  Impact: the repository-owned CLI expectation can drift across future releases unless it is updated manually or taught to the release flow.
  Resolution: captured as a remaining gap in the bug ledger instead of silently widening this task into another release mutation change.
  Promotion: incident-candidate
