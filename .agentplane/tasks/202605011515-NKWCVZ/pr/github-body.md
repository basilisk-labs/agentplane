## Summary

Record the AgentPlane submission to ai-boost/awesome-harness-engineering.

External PR: https://github.com/ai-boost/awesome-harness-engineering/pull/13

## Placement

- Category: `Task Runners & Orchestration`
- Change: one `README.md` entry in the upstream list
- Positioning: AgentPlane is described as a local-first, Git-native workflow control layer for repo-local coding-agent work.

## Entry

AgentPlane - Local-first, Git-native CLI harness for repo-local coding-agent work: task state, accepted plans, approval state, verification evidence, and finish records are written into the repository.

## Verification

- External fork check: `git diff --check`
- External URL check: `verify_urls.py` completed; the new AgentPlane URL and badge passed, while existing unrelated 403/404 URLs remain outside this PR
- PR body check: `gh pr view 13 --repo ai-boost/awesome-harness-engineering --json body` confirmed real Markdown line breaks, not escaped `\n`
- Task verification: `agentplane verify 202605011515-NKWCVZ --ok --by DOCS`
