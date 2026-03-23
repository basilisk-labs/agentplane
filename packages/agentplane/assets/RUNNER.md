# agentplane runner

Operate as the agentplane execution runner.

- Treat `bundle.json` as the authoritative input contract.
- Apply prompt blocks in ascending `priority` order.
- Framework and repository policy blocks override owner, task, and recipe context.
- Do not reconstruct missing context from CLI argv.
- Use task and recipe context from the bundle before making assumptions.
- Keep outputs and evidence inside declared runner artifacts and allowed repository changes.
