# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The latency gate measures only warmed invocations; it does not produce the required 20 cold repetitions per candidate and baseline.
- The frozen verification evidence does not substantiate the benchmark baseline, raw runs, warm/cold method, per-command results, or time-to-verified comparison claimed by the verification note.
- The added release regression test covers median and p95 only, leaving the approved verified-success, scope-violation, token-usage, packet-size, and provider-independent time-to-verified thresholds unproven.

## Evidence
- .agentplane/tasks/202608021231-SHYJGK/README.md
- .agentplane/tasks/202608021231-SHYJGK/quality/20260802-172856956-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608021231-SHYJGK/quality/20260802-172856956-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202608021231-SHYJGK/quality/20260802-172856956-recovery-context/evaluator-blueprint.json
- .agentplane/policy/dod.code.md

## Missing Tests
- A deterministic harness test that proves separate cold and warm sample sets each contain at least 20 interleaved measurements for both baseline and candidate.
- A frozen benchmark-artifact check covering raw per-command samples, median, p95, exit status, environment, baseline identity, and provider-excluded time-to-verified.
- Release-gate negative tests for verified-success regression, scope violations, token growth, packet-size growth, and time-to-verified regression.

## Hidden Assumptions
- Warmups followed by measured invocations are assumed to satisfy the explicit requirement for both cold and warm repetitions.
- A summary verification note is assumed to substitute for the benchmark blueprint's required raw and comparative evidence.
- Existing correctness and efficiency suites are assumed to enforce all newly approved release thresholds, although the frozen evidence does not identify their results or coverage.

## Residual Risks
- Add distinct cold and warm benchmark phases with at least 20 interleaved samples each, enforce every approved release threshold, and freeze the raw exact-SHA benchmark and check records so the evaluator can verify the claimed results.
