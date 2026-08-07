# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The exact-provider-input guard still permits Git and release/cleanup choreography outside repair-authorized episodes because its command-family patterns enumerate only selected subcommands.

## Evidence
- .agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/95d8ad739385442fe8b741d140c1a7768db0305da3b54d43c56782c79fb99dad.patch
- .agentplane/tasks/202608062021-V2EESE/README.md

## Missing Tests
- Exact compiled-provider-input rejection tests for unlisted Git control and cleanup commands, including `git clean`, `git reset`, `git tag`, and `git cherry-pick`.
- Exact compiled-provider-input rejection tests for alternate release interfaces such as `gh release` and package-version/release commands.
- A negative test proving the `agentplane task run tool` exception accepts only an actually declared phase-tool invocation rather than any text sharing that prefix.

## Hidden Assumptions
- The finite Git subcommand allowlist is assumed to represent the entire forbidden Git choreography family.
- Release and cleanup choreography is assumed to occur only through `agentplane release`, `agentplane cleanup`, or package publish commands.
- Any prompt text beginning with `agentplane task run tool` is assumed to be a valid supervisor-issued phase-tool transport.

## Residual Risks
- Expand the exact-prompt choreography classifier and its negative tests to cover the full declared Git, release, and cleanup families, and constrain the phase-tool exception to declared invocations before resubmitting the frozen implementation for evaluation.
