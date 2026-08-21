# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- runTaskNewParsed checks currentCtx.config.workflow_mode before resolving the primary checkout, so a stale linked worktree configured as direct can bypass routing and recreate task-document contamination.

## Evidence
- .agentplane/tasks/202608211010-X9X57M/quality/objects/sha256/7851cb67bcf42134701142f5da9898fdfbc96b7d14f7c19fca2dc0f75e63ec4a.patch

## Missing Tests
- Regression coverage for stale linked-worktree workflow_mode differing from the primary checkout.

## Hidden Assumptions
- The invoking worktree configuration was assumed to match the primary checkout configuration.

## Residual Risks
- Resolve the primary checkout context before deciding whether branch_pr plus a local task store requires primary routing; preserve direct-mode and remote-backend behavior; add a stale-worktree regression test.
