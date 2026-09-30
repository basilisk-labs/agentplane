import type { CommandSpec } from "../../cli/spec/spec.js";

export const executionContractOptions: NonNullable<CommandSpec["options"]> = [
  {
    kind: "string",
    name: "scope-root",
    valueHint: "<repository-relative-path>",
    repeatable: true,
    description: "Repeatable writable root admitted by the execution contract.",
  },
  {
    kind: "string",
    name: "repository-effect",
    valueHint: "<effect>",
    choices: [
      "repository_write",
      "documentation",
      "source_code",
      "tests",
      "public_api",
      "schema",
      "dependencies",
      "ci",
      "release_metadata",
      "security_boundary",
    ],
    repeatable: true,
    description: "Repeatable repository effect admitted by the execution contract.",
  },
  {
    kind: "string",
    name: "external-effect",
    valueHint: "<effect>",
    choices: [
      "network_read",
      "external_write",
      "credentials",
      "publish",
      "deploy",
      "destructive_git",
    ],
    repeatable: true,
    description: "Repeatable external effect declared at intake.",
  },
  {
    kind: "string",
    name: "capability",
    valueHint: "<capability>",
    repeatable: true,
    description: "Repeatable semantic capability admitted by the execution contract.",
  },
  {
    kind: "string",
    name: "resource",
    valueHint: "<resource>",
    repeatable: true,
    description: "Repeatable resource claim admitted by the execution contract.",
  },
];
