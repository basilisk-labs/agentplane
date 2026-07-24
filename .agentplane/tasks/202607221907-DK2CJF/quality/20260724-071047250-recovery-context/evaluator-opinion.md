# Semantic quality review: rework

Provenance: evaluator_supplied

Alpha.1 evidence is mechanically sound, but qualification cannot pass until two merged dependency worktrees are cleaned and two metric statements are corrected.

## Findings
- P1: the wave gate requires clean worktree cleanup, while 4VB97J and 9XC1H0 remained registered at the reviewed SHA.
- P2: the structural baseline has ten observed scalar cells, not ten measured cost metrics; seventeen metric kinds exist and six are observed.
- P2: the nineteen ratchet violations belong to RF-21, RF-06b/RF-09/RF-25, and RF-05a/RF-05b, not RF-24/RF-27.

## Evidence
- .agentplane/tasks/202607221907-DK2CJF/README.md
- .agentplane/tasks/202607221907-DK2CJF/qualification.md
- docs/internal/v0.7-refactor-plan.md
- git worktree list --porcelain and task-scoped cleanup proof

## Missing Tests
- none recorded

## Hidden Assumptions
- Merged and hosted-closed task state was treated as sufficient even though the program gate also requires local cleanup.

## Residual Risks
- Publication remains correctly optional; the rework does not require an alpha.1 package.
