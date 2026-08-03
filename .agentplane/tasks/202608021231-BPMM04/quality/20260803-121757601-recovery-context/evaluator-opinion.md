# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- A successful managed agent episode without provider token telemetry still stops the supervisor for human review, so unavailable usage can block otherwise valid completion.

## Evidence
- .agentplane/tasks/202608021231-BPMM04/quality/20260803-121757601-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608021231-BPMM04/README.md
- .agentplane/tasks/202608021231-BPMM04/quality/20260803-121757601-recovery-context/evaluator-observed-checks.json

## Missing Tests
- Add a managed task-run lifecycle test whose successful provider adapter result contains no token usage; assert execution continues to valid completion and the completed task records state=unavailable rather than stopping for human_review.

## Hidden Assumptions
- The implementation assumes every successful managed provider invocation supplies input, output, and total token telemetry, despite the approved contract explicitly requiring adapters without usage to remain compatible.

## Residual Risks
- Separate token-telemetry completeness from supervisor budget telemetry enforcement: a successful provider result without usage must remain completable and project unavailable usage, then rerun the managed no-usage lifecycle and completion-surface regression coverage at the exact implementation SHA.
