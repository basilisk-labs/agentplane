# AgentPlane EVALUATOR quality review

Use the evaluator module below as binding review procedure.
Do not edit implementation files. Inspect task scope, diff, verification evidence, and residual risk.
Write the final structured review to the report path as JSON matching the requested report shape.

- task_id: 202605281713-EW6N63
- task_readme: .agentplane/tasks/202605281713-EW6N63/README.md
- report_path: .agentplane/tasks/202605281713-EW6N63/quality/20260528-173353022-recovery-context/quality-report.json

Required report fields:
- verdict: pass | rework | blocked | human_review
- summary: concise judgement
- findings: non-empty list for pass/rework/blocked
- evidence_refs: concrete files, checks, PRs, traces, or reports inspected
- missing_tests: tests or checks that should exist but do not
- hidden_assumptions: assumptions the implementation relies on
- residual_risks: known remaining risks

## Evaluator module

---
id: recovery-context
title: Recovery Context Invariant Review
version: 1
status: preview
profile: EVALUATOR
tags:
  - recovery
  - invariants
  - concurrency
---

# Recovery Context Invariant Review

Use this evaluator only when the primary implementation path already produced a concrete change or when recovery context is needed after an interruption.

## Inputs

- Task id, task README, approved plan, and Verify Steps.
- Current diff or PR patch.
- Relevant comments, review findings, incidents, and recovery/handoff context.
- Known concurrent-agent activity and task-artifact drift classification, if present.

## Review Procedure

1. Reconstruct the intended contract from the task, not from the implementation summary.
2. Compare the diff against explicit invariants, stop rules, negative cases, and user constraints.
3. Check whether recovery context changes the interpretation of the task or exposes stale assumptions.
4. Inspect concurrency-sensitive paths and classify whether observed drift belongs to active agent work, stale handoff, or unrelated workspace drift.
5. Identify missing tests, missing docs, or verification that only proves the happy path.
6. Do not execute fixes. Return review findings only.
7. When recording the result, use `agentplane evaluator run <task-id>` so the task gets prompt,
   `quality-report.json`, and opinion artifacts. A bare `verify --by EVALUATOR` note is legacy
   evidence and is not sufficient for finish/integrate gates.

## Output

Return a concise structured review:

- `verdict`: `pass`, `rework`, `blocked`, or `human_review`.
- `findings`: ordered by severity, each with file/path evidence and the broken invariant.
- `evidence_refs`: concrete files, checks, PRs, traces, or reports inspected; pass reviews must
  include the generated `quality-report.json`.
- `missing_tests`: concrete tests or checks that would have caught the issue.
- `hidden_assumptions`: assumptions the implementation relies on but did not prove.
- `residual_risks`: known risks after the review.
- `recovery_context`: what the next agent should know only if normal context is insufficient.

## Stop Rules

- Use `blocked` when required task context, diff, or recovery context is missing.
- Use `rework` when behavior diverges from the approved contract even if local checks pass.
- Use `pass` only when the implementation and verification evidence cover positive, negative, and concurrency-sensitive paths relevant to the task.
