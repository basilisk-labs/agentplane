# PR Review

Created: 2026-05-04T18:33:08.891Z
Branch: task/202605041830-H4923B/dev-fast-local-checks

## Summary

Document AgentPlane dev fast local checks

Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.

## Scope

- In scope: Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
- Out of scope: unrelated refactors not required for "Document AgentPlane dev fast local checks".

## Verification

### Plan

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing passes.
2. Run agentplane doctor. Expected: doctor exits successfully or reports only unrelated pre-existing drift.
3. Run bun run docs:ia:check. Expected: docs IA remains valid after adding or linking developer guidance.
4. Review the changed developer docs. Expected: the guidance is explicitly scoped to AgentPlane framework development and does not impose CI/PR requirements on consumer analysis or content tasks.

### Current Status

- State: ok
- Note: Docs verification passed for AgentPlane dev fast local checks.

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

- Updated: 2026-05-04T18:33:08.891Z
- Branch: task/202605041830-H4923B/dev-fast-local-checks
- Head: 2d399599d7b2

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
