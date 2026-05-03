Task: `202605031118-HVF230`
Title: Switch external channels after Bun parity

## Summary

Switch external channels after Bun parity

Switch Homebrew, Scoop, and setup-agentplane to Bun binaries only after the experimental Bun channel has passed binary smoke/parity checks in a release cycle.

## Scope

- In scope: Switch Homebrew, Scoop, and setup-agentplane to Bun binaries only after the experimental Bun channel has passed binary smoke/parity checks in a release cycle.
- Out of scope: unrelated refactors not required for "Switch external channels after Bun parity".

## Verification

- State: ok
- Note: Focused verification passed: release distribution manifest now records an externalChannelSwitchGate with Bun default disabled until parity evidence exists; Homebrew, Scoop, and setup-agentplane evidence copy the gate while preserving standalone_bundled_node defaults. Ran targeted release distribution and external renderer tests plus check-mode renderers.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T12:56:59.157Z
- Branch: task/202605031118-HVF230/bun-external-channel-switch-gate
- Head: 049ee1131120

```text
No changes detected.
```

</details>
