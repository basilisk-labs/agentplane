# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- executeBranchWorkflowOperation passes operation.params.commit as both commit and implementationCommit; this bypasses finish's task-artifact advance resolver and makes expected_sha equal the quality artifact commit instead of quality_review.evaluated_sha.

## Evidence
- .agentplane/tasks/202607221852-71SCSW/quality/20260731-131446651-recovery-context/evaluator-diff.patch

## Missing Tests
- In-process task.pre_merge_close must omit explicit implementationCommit so finish resolves a task-artifact head to the reviewed semantic commit.

## Hidden Assumptions
- none recorded

## Residual Risks
- Make the in-process adapter match the projected CLI argv: pass the close commit as commit, omit implementationCommit, and add a focused option-forwarding regression.
