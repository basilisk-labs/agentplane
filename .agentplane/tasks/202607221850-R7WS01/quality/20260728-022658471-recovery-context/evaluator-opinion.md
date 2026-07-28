# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- executeHermesWorkflowOperation marks an execution with active_claim_cleanup as failed but currently forwards executed.result.exit_code, which can still be 0. This splits supervisor semantics from task-run's typed exit mapping.

## Evidence
- .agentplane/tasks/202607221850-R7WS01/quality/20260728-022658471-recovery-context/evaluator-diff.patch

## Missing Tests
- Hermes execution with active_claim_cleanup returns failed and a nonzero exit_code.

## Hidden Assumptions
- The provider exit code always reflects supervisor cleanup state.

## Residual Risks
- Set Hermes exit_code from taskRunnerLifecycleExitCode(lifecycle) and add a narrow cleanup-failure regression test.
