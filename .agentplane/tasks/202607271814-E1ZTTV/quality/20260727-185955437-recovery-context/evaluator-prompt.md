# AgentPlane EVALUATOR episode

AgentPlane prepared and froze the authoritative review input. Perform the semantic evaluation; do not reproduce CLI discovery or lifecycle work.
This prompt does not execute an evaluator. A caller must run the evaluator in the work-order authority boundary and persist its returned typed result at the declared output path.
Do not edit implementation, task lifecycle, policy, or evidence files. You may read the frozen evidence and run read-only checks only.

- task_id: 202607271814-E1ZTTV
- task_readme: .agentplane/tasks/202607271814-E1ZTTV/README.md
- work_order: .agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185955437-recovery-context/evaluator-work-order.json
- result_output: .agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185955437-recovery-context/evaluator-result.json
- report_path: .agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185955437-recovery-context/quality-report.json
- provenance: evaluator_supplied

## Required result

Return exactly one `sgr.evaluator_result.v1` JSON object through the evaluator result channel. The caller, not the read-only evaluator, persists it at `result_output`. It must contain:
- schema_version: 1
- kind: evaluator_result
- evaluator_id: the evaluator id from the work order
- verdict: pass | rework | blocked
- findings: typed findings with id, severity, summary, broken_invariant, and non-empty evidence_refs
- missing_tests and hidden_assumptions: string arrays
- recovery_context: optional string

Every findings[].evidence_refs[].path must be an exact path from work_order.evidence. Do not add fields, commands, patches, lifecycle transitions, or a verdict outside this JSON result.
The CLI validates the schema, frozen evidence digests, task revision, evaluated SHA, and blueprint before it records quality state.

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
7. When recording the result, use `agentplane evaluator run <task-id> --provenance evaluator_supplied` so the task gets prompt,
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
