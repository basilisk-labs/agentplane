# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- The frozen verification receipt does not show execution of the full required CLI project command: it records a narrower task-advance command and separate focused tests, while task-run, task-routing, and command-guide coverage is not explicitly evidenced.

## Evidence
- .agentplane/tasks/202608062021-MCY8ZC/verification/20260807232657791-e8b4d7e88544220c.json
- .agentplane/tasks/202608062021-MCY8ZC/quality/objects/sha256/b87d4eaf0695a1635716aa7c684c63d4a9587703f658437a61718ef41752e384.json

## Missing Tests
- Record deterministic evidence for the exact required command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts

## Hidden Assumptions
- The verification receipt assumes that the narrower focused runs or bun run ci:contract cover every file named by the declared CLI acceptance command, but the frozen evidence does not establish that mapping.

## Residual Risks
- Provide a fresh deterministic verification record showing the exact declared CLI project command and its passing result at evaluated SHA 032a2b8ab4180f16251f367b36ee462d2b108b92.
