# Semantic quality review: pass

Provenance: human_supplied

The change removes the authority-to-PR-head feedback loop while preserving exact operation, scope, expiry, audit-chain, and tamper checks.

## Findings
- Persisted common-dir metadata is shared by linked task and base worktrees without changing refs/heads.

## Evidence
- commit:a03c556bcb65f44548297514f81741f111180f39
- packages/agentplane/src/commands/shared/side-effect-authority-store.test.ts
- bun run typecheck; bun run test:fast; ci:local:fast

## Missing Tests
- none recorded

## Hidden Assumptions
- none recorded

## Residual Risks
- Authority metadata is intentionally repository-local and must be granted again after moving to a different clone; each grant has a maximum 60-minute TTL.
