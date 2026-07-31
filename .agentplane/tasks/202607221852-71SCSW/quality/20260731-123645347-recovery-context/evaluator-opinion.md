# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- integration.enqueue persisted the queue entry under the base checkout, but supervisor refresh switched task loading to the stale base README while task-worktree refresh could not observe the base queue cache.

## Evidence
- .agentplane/tasks/202607221852-71SCSW/quality/20260731-123645347-recovery-context/evaluator-diff.patch

## Missing Tests
- No regression covered task-worktree task truth combined with base-checkout integration queue truth.

## Hidden Assumptions
- none recorded

## Residual Risks
- Keep task and quality truth anchored to the task worktree while resolving integration queue truth from the authoritative base checkout; add regression coverage and repeat the live queued transition.
