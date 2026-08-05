# AgentPlane 0.7.1 qualification defect ledger

- Verdict: `ready`
- Subject: `3195e6fb97586ceb347f7bd9063fa3ef4b7b1cca`
- Scenarios: 18/19 passed
- Blocking defects: 0
- Provider evidence: `passed`

## QR-cli-latency: absolute_cli_latency_diagnostic

- Scenario: `cli-latency`
- Disposition: `advisory`
- Owner task: `202608021231-SHYJGK`
- Impact: Formal CLI preparation exceeds the historical absolute threshold in the current environment; a matched baseline decides release impact.
- Proposed fix: Correlate the absolute result with the matched v0.6.26 comparison before attributing a product regression.
- Reproduction: `"node" "scripts/checks/check-cli-walltime-baseline.mjs" "--warmups" "1" "--attempts" "1"`
- Evidence: `.agentplane/reports/v0.7.1-qualification/2026-08-05T22-57-46-619Z/logs/cli-latency.log`
