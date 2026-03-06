---
approvals:
  require_network: true
  require_plan: false
  require_verify: false
in_scope_paths:
  - "packages/**"
mode: "direct"
owners:
  orchestrator: "ORCHESTRATOR"
retry_policy:
  abnormal_backoff: "exponential"
  max_attempts: 5
  normal_exit_continuation: true
timeouts:
  stall_seconds: 900
version: 1
---

## Prompt Template
Repository: agentplane
Workflow mode: direct

## Checks
- preflight
- verify
- finish

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
