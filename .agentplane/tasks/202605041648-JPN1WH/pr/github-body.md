Task: `202605041648-JPN1WH`
Title: Fix docs site SSG route conflicts

## Summary

Fix docs site SSG route conflicts

Resolve the existing Docusaurus SSG failure caused by duplicate / and /blog/ routes or missing default page exports so the docs site build can complete.

## Scope

- In scope: Resolve the existing Docusaurus SSG failure caused by duplicate / and /blog/ routes or missing default page exports so the docs site build can complete.
- Out of scope: unrelated refactors not required for "Fix docs site SSG route conflicts".

## Verification

- State: ok
- Note: Command: bun run docs:site:build. Result: pass. Evidence: Docusaurus compiled client/server and generated static files in website/build; the duplicate / and /blog/ SSG failure no longer reproduces on current origin/main. Scope: public docs site SSG route generation. Command: bun run docs:site:typecheck. Result: pass. Evidence: tsc exited 0. Scope: website TypeScript page/theme code. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy routing. Command: agentplane doctor. Result: pass with warning. Evidence: doctor OK, warning only reports unrelated 202605041618-E011A7 branch_pr closure drift. Scope: workflow health.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T16:53:16.281Z
- Branch: task/202605041648-JPN1WH/docs-ssg-routes
- Head: 9b96103d3db0

```text
No changes detected.
```

</details>
