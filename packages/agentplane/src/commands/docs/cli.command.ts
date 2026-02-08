import { mkdir } from "node:fs/promises";
import path from "node:path";

import type { CommandCtx, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import { renderCliDocsMdx } from "../../cli2/docs-render.js";
import { renderCommandHelpJson, type HelpJson } from "../../cli2/help-render.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";

export type DocsCliParsed = {
  out: string;
};

export const docsCliSpec: CommandSpec<DocsCliParsed> = {
  id: ["docs", "cli"],
  group: "Docs",
  summary: "Generate an MDX CLI reference from the current cli2 registry/spec.",
  options: [
    {
      kind: "string",
      name: "out",
      valueHint: "<path>",
      required: true,
      description:
        "Output path. If relative, it is resolved against the current working directory.",
    },
  ],
  examples: [
    {
      cmd: "agentplane docs cli --out docs/user/cli-reference.generated.mdx",
      why: "Generate docs.",
    },
  ],
  parse: (raw) => ({ out: raw.opts.out as string }),
};

export function makeRunDocsCliHandler(getHelpJson: () => readonly HelpJson[]) {
  return async (ctx: CommandCtx, p: DocsCliParsed): Promise<number> => {
    let list: readonly HelpJson[];
    try {
      list = getHelpJson();
    } catch (err) {
      throw usageError({
        spec: docsCliSpec,
        command: "docs cli",
        message: `Failed to read cli2 registry/spec for docs generation: ${err instanceof Error ? err.message : String(err)}`,
      });
    }

    const mdx = renderCliDocsMdx(list);
    const outPath = path.resolve(ctx.cwd, p.out);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeTextIfChanged(outPath, mdx);
    process.stdout.write(`${outPath}\n`);
    return 0;
  };
}

export function makeHelpJsonFromSpecs(specs: readonly CommandSpec<unknown>[]): HelpJson[] {
  return specs.map((s) => renderCommandHelpJson(s));
}
