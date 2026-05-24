# EVALUATOR opinion: pass

EVALUATOR review: agent prompts now use compact ap evaluator run and preserve legacy verify only as an insufficient manual path.

## Findings
- Packaged and repo-local EVALUATOR agent prompts now instruct agents to run ap evaluator run with structured findings, evidence, missing tests, hidden assumptions, and residual risks.
- The CI failure in agents-template was addressed by replacing primary agentplane evaluator run prompt commands with ap evaluator run in both EVALUATOR prompt sources.
- agents-template, agent template sync, agent onboarding scenario, targeted evaluator/blueprint tests, and policy routing passed after the prompt fix.

## Evidence
- .agentplane/tasks/202605232011-MAW1PK/README.md
- packages/agentplane/assets/agents/EVALUATOR.json
- .agentplane/agents/EVALUATOR.json
- packages/agentplane/src/agents/agents-template.test.ts
- commit: 38fc891b1
- check: bun test packages/agentplane/src/agents/agents-template.test.ts
- check: node scripts/generate/sync-agent-templates.mjs check && node scripts/checks/check-agent-onboarding-scenario.mjs
- check: bun test packages/agentplane/src/workflow-lifecycle/contract.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts
- check: node .agentplane/policy/check-routing.mjs

## Missing Tests
- No single snapshot test asserts every prompt/gateway/evaluator surface excludes bare verify --by EVALUATOR as the primary quality-gate command; current coverage combines agents-template, rg inspection, and lifecycle contract tests.

## Hidden Assumptions
- Legacy verify wording is acceptable only when explicitly described as not sufficient for finish/integrate gates.

## Residual Risks
- Hosted verify-unit must rerun on the pushed HEAD to confirm the CI failure is cleared.
