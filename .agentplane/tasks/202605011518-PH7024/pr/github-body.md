## Summary

Record the external listing PR for `brandonhimpfen/awesome-ai-coding-agents`.

## Scope

- External PR: https://github.com/brandonhimpfen/awesome-ai-coding-agents/pull/8
- Category: `Agent Infrastructure`
- Entry wording: AgentPlane as a Git-native workflow-control harness for repo-local AI coding-agent work.
- Internal change: task and PR artifacts for `202605011518-PH7024` only.

## Verification

- `git diff --check`: pass.
- `python3 .github/scripts/awesome_list_lint.py`: pass.
- `python3 .github/scripts/detect_duplicate_links.py`: pass.
- `python3 check_readme_links.py README.md --timeout 8`: AgentPlane URL returned `200`; full command fails on pre-existing `agentcoder/AgentCoder` 404.
- `gh pr view 8 --repo brandonhimpfen/awesome-ai-coding-agents --json body`: pass; body uses real Markdown line breaks from `--body-file`.
- `node .agentplane/policy/check-routing.mjs`: pass.
- `agentplane doctor`: pass.

## Handoff Notes

- AgentPlane is positioned as infrastructure/workflow-control for AI coding agents, not as another coding agent or model framework.
