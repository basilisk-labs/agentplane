---
name: agentplane
description: Use when a repository uses AgentPlane or the user wants a governed git-native workflow for planning, task execution, verification, and closure.
---

# AgentPlane

Use AgentPlane through its CLI instead of editing `.agentplane/` state directly.

## When to use

- The repository already contains `AGENTS.md` or `.agentplane/`.
- The user wants to initialize AgentPlane in a repository.
- The user wants explicit planning, task IDs, verification evidence, or `branch_pr` worktrees.

## Startup

1. If the repository is not initialized, run `ap init` or `agentplane init`.
2. Run `ap quickstart`.
3. Inspect `AGENTS.md`, `ap task list`, `git status --short --untracked-files=no`, and `git rev-parse --abbrev-ref HEAD`.
4. Use `ap role ORCHESTRATOR` while planning and approvals are active.
5. Switch to `ap role <ROLE>` before owner-scoped execution or verification.

## Rules

- Treat `AGENTS.md`, `ap quickstart`, and `ap role <ROLE>` as the policy surface.
- Use `ap task ...`, `ap work ...`, `ap verify ...`, and `ap finish ...`; do not edit `.agentplane/tasks.json` manually.
- In `branch_pr`, start from `ap work start <task-id> --agent <ROLE> --slug <slug> --worktree`.
- Keep repository artifacts in English unless the user explicitly requests another language for a specific artifact.
- Record verification evidence in the task README and through `ap verify`.

## Limits

- This plugin bundles workflow guidance only. It does not install the `ap`/`agentplane` binary for you.
- If both `ap` and `agentplane` are missing from `PATH`, install AgentPlane first, then use the workflow commands above.
