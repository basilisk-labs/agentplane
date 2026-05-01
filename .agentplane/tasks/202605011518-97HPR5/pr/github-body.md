## Summary

Record the external listing PR for `ai-for-developers/awesome-ai-coding-tools`.

## Scope

- External PR: https://github.com/ai-for-developers/awesome-ai-coding-tools/pull/285
- Category: `Developer Productivity Tools`
- Entry wording: AgentPlane as a local-first, Git-native CLI harness for repo-local coding-agent work.
- Internal change: task and PR artifacts for `202605011518-97HPR5` only.

## Verification

- `git diff --check` in the external fork: pass.
- `gh pr view 285 --repo ai-for-developers/awesome-ai-coding-tools --json body`: pass; body uses real Markdown line breaks from `--body-file`.
- `node .agentplane/policy/check-routing.mjs`: pass.
- `agentplane doctor`: pass; one unrelated warning for task `202605011626-4TQ11R` state reconciliation.

## Handoff Notes

- AgentPlane is positioned as developer workflow infrastructure, not as another coding agent or model framework.
