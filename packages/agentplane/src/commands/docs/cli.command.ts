import { mkdir } from "node:fs/promises";
import path from "node:path";

import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { renderCliDocsMdx } from "../../cli/spec/docs-render.js";
import { renderCommandHelpJson, type HelpJson } from "../../cli/spec/help-render.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";

const output = createCliEmitter();

export type DocsCliParsed = {
  out: string;
};

export const docsCliSpec: CommandSpec<DocsCliParsed> = {
  id: ["docs", "cli"],
  group: "Docs",
  summary: "Generate an MDX CLI reference from the current command spec catalog.",
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

export type DocsCliResult = {
  outPath: string;
  commandCount: number;
};

export async function generateCliDocs(opts: {
  cwd: string;
  out: string;
  help: readonly HelpJson[];
}): Promise<DocsCliResult> {
  const mdx = renderCliDocsMdx(opts.help);
  const outPath = path.resolve(opts.cwd, opts.out);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeTextIfChanged(outPath, mdx);
  return { outPath, commandCount: opts.help.length };
}

export function makeRunDocsCliHandler(getHelpJson: () => readonly HelpJson[]) {
  return async (ctx: CommandCtx, p: DocsCliParsed): Promise<number> => {
    let list: readonly HelpJson[];
    try {
      list = getHelpJson();
    } catch (err) {
      throw usageError({
        spec: docsCliSpec,
        command: "docs cli",
        message: `Failed to read command specs for docs generation: ${err instanceof Error ? err.message : String(err)}`,
      });
    }

    const result = await generateCliDocs({ cwd: ctx.cwd, out: p.out, help: list });
    output.line(result.outPath);
    return 0;
  };
}

export function makeHelpJsonFromSpecs(specs: readonly CommandSpec<unknown>[]): HelpJson[] {
  return specs.map((s) => renderCommandHelpJson(s));
}
