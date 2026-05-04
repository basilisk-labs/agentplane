Task: `202605041830-H4923B`
Title: Document AgentPlane dev fast local checks

## Summary

Document AgentPlane dev fast local checks

Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.

## Scope

- In scope: Document the AgentPlane development-loop discipline for running fast local checks before expensive CI, including check tiers and when to escalate to full local or hosted checks.
- In scope: Set the repo-local workflow approval setting agents.approvals.require_network to false in .agentplane/WORKFLOW.md as explicitly requested by the user before publishing this branch.
- Out of scope: blueprint implementation, consumer blueprint runtime, CI repair loop, scoped runner context, and unrelated refactors.

## Verification

- State: ok
- Note: Config and docs verification passed after setting require_network=false.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T18:38:43.974Z
- Branch: task/202605041830-H4923B/dev-fast-local-checks
- Head: f9d5b9f9736c

```text
 docs/developer/code-quality.mdx | 26 +++++++++++++++++++++++++-
 docs/developer/contributing.mdx | 12 +++++++++++-
 2 files changed, 36 insertions(+), 2 deletions(-)
```

</details>
