# Semantic quality review: pass

Provenance: human_supplied

The fix removes the schema-invalid token usage extension and makes hosted closure reject missing mandatory ACR artifacts while preserving the established best-effort contract for ordinary finish.

## Findings
- PASS: agentplane.token-usage satisfies the ACR extension-key schema and the hosted integration test proves the completed task token usage is serialized in the resulting valid ACR.
- PASS: required behavior is opt-in at the hosted-close caller; ordinary finish and other existing callers retain best-effort refresh semantics.
- PASS: hosted-close now returns a contextual non-zero failure containing the task ID and root ACR error instead of committing a successful close tail without acr.json.

## Evidence
- packages/agentplane/src/commands/acr/generate.ts
- packages/agentplane/src/commands/task/finish-shared.ts
- packages/agentplane/src/commands/task/hosted-close.command.ts
- packages/agentplane/src/commands/task/finish-acr-refresh.unit.test.ts
- packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts
- .agentplane/tasks/202608032116-V9DBA5/verification/20260803214505220-43bbd446b8abb6e6.json

## Missing Tests
- none recorded

## Hidden Assumptions
- Hosted close requires ACR persistence only when acr.write_on_finish enables it and the task is eligible under the existing acr.enabled/context-task policy.

## Residual Risks
- A required refresh failure occurs after lifecycle state is written in the ephemeral hosted workspace; the command now exits non-zero with the cause, and a fresh hosted retry starts from canonical Git state.
