# Semantic quality review: rework

Provenance: evaluator_supplied

Runner work-order parity is not met on the current head.

## Findings
- The public task run --dry-run surface exits with code 3 in both direct and branch_pr canonical-work-order fixtures, while brief, next-action, and Hermes succeed; therefore the claimed unified preparation contract is broken.

## Evidence
- .agentplane/tasks/202607221849-NWVCAG/README.md
- bunx vitest run packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts --reporter=verbose (2 failed, 3 passed)

## Missing Tests
- The failure output does not yet expose the runner rejection payload; add or preserve an assertion that identifies the rejected precondition after fixing the contract.

## Hidden Assumptions
- A successful prepared work order on read-only surfaces was assumed to imply runner preparation succeeds; runner has additional authority/checkout validation.

## Residual Risks
- No remote side effect was attempted; publication remains blocked by this rework verdict.
