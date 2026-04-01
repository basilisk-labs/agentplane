import type { CommandHandler, CommandId, CommandSpec, MatchResult } from "./spec.js";

import { CliError } from "../../shared/errors.js";

type CommandGraphNode<T> = {
  id: CommandId;
  children: Map<string, CommandGraphNode<T>>;
  value?: T;
};

export type CommandGraphMatch<T> = {
  value: T;
  consumed: number;
};

type RegistryEntry = {
  spec: CommandSpec<unknown>;
  handler: CommandHandler<unknown>;
};

function getRegistryEntryId(entry: RegistryEntry): CommandId {
  return entry.spec.id;
}

export class CommandGraph<T> {
  private readonly root: CommandGraphNode<T> = {
    id: [],
    children: new Map<string, CommandGraphNode<T>>(),
  };

  private readonly values: T[] = [];

  constructor(private readonly getId: (value: T) => CommandId) {}

  add(value: T) {
    const id = this.getId(value);
    let node = this.root;
    for (const segment of id) {
      const existing = node.children.get(segment);
      if (existing) {
        node = existing;
        continue;
      }
      const child: CommandGraphNode<T> = {
        id: [...node.id, segment],
        children: new Map<string, CommandGraphNode<T>>(),
      };
      node.children.set(segment, child);
      node = child;
    }

    if (node.value !== undefined) {
      throw new Error(`Duplicate command id registered: ${formatCommandId(id)}`);
    }
    node.value = value;
    this.values.push(value);
  }

  list(): readonly T[] {
    return this.values;
  }

  lookup(id: CommandId): T | null {
    return this.resolveNode(id)?.value ?? null;
  }

  match(tokens: readonly string[]): CommandGraphMatch<T> | null {
    let node = this.root;
    let best: CommandGraphMatch<T> | null = null;
    for (const [index, token] of tokens.entries()) {
      const next = node.children.get(token);
      if (!next) break;
      node = next;
      if (node.value !== undefined) {
        best = {
          value: node.value,
          consumed: index + 1,
        };
      }
    }
    return best;
  }

  directChildren(parentId: CommandId = []): readonly T[] {
    const parent = this.resolveNode(parentId);
    if (!parent) return [];
    return [...parent.children.values()].flatMap((child) =>
      child.value === undefined ? [] : [child.value],
    );
  }

  directChildSegments(parentId: CommandId = []): readonly string[] {
    const parent = this.resolveNode(parentId);
    if (!parent) return [];
    return [...parent.children.keys()].toSorted((left, right) => left.localeCompare(right));
  }

  private resolveNode(id: CommandId): CommandGraphNode<T> | null {
    let node = this.root;
    for (const segment of id) {
      const next = node.children.get(segment);
      if (!next) return null;
      node = next;
    }
    return node;
  }
}

export class CommandRegistry {
  private readonly graph = new CommandGraph<RegistryEntry>(getRegistryEntryId);

  register<TParsed>(spec: CommandSpec<TParsed>, handler: CommandHandler<TParsed>) {
    const key = formatCommandId(spec.id);
    if (this.graph.lookup(spec.id)) {
      throw new CliError({
        exitCode: 1,
        code: "E_INTERNAL",
        message: `Duplicate command id registered: ${key}`,
      });
    }
    this.graph.add({
      spec: spec as CommandSpec<unknown>,
      handler: handler as CommandHandler<unknown>,
    });
  }

  list(): readonly { spec: CommandSpec; handler: CommandHandler }[] {
    return this.graph.list();
  }

  match(tokens: readonly string[]): MatchResult | null {
    const match = this.graph.match(tokens);
    return match
      ? { spec: match.value.spec, handler: match.value.handler, consumed: match.consumed }
      : null;
  }

  lookup(id: CommandId): { spec: CommandSpec; handler: CommandHandler } | null {
    return this.graph.lookup(id);
  }

  directChildren(
    parentId: CommandId = [],
  ): readonly { spec: CommandSpec; handler: CommandHandler }[] {
    return this.graph.directChildren(parentId);
  }

  directChildSegments(parentId: CommandId = []): readonly string[] {
    return this.graph.directChildSegments(parentId);
  }
}

export function formatCommandId(id: CommandId): string {
  return id.join(" ");
}
