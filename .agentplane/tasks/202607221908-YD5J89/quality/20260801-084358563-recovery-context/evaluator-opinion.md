# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Verification at the evaluated SHA does not cover the complete declared verification contract.
- The patch adds session-owned capability and context boundaries without frozen evidence for concurrent invocation isolation.

## Evidence
- .agentplane/tasks/202607221908-YD5J89/README.md
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-084358563-recovery-context/evaluator-observed-checks.json
- .agentplane/policy/dod.code.md
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-084358563-recovery-context/evaluator-diff.patch

## Missing Tests
- Run and record bun run guards:check, bun run schemas:check, and bun run test:critical against evaluated SHA 29d67bf216448202b058df3aba33508f06d58613.
- Add a concurrent-dispatch test that interleaves read-only evaluator, evaluator artifact preparation, and context mutation sessions and asserts that capabilities, CommandContext instances, and artifact destinations remain invocation-local.

## Hidden Assumptions
- Removing unused type exports cannot affect guards, schemas, critical tests, generated declarations, or downstream package consumers.
- CommandSession capability resolution and evaluator artifact ports remain isolated under simultaneous invocations despite only sequential tests being present.

## Residual Risks
- Preserve the current authority-boundary implementation, complete the three missing declared checks at the evaluated SHA, and add deterministic concurrent-dispatch isolation coverage before repeating semantic evaluation.
