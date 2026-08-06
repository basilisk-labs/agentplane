# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The declared focused-test command failed to select the target suites and was replaced with a different command without recorded re-approval.

## Evidence
- .agentplane/tasks/202608061646-30TKV4/README.md
- .agentplane/tasks/202608061646-30TKV4/verification/20260806195317361-b18111f72a312cf9.json
- .agentplane/policy/dod.code.md
- .agentplane/policy/dod.core.md

## Missing Tests
- Execute a corrected, re-approved focused-test command whose project selector actually includes both declared CLI suites.
- Add an explicit regression check for the retained task advance --agent-json contract.
- Add negative coverage for empty or invalid intake options and explicit route overrides.
- Add concurrency-sensitive coverage for simultaneous duplicate natural-language task creation and persisted route consistency.

## Hidden Assumptions
- Passing the same files under the cli-core project is assumed to be an acceptable substitute for the approved agentplane-project command without re-approval.
- Untouched task advance code is assumed to preserve --agent-json compatibility without an explicit regression check.
- Existing task creation primitives are assumed to provide sufficient concurrency safety for the new entrypoint.

## Residual Risks
- Correct the focused Vitest selector in the task verification contract, obtain the required re-approval for that material change, rerun every declared check, and record explicit compatibility, negative-path, and concurrency-sensitive evidence before reevaluation.
