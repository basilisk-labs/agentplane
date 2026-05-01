export const CHECK_REGISTRY = {
  agents: {
    description: "Validate generated agent templates.",
    command: ["bun", "run", "agents:check"],
  },
  "docs:scripts": {
    description: "Validate scripts/README.md against package scripts.",
    command: ["bun", "run", "docs:scripts:check"],
  },
  "policy:routing": {
    description: "Validate policy routing budgets and graph.",
    command: ["bun", "run", "policy:routing:check"],
  },
  "release:parity": {
    description: "Validate release/runtime version parity.",
    command: ["bun", "run", "release:parity"],
  },
  schemas: {
    description: "Validate generated schema files.",
    command: ["bun", "run", "schemas:check"],
  },
  "vitest:projects": {
    description: "Validate Vitest project and route registry parity.",
    command: ["bun", "run", "vitest:projects:check"],
  },
};

export function listCheckNames() {
  return Object.keys(CHECK_REGISTRY).toSorted((a, b) => a.localeCompare(b));
}

export function resolveSelectedChecks(selectRaw) {
  const names = listCheckNames();
  const selected =
    selectRaw === "all"
      ? names
      : selectRaw
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);

  const unknown = selected.filter((name) => !Object.hasOwn(CHECK_REGISTRY, name));
  if (unknown.length > 0) {
    throw new Error(`Unknown check selection: ${unknown.join(", ")}`);
  }
  return selected.map((name) => ({ name, ...CHECK_REGISTRY[name] }));
}
