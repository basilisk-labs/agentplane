# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The semantic projection omits loaded security policy modules from provider input.

## Evidence
- .agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/c93b091fe243e4afbbce445ca2caf17ae75d02284d5c1b665de9f26bdc216a39.patch
- .agentplane/policy/security.must.md
- .agentplane/tasks/202608062021-V2EESE/README.md

## Missing Tests
- For PLANNER, EXECUTOR, and EVALUATOR, assert that the exact compiled provider prompt preserves every applicable constraint from the loaded security.must policy module while still excluding lifecycle choreography.

## Hidden Assumptions
- The implementation assumes the gateway scope-boundary fragment and serialized authority fully subsume the separately loaded security policy module; the frozen diff and tests do not establish that equivalence.

## Residual Risks
- Project applicable loaded security-policy constraints into each semantic provider prompt without reintroducing lifecycle choreography, then qualify the exact PLANNER, EXECUTOR, and EVALUATOR prompts against both security-presence and lifecycle-absence assertions.
