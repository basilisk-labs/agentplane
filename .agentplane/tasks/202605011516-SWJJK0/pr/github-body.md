## Summary

Record the AgentPlane submission to walkinglabs/awesome-harness-engineering.

External PR: https://github.com/walkinglabs/awesome-harness-engineering/pull/21

## Placement

- Category: `Runtimes, Harnesses & Reference Implementations`
- Change: one `README.md` entry
- Positioning: AgentPlane is described as an inspectable workflow-control harness and reliability primitive, not generic agent tooling.

## Entry

AgentPlane - Git-native workflow control harness for repo-local coding-agent work. It makes task records, workflow policy, verification evidence, and closure state explicit repo artifacts, which is useful for auditable and resumable agent work.

## Verification

- External fork check: `git diff --check`
- PR body check: `gh pr view 21 --repo walkinglabs/awesome-harness-engineering --json body` confirmed real Markdown line breaks, not escaped `\n`
- Task verification: `agentplane verify 202605011516-SWJJK0 --ok --by DOCS`
