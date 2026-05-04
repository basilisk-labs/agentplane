# PR Review

Created: 2026-05-04T18:33:08.891Z
Branch: task/202605041830-H4923B/dev-fast-local-checks

## Summary

Document AgentPlane dev fast local checks

Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.

## Scope

- In scope: Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
- In scope: Set the repo-local workflow approval setting agents.approvals.require_network to false in .agentplane/WORKFLOW.md as explicitly requested by the user before publishing this branch.
- Out of scope: blueprint implementation, consumer blueprint runtime, CI repair loop, scoped runner context, and unrelated refactors.

## Verification

### Plan

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
3. Run bun run docs:ia:check. Expected: docs IA remains valid after developer docs changes.
4. Run bun run format:check -- docs/developer/code-quality.mdx docs/developer/contributing.mdx. Expected: touched docs files are formatted.
5. Run agentplane config show. Expected: agents.approvals.require_network resolves to false.
6. Review changed docs and workflow config. Expected: dev fast-check guidance is scoped to AgentPlane framework development and consumer analysis/content tasks do not inherit CI or PR gates.

### Current Status

- State: ok
- Note: Config and docs verification passed after setting require_network=false.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T18:42:54.690Z
- Branch: task/202605041830-H4923B/dev-fast-local-checks
- Head: bf1d2347ec08

```text
 .agentplane/WORKFLOW.md         |  2 +-
 docs/developer/code-quality.mdx | 26 +++++++++++++++++++++++++-
 docs/developer/contributing.mdx | 12 +++++++++++-
 3 files changed, 37 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
