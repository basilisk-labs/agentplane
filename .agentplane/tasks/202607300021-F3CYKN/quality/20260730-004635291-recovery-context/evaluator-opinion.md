# Semantic quality review: pass

Provenance: evaluator_supplied

EVALUATOR returned pass with 2 typed finding(s).

## Findings
- The reviewed parser reads the evidence blob at the reviewed SHA, validates its canonical digest, exact 50-run/10-scenario/55-episode coverage, matched runtime profile, runtime-bridge baseline, comparison failure IDs, and internally consistent verdict.
- The packet exposes candidate_measurement and deterministically maps the retained failed verdict to qualification_decision=do_not_publish; focused tests cover failed-valid, missing, cross-runtime, tampered, and invalid-candidate-SHA inputs.

## Evidence
- .agentplane/tasks/202607300021-F3CYKN/quality/20260730-004635291-recovery-context/evaluator-diff.patch

## Missing Tests
- none recorded

## Hidden Assumptions
- none recorded

## Residual Risks
- none recorded
