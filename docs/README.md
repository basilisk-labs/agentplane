# Docs (Mintlify)

Mintlify entrypoint: `docs/index.mdx`.

If you are reading this in GitHub, open `docs/index.mdx` for the full reading order.

Docs are organized into an agent-first navigation model on top of `docs/user/`, `docs/developer/`, and `docs/help/`:

- `Start`
- `Work on a task`
- `Upgrade & recover`
- `Reference & integrations`
- `Developer`
- `Release notes`

Canonical docs ownership and section boundaries are defined in:

- `docs/developer/documentation-information-architecture.mdx`

When adding or moving pages, update these files together:

- `docs/index.mdx`
- `docs/docs.json`
- `docs/README.md`
- `website/sidebars.ts`
- `website/docusaurus.config.ts`

Generated command reference:

- `docs/user/cli-reference.generated.mdx` is generated from live CLI specs.
- Preferred refresh command:
  `agentplane docs cli --out docs/user/cli-reference.generated.mdx`
- If the linked dev binary reports a stale build inside the framework checkout, rebuild first or
  run the built dist entrypoint directly:
  `node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx`
