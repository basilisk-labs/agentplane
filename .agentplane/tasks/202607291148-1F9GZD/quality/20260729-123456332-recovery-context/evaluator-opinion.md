# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The evaluator still targets the pre-packet implementation SHA, so the qualification packet and verification record are not part of the reviewed commit.

## Evidence
- .agentplane/tasks/202607291148-1F9GZD/README.md
- .agentplane/tasks/202607291148-1F9GZD/quality/20260729-123456332-recovery-context/evaluator-diff.patch

## Missing Tests
- Prepare a qualification packet, commit the packet and verification artifacts, and assert that work_order.evaluated_sha equals the commit containing those exact artifacts rather than the earlier implementation SHA.
- Modify dependency README, PR metadata, or quality-report content after reviewed_sha and assert packet preparation rejects the drift or reads the content from the reviewed commit.

## Hidden Assumptions
- The implementation assumes a packet written after verification is nevertheless contained in verification_record.implementation_sha.
- The implementation assumes live worktree dependency artifacts are identical to their versions at reviewed_sha; the ancestry check on some task-artifact commit does not prove that identity.

## Residual Risks
- Rework SHA resolution and evidence loading so the evaluator targets a commit that contains the qualification packet and verification record, and derive or verify every dependency artifact against that same commit before freezing the work order.
