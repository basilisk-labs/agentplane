Task: `202605090831-9P1DS0`
Title: Fix cloud backend Node address selection
Canonical task record: `.agentplane/tasks/202605090831-9P1DS0/README.md`

## Summary

Fix cloud backend Node address selection

Make AgentPlane cloud backend requests resilient to Node v24 network-family autoselection failures when IPv4 is slightly slower than the default 250ms attempt timeout and NAT64 IPv6 is unusable.

## Scope

- In scope: Make AgentPlane cloud backend requests resilient to Node v24 network-family autoselection failures when IPv4 is slightly slower than the default 250ms attempt timeout and NAT64 IPv6 is unusable.
- Out of scope: unrelated refactors not required for "Fix cloud backend Node address selection".

## Verification

- State: ok
- Note: Verified: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts passed 24 tests; bun run typecheck passed; bun run --filter=agentplane build passed; git diff --check passed; node .agentplane/policy/check-routing.mjs passed; agentplane doctor OK; live patched CLI without NODE_OPTIONS successfully ran backend inspect cloud --yes and backend sync cloud --direction pull --yes against agentplane-cloud-sync, producing cloud pull diff changed=0 ignored_remote_only=0 conflicts=0.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T08:33:06.157Z
- Branch: task/202605090831-9P1DS0/cloud-node-address-selection
- Head: 1178f3e0b7b2

```text
No changes detected.
```

</details>
