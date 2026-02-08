import type { CommandHandler, CommandId, CommandSpec, MatchResult } from "./spec.js";

import { CliError } from "../../shared/errors.js";

export class CommandRegistry {
  private readonly entries: {
    id: CommandId;
    spec: CommandSpec<unknown>;
    handler: CommandHandler<unknown>;
  }[] = [];

  register<TParsed>(spec: CommandSpec<TParsed>, handler: CommandHandler<TParsed>) {
    const key = formatCommandId(spec.id);
    if (this.entries.some((e) => formatCommandId(e.id) === key)) {
      throw new CliError({
        exitCode: 1,
        code: "E_INTERNAL",
        message: `Duplicate command id registered: ${key}`,
      });
    }
    this.entries.push({
      id: spec.id,
      spec: spec as CommandSpec<unknown>,
      handler: handler as CommandHandler<unknown>,
    });
  }

  list(): readonly { spec: CommandSpec; handler: CommandHandler }[] {
    return this.entries;
  }

  match(tokens: readonly string[]): MatchResult | null {
    // Longest-prefix match by id segments.
    let best: MatchResult | null = null;
    for (const e of this.entries) {
      const id = e.id;
      if (tokens.length < id.length) continue;
      let ok = true;
      for (const [i, seg] of id.entries()) {
        if (tokens[i] !== seg) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      if (!best || id.length > best.consumed) {
        best = { spec: e.spec, handler: e.handler, consumed: id.length };
      }
    }
    return best;
  }
}

export function formatCommandId(id: CommandId): string {
  return id.join(" ");
}
