# AgentPlane 0.7.1 qualification defect ledger

- Verdict: `blocked`
- Subject: `9b979d845d22585ae76c57a6ecbd899f66383907`
- Scenarios: 16/19 passed
- Blocking defects: 2
- Provider evidence: `failed`

## QR-cli-latency: absolute_cli_latency_diagnostic

- Scenario: `cli-latency`
- Disposition: `advisory`
- Owner task: `202608021231-SHYJGK`
- Impact: Formal CLI preparation exceeds the historical absolute threshold in the current environment; a matched baseline decides release impact.
- Proposed fix: Correlate the absolute result with the matched v0.6.26 comparison before attributing a product regression.
- Reproduction: `"node" "scripts/checks/check-cli-walltime-baseline.mjs" "--warmups" "1" "--attempts" "1"`
- Evidence: `.agentplane/tasks/202608041322-M26FS0/evidence/v0.7.3-qualification-9b979d84/logs/cli-latency.log`

## QR-provider-matrix: semantic_provider_qualification_failure

- Scenario: `provider-matrix`
- Disposition: `block`
- Owner task: `202608021232-6BTB6D`
- Impact: The candidate lacks complete no-retry semantic quality and token telemetry from the exact runtime or a proven provider-runtime-equivalent descendant.
- Proposed fix: Classify the failed episode without retrying it, repair the attributable product defect, and run a new explicitly versioned candidate generation unless the runtime is provably unchanged.
- Reproduction: `"node" "scripts/bench/capture-agent-efficiency-candidate.mjs" "--subject" "9b979d845d22585ae76c57a6ecbd899f66383907" "--codex-version" "0.146.0-alpha.3.1" "--runs" "5" "--baseline-evidence" "scripts/baselines/agent-efficiency-v0.7-beta1-candidate.json" "--capture"`
- Evidence: `.agentplane/tasks/202608041322-M26FS0/evidence/v0.7.3-qualification-9b979d84/logs/provider-matrix.log`

## QR-efficiency-evidence: efficiency_or_quality_gate_failure

- Scenario: `efficiency-evidence`
- Disposition: `block`
- Owner task: `202608021232-6BTB6D`
- Impact: The release cannot substantiate its provider-token savings or semantic quality on the exact candidate revision.
- Proposed fix: Capture matched exact-revision evidence, then remove attributed token or outcome regressions without reducing verified-success quality.
- Reproduction: `"node" "scripts/qualification/check-v0.7.1-efficiency-evidence.mjs" "--evidence" ".agentplane/cache/rf04-candidate/9b979d845d22585ae76c57a6ecbd899f66383907/measurement.pinned-baseline-codex-0.146.0-alpha.3.1.json" "--subject" "9b979d845d22585ae76c57a6ecbd899f66383907" "--provider-source-subject" "9b979d845d22585ae76c57a6ecbd899f66383907" "--out" ".agentplane/tasks/202608041322-M26FS0/evidence/v0.7.3-qualification-9b979d84/efficiency-evidence.json"`
- Evidence: `.agentplane/tasks/202608041322-M26FS0/evidence/v0.7.3-qualification-9b979d84/logs/efficiency-evidence.log`
