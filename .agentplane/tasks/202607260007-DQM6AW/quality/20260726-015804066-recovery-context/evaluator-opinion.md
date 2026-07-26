# Semantic quality review: rework

Provenance: evaluator_supplied

Rework required: incomplete or internally contradictory GitHub mergeability evidence can bypass the required fail-closed conflict route.

## Findings
- P1: when both GitHub mergeable fields are omitted, sync-github accepts the provider record without mergeability; needsProviderConflictReworkPreparation returns false and prepareConflictReworkPacket returns not_conflicting, so a DONE verified PR can continue to the ordinary integration route instead of stopping on unknown provider truth.
- P1: a provider payload with mergeable=false and mergeable_state=unknown is normalized as conflicting because the boolean is checked before unknown state. This can grant a CODER semantic-rework route from unsettled provider truth, contrary to the contract that unknown provider state fails closed.

## Evidence
- .agentplane/tasks/202607260007-DQM6AW/README.md
- packages/agentplane/src/commands/pr/internal/sync-github.ts
- packages/agentplane/src/commands/pr/conflict-rework.ts
- bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts: 34 passed

## Missing Tests
- Add unit and CLI-route regressions for omitted mergeable fields and contradictory boolean/provider-state pairs; both must produce provider_conflict_context_invalid and never normal integration or semantic mutation authority.

## Hidden Assumptions
- GitHub always returns mergeable fields and never returns a boolean that contradicts mergeable_state.

## Residual Risks
- Until provider mergeability is normalized conservatively, a transient or partial provider response can route a protected PR outside the intended fail-closed boundary.
