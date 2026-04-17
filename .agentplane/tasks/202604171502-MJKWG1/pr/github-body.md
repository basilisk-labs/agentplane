## Summary

Decompose runtime incidents resolver into strategy modules

Split the runtime incidents resolver hotspot into declarative strategy modules so the dispatcher stays small and behavior remains unchanged.

## Scope

- In scope: Split the runtime incidents resolver hotspot into declarative strategy modules so the dispatcher stays small and behavior remains unchanged.
- Out of scope: unrelated refactors not required for "Decompose runtime incidents resolver into strategy modules".

## Verification

- State: ok
- Note: Decomposed runtime incidents resolver into registry, planning, and advice strategy modules; reduced resolve.ts to a façade re-export surface; verified typecheck plus resolve incident contract.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T18:53:42.607Z
- Branch: task/202604171502-MJKWG1/incident-strategies
- Head: efd9edc20f7c

```text
 .../src/runtime/incidents/advice-strategy.ts       |  76 ++
 .../src/runtime/incidents/plan-strategy.ts         | 267 +++++++
 .../src/runtime/incidents/registry-strategy.ts     | 325 ++++++++
 .../agentplane/src/runtime/incidents/resolve.ts    | 827 +--------------------
 .../agentplane/src/runtime/incidents/shared.ts     | 220 ++++++
 5 files changed, 900 insertions(+), 815 deletions(-)
```

</details>
