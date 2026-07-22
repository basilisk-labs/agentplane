Task: `202607221846-ZAENM6`
Title: Add trust-boundary architecture ratchets
Canonical task record: `.agentplane/tasks/202607221846-ZAENM6/README.md`

## Summary

Add trust-boundary architecture ratchets

RF-27a: baseline and prohibit new automatic semantic verdicts, agent-writable observed fields, implicit danger sandboxes, untyped durable boundaries, shell-string orchestration, and duplicate runner task representations.

## Scope

- In scope: a baseline-plus-ratchet checker, machine-readable known-violation inventory, focused checker tests, and CI integration for the v0.7 trust invariants.
- Out of scope: failing the build for every legacy violation before its owning RF slice is migrated.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T21:28:08.886Z
- Branch: task/202607221846-ZAENM6/add-trust-boundary-architecture-ratchets
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                       |    3 +-
 ...run-cli.critical.trust-boundary-ratchet.test.ts |  485 ++++++++
 scripts/README.md                                  |    4 +-
 scripts/baselines/trust-boundary-violations.json   |  680 +++++++++++
 scripts/checks/check-trust-boundary-ratchet.mjs    |  123 ++
 scripts/lib/trust-boundary-ratchet.mjs             | 1189 ++++++++++++++++++++
 6 files changed, 2482 insertions(+), 2 deletions(-)
```

</details>
