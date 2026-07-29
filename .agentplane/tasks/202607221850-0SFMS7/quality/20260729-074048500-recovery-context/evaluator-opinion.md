# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The frozen review packet still contains no concrete verification records or direct-runtime evidence for the evaluated SHA, despite reporting verification success.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-074048500-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221850-0SFMS7/README.md
- .agentplane/policy/dod.code.md

## Missing Tests
- An end-to-end evaluator-review preparation test using the real task-history shape, proving that the verification record and preserved direct-runtime evidence are frozen after lifecycle-artifact and quality-target commits.
- A regression assertion that evaluator-observed-checks.json is rejected or flagged when verification.state is ok but verification_records, runner_history, runtime_evidence, and direct_supervision are all empty for a task requiring runtime and concurrency-sensitive verification.

## Hidden Assumptions
- The implementation assumes that resolving the intended quality-review target automatically makes earlier verification and runtime artifacts discoverable in the frozen evaluator packet.
- The successful verification note is assumed to be an adequate substitute for independently frozen command, runtime, negative-path, and concurrency evidence.

## Residual Risks
- Repair the evaluator evidence-freezing path so the work order for the current review target includes the concrete verification record and preserved direct-supervision/runtime artifacts, then regenerate the frozen packet and rerun this evaluation.
