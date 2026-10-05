import path from "node:path";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { previewRecipeV1Conversion } from "./impl/v1-conversion.js";

type Parsed = { source: string };
export const recipesPreviewV1Spec: CommandSpec<Parsed> = {
  id: ["recipes", "preview-v1"],
  group: "Recipes",
  summary:
    "Audit exact local V1 bytes without installing, converting procedures or creating a Task.",
  args: [{ name: "source", required: true, valueHint: "<repository-relative-file>" }],
  parse: (raw) => ({ source: String(raw.args.source) }),
};
export const runRecipesPreviewV1: CommandHandler<Parsed> = async (ctx, parsed) => {
  const preview = await previewRecipeV1Conversion({
    repository_root: path.resolve(ctx.rootOverride ?? ctx.cwd),
    source_path: parsed.source,
  });
  process.stdout.write(`${JSON.stringify(preview, null, 2)}\n`);
  return 0;
};
