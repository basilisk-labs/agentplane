# Semantic quality review: rework

Provenance: evaluator_supplied

Rework required: production Hermes supervise prepares a remote work order while brief, next-action, and runner prepare local work orders, violating the required shared remote policy.

## Findings
- Hermes supervise hard-codes includeRemote=true; brief and next-action default --remote=false and runner hard-codes include_remote=false. Preparation serializes that choice into remote_policy, so the surfaces cannot share the required canonical signature.

## Evidence
- .agentplane/tasks/202607221848-VC4VVS/README.md
- packages/agentplane/src/commands/hermes/hermes.command.ts:126-132
- packages/agentplane/src/commands/task/brief.command.ts:39-43
- packages/agentplane/src/commands/task/next-action.command.ts:50-54
- packages/agentplane/src/runner/usecases/task-run.ts:157-169
- packages/agentplane/src/runner/usecases/agent-work-order-projection.ts:115-134
- bunx vitest run packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts (3 passed; equality fixture uses routePacket includeRemote=false at lines 163-169)

## Missing Tests
- Exercise production hermes supervise --json with brief, next-action, and runner under the same policy, and assert work_order_id, fingerprint, remote_policy, route, manifest, and verification intent are equal.

## Hidden Assumptions
- The routePacket helper with includeRemote=false is assumed equivalent to production Hermes supervise, although the handler passes true.

## Residual Risks
- Provider lookup can alter the route and precondition fingerprint, so this divergence can change work-order identity as well as remote_policy metadata.
