---
version: 2
workflow:
  mode: branch_pr
  status_commit_policy: confirm
  commit_automation: manual
  finish_auto_status_commit: false
  close_commit:
    direct_dirty_policy: allow_other_task_readmes
  artifacts_language: en
  closure_commit_requires_approval: false
owners:
  orchestrator: ORCHESTRATOR
approvals:
  require_plan: false
  require_network: false
  require_verify: false
workspace:
  agents_dir: .agentplane/agents
  tasks_path: .agentplane/tasks.json
  workflow_dir: .agentplane/tasks
  worktrees_dir: .agentplane/worktrees
  isolation: per_task
  cleanup: after_finish
tasks:
  backend:
    config_path: .agentplane/backends/local/backend.json
  id_suffix_length_default: 6
  verify:
    required_tags:
      - code
      - backend
      - frontend
  doc:
    sections:
      - Summary
      - Scope
      - Plan
      - Verify Steps
      - Verification
      - Rollback Plan
      - Findings
    required_sections:
      - Summary
      - Scope
      - Plan
      - Verification
      - Rollback Plan
  comments:
    start:
      prefix: "Start:"
      min_chars: 40
    blocked:
      prefix: "Blocked:"
      min_chars: 40
    verified:
      prefix: "Verified:"
      min_chars: 60
branch:
  task_prefix: task
framework:
  source: https://github.com/basilisk-labs/agentplane
  last_update: null
  cli:
    expected_version: 0.7.7
feedback:
  github_issues:
    enabled: true
commit:
  generic_tokens:
    - start
    - status
    - mark
    - done
    - wip
    - update
    - tasks
    - task
  dco:
    enabled: true
    name: Denis Smirnov
    email: densmirnov@me.com
scheduler:
  concurrency: 1
  poll_interval_ms: 30000
  retry_policy:
    normal_exit_continuation: true
    abnormal_backoff: exponential
    max_attempts: 5
evaluator:
  verdicts:
    - pass
    - rework
    - blocked_external
    - human_review
    - infra_failed
    - no_change
  required_checks:
    - agentplane doctor
    - node .agentplane/policy/check-routing.mjs
observability:
  runs_dir: <git-common-dir>/agentplane/runner/tasks/<task-id>/runs
  events: jsonl
retry_policy:
  normal_exit_continuation: true
  abnormal_backoff: exponential
  max_attempts: 5
timeouts:
  stall_seconds: 900
in_scope_paths:
  - "**"
execution:
  profile: standard
  reasoning_effort: medium
  text_verbosity: medium
  tool_budget:
    discovery: 6
    implementation: 10
    verification: 6
  stop_conditions:
    - Missing required input blocks correctness.
    - Requested action expands scope or risk beyond approved plan.
    - Verification fails and remediation changes scope.
  handoff_conditions:
    - Role boundary reached (for example CODER -> TESTER/REVIEWER).
    - Task depends_on prerequisites are incomplete.
    - Specialized agent is required.
  unsafe_actions_requiring_explicit_user_ok:
    - Destructive git history operations.
    - Outside-repo read/write.
    - Credential, keychain, or SSH material changes.
---

































## Prompt Template
Repository: {{ runtime.repo_name }}
Workflow mode: {{ workflow.mode }}
Workflow source: {{ workflow.source }}

## Checks
- preflight
- verify
- finish

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
