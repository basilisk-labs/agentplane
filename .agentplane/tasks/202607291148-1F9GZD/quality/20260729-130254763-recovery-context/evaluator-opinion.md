# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The packet labels a clone of the frozen replay baseline as the current RF-04 rebuild instead of loading or deriving current-run output. A passing check selected by command-name substring is the only connection to execution, so baseline-versus-current success, rework, safety, token, and latency values are not independently demonstrated.
- Verification is recorded for d720aaa8, while the frozen evaluation targets 3ae6dcfa0680e40fe489e1f82566dfbea6328181 after additional rework. The frozen observed checks contain no durable verification records or runner evidence proving the required checks against the evaluated SHA.

## Evidence
- .agentplane/tasks/202607291148-1F9GZD/quality/20260729-130254763-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607291148-1F9GZD/README.md
- .agentplane/tasks/202607291148-1F9GZD/quality/20260729-130254763-recovery-context/evaluator-observed-checks.json

## Missing Tests
- A test using intentionally different baseline and current RF-04 artifacts that proves current_rebuild is derived from current execution output rather than cloned from the baseline.
- A verification run of the focused evaluator suite and ci:contract bound to evaluated SHA 3ae6dcfa0680e40fe489e1f82566dfbea6328181.

## Hidden Assumptions
- A passing check whose command contains ci:contract or agent-efficiency proves that the specific frozen replay baseline was rebuilt during that check.
- Copying the replay baseline into current_rebuild is equivalent to recording current RF-04 measurements.
- Changes between d720aaa8 and the evaluated SHA cannot affect behavior covered by the required checks.

## Residual Risks
- Replace the synthetic RF-04 current_rebuild clone with frozen output produced by the verified current run, bind that output and every required check to one reviewed SHA, then rerun focused tests and ci:contract on the final evaluated commit.
