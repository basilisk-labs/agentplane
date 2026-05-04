# Docs layout

`docs/` is the canonical content source for the public documentation set.
Page text lives in the Markdown and MDX files under this directory.

`docs/index.mdx` is the published reading order for the docs site. If you are reading this in GitHub, start there.

`website/` is the site shell that renders and deploys the public docs. It owns sidebar wiring, routing, layout, and presentation. It does not define canonical page content.

`website/sidebars.ts` is the active navigation manifest for the public docs site.

Marketing and positioning source documents moved to the `marketing/` submodule
(`basilisk-labs/agentplane-marketing`). The public docs routes for `manifesto`, `compare`,
`listing`, `showcase`, and `user/website-ia` stay here as thin compatibility pages.

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

Generated recipes inventory:

- `docs/recipes-inventory.json` is generated from `agentplane-recipes/index.json` plus the
  recipe manifests under `agentplane-recipes/recipes/*/manifest.json`.
- Refresh command:
  `node scripts/generate-recipes-inventory.mjs`
