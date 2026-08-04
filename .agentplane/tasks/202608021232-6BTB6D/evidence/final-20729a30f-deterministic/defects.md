# AgentPlane 0.7.1 qualification defect ledger

- Verdict: `blocked`
- Subject: `20729a30faaf80fe58511a2bef84a59d4b9e60c0`
- Scenarios: 15/17 passed
- Blocking defects: 1
- Provider evidence: `not_run`

## QR-cli-latency: absolute_cli_latency_diagnostic

- Scenario: `cli-latency`
- Disposition: `advisory`
- Owner task: `202608021231-SHYJGK`
- Impact: Formal CLI preparation exceeds the historical absolute threshold in the current environment; a matched baseline decides release impact.
- Proposed fix: Correlate the absolute result with the matched v0.6.26 comparison before attributing a product regression.
- Reproduction: `"node" "scripts/checks/check-cli-walltime-baseline.mjs" "--warmups" "1" "--attempts" "1"`
- Evidence: `.agentplane/tasks/202608021232-6BTB6D/evidence/final-20729a30f-deterministic/logs/cli-latency.log`

## QR-supervisor-latency: supervisor_latency_regression

- Scenario: `supervisor-latency`
- Disposition: `block`
- Owner task: `202608022324-Y26ENH`
- Impact: The packed public supervisor adds more than 10% median or p95 overhead versus the semantically equivalent v0.6.26 path.
- Proposed fix: Attribute duplicated Git, route, task, or context observations and optimize them without weakening stale-state or effect-safety checks.
- Reproduction: `"node" "scripts/qualification/measure-v0.7.1-supervisor-latency.mjs" "--subject" "20729a30faaf80fe58511a2bef84a59d4b9e60c0" "--out" ".agentplane/tasks/202608021232-6BTB6D/evidence/final-20729a30f-deterministic/supervisor-latency.json"`
- Evidence: `.agentplane/tasks/202608021232-6BTB6D/evidence/final-20729a30f-deterministic/logs/supervisor-latency.log`
