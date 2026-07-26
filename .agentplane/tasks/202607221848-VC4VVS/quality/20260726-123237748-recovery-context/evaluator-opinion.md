# Semantic quality review: rework

Provenance: evaluator_supplied

Rework required: the real Hermes regression is fixed, but canonical preparation now changes branch_pr default task brief and next-action from local-first to remote without explicit --remote.

## Findings
- The central resolver maps an omitted include_remote value to branch_pr remote=true, while public task brief documentation and CLI tests require no default GitHub lookup.
- Production brief, next-action, Hermes, and runner now share a remote signature, but only by broadening remote behavior outside the approved local-first command contract.

## Evidence
- .agentplane/tasks/202607221848-VC4VVS/README.md
- bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts --no-file-parallelism (3 passed)
- bunx --no-install vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts --no-file-parallelism (1 failed, 9 passed: local-first task brief expectation)
- packages/agentplane/src/runner/usecases/agent-work-order.ts:83-101
- packages/agentplane/src/commands/task/brief.command.ts:10-32

## Missing Tests
- Real Hermes supervise regression must assert the same local-default signature while preserving --remote as explicit opt-in.

## Hidden Assumptions
- A branch_pr workflow may silently enable remote preparation even when the invoking CLI surface did not request remote truth.

## Residual Risks
- Default context preparation can perform provider lookup and change route fingerprint or behavior without explicit remote intent.
