# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 6 typed finding(s).

## Findings
- Blocking: kernel-record.ts exports kernelAggregateSchema, kernelRecordSchema and kernelArchiveSchema without external consumers. They are internal schema details.
- Blocking: kernel-migration.ts unnecessarily exports KERNEL_MIGRATION_VERSION, kernelMigrationReceiptSchema and KernelMigrationReceipt. Their actual consumers are within the same file.
- Blocking: kernel-effect-replay.testkit.ts exports effectReplayScenarios, and kernel-replay-capture.testkit.ts exports FrozenObservationFixture and KernelQualificationCorpus, although these helpers are file-local.
- The read-only Knip report identifies exactly nine budget-counted findings. The exact command bun run knip:check fails locally with agentplane CLI files=0/0,total=9/0. This matches the previously fetched hosted verify-static failure.
- Make the nine bindings internal by removing export. Preserve the bindings, behavior, schemas, corpus bytes, existing tests and zero-unused budget. Add an explicit successful knip:check observation before reporting recovery.
- Residual risk: Hosted integration remains blocked until current-head static checks pass.

## Evidence
- .agentplane/tasks/202608291006-2A6BJC/quality/objects/sha256/448ebc737ffc0b7479149082fa8637c058914ea5495ae8e25c31da0906d05783.patch

## Missing Tests
- Require an explicit successful existing knip:check in recovery evidence. No new behavioral test is required for removing unused export modifiers.

## Hidden Assumptions
- A passing ci:local:full was assumed to cover all mandatory hosted static checks; it does not establish the current zero-unused CLI budget.

## Residual Risks
- In the current M2 worktree, remove only the nine unused export modifiers in the four named adapter files. Do not remove used internal bindings or change baseline budgets. Run knip:check, typecheck, and the relevant replay/migration tests, then return typed evidence for normal supervisor verification and evaluator review.
