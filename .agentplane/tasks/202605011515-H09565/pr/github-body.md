## Summary

Record the AgentPlane submission to bradAGI/awesome-cli-coding-agents.

External PR: https://github.com/bradAGI/awesome-cli-coding-agents/pull/71

## Placement

- Category: `Harnesses & orchestration -> Agent infrastructure`
- Change: one `README.md` entry in the upstream list
- Positioning: AgentPlane is described as a Git-native workflow control layer for CLI coding-agent workflows, not as another coding agent.

## Entry

AgentPlane - Git-native workflow control layer for Claude Code, Codex, Cursor, Aider, and other CLI coding-agent workflows. Adds task, plan, approval, verification, and finish records inside the repository.

## Verification

- External fork check: `git diff --check`
- PR body check: `gh pr view 71 --repo bradAGI/awesome-cli-coding-agents --json body` confirmed real Markdown line breaks, not escaped `\n`
- Task verification: `agentplane verify 202605011515-H09565 --ok --by DOCS`
