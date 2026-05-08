Task: `202605081758-TEPFPR`
Title: Reposition public copy around Git-native AI evidence
Canonical task record: `.agentplane/tasks/202605081758-TEPFPR/README.md`

## Summary

Reposition public copy around Git-native AI evidence

Update AgentPlane public README, website, and docs copy from audit-layer CLI framing toward Git-native infrastructure for traceable AI work, with ACR as the main evidence artifact.

## Scope

- In scope: Update AgentPlane public README, website, and docs copy from audit-layer CLI framing toward Git-native infrastructure for traceable AI work, with ACR as the main evidence artifact.
- Out of scope: unrelated refactors not required for "Reposition public copy around Git-native AI evidence".

## Verification

- State: ok
- Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: policy routing after docs/site copy changes; Links: .agentplane/policy/*.md. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; Scope: task worktree runtime and branch_pr drift. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: docs/index.mdx and website/sidebars.ts. Command: bun run docs:site:typecheck; Result: pass; Evidence: website TypeScript check exited 0; Scope: Docusaurus config and homepage TSX. Command: bun run docs:site:build; Result: pass; Evidence: static files generated successfully; only existing dependency warning from vscode-languageserver-types; Scope: docs site routes, anchors, and content. Command: bun run docs:site:check:design; Result: pass; Evidence: DESIGN.md compliance check passed; Scope: public website content. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: all changed files.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T18:03:56.435Z
- Branch: task/202605081758-TEPFPR/git-native-evidence-copy
- Head: 97448aafec23

```text
No changes detected.
```

</details>
