# AgentPlane 0.7.1 qualification defect ledger

- Verdict: `ready`
- Subject: `d6dc2d0d72a2aa72d82c452a9080c4c85d8c7a16`
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
- Evidence: `.agentplane/tasks/202608041322-M26FS0/evidence/v0.7.3-qualification-d6dc2d0d/logs/cli-latency.log`
