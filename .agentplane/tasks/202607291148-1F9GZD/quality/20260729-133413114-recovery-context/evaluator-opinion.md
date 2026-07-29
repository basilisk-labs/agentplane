# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The sealing commit may contain unverified implementation changes after the packet's verified implementation SHA.
- Dependency lifecycle artifacts are not proven to be the artifacts present at or before the reviewed implementation SHA.

## Evidence
- .agentplane/tasks/202607291148-1F9GZD/quality/20260729-133413114-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607291148-1F9GZD/README.md

## Missing Tests
- Reject a descendant sealing commit that adds or modifies implementation files after verification, even when every pinned qualification artifact still matches.
- Reject a packet when a leaf README, PR metadata file, or quality report was created or modified after implementation_sha while an older unrelated task-directory commit remains reachable.
- Prove each pinned leaf artifact's exact blob hash at a commit that is an ancestor of implementation_sha.

## Hidden Assumptions
- Any descendant of the verified implementation SHA is treated as safe evidence-only drift.
- The latest commit touching a leaf task directory is assumed to contain the same leaf artifact bytes later hashed into the packet.
- Current task-backend state and working-tree artifact contents are assumed to represent lifecycle closure that existed before the reviewed implementation SHA.

## Residual Risks
- Constrain the evaluated sealing commit so it cannot introduce unverified implementation changes after implementation_sha, and prove each pinned dependency artifact by reading its exact blob at an ancestor of implementation_sha rather than pairing current bytes with an unrelated earlier task-directory commit.
