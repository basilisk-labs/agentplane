<!-- ap:fragment id="policy.framework_dev.body.framework.dev" slot="body" mutability="replaceable" -->

# Framework Development Policy

Use this module only inside the AgentPlane framework checkout.

This module is intentionally excluded from normal initialized repositories and must load only when
the prompt-module compiler context has `repo_type=framework`.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.framework_dev.hard_constraint.framework.scope" slot="hard_constraint" mutability="append_only" -->

## Framework Scope

- MUST treat `packages/agentplane/bin/agentplane.js` as the canonical direct repo-local CLI entrypoint.
- MUST keep framework-only commands unavailable outside framework checkouts, not merely hidden from normal help.
- MUST run `bun run framework:dev:bootstrap` after changes to watched runtime, CLI, prompt, or built asset surfaces before relying on repo-local runtime parity.
- MUST NOT require installed user repositories to depend on framework helper scripts.

<!-- /ap:fragment -->
