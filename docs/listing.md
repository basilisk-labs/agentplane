---
title: "Listing submission profile"
description: "Reusable positioning, snippets, and PR copy for submitting AgentPlane to curated coding-agent and harness-engineering lists."
---

# AgentPlane listing submission profile

Use this page when submitting AgentPlane to curated GitHub lists. The goal is to make each submission improve the target list rather than read like bulk promotion.

## Positioning

AgentPlane should be listed as:

```text
Git-native workflow control / harness layer for coding agents.
```

Shorter form:

```text
Local-first CLI harness for auditable coding-agent work in Git.
```

Do not position AgentPlane as another AI coding agent, hosted agent platform, MCP server, or agent skill directory entry.

## Snippets

### Short

AgentPlane - Git-native workflow control for auditable coding-agent work.

### Medium

AgentPlane is a local-first CLI harness for repo-local coding-agent work. It records task state, plan approval, verification evidence, and finish closure inside the Git repository.

### Tags

`git-native`, `local-first`, `coding-agents`, `agent-harness`, `harness-engineering`, `workflow-control`, `verification`, `governance`

### Best categories

- Harness engineering
- Coding-agent workflow control
- Agent infrastructure
- Guardrails / governance
- CLI agent orchestration

## Suggested entries

### Harness-focused lists

```markdown
- [AgentPlane](https://github.com/basilisk-labs/agentplane) - Local-first, Git-native CLI harness for auditable coding-agent work. Records task state, plan approval, verification evidence, and finish closure in repo-local artifacts.
```

### CLI coding-agent lists

```markdown
- [AgentPlane](https://github.com/basilisk-labs/agentplane) - Git-native workflow control layer for repo-local coding-agent work. Adds task, plan, approval, verification, and finish records inside the repository.
```

### Harness-engineering lists

```markdown
- [AgentPlane](https://github.com/basilisk-labs/agentplane) - Repo-local workflow control for coding agents. Makes task state, accepted plans, verification notes, and closure evidence explicit inside Git rather than hidden in chat/session context.
```

### Strict reliability lists

```markdown
- [AgentPlane](https://github.com/basilisk-labs/agentplane) - Local Git-native control layer for coding-agent reliability: explicit task state, plan approval, verification evidence, and deterministic task closure.
```

### Repository-as-system-of-record lists

```markdown
- [AgentPlane](https://github.com/basilisk-labs/agentplane) - Git-native coding-agent harness that treats repository-local task records, workflow policy, verification, and closure as the system of record.
```

## Submission order

1. `Picrew/awesome-agent-harness`
2. `bradAGI/awesome-cli-coding-agents`
3. `ai-boost/awesome-harness-engineering`
4. `AutoJunjie/awesome-agent-harness`
5. `walkinglabs/awesome-harness-engineering`
6. `ai-for-developers/awesome-ai-coding-tools`
7. `brandonhimpfen/awesome-ai-coding-agents`
8. `sorrycc/awesome-code-agents`
9. `filipecalegario/awesome-vibe-coding`

## PR body template

```text
Hi - I would like to add AgentPlane to this list.

Disclosure: I maintain AgentPlane.

Why it fits:
AgentPlane is not another coding agent and not a hosted agent platform. It is a local-first, Git-native workflow control layer for repo-local coding-agent work.

It records:
- task state
- accepted plan
- approval state
- verification evidence
- finish / closure record
- Git revision link

Suggested category:
[Harness Architecture & Orchestration / Agent Infrastructure / Guardrails & Governance / Reference Harness Implementations]

Suggested entry:
[AgentPlane](https://github.com/basilisk-labs/agentplane) - Local-first, Git-native CLI harness for auditable coding-agent work. Records task state, plan approval, verification evidence, and finish closure in repo-local artifacts.

Happy to adjust category, wording, or remove if this is outside scope.
```

## Maintainer guidance

- Fit the target list's structure first; do not force AgentPlane into a top section.
- Follow `CONTRIBUTING.md` and generated-data files when the list uses them.
- Keep wording concrete: task state, plan approval, verification evidence, finish closure, Git revision.
- Avoid enumerating specific coding-agent products in external submission copy unless the target list explicitly asks for examples.
- Avoid claims like "best", "production-grade", "first", or "revolutionary".
- Skip MCP server lists unless AgentPlane ships an MCP server.
- Skip agent-skill lists unless a real skill artifact is created in a separate approved task.
