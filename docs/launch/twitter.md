# Twitter/X Launch Copy

## Post 1

AgentPlane is an open-source audit layer for coding agents.

It turns an agent change into repo-visible evidence:

- task intent
- approved plan
- verification
- finish state
- Agent Change Record (ACR)

Repo: https://github.com/basilisk-labs/agentplane

## Post 2

A diff shows what changed.

An ACR shows why the change existed, what plan was accepted, which checks ran, and how the work was
closed.

AgentPlane generates ACRs for coding-agent work:

```bash
agentplane acr generate <task-id> --work-commit HEAD --write
agentplane acr validate .agentplane/tasks/<task-id>/acr.json
```

Docs: https://agentplane.org/docs/user/agent-change-record

## Post 3

AgentPlane does not replace Claude Code, Codex, Cursor, Aider, or your editor.

It wraps them with a Git-visible workflow:

task -> plan -> verify -> finish -> acr

Demo: https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/agentplane-demo.gif

## Post 4

If you review agent-written PRs, the useful question is not "which model edited this?"

It is:

- what was the agent asked to do?
- who/what approved the plan?
- what checks actually ran?
- what artifact can CI and reviewers inspect?

AgentPlane makes those answers durable.

## Short Variants

AgentPlane: ACRs for coding agents. Repo-visible task intent, approved plan, verification evidence,
and finish state. https://github.com/basilisk-labs/agentplane

AgentPlane is the audit layer around coding agents: task -> plan -> verify -> finish -> acr.
https://github.com/basilisk-labs/agentplane
