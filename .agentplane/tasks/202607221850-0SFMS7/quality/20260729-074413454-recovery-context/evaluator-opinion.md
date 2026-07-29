# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The frozen review packet reports successful verification but contains no verification records, runner history, runtime evidence, or direct-supervision evidence for the evaluated SHA.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-074413454-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221850-0SFMS7/README.md
- .agentplane/policy/dod.code.md

## Missing Tests
- An end-to-end evaluator-packet regression test that closes a branch_pr task, selects the evaluated closure SHA, and asserts that verification_records and runtime_evidence remain populated.
- A frozen-packet assertion that direct_supervision contains evidence for zero EXECUTOR lifecycle calls, fresh route recomputation, typed approval/wait/human stops, evaluator rework, out-of-scope writes, and adapter crashes.
- A golden-path evidence test that preserves baseline comparison metrics in evaluator-observed-checks.json after pre-merge closure.

## Hidden Assumptions
- A verification state of ok and narrative README entries are assumed to substitute for machine-readable check and runtime evidence.
- Closure-target classification is assumed to retain task evidence, but the authoritative observed-checks artifact shows all corresponding collections empty.
- The evaluated SHA is assumed to cover the required live golden path and concurrency-sensitive behavior without frozen evidence tying those executions to that SHA.

## Residual Risks
- Regenerate the evaluator packet after fixing closure-target evidence selection so the frozen observed checks retain concrete verification records, runtime/direct-supervision evidence, failure-path coverage, and baseline metrics for evaluated SHA 57637d15372425b7afb0e08d8225b19ced89f244; then rerun this semantic review.
