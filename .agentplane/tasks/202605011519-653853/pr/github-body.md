## Summary

Record the external listing PR for `sorrycc/awesome-code-agents`.

## Scope

- External PR: https://github.com/sorrycc/awesome-code-agents/pull/19
- Category: `Specialized Tools` / `专用工具`
- Entry wording: AgentPlane as a Git-native CLI workflow-control layer for auditable repo-local coding-agent work.
- Internal change: task and PR artifacts for `202605011519-653853` only.

## Verification

- `git diff --check`: pass.
- Entry presence confirmed in `README.md` and `README.zh-CN.md`.
- `gh pr view 19 --repo sorrycc/awesome-code-agents --json body`: pass; body uses real Markdown line breaks from `--body-file`.
- `gh pr checks 19 --repo sorrycc/awesome-code-agents`: no checks reported.
- `node .agentplane/policy/check-routing.mjs`: pass.
- `agentplane doctor`: pass.

## Handoff Notes

- The target repo has no workflow/orchestration/infrastructure section, so `Specialized Tools` is the least misleading existing placement.
