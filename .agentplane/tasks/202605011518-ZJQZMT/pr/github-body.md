## Summary

Record the AgentPlane submission to AutoJunjie/awesome-agent-harness.

External PR: https://github.com/AutoJunjie/awesome-agent-harness/pull/16

## Placement

- Category: `Task Runners`
- Change: one `README.md` entry appended at the end of the upstream category, following the list's contribution note
- Positioning: AgentPlane is described as a Git-native workflow control harness for repo-local coding-agent work.

## Entry

AgentPlane - Git-native workflow control harness for repo-local coding-agent work. Treats repository-local task records, workflow policy, verification evidence, and finish closure as the system of record.

## Verification

- External fork check: `git diff --check`
- PR body check: `gh pr view 16 --repo AutoJunjie/awesome-agent-harness --json body` confirmed real Markdown line breaks, not escaped `\n`
- Task verification: `agentplane verify 202605011518-ZJQZMT --ok --by DOCS`
