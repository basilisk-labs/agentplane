# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Three registered adapters emit null migration_command values, so doctor legacy findings do not all name a migration command as required.
- The focused manifest tests do not exercise the required malformed semver, stale-path, or unknown-probe negative fixtures.

## Evidence
- .agentplane/tasks/202608021535-CNQKXP/quality/objects/sha256/2bb730169b33ef9854f812504fe27240f1e22f4aa2e6e2b70321f725979fec8a.patch
- .agentplane/tasks/202608021535-CNQKXP/README.md

## Missing Tests
- A doctor legacy JSON and human-rendering assertion that every adapter finding contains a non-empty migration command.
- Malformed manifest fixtures for invalid semver ordering, unknown usage_probe kinds, and stale or non-file source paths.

## Hidden Assumptions
- Adapters without an actionable automated migration may use null migration_command despite the explicit per-finding migration-command acceptance criterion.
- Passing broad repository gates is assumed to substitute for the specifically required negative manifest fixtures, although the frozen verification record does not identify such cases.

## Residual Risks
- Define a non-empty operator guidance command for every adapter or revise the approved acceptance criterion, then add deterministic malformed-semver, unknown-probe, and stale-source-path fixtures and record their verification.
