# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The new evaluator.artifacts.write capability is not a confined artifact-write port: resolving it returns the full CommandContext, so a no-record evaluator handler can access broader mutation facilities without requesting task.write.

## Evidence
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-022647874-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-YD5J89/README.md

## Missing Tests
- A registry-dispatched no-record evaluator test whose injected artifact authority exposes only a path-confined evidence-packet writer and proves that attempts to write the task README, arbitrary repository files, Git state, or backend task state are rejected by the supplied port itself.

## Hidden Assumptions
- The implementation assumes that requesting evaluator.artifacts.write before returning a full CommandContext is equivalent to capability confinement; it only records authority selection and does not restrict what the receiving handler can do with that context.
- The regression test assumes that absence of a task.write trace and an unchanged README proves least privilege, although it verifies one observed execution rather than the authority surface exposed to the handler.

## Residual Risks
- Replace the full-CommandContext result of evaluator.artifacts.write with a narrow evidence-packet preparation port, or otherwise enforce path- and operation-level confinement at the resolver boundary; then test denied task, repository, Git, and backend mutations through the real registry-dispatched no-record path.
