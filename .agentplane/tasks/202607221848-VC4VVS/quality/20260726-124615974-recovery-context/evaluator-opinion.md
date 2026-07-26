# Semantic quality review: pass

Provenance: evaluator_supplied

Corrective head restores local-first AgentWorkOrder preparation and preserves one explicit remote policy across brief, next-action, task run, and Hermes.

## Findings
- Omitted include_remote now resolves to false in both direct and branch_pr; the real four-surface integration covers local default parity and explicit --remote parity.
- The pre-existing local-first contract is restored: task brief does not perform a default gh lookup, while compiler-error and stale-fingerprint gates remain covered.

## Evidence
- .agentplane/tasks/202607221848-VC4VVS/README.md
- bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts --no-file-parallelism (4 passed)
- bunx --no-install vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts --no-file-parallelism (10 passed)
- bunx --no-install vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-run.test.ts --no-file-parallelism (4 passed)
- bun run typecheck; bun run guards:check; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs (all passed)
- packages/agentplane/src/runner/usecases/agent-work-order.ts:93-105

## Missing Tests
- none recorded

## Hidden Assumptions
- Hosted PR/check/review truth is meaningful only in branch_pr; direct mode intentionally remains local even if a caller requests remote.

## Residual Risks
- Provider responses are exercised through isolated CLI fixtures, not a live GitHub request; TESTER can run the remaining broad critical suite before verification.
