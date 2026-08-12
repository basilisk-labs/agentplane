# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The recorded performance qualification uses the planning-only benchmark, so it does not measure mandatory local verification.
- Lifecycle/control-plane command count is asserted as a constant rather than reproducibly collected.
- Frozen verification evidence does not provide traceable artifacts for several claimed mandatory checks.

## Evidence
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/fa6040f58e26cbb69e73de62e8024819f9b43fa80ff04de4f4fd57c8ae2fe29c.patch
- .agentplane/tasks/202608112259-T3ZDDM/verification/20260812180653436-1da08017f7d9e5b4.json
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/ee5e04dbea9400fc0db15f83ef13f29b6ecfb775d67d8104dc98cf6289f6ae1a.json
- .agentplane/tasks/202608112259-T3ZDDM/README.md

## Missing Tests
- Run `bench:verification:execute` for repeated samples on the declared pinned reference hardware and retain machine-readable raw outputs proving p50, p95, selected checks, and pass status.
- Add a regression test that fails if benchmark qualification runs in planning mode while reporting mandatory-verification timing.
- Test lifecycle/control-plane command counting from observed command events, including a fixture exceeding the threshold of three.
- Freeze traceable outputs for risk-selected real E2E, forced multi-group failures and deterministic aggregation, fixture isolation/cleanup, and duplication regression checks.

## Hidden Assumptions
- Planning latency is assumed to represent end-to-end mandatory verification latency.
- A literal command-count value of one is assumed to match actual lifecycle/control-plane activity.
- Narrative verification summaries and an external run URL are assumed sufficient despite absent frozen runtime/check artifacts.
- The benchmark environment is assumed to be pinned and comparable, but the frozen evidence does not identify the reference hardware or collection conditions.

## Residual Risks
- Replace the planning-only performance qualification with repeated executed-contract measurements, derive lifecycle command counts from observations, and freeze traceable artifacts for every mandatory hosted, E2E, concurrency, fixture-isolation, duplication, and metric check before reevaluation.
