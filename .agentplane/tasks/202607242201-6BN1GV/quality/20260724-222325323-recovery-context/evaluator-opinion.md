# Semantic quality review: rework

Provenance: evaluator_supplied

The graph adds the right safety leaves, but its contracts still underspecify cross-process single-spawn verification, typed runner consumption of effect resolution, and the boundary between provider-key forwarding and provider exactly-once.

## Findings
- SX8T09 does not explicitly verify concurrent starts by two supervisor processes for the same operation key and generation, an atomic single winner, and exactly one adapter spawn.
- R7WS01 does not explicitly consume typed effect_in_doubt, applied, and not_applied states with resolution provenance, and it does not explicitly forbid generic retry.
- The roadmap does not clearly distinguish provider_key_forwarded from provider exactly-once; provider exactly-once is supportable only with a documented and verified provider deduplication contract.

## Evidence
- .agentplane/tasks/202607242201-6BN1GV/README.md
- .agentplane/tasks/202607242204-SX8T09/README.md
- .agentplane/tasks/202607221850-R7WS01/README.md
- docs/internal/v0.7-refactor-plan.md

## Missing Tests
- A deterministic cross-process concurrency check for two supervisors racing on one operation key and generation.

## Hidden Assumptions
- Forwarding an operation key to a provider implies provider-side deduplication or exactly-once execution.

## Residual Risks
- A runner could still duplicate external effects across supervisors or retry an effect-in-doubt through a generic path.
