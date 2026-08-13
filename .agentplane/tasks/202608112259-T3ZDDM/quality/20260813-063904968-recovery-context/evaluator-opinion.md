# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The frozen evaluator readback contains no Verification Contract, so the contract is not authoritative for evaluator and recovery verification at the evaluated SHA.

## Evidence
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/7c80c424cb46b62e2f079ff376cd447c21ebb2eacf0b5188c787f6837ed009ed.json
- .agentplane/tasks/202608112259-T3ZDDM/README.md
- .agentplane/tasks/202608112259-T3ZDDM/verification/20260813063841498-26fac15396bac3bc.json

## Missing Tests
- Add an evaluator/recovery integration test using a legacy or already-active task that lacks a persisted contract; preparation must reconcile and expose a non-null contract or fail closed before accepting verification.
- Add an exact-SHA assertion that observed-checks.selected checks and accepted verification evidence are derived from the persisted contract digest.

## Hidden Assumptions
- All tasks reaching evaluator or recovery were started after Verification Contract materialization was introduced.
- An accepted verification record remains sufficient when the evaluator readback cannot identify the contract that selected its mandatory checks.

## Residual Risks
- Ensure evaluator and recovery preparation reconcile or fail closed on missing persisted Verification Contracts, then regenerate frozen exact-SHA evidence showing a non-null contract and contract-derived verification coverage.
