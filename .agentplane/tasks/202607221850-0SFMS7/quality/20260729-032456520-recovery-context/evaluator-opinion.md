# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The mandatory contract check fails on the evaluated SHA, and the recorded verification state remains needs_rework.
- The claimed 0.6.24 cost improvement is calculated from hard-coded candidate values rather than measurements from an executed direct golden-path episode; the implementation also derives baseline tool calls from an expected lifecycle trace and explicitly states that provider-internal tool calls were not recorded.

## Evidence
- .agentplane/tasks/202607221850-0SFMS7/verification/20260729032442824-deedb5d6a025de27.json
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-032456520-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221850-0SFMS7/quality/20260729-032456520-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221850-0SFMS7/README.md

## Missing Tests
- An end-to-end direct golden-path run that captures actual lifecycle-call, tool-call, and duplicate-context metrics and compares them with the frozen 0.6.24 baseline.
- A successful run of bun run ci:contract on the evaluated SHA, or a formally approved skip containing the required reason, risk, and approver evidence.

## Hidden Assumptions
- The repository-wide clone-baseline failure is pre-existing and unrelated to RF-10a, but the frozen evidence does not include an approved waiver or comparative proof establishing that exception.
- Hard-coded orchestration-cost constants accurately represent a real supervised episode even though no runner history or measured episode trace is frozen.

## Residual Risks
- Rework the evidence and implementation so the evaluated SHA has either a passing mandatory contract check or an approved skip, then replace the hard-coded golden-cost claim with measurements from an executed direct episode covering lifecycle calls, tool calls, duplicate context, verified success, lifecycle ownership, and committed-scope enforcement.
