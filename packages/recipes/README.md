<p align="center">
  <img src="https://raw.githubusercontent.com/basilisk-labs/agentplane/main/docs/assets/readme-headers/recipes.svg" alt="Agentplane recipes package header" style="width:100%;max-width:100%;"/>
</p>

# @agentplaneorg/recipes

[![npm](https://img.shields.io/npm/v/@agentplaneorg/recipes.svg)](https://www.npmjs.com/package/@agentplaneorg/recipes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/basilisk-labs/agentplane/blob/main/LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-3c873a.svg)](https://github.com/basilisk-labs/agentplane/blob/main/docs/user/prerequisites.mdx)

Manifest, overlay, and signature helpers for AgentPlane recipes.

Recipes are signed, versioned behavior modules for the `agentplane` CLI. A recipe can add agent
profiles, prompt modules, skills, scenario assets, and expected project artifacts. The CLI verifies
remote catalog data before materializing recipe behavior into a repository.

End users normally install the CLI instead:

```bash
npm install -g agentplane
agentplane recipes list-remote
agentplane recipes install code-map --refresh --yes
```

Install this package directly only when you are building recipe tooling, validating recipe manifests,
or testing overlay behavior.

## Install

```bash
npm install @agentplaneorg/recipes
```

## Library scope

This package contains helpers for:

- recipe manifests and compatibility metadata
- project overlays and expected file materialization
- signature and trust metadata used by the CLI
- recipe asset registry validation

It does not install recipes into a project by itself. Use the `agentplane` CLI for that workflow.

## Docs

- Recipes overview: https://agentplane.org/docs/recipes
- Code Map recipe: https://agentplane.org/docs/recipes/code-map
- AgentPlane CLI: https://www.npmjs.com/package/agentplane
- Repository: https://github.com/basilisk-labs/agentplane
- Recipes spec: https://agentplane.org/docs/developer/recipes-spec
- ACR schema: https://agentplane.org/schemas/acr-v0.1.schema.json

## License

MIT
