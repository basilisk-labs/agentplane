# Twitter/X Launch Copy

## Post 1

Agentplane is Git-native infrastructure for traceable AI work.

It turns an AI-agent change into repo-visible evidence:

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

Agentplane generates ACRs for coding-agent work:

```bash
agentplane acr generate <task-id> --work-commit HEAD --write
agentplane acr validate <task-id> --mode local
```

Docs: https://agentplane.org/docs/user/agent-change-record

## Post 3

Agentplane does not replace Claude Code, Codex, Cursor, Aider, or your editor.

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

Agentplane makes those answers durable.

## Short Variants

Agentplane: ACRs for coding agents. Repo-visible task intent, approved plan, verification evidence,
and finish state. https://github.com/basilisk-labs/agentplane

Agentplane: Git-native evidence for AI work. task -> plan -> verify -> finish -> ACR.
https://github.com/basilisk-labs/agentplane
