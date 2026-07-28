# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The required second live evaluator episode and cumulative usage increase are not present in the frozen evidence; runner_history remains empty and the task document records only live episode 1.
- The command regression changes task state before the second invocation, but it does not demonstrate that the newly added recovery branch for stale_state returned by the same start attempt is reached; the earlier journal-opening recovery path can satisfy the test.

## Evidence
- .agentplane/tasks/202607281605-D59AS4/README.md
- .agentplane/tasks/202607281605-D59AS4/quality/20260728-162215312-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607281605-D59AS4/quality/20260728-162215312-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a focused command-level test that deterministically makes startSupervisorExecutionEpisode return stale_state after preparation, proves the new same-attempt recovery branch is reached before provider intent persistence, and verifies cumulative usage remains intact.
- Freeze evidence from a completed second live evaluator invocation showing increased episodes, agent_runs, and total_tokens without reset.

## Hidden Assumptions
- The task-state mutation before the second command is assumed to exercise the newly added same-start-attempt stale recovery branch rather than the pre-existing recovery performed immediately after opening the journal.
- Successful completion of the current provider call is assumed to prove cumulative supervisor usage even though that post-call journal state is absent from the authoritative frozen evidence.

## Residual Risks
- The correction has an end-to-end regression and recorded local checks, but pass remains unavailable until the exact new stale-at-start branch is directly exercised and the completed repeated live episode with cumulative usage is frozen as evidence.
