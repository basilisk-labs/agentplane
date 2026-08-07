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
2. Select ready work with `ap task active`.
3. Request one bounded external-agent action with `ap task advance <task-id> --agent-json`.
4. When `action.kind=agent_episode`, perform only the supplied semantic objective inside the
   supplied authority and write the typed result to `exchange.result_path`.
5. Resume with the exact `exchange.resume_argv` and request a fresh packet after every state
   change. `exchange.return_invocation` is compatibility-only.
6. If the repository has a configured managed runner, use `ap task run <task-id>` instead of the
   external exchange loop.

## Rules

- Treat `AGENTS.md`, `ap quickstart`, and `ap role <ROLE>` as the policy surface.
- Use `ap task advance` or `ap task run` as the normal protocol; do not edit `.agentplane/` state
  directly.
- Do not invoke work start, start-ready, verify, finish, integrate, cleanup, Git branch/worktree,
  commit, or PR lifecycle commands during a normal semantic episode.
- Treat approval, human, hosted/external, stale-state, and effect-in-doubt stops as hard boundaries;
  return control instead of reconstructing the process.
- Use `task brief`, `task status --route`, and `task next-action --explain` only for an explicit
  operator/recovery request.
- Keep repository artifacts in English unless the user explicitly requests another language for a specific artifact.
- Return semantic check evidence through the typed result; AgentPlane persists verification and
  terminal evidence separately.

## Limits

- This plugin bundles workflow guidance only. It does not install the `ap`/`agentplane` binary for you.
- If both `ap` and `agentplane` are missing from `PATH`, install AgentPlane first, then use the workflow commands above.
