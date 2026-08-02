# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Configured-base detection depends on the mutable current base tip, so a concurrent base advance after merge start makes the hook fall back to the full staged-path set and misattributes incoming base changes to the active task.

## Evidence
- .agentplane/tasks/202608020147-VMBX4H/quality/20260802-021408292-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608020147-VMBX4H/README.md

## Missing Tests
- Start a configured-base merge, advance the configured base ref before running pre-commit and commit-msg, and verify that incoming base implementation/task artifacts remain excluded while task-side mutations remain enforced.

## Hidden Assumptions
- The configured base ref cannot advance between creation of MERGE_HEAD and hook execution.

## Residual Risks
- Replace or supplement mutable-tip equality with evidence that identifies the actual configured-base merge at merge start, while preserving rejection of merges from other topic commits that are reachable from the configured base.
