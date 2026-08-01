# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- context verify-task and context finalize-task are catalogued as project-only while their implementations load CommandContext internally, so the declared capability profile understates backend/task access and permits duplicate broad context preparation.

## Evidence
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-013623389-recovery-context/evaluator-diff.patch

## Missing Tests
- Add loader/session coverage proving verify-task resolves task.read once and finalize-task resolves task.write once.

## Hidden Assumptions
- Filesystem-only context mutations currently have no dedicated capability and remain represented by project-root preparation.

## Residual Risks
- none recorded
