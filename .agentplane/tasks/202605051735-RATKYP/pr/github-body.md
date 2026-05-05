Task: `202605051735-RATKYP`
Title: Document cloud backend model

## Summary

Document cloud backend model

Document the neutral local/cloud backend model, cloud connection flow, and integration task plan for AgentPlane.

## Scope

- In scope: Document the neutral local/cloud backend model, cloud connection flow, and integration task plan for AgentPlane.
- Out of scope: unrelated refactors not required for "Document cloud backend model".

## Verification

- State: ok
- Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass with pre-existing runtime/hook warnings only; Evidence: doctor OK, errors=0 warnings=4 info=7. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Additional check: rg forbidden pricing/enterprise terms in touched AgentPlane docs; Result: pass, no matches. Skipped: bun run docs:site:typecheck completed with dependency/tsconfig resolution failures in website workspace before docs-specific validation; Risk: sidebar type-level validation not proven by that command; Mitigation: docs:ia:check and policy routing passed, and generated JS artifacts from the failed command were removed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T17:39:48.405Z
- Branch: task/202605051735-RATKYP/cloud-backend-docs
- Head: b1585df09c78

```text
 docs/developer/cloud-backend-integration-plan.mdx  | 144 +++++++++++++++++++++
 .../documentation-information-architecture.mdx     |   2 +-
 docs/index.mdx                                     |  34 ++---
 docs/user/backends.mdx                             |  13 +-
 docs/user/backends/cloud.mdx                       | 144 +++++++++++++++++++++
 docs/user/commands.mdx                             |   6 +-
 docs/user/setup.mdx                                |  25 ++++
 docs/user/tasks-and-backends.mdx                   |  13 +-
 website/sidebars.ts                                |   2 +
 9 files changed, 360 insertions(+), 23 deletions(-)
```

</details>
