# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- The frozen verification evidence is bound to the superseded implementation SHA 06582bde1138360f789c18399c86df20279bafee, while this episode evaluates b16798c4824c9e7249bf0d27a5a89e74544513fb.

## Evidence
- .agentplane/tasks/202608021231-PZGG3V/quality/20260802-151405256-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202608021231-PZGG3V/README.md

## Missing Tests
- Fresh SHA-bound results for the required supervisor parity, lifecycle, recovery, packet-size, critical, typecheck, workflow coverage, and repository contract checks at b16798c4824c9e7249bf0d27a5a89e74544513fb.

## Hidden Assumptions
- The successful checks recorded for 06582bde1138360f789c18399c86df20279bafee are assumed to remain valid after the subsequent parity and recovery changes through b16798c4824c9e7249bf0d27a5a89e74544513fb.

## Residual Risks
- Collect and freeze deterministic verification evidence against evaluated SHA b16798c4824c9e7249bf0d27a5a89e74544513fb, including the newly added managed/external parity and recovery coverage, then repeat the semantic evaluation.
